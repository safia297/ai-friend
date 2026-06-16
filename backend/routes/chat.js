const express = require('express');
const router = express.Router();
const pool = require('../database');
const client = require('../groq');

// create a new conversation
router.post("/conversation", async (req, res) => {
    const { userId, title } = req.body;
    const result = await pool.query(
        "INSERT INTO conversations (user_id, title) VALUES ($1, $2) RETURNING id",
        [userId, title || "New Chat"]
    );
    res.json({ conversationId: result.rows[0].id });
});

// list a user's conversations
router.get("/conversations/:userId", async (req, res) => {
    const result = await pool.query(
        "SELECT id, title, created_at FROM conversations WHERE user_id = $1 ORDER BY id DESC",
        [req.params.userId]
    );
    res.json({ conversations: result.rows });
});

// send a message in a conversation
router.post("/", async (req, res) => {
    const { message, vibe, language, conversationId } = req.body;

    // save the user's message
    await pool.query(
        "INSERT INTO messages (conversation_id, sender, content) VALUES ($1, $2, $3)",
        [conversationId, "user", message]
    );

    // name the conversation after its first message
    await pool.query(
        "UPDATE conversations SET title = $1 WHERE id = $2 AND title = 'New Chat'",
        [message.substring(0, 30), conversationId]
    );

    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are ${vibe === 'chill' ? 'a laid-back, easygoing' : vibe === 'funny' ? 'a witty, playful' : 'a warm, encouraging'} AI friend. Always respond in ${language}. Talk casually like a real friend texting — warm and natural, not robotic. Keep replies concise (2-4 sentences usually) but give real substance: actually engage with what they said, share thoughts, ask about them sometimes.`,
            },
            {
                role: "user",
                content: message,
            },
        ]
    });

    const reply = response.choices[0].message.content;

    // save the AI's reply
    await pool.query(
        "INSERT INTO messages (conversation_id, sender, content) VALUES ($1, $2, $3)",
        [conversationId, "ai", reply]
    );

    res.json({ reply });
});

// load one conversation's messages
router.get("/:conversationId", async (req, res) => {
    const result = await pool.query(
        "SELECT sender, content FROM messages WHERE conversation_id = $1 ORDER BY id",
        [req.params.conversationId]
    );
    res.json({ messages: result.rows });
});

// rename a conversation
router.put("/conversation/:id", async (req, res) => {
    const { title } = req.body;
    await pool.query(
        "UPDATE conversations SET title = $1 WHERE id = $2",
        [title, req.params.id]
    );
    res.json({ message: "Renamed" });
});

// delete a conversation (and its messages)
router.delete("/conversation/:id", async (req, res) => {
    await pool.query("DELETE FROM messages WHERE conversation_id = $1", [req.params.id]);
    await pool.query("DELETE FROM conversations WHERE id = $1", [req.params.id]);
    res.json({ message: "Deleted" });
});

module.exports = router;