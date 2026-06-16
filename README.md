# 🤖 AI Friend

A full-stack AI companion app where you can create and chat with your own personalized AI friend. Sign up, give your AI a name, pick its personality, choose your language — then start talking. Your conversations are saved privately to your account. Built with React, Node.js, PostgreSQL, and Groq AI.

## ✨ Features

- 🔐 User accounts — secure signup & login with hashed passwords
- 🔒 Protected routes — your chats are private to your account
- 🗂️ Multiple conversations — start, switch between, rename, and delete separate chats
- 🏷️ Auto-named chats — conversations are titled from your first message
- 💾 Persistent chat history — your conversations are saved and reloaded every time you return
- 💬 Chat in real time with an AI friend that has its own personality
- 🎭 Choose your AI's vibe — chill, funny, or supportive
- 🌍 Chat in English or Arabic
- ✏️ Name your AI friend and personalize it before you start
- 📝 Beautifully formatted replies — bold text and lists render cleanly (Markdown support)
- 🎨 Clean dark-purple themed interface

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Vite, React Router, react-markdown |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL (pg) |
| **Auth** | bcrypt (password hashing) |
| **AI** | Groq API (Llama model) |

## 📁 Project Structure

```
ai-friend/
├── backend/
│   ├── routes/
│   │   ├── auth.js        # Signup & login routes
│   │   └── chat.js        # Conversations + chat messages
│   ├── groq.js            # Groq AI connection
│   ├── database.js        # PostgreSQL setup (users, conversations, messages)
│   ├── server.js          # Express server (port 3002)
│   └── .env               # API key + database URL (not committed)
└── frontend/
    └── src/
        ├── pages/
        │   ├── Home.jsx       # Personalize your AI friend
        │   ├── Chat.jsx       # Chat interface + conversation sidebar
        │   ├── Login.jsx      # Login page
        │   └── Signup.jsx     # Signup page
        ├── components/
        │   └── ProtectedRoute.jsx  # Guards private pages
        ├── App.jsx        # Routes
        ├── App.css        # Styling
        ├── index.css      # Base styles
        └── main.jsx       # Entry point
```

## 🚀 Getting Started

### 1. Backend

```bash
cd backend
npm install
node server.js
```

The server runs on `http://localhost:3002`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`) in your browser.

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder:

```
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=your_postgresql_connection_string
```

Get a free Groq API key at [groq.com](https://groq.com). For the database, you can create a free PostgreSQL instance on [Render](https://render.com).

## 🗺️ Roadmap

Features planned for future versions:

- 🔄 Switch your AI's vibe mid-conversation
- 🔵 Google sign-in
- 📱 Installable as a PWA (mobile / desktop app)

---

<div align="center">
Built by <a href="https://github.com/safia297">Safia Moallim</a> 🚀
</div>