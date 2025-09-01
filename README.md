 ## Mindacre – AI-Powered Mental Healthcare Platform

Mindacre is a next-generation AI platform for mental health and wellbeing, designed to bridge the gap between technology and accessible care. Whether you want to chat with an AI assistant for instant support, book sessions with real licensed experts, or take guided mental health assessments, Mindacre provides a safe and supportive space to care for your mind.

This repository contains the backend implementation of Mindacre, providing the foundation for secure API endpoints, session management, user authentication, and AI-powered mental health conversations.

 ## Key Features

 AI Mental Health Chatbot – Real-time conversations with an AI trained to provide empathetic, non-judgmental support.

 Book Sessions with Experts – Users can schedule appointments with real mental health professionals directly within the platform.

 Mental Health Assessments – Built-in tools for anxiety, stress, depression, and burnout assessments.

 Secure Authentication – Safe login and account handling with JWT-based authentication.

 Scalable REST API – A robust backend designed to scale with thousands of concurrent users.

 Data Insights (Future Roadmap) – Anonymous analytics to track community wellbeing trends and provide insights for organizations.

## Backend Architecture

The backend is the core service layer of Mindacre, responsible for connecting the frontend (user interface) with AI services and expert booking systems.

Framework: Node.js (Express.js)

Database: MongoDB (User profiles, session data, assessment results)

Authentication: JWT for secure login and session management

AI Integration: Gemini API (for chatbot conversations and assessments)


Security: Input validation, rate limiting, encrypted storage of sensitive data

##  Features
| Page              | Description |
|-------------------|-------------|
|  Landing Page   | Hero section, Features, Testimonials, Pricing |
|  Chatbot Page   | Chat UI with sidebar for mood check-ins |
|  Subscription   | Pricing cards for Free, Premium, Expert Sessions |
|  Experts      | Marketplace with therapist profiles & booking button |
|  Dashboard      | Mood tracker, AI insights, upcoming bookings |

---

##  Design System
- **Primary:** 🔵 Blue `#3B82F6`  
- **Secondary:** 🟢 Green `#10B981`  
- **Background:** ⚪ White `#F9FAFB`  
- **Typography:** *Inter / Poppins*  
- **Style:** Rounded corners, soft shadows, smooth hover effects  

---

##  Tech Stack
-  React 18  
-  TailwindCSS 3  
-  React Router  
-  React Icons / Lucide Icons  

---

## 🚀 Getting Started

```bash
# 1. Clone repo
git clone https://github.com/yourusername/mindmate-frontend.git
cd mindmate-frontend

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Build for production
npm run build



## Project Structure

```
mindcare-backend/
│
├── app.py                 # Main Flask application
├── .env                   # Environment variables
├── requirements.txt       # Python dependencies
├── instance/
│   └── mindcare.db        # SQLite database (for dev, optional)
└── README.md              # Documentation (this file)
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Topher254/mindcare.git
cd mindcare
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///mindcare.db
```

> In production, replace SQLite with PostgreSQL or ourSQL.

### 5. Initialize Database

```bash
python
>>> from app import db
>>> db.create_all()
```

### 6. Run the Server

```bash
flask run --host=0.0.0.0 --port=5000
```

Backend available at:

```
http://localhost:5000
```

---

##  Database Models

### `User`

* `id` – Primary key
* `username`, `email` – Unique identifiers
* `password_hash` – Securely stored password
* `is_premium`, `subscription_plan`, `subscription_end` – Subscription management

### `Booking`

* `id`, `expert_id`, `expert_name`
* `user_id`, `user_name`
* `session_type` – Online/physical
* `date`, `time`, `location`, `notes`
* `status` – pending / confirmed / cancelled / completed

### `Transaction`

* `id`, `user_id`
* `plan`, `billing_cycle`, `amount`
* `invoice_id`, `checkout_request_id`
* `status` – pending / completed / failed

---

## 🚦 API Routes

### Health Check

* `GET /api/test` → Test server status

### Authentication

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login user
* `POST /api/auth/logout` → Logout user
* `GET /api/auth/check` → Verify session authentication

### Bookings

* `POST /api/bookings` → Create new booking
* `GET /api/bookings` → Retrieve all user bookings
* `PUT /api/bookings/<id>` → Update booking details
* `DELETE /api/bookings/<id>` → Cancel booking

---

##  Security & Sessions

* Sessions use secure cookies with:

  * `HttpOnly` enabled (prevents JS access).
  * `SameSite=Lax` for CSRF mitigation.
  * Expiry (`PERMANENT_SESSION_LIFETIME = 7 days`).

* Passwords are never stored in plain text.

* CORS configured for `http://localhost:5173` (frontend dev).

---

##  Logging & Error Handling

* All errors are logged via Python’s logging module.
* Standardized JSON error responses:

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---


## 🌍 Future Enhancements

* Add **role-based access control (RBAC)** for experts/admins.
* Implement **email/SMS reminders** for bookings.
* Integrate **payment gateway APIs** for subscriptions.
* Support **video session integration** (Zoom/Meet APIs).
* Add **analytics dashboard** for experts & admins.



#  MindAcre – AI Prompts for Mental Healthcare

##  Introduction

Welcome to **MindAcre**, our AI-powered mental healthcare platform. Unlike traditional README files that only describe the backend or frontend, this section focuses entirely on the **AI prompts** I crafted to guide the system. These prompts are the heart of the platform — they shape the way the AI responds, comforts, and engages with users who may be struggling with stress, anxiety, or other mental health challenges.

I designed these prompts to ensure that the AI feels **empathetic, human-like, and supportive**, while always encouraging users to seek professional help when necessary. They serve as a bridge between technology and mental well-being.

---

##  Why Prompts Matter in Mental Healthcare

In a platform like MindAcre, prompts are more than just instructions to a model. They are:

* **Therapeutic tools** → helping users feel heard, validated, and cared for.
* **Safety mechanisms** → ensuring that sensitive conversations are handled responsibly.
* **Guides for tone and empathy** → shaping the AI’s responses to feel warm and non-judgmental.
* **Bridges to real experts** → gently reminding users that they can also book live sessions with licensed professionals.

---

##  our Prompting Philosophy

When writing prompts for MindAcre, I followed a few guiding principles:

1. **Empathy first** → Every response should sound like a caring companion, not a robot.
2. **Encouragement without pressure** → The AI should support users in exploring their feelings at their own pace.
3. **Mental health awareness** → Prompts must reflect real challenges like anxiety, depression, burnout, and loneliness.
4. **Balance AI + Humans** → AI can comfort and guide, but prompts should remind users that real experts are available through the platform.
5. **Clarity and consistency** → Instructions must be detailed enough to keep the AI consistent across long conversations.

---

## 🔮 Example Prompt Themes I Used

Here are some categories of prompts I carefully wrote for MindAcre:

### 1. **Compassionate Listening**

Prompts that tell the AI to actively listen, reflect back feelings, and validate emotions. For example:
*"You are a supportive mental health companion. Always respond with empathy, and help the user feel heard."*

### 2. **Mental Health Education**

Prompts that guide the AI to explain concepts like stress management, mindfulness, or sleep hygiene in simple, accessible language.

### 3. **Crisis Sensitivity**

Prompts that make sure the AI responds carefully to mentions of self-harm or suicidal thoughts — by showing care and directing the user toward professional resources.

### 4. **Session Preparation**

Prompts that help the AI prepare a user for booking a real session with an expert by explaining what to expect in therapy or counseling.

### 5. **Self-Reflection Guidance**

Prompts designed to encourage journaling-style responses:
*"Ask the user open-ended questions about their day, their challenges, or what they are proud of. Always thank them for sharing."*

### 6. **Mental Health Assessments**

Prompts that guide the AI in asking structured, non-invasive questions that resemble basic mental health assessments (stress check-ins, mood trackers, etc.).

---

## How we did it

we chose to document prompts in the first person because prompts are **personal and intentional**. They reflect our own thought process while building MindAcre. Here’s how I see it:

> *“When I wrote these prompts, I wasn’t just giving instructions to an AI — I was trying to capture the voice of empathy. I imagined what someone struggling with mental health would want to hear at 2 a.m. when they can’t sleep. I thought about how the AI could comfort them while still reminding them that professional support is available. Each prompt I wrote was like shaping the personality of a companion who is gentle, kind, and respectful.”*

---

## 🌱 Conclusion

The prompts documented here represent the **soul of MindAcre**. They are not just technical deliverables — they are a commitment to making AI feel human, compassionate, and supportive in the delicate space of mental healthcare.

By carefully designing these prompts, I ensured that MindAcre is more than an app. It is a **safe space** where people can chat with AI for support, book sessions with experts, and take mental health assessments — all within one platform dedicated to well-being.



## 🎨 Frontend Prompts

1. **Landing Page (Home)**

   * "Build me a responsive homepage that feels modern, with a clear hero section explaining what the platform does, a call-to-action button, and navigation to chatbot, experts, and pricing pages."
   * "Use TailwindCSS for styling so that the design is clean, minimal, and mobile-first."
   * "Make sure the layout pushes the footer to the bottom of the screen, no matter the page content length."

2. **Chatbot Page**

   * "Create a chatbot interface where users can type messages and receive responses from an AI tutor in real time."
   * "Make the chatbot UI look like a messaging app, with user messages on the right and bot messages on the left."
   * "Add smooth scrolling so conversations flow naturally, even on small screens."

3. **Experts Page**

   * "Develop a page that lists professional tutors/experts in card format, showing their profile picture, subject expertise, and rating."
   * "Enable a simple filter or search bar so users can quickly find an expert in their subject."
   * "Make the expert cards responsive and neatly aligned in a grid layout."

4. **Pricing Page**

   * "Design a clean pricing section with 3 pricing tiers (Basic, Standard, Premium)."
   * "Highlight the most popular plan visually so it stands out."
   * "Ensure pricing cards include features, action buttons, and look consistent on desktop and mobile."

---

## ⚙️ Backend Prompts

1. **Authentication & Context**

   * "Set up an authentication context (AuthProvider) for handling user login, signup, and state persistence."
   * "Make sure authentication integrates smoothly with protected routes (e.g., chatbot and experts can require login later)."

2. **Assessment Quiz**

   * "Create a backend endpoint to serve quizzes dynamically (e.g., multiple choice, short answer)."
   * "Store quiz questions and answers in a database for easy updates."
   * "Send user responses to the backend for evaluation, then return a score or feedback."

3. **Chatbot API**

   * "Implement a chatbot backend that integrates with an AI model to generate responses."
   * "Design the API so it can store conversation history per user."
   * "Make the chatbot support multiple topics: academics, career advice, and tutoring guidance."

4. **Experts Management**

   * "Develop a backend API to fetch experts’ data (name, subjects, bio, pricing)."
   * "Ensure experts’ profiles can be created, updated, and deleted by admins."
   * "Return expert data in JSON format for the frontend grid layout."

5. **Pricing Plans API**

   * "Build an endpoint that returns all pricing plan details, including features and costs."
   * "Allow easy editing of pricing tiers via the backend so changes reflect instantly on the frontend."
   * "Support payment gateway integration for checkout later."

---

## ✨ Summary

These **12 structured prompts** formed the foundation of the project. By breaking the system into **Frontend (UI/UX)** and **Backend (APIs & Data Management)** requirements, the platform evolved into:

* A **Home** page that welcomes users with clarity and purpose.
* A **Chatbot** that personalizes education.
* An **Experts** page that connects learners to professionals.
* A **Pricing** section that communicates value transparently.
* A strong backend that handles **auth, assessments, experts, and chatbot AI.**

---
