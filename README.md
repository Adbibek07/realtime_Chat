# realtime_Chat
A modern real-time chat application built with React, Firebase Firestore, Google Authentication, and Tailwind CSS.


💬 Real-Time Chat App (React + Firebase)

A modern real-time chat application built using React, Firebase Firestore, and Tailwind CSS. Users can sign in with Google, send messages instantly, and see live updates across all connected users.

🚀 Features
🔐 Google Authentication (Firebase Auth)
💬 Real-time messaging (Firestore onSnapshot)
⚡ Instant updates across users
👤 User profiles (display name, email, photo)
🎭 Auto-generated avatars (DiceBear fallback)
🧵 Message grouping (WhatsApp-style UI)
⏱️ Timestamp formatting using date-fns
📱 Responsive chat UI (Tailwind CSS)
🔄 Auto-scroll to latest messages
🛠️ Tech Stack
Frontend: React (Vite)
Backend: Firebase
Authentication
Firestore Database
Styling: Tailwind CSS
Utilities: date-fns
Avatar Generation: DiceBear API
📂 Project Structure
src/



│
├── components/
│   ├── Channel.jsx        # Chat room logic (send + receive messages)
│   ├── Message.jsx        # Individual message UI
│   └── Button.jsx         # Reusable button component
│
├── App.jsx                # Main app (auth + routing logic)
├── main.jsx
└── index.css
