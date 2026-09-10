# 🌱 GreenHands

**Live Site:** 

GreenHands is a community-driven platform where people can create, discover, and join local social-service events — from beach cleanups and tree plantations to blood donation camps and elderly-assistance visits. Built as a full-stack MERN application with Firebase Authentication.

## ✨ Features

- 🔐 **Secure Authentication** — Email/password and Google sign-in via Firebase, with JWT-verified API requests using the Firebase Admin SDK.
- 📅 **Create & Manage Events** — Logged-in users can create events with a title, description, type, location, thumbnail, and future-only date (enforced via `react-datepicker` and validated again on the server).
- 🔍 **Live Filtering & Search** — Browse upcoming events with real-time type filtering and title search, both powered by MongoDB queries on the backend.
- 🤝 **One-Click Event Joining** — Users can join any event they didn't create, with duplicate-join protection enforced at the database level.
- 📊 **Personal Dashboards** — "Joined Events" (sorted by date) and "Manage Events" (with update/delete) give users a full view of their activity.
- 🌗 **Dark/Light Theme Toggle** — A persisted theme preference that switches the entire site's appearance.
- ⚡ **Modern Data Fetching** — Built with TanStack Query for caching, automatic refetching, and clean loading/error states.
- 🎬 **Smooth Animations** — Framer Motion powers scroll-triggered and on-load animations throughout the site.
- 📱 **Fully Responsive** — Designed to work seamlessly across mobile, tablet, and desktop.

## 🛠️ Tech Stack

**Client:** React (Vite), Tailwind CSS, React Router, Firebase Auth, Axios, TanStack Query, Framer Motion, react-hot-toast, react-datepicker

**Server:** Node.js, Express, MongoDB (Mongoose), Firebase Admin SDK (JWT verification)

**Hosting:** Firebase Hosting (client) · Vercel (server)

## 🔗 Links

- **Live Site:** 
- **Server Repository:** https://github.com/ReyadRafi/greenhands-server