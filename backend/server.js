const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
const PORT = 3002;
const chatRoute = require("./routes/chat");
app.use("/api/chat", chatRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})