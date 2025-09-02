// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
// If you're on Node 18+, you can remove the next line (fetch is global).
import fetch from "node-fetch";

dotenv.config();
if (!process.env.PAYSTACK_SECRET_KEY) {
  console.error("❌ PAYSTACK_SECRET_KEY missing. Check your .env and restart the server.");
  process.exit(1);
} else {
  const k = process.env.PAYSTACK_SECRET_KEY;
  console.log("🔐 Paystack key loaded:", k.slice(0, 8) + "..." + k.slice(-4)); // sk_test_****...**** 
}
const app = express();

/**
 * CORS (dev-friendly)
 * Allows: http://localhost:<any>, http://127.0.0.1:<any>, common LAN IP ranges (192.168.x.x, 10.x.x.x).
 * Placed before routes (can remain before the webhook too).
 */
const allowlist = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
  /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,
];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow non-browser tools (curl/Postman) which send no Origin
      if (!origin) return cb(null, true);
      const ok = allowlist.some((re) => re.test(origin));
      return cb(null, ok);
    },
    credentials: true,
  })
);

// Make sure preflight never fails in dev
app.options("*", cors());

// -------------------- Constants & Helpers --------------------
const PAYSTACK_BASE = "https://api.paystack.co";

// Prices in KES (whole shillings). Paystack expects the *smallest unit*, so we'll send amount * 100.
const PLAN_AMOUNT_KES = {
  monthly: { basic: 999, premium: 2999, professional: 7999 },
  yearly: { basic: 9999, premium: 29999, professional: 79999 },
};

// Optional: If you created Paystack Plans for recurring billing, put the plan codes in .env.
// If a plan code exists for the selected plan+cycle, we'll use subscription by plan code; otherwise we'll do one-off by amount.
const PLAN_CODE = {
  monthly: {
    basic: process.env.PAYSTACK_PLAN_BASIC_MONTHLY || "",
    premium: process.env.PAYSTACK_PLAN_PREMIUM_MONTHLY || "",
    professional: process.env.PAYSTACK_PLAN_PRO_MONTHLY || "",
  },
  yearly: {
    basic: process.env.PAYSTACK_PLAN_BASIC_YEARLY || "",
    premium: process.env.PAYSTACK_PLAN_PREMIUM_YEARLY || "",
    professional: process.env.PAYSTACK_PLAN_PRO_YEARLY || "",
  },
};

function hasPlanCode(cycle, plan) {
  return Boolean(PLAN_CODE?.[cycle]?.[plan]);
}

// -------------------- Webhook (RAW body required) --------------------
// IMPORTANT: This MUST be defined BEFORE app.use(express.json())
app.post(
  "/api/paystack/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      const signature = req.headers["x-paystack-signature"];
      const computed = crypto
        .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
        .update(req.body) // raw buffer
        .digest("hex");

      if (signature !== computed) {
        console.warn("Invalid Paystack signature");
        return res.sendStatus(401);
      }

      const event = JSON.parse(req.body.toString());

      switch (event?.event) {
        case "charge.success": {
          const trx = event.data;
          console.log("✅ charge.success", {
            reference: trx?.reference,
            email: trx?.customer?.email,
            amount: trx?.amount,
            status: trx?.status,
            channel: trx?.channel,
            currency: trx?.currency,
          });
          // TODO: mark user active, persist transaction, grant access, etc.
          break;
        }
        case "subscription.create":
        case "subscription.enable":
        case "subscription.disable":
        case "invoice.create":
        case "invoice.update": {
          console.log(`ℹ️ ${event.event}`);
          // TODO: sync subscription status in your DB
          break;
        }
        default:
          console.log("➡️ Unhandled Paystack event:", event?.event);
      }

      return res.sendStatus(200);
    } catch (err) {
      console.error("Webhook handler error:", err);
      return res.sendStatus(500);
    }
  }
);

// -------------------- JSON parser for normal routes --------------------
app.use(express.json());

// -------------------- API Routes --------------------

// Initialize a payment: either one-off by amount OR subscription by plan code
app.post("/api/paystack/initialize", async (req, res) => {
  try {
    const { email, plan, cycle, metadata } = req.body || {};
    const p = String(plan || "").toLowerCase(); // "basic" | "premium" | "professional"
    const c = String(cycle || "").toLowerCase(); // "monthly" | "yearly"

    if (!email) return res.status(400).json({ error: "Missing email" });
    if (!["basic", "premium", "professional"].includes(p))
      return res.status(400).json({ error: "Invalid plan" });
    if (!["monthly", "yearly"].includes(c))
      return res.status(400).json({ error: "Invalid billing cycle" });

    const usePlanSubscription = hasPlanCode(c, p);

    const body = usePlanSubscription
      ? {
          email,
          plan: PLAN_CODE[c][p], // Recurring (card-based) using plan code
          currency: "KES",
          callback_url:
            process.env.PAYSTACK_SUCCESS_URL ||
            "http://localhost:5173/pricing?success=true",
          metadata: { plan: p, cycle: c, ...(metadata || {}) },
        }
      : {
          email,
          amount: Number(PLAN_AMOUNT_KES[c][p]) * 100, // smallest unit
          currency: "KES",
          callback_url:
            process.env.PAYSTACK_SUCCESS_URL ||
            "http://localhost:5173/pricing?success=true",
          metadata: { plan: p, cycle: c, ...(metadata || {}) },
        };

    const r = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await r.json();

    if (!data?.status) {
      return res
        .status(400)
        .json({ error: data?.message || "Initialize failed" });
    }

    // Return the URL to redirect the customer
    return res.json({
      authorization_url: data?.data?.authorization_url,
      reference: data?.data?.reference,
    });
  } catch (e) {
    console.error("Paystack init error:", e);
    return res.status(400).json({ error: e.message || "Payment init failed" });
  }
});

// Verify a completed transaction (fallback after redirect)
app.get("/api/paystack/verify", async (req, res) => {
  try {
    const ref = req.query.reference;
    if (!ref) return res.status(400).json({ error: "Missing reference" });

    const r = await fetch(`${PAYSTACK_BASE}/transaction/verify/${ref}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await r.json();

    if (!data?.status) {
      return res.status(400).json({ error: data?.message || "Verify failed" });
    }

    // data.data.status === 'success' → paid
    return res.json({ ok: true, status: data.status, data: data.data });
  } catch (e) {
    return res.status(400).json({ error: e.message || "Verify failed" });
  }
});

// Health & root
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/", (_req, res) =>
  res.send("Mindcare Paystack API is running. Try GET /api/health")
);

// -------------------- Start --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Paystack API running on http://localhost:${PORT}`)
);
