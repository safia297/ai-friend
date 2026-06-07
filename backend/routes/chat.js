const express = require('express');
const router = express.Router();
const db = require('../database');
const client = require('../groq');
router.post("/", async (req, res) => {
    const { message, vibe, language } = req.body;
    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are a ${vibe} AI friend. Always respond in ${language}.`,
            },
            {
                role: "user",
                content: message,
            },
        ]
    });
    const reply = response.choices[0].message.content;
    res.json({ reply });
});
module.exports = router;