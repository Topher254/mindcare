// src/pages/Pricing.jsx
import React, { useState, useEffect } from "react";

// ⛳ Force all API calls to the backend on port 3000
const API_BASE = "http://localhost:3000";
export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "yearly"
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // ✅ Verify Paystack payment after redirect (Paystack appends ?reference=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference");
    if (!ref) return;

    (async () => {
      try {
        const r = await fetch(`${API_BASE}/api/paystack/verify?reference=${ref}`);
        const data = await r.json();
        if (r.ok && data?.status === "success") {
          // TODO: mark user active in your app / call your backend to persist access
          console.log("✅ Paystack verify success:", data);
          alert("Payment verified. Thank you!");
          // Optionally clean the URL:
          // window.history.replaceState({}, "", "/pricing");
        } else {
          alert(data?.error || "Verification failed");
        }
      } catch (e) {
        alert(e.message || "Verification failed");
      }
    })();
  }, []);

  // ✅ Paystack checkout: call backend -> redirect to authorization_url
  async function handleCheckout(planKey) {
    try {
      setSelectedPlan(planKey);
      setLoading(true);

      // TODO: replace with your signed-in user's email from auth
      const email = "test@example.com";

      const res = await fetch(`${API_BASE}/api/paystack/initialize`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    plan: planKey,       // "basic" | "premium" | "professional"
    cycle: billingCycle, // "monthly" | "yearly"
    metadata: { source: "pricing" },
  }),
});
      // defensive parsing so HTML errors don’t crash
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Unexpected response from server: ${text.slice(0, 200)}…`);
      }

      if (!res.ok) throw new Error(data?.error || "Payment init failed");
      if (!data?.authorization_url) throw new Error("No authorization URL");

      window.location.href = data.authorization_url; // 🔁 Redirect to Paystack
    } catch (e) {
      alert(e.message || "Payment failed");
      setLoading(false);
    }
  }

  // ---- Pricing plans (your original content kept) ----
  const plans = {
    monthly: [
      {
        name: "Basic",
        price: "Kshs9.99",
        period: "per month",
        description: "Essential mental health support for everyday needs",
        features: [
          "Unlimited chat with MindCare Bot",
          "Daily mood tracking",
          "Basic mindfulness exercises",
          "Community support access",
          "Email support",
        ],
        buttonText: "Get Started",
        popular: false,
      },
      {
        name: "Premium",
        price: "Kshs29.99",
        period: "per month",
        description: "Comprehensive support with expert access",
        features: [
          "All Basic features",
          "2 live sessions with experts monthly",
          "Personalized therapy plans",
          "Advanced mindfulness library",
          "Priority chat support",
          "Crisis management tools",
        ],
        buttonText: "Most Popular",
        popular: true,
      },
      {
        name: "Professional",
        price: "Kshs79.99",
        period: "per month",
        description: "Complete mental wellness package",
        features: [
          "All Premium features",
          "Unlimited expert sessions",
          "24/7 crisis support line",
          "Personalized treatment plan",
          "Family therapy sessions (2 monthly)",
          "Wellness workshops access",
          "Dedicated care coordinator",
        ],
        buttonText: "Get Premium Care",
        popular: false,
      },
    ],
    yearly: [
      {
        name: "Basic",
        price: "Kshs99.99",
        period: "per year",
        description: "Essential mental health support for everyday needs",
        features: [
          "Unlimited chat with MindCare Bot",
          "Daily mood tracking",
          "Basic mindfulness exercises",
          "Community support access",
          "Email support",
        ],
        buttonText: "Get Started",
        popular: false,
        savings: "17% savings",
      },
      {
        name: "Premium",
        price: "Kshs299.99",
        period: "per year",
        description: "Comprehensive support with expert access",
        features: [
          "All Basic features",
          "2 live sessions with experts monthly",
          "Personalized therapy plans",
          "Advanced mindfulness library",
          "Priority chat support",
          "Crisis management tools",
        ],
        buttonText: "Most Popular",
        popular: true,
        savings: "17% savings",
      },
      {
        name: "Professional",
        price: "Kshs799.99",
        period: "per year",
        description: "Complete mental wellness package",
        features: [
          "All Premium features",
          "Unlimited expert sessions",
          "24/7 crisis support line",
          "Personalized treatment plan",
          "Family therapy sessions (2 monthly)",
          "Wellness workshops access",
          "Dedicated care coordinator",
        ],
        buttonText: "Get Premium Care",
        popular: false,
        savings: "17% savings",
      },
    ],
  };

  const valueProps = [
    {
      icon: "💪",
      title: "Build Resilience",
      description:
        "Develop coping strategies that help you navigate life's challenges with greater ease and confidence.",
    },
    {
      icon: "🎯",
      title: "Personalized Approach",
      description:
        "Get support tailored to your specific needs, preferences, and mental health goals.",
    },
    {
      icon: "🔒",
      title: "Safe & Confidential",
      description:
        "Your privacy is our priority. All sessions and data are encrypted and confidential.",
    },
    {
      icon: "⏰",
      title: "Immediate Access",
      description:
        "Get help when you need it most with on-demand support and scheduled sessions.",
    },
  ];

  const faqItems = [
    {
      question: "How do I know which plan is right for me?",
      answer:
        "Our Basic plan is great for those who need occasional support and want to develop mindfulness habits. Premium is ideal if you want regular expert guidance. Professional offers comprehensive care for those with more significant mental health needs. You can always start with one plan and upgrade later.",
    },
    {
      question: "Can I change or cancel my plan anytime?",
      answer:
        "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you cancel, you'll continue to have access until the end of your billing period.",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "We don't directly bill insurance, but we can provide you with detailed receipts (superbills) that you can submit to your insurance provider for possible reimbursement. Many PPO plans offer partial coverage for mental health services.",
    },
    {
      question: "How do sessions with experts work?",
      answer:
        "After selecting a plan, you can browse our network of licensed therapists and mental health professionals. Sessions are conducted via secure video call, and you can book times that work with your schedule.",
    },
    {
      question: "What if I need immediate help in a crisis?",
      answer:
        "Our Professional plan includes 24/7 crisis support. For Basic and Premium users, we provide connections to emergency resources. However, if you're experiencing a mental health emergency, please call 988 (Suicide and Crisis Lifeline) or go to your nearest emergency room.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Absolutely. We use bank-level encryption and adhere to HIPAA guidelines to protect all your personal information and session data. Your information is never sold or shared without your explicit consent.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, contact our support team for a full refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Invest in Your Mental Wellbeing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality mental health care shouldn't be a luxury. We offer
            transparent pricing to make professional support accessible to
            everyone.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full ${
                billingCycle === "monthly"
                  ? "bg-pink-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full ${
                billingCycle === "yearly"
                  ? "bg-pink-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Yearly Billing
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {valueProps.map((vp, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl">{vp.icon}</div>
              <h3 className="mt-3 font-semibold text-gray-900">{vp.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{vp.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans[billingCycle].map((plan, index) => {
            const planKey = plan.name.toLowerCase(); // "basic" | "premium" | "professional"
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "border-2 border-pink-500 bg-white shadow-xl"
                    : "bg-white border border-gray-200 shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={loading && selectedPlan === planKey}
                  onClick={() => handleCheckout(planKey)}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    plan.popular
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  } transition-colors disabled:opacity-60`}
                >
                  {loading && selectedPlan === planKey
                    ? "Redirecting..."
                    : plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left py-4 font-medium text-gray-900 hover:text-pink-600"
                >
                  <span>{item.question}</span>
                  <svg
                    className={`h-5 w-5 transform ${
                      activeFAQ === index ? "rotate-180" : ""
                    } transition-transform`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {activeFAQ === index && (
                  <div className="pb-4 text-gray-600">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
