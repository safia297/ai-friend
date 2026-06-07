# 🤖 AI Friend

A full-stack AI companion app where you can chat with a personalized AI friend. Built with React, Node.js, and Groq AI.

## ✨ Features

- 💬 Chat with an AI friend that has a personality
- 🎭 Choose your AI's vibe (chill, funny, supportive)
- 🌍 Supports English and Arabic
- 🧠 AI remembers your conversation history
- ✏️ Name your AI friend
- 🔄 Switch vibes anytime during the chat

## 🛠 Tech Stack

**Frontend:** React + Vite  
**Backend:** Node.js + Express  
**Database:** SQLite (via better-sqlite3)  
**AI:** Groq API (Llama model)

## 📁 Project Structure

```
ai-friend/
  backend/
    routes/          (API routes)
    database.js      (SQLite setup)
    server.js        (Express server)
    .env             (API keys - not uploaded)
  frontend/
    src/
      pages/         (Home & Chat pages)
      components/    (Reusable UI components)
    App.jsx
```

## 🚀 How to Run

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key at [groq.com](https://groq.com)

---

<div align="center">
Built by <a href="https://github.com/safia297">Safia Moallim</a> 🚀
</div>
