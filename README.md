# 📚 StudyNook (Client)

A sophisticated, full-stack study room booking and connection platform designed for students and library users. StudyNook empowers users to list premium private workspaces, browse options via advanced filtering systems, and securely book rooms with automated time-conflict detection.

👉 **Live Deployment URL:** [https://studynook-app.vercel.app](https://studynook-app.vercel.app) *(Replace with your actual Vercel/Netlify live link)*

---

## 🌟 Key Features

* **Premium Filtering & Search Engine:** Dynamically sift through available spaces using immediate client-side filtering matching room names, minimum/maximum hourly rates, and specific amenity check-lists (e.g., Whiteboards, Projectors, High-Speed Wi-Fi).
* **Double-Booking Prevention:** Integrates a time-conflict processing layer that validates user schedules on the rendering engine, preventing scheduling overlap or double-bookings on identical time slots.
* **Secure Authentication Management:** Implements modern user state protection. Seamlessly manages registration, login flows, and session persistence securely coupled with backend verification tokens.
* **Comprehensive Interactive Dashboards:** Separate workspace layouts for room owners to manage active listings (create, modify, or drop rooms) and general users to check structural historical reservation cards.
* **Device-Agnostic Responsive Layouts:** Hand-crafted using Tailwind CSS semantics ensuring pixel-perfect display transitions from minimal mobile screens up to wide 4K workspace monitors.

---

## 🛠️ Tech Stack & Dependencies

* **Core Architecture:** Next.js (v14/v15 App Router Layouts)
* **State Management & Effects:** React (Hooks: `useState`, `useEffect`)
* **UI Component Design Framework:** HeroUI (formerly NextUI) & Tailwind CSS
* **Icon Asset Configurations:** Lucide React
* **Asynchronous Processing:** Native Fetch API with Loopback Fallbacks

---

## 🚀 Local Installation & Execution

Follow these structured steps to execute the client workspace on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/studynook-client.git](https://github.com/yourusername/studynook-client.git)
   cd studynook-client
