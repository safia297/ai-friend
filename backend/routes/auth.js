const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");

const router = express.Router();

// SIGNUP
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    // hash the password
    const hashed = bcrypt.hashSync(password, 10);

    try {
        db.prepare(
            "INSERT INTO users (name, email, password, ai_name, vibe, language) VALUES (?, ?, ?, ?, ?, ?)"
        ).run(name, email, hashed, "", "", "");

        res.json({ message: "Account created!" });
    } catch (err) {
        res.status(400).json({ error: "Email already exists" });
    }
});
// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) return res.status(400).json({ error: "User not found" });

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    res.json({ message: "Logged in!", userId: user.id, name: user.name });
});

module.exports = router;