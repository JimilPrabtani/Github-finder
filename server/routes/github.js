// GitHub API Proxy Routes
// All external GitHub API calls are made here with the server-side PAT.
// The token NEVER leaves this server — the frontend only sees clean JSON responses.

const express = require("express");
const router = express.Router();

const GITHUB_API = "https://api.github.com";

// ── Helper: Build headers with GitHub PAT ────────────────────────────
function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Finder-Proxy",
  };

  if (process.env.GITHUB_PAT) {
    headers.Authorization = `token ${process.env.GITHUB_PAT}`;
  }

  return headers;
}

// ── Helper: Validate GitHub username format ──────────────────────────
function isValidUsername(username) {
  // GitHub usernames: 1-39 chars, alphanumeric or hyphens, no double hyphens,
  // cannot start/end with hyphen
  return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username);
}

// ── GET /api/user/:username ──────────────────────────────────────────
// Fetches a single GitHub user profile
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;

  if (!isValidUsername(username)) {
    return res.status(400).json({ error: "Invalid username format" });
  }

  try {
    const response = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: githubHeaders(),
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: response.status === 404 ? "User not found" : "GitHub API error",
      });
    }

    const data = await response.json();

    // Only return safe, public fields — strip any sensitive metadata
    res.json({
      login: data.login,
      id: data.id,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name,
      company: data.company,
      blog: data.blog,
      location: data.location,
      bio: data.bio,
      twitter_username: data.twitter_username,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  } catch (err) {
    console.error("[/api/user] Error:", err.message);
    res.status(502).json({ error: "Failed to reach GitHub API" });
  }
});

// ── GET /api/repos/:username ─────────────────────────────────────────
// Fetches repositories for a GitHub user
router.get("/repos/:username", async (req, res) => {
  const { username } = req.params;
  const sort = req.query.sort || "updated";
  const perPage = Math.min(parseInt(req.query.per_page) || 30, 100);

  if (!isValidUsername(username)) {
    return res.status(400).json({ error: "Invalid username format" });
  }

  // Validate sort parameter
  const validSorts = ["updated", "created", "pushed", "full_name"];
  const safeSort = validSorts.includes(sort) ? sort : "updated";

  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=${safeSort}&per_page=${perPage}`,
      { headers: githubHeaders() }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch repos" });
    }

    const data = await response.json();

    // Return only safe, public repo fields
    const safeRepos = data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      fork: repo.fork,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      watchers_count: repo.watchers_count,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      topics: repo.topics,
    }));

    res.json(safeRepos);
  } catch (err) {
    console.error("[/api/repos] Error:", err.message);
    res.status(502).json({ error: "Failed to reach GitHub API" });
  }
});

// ── GET /api/duel?user1=xxx&user2=yyy ────────────────────────────────
// Fetches two user profiles in parallel for the duel feature
router.get("/duel", async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Both user1 and user2 query params are required" });
  }

  if (!isValidUsername(user1) || !isValidUsername(user2)) {
    return res.status(400).json({ error: "Invalid username format" });
  }

  try {
    const [res1, res2] = await Promise.all([
      fetch(`${GITHUB_API}/users/${user1}`, { headers: githubHeaders() }),
      fetch(`${GITHUB_API}/users/${user2}`, { headers: githubHeaders() }),
    ]);

    if (!res1.ok || !res2.ok) {
      return res.status(404).json({ error: "One or both users not found" });
    }

    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    const sanitize = (d) => ({
      login: d.login,
      id: d.id,
      avatar_url: d.avatar_url,
      html_url: d.html_url,
      name: d.name,
      bio: d.bio,
      public_repos: d.public_repos,
      public_gists: d.public_gists,
      followers: d.followers,
      following: d.following,
      created_at: d.created_at,
    });

    res.json({ user1: sanitize(data1), user2: sanitize(data2) });
  } catch (err) {
    console.error("[/api/duel] Error:", err.message);
    res.status(502).json({ error: "Failed to reach GitHub API" });
  }
});

// ── GET /api/rate-limit ──────────────────────────────────────────────
// Check remaining GitHub API rate limit (useful for debugging)
router.get("/rate-limit", async (req, res) => {
  try {
    const response = await fetch(`${GITHUB_API}/rate_limit`, {
      headers: githubHeaders(),
    });
    const data = await response.json();
    res.json({
      limit: data.rate.limit,
      remaining: data.rate.remaining,
      reset: new Date(data.rate.reset * 1000).toISOString(),
    });
  } catch (err) {
    res.status(502).json({ error: "Failed to check rate limit" });
  }
});

module.exports = router;
