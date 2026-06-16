const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../database");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    try {
        const result = await pool.query(
            "INSERT INTO users (name, email, password, ai_name, vibe, language) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
            [name, email, hashed, "", "", ""]
        );
        res.json({ message: "Account created!", userId: result.rows[0].id });
    } catch (err) {
        res.status(400).json({ error: "Email already exists" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    res.json({ message: "Logged in!", userId: user.id, name: user.name });
});

module.exports = router;