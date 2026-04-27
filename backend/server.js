require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // IMPORTANT
  }),
);

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// ✅ User Schema
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
    });

    await user.save();

    res.json({ success: true, message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// ================= LOGIN (COOKIE BASED) =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secret123", {
      expiresIn: "1d",
    });

    // ✅ SET COOKIE (IMPORTANT)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// ================= LOGOUT =================
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
});

// ================= PROTECTED ROUTE =================
app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(token, "secret123");

    const user = await User.findById(decoded.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
