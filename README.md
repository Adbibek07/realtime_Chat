# 💬 Real-Time Chat App (React + Firebase)

A modern real-time chat application built with React, Firebase Firestore, Google Authentication, and Tailwind CSS.

---

## 🚀 Features

- 🔐 Google Authentication (Firebase Auth)
- 💬 Real-time messaging using Firestore `onSnapshot`
- ⚡ Instant message updates across all connected users
- 👤 User profiles with display name, email, and profile photo
- 🎭 Auto-generated avatars using DiceBear when no profile image exists
- 🧵 WhatsApp-style grouped chat messages
- ⏱️ Human-readable timestamps using `date-fns`
- 📱 Responsive modern chat interface
- 🔄 Auto-scroll to latest messages
- 🌐 Deployed online with Netlify

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)

### Backend

- Firebase Authentication
- Firebase Firestore

### Styling

- Tailwind CSS

### Utilities

- date-fns

### Avatar Generation

- DiceBear API

---

## 📂 Project Structure

```txt
src/
│
├── components/
│   ├── Channel.jsx       # Chat room logic (send + receive messages)
│   ├── Message.jsx       # Individual message component
│   └── Button.jsx        # Reusable button component
│
├── App.jsx               # Main application logic
├── main.jsx
└── index.css
```
