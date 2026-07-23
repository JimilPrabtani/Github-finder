// GitHub Finder — Secure Backend API Proxy Server
// All GitHub API requests are routed through this server.
// The GitHub PAT is stored server-side only — never sent to the browser.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const githubRoutes = require("./routes/github");
const { apiLimiter } = require("./middleware/rateLimiter");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Security Middleware ──────────────────────────────────────────────
// Helmet sets secure HTTP headers (X-Content-Type-Options, X-Frame-Options, etc.)
app.use(helmet());

// CORS — restrict to allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:4173", // Vite preview
  process.env.FRONTEND_URL, // Production Amplify URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (server-to-server, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET"],
    credentials: false,
  })
);

app.use(express.json());

// ── Rate Limiting ────────────────────────────────────────────────────
app.use("/api", apiLimiter);

// ── API Routes ───────────────────────────────────────────────────────
app.use("/api", githubRoutes);

// ── Health Check ─────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── 404 Handler ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global Error Handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("[Server Error]", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start Server ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 GitHub Finder API Proxy running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(
    `   GitHub PAT:   ${process.env.GITHUB_PAT ? "✅ Loaded" : "⚠️  Missing — set GITHUB_PAT in .env"}`
  );
});
