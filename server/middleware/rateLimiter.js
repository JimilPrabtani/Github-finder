// Rate Limiter Middleware
// Protects the backend API from abuse and DDoS attacks.

const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 30, // Max 30 requests per minute per IP
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,
  message: {
    error: "Too many requests — please slow down! Try again in a minute.",
  },
});

module.exports = { apiLimiter };
