// server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const FANYTEL_BASE = process.env.FANYTEL_BASE;

let fanytelCookies = "";

// Auth
app.post("/api/auth/start", async (req, res) => {
  try {
    const response = await fetch(`${FANYTEL_BASE}/auth/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.FANYTEL_EMAIL,
        password: process.env.FANYTEL_PASSWORD,
      }),
    });

    const cookies = response.headers.get("set-cookie");
    const data = await response.json();
    fanytelCookies = cookies;

    const token = jwt.sign(
      { userId: "mezgebu", issuedAt: Date.now() },
      process.env.SESSION_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("sessionToken", token, { httpOnly: true });
    res.json({ sessionToken: token, fanytelResponse: data });
  } catch {
    res.status(500).json({ error: "proxy_error", code: "SERVER_500" });
  }
});

// Balance
app.get("/api/balance", async (req, res) => {
  try {
    const response = await fetch(`${FANYTEL_BASE}/balance`, {
      headers: { cookie: fanytelCookies }
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "balance_failed", code: "SERVER_500" });
  }
});

// Call start
app.post("/api/call/start", async (req, res) => {
  try {
    const { toNumber } = req.body;
    const response = await fetch(`${FANYTEL_BASE}/call/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: fanytelCookies
      },
      body: JSON.stringify({ toNumber })
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "call_failed", code: "SERVER_500" });
  }
});

// Call status
app.get("/api/call/status", async (req, res) => {
  try {
    const { callId } = req.query;
    const response = await fetch(`${FANYTEL_BASE}/call/status?callId=${callId}`, {
      headers: { cookie: fanytelCookies }
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "status_failed", code: "SERVER_500" });
  }
});

// History
app.get("/api/history", async (req, res) => {
  try {
    const response = await fetch(`${FANYTEL_BASE}/history`, {
      headers: { cookie: fanytelCookies }
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "history_failed", code: "SERVER_500" });
  }
});

// SMS send
app.post("/api/sms/send", async (req, res) => {
  try {
    const { to, message } = req.body;
    const response = await fetch(`${FANYTEL_BASE}/sms/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: fanytelCookies
      },
      body: JSON.stringify({ to, message })
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "sms_failed", code: "SERVER_500" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT}`);
});
