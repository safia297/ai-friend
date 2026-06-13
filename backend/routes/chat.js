const express = require('express');
const router = express.Router();
const db = require('../database');
const client = require('../groq');

router.post("/", async (req, res) => {
    const { message, vibe, language, userId } = req.body;

    // save the user's message
    db.prepare("INSERT INTO messages (user_id, sender, content) VALUES (?, ?, ?)")
        .run(userId, "user", message);

    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are a ${vibe} AI friend. Always respond in ${language}. Keep your replies short and casual, like texting a friend — usually 1-3 sentences. Don't over-explain or ask too many follow-up questions.`,
            },
            {
                role: "user",
                content: message,
            },
        ]
    });

    const reply = response.choices[0].message.content;

    // save the AI's reply
    db.prepare("INSERT INTO messages (user_id, sender, content) VALUES (?, ?, ?)")
        .run(userId, "ai", reply);

    res.json({ reply });
});

// load a user's saved messages
router.get("/:userId", (req, res) => {
    const messages = db.prepare(
        "SELECT sender, content FROM messages WHERE user_id = ? ORDER BY id"
    ).all(req.params.userId);

    res.json({ messages });
});

module.exports = router;