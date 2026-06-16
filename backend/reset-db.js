require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const reset = async () => {
    await pool.query("DROP TABLE IF EXISTS messages");
    await pool.query("DROP TABLE IF EXISTS conversations");
    console.log("Old tables dropped! Restart server.js to rebuild fresh.");
    await pool.end();
};

reset();