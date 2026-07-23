// useGithubApi — Smart Composable for GitHub API calls
// Tries backend proxy (/api) first for PAT security & rate limits.
// Automatically falls back to direct GitHub REST API (https://api.github.com)
// if the backend server is offline or deployed as a static frontend host.

const BACKEND_API = "/api";
const GITHUB_DIRECT_API = "https://api.github.com";

export function useGithubApi() {
  // Helper: safely parse JSON or return null if HTML/invalid
  async function safeParseJson(res) {
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return null;
    }
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  // ── Fetch User ───────────────────────────────────────────────────
  async function fetchUser(username) {
    const cleanUser = username.trim();

    // 1. Try backend proxy first
    try {
      const res = await fetch(`${BACKEND_API}/user/${encodeURIComponent(cleanUser)}`);
      const data = await safeParseJson(res);
      if (res.ok && data) return data;
    } catch {
      // Proxy offline, continue to fallback
    }

    // 2. Direct GitHub API Fallback
    const directRes = await fetch(`${GITHUB_DIRECT_API}/users/${encodeURIComponent(cleanUser)}`);
    if (!directRes.ok) {
      throw new Error(directRes.status === 404 ? "User not found" : "GitHub API error");
    }
    return directRes.json();
  }

  // ── Fetch Repos ──────────────────────────────────────────────────
  async function fetchRepos(username, sort = "updated", perPage = 30) {
    const cleanUser = username.trim();

    // 1. Try backend proxy first
    try {
      const res = await fetch(
        `${BACKEND_API}/repos/${encodeURIComponent(cleanUser)}?sort=${sort}&per_page=${perPage}`
      );
      const data = await safeParseJson(res);
      if (res.ok && Array.isArray(data)) return data;
    } catch {
      // Proxy offline, continue to fallback
    }

    // 2. Direct GitHub API Fallback
    const directRes = await fetch(
      `${GITHUB_DIRECT_API}/users/${encodeURIComponent(cleanUser)}/repos?sort=${sort}&per_page=${perPage}`
    );
    if (!directRes.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return directRes.json();
  }

  // ── Fetch Duel (User A vs User B) ────────────────────────────────
  async function fetchDuel(user1, user2) {
    const u1 = user1.trim();
    const u2 = user2.trim();

    // 1. Try backend proxy first
    try {
      const res = await fetch(
        `${BACKEND_API}/duel?user1=${encodeURIComponent(u1)}&user2=${encodeURIComponent(u2)}`
      );
      const data = await safeParseJson(res);
      if (res.ok && data && data.user1 && data.user2) return data;
    } catch {
      // Proxy offline, continue to fallback
    }

    // 2. Direct GitHub API Fallback (Parallel fetch)
    const [res1, res2] = await Promise.all([
      fetch(`${GITHUB_DIRECT_API}/users/${encodeURIComponent(u1)}`),
      fetch(`${GITHUB_DIRECT_API}/users/${encodeURIComponent(u2)}`),
    ]);

    if (!res1.ok || !res2.ok) {
      throw new Error("One or both users could not be found!");
    }

    const [d1, d2] = await Promise.all([res1.json(), res2.json()]);
    return { user1: d1, user2: d2 };
  }

  // ── Fetch Rate Limit ──────────────────────────────────────────────
  async function fetchRateLimit() {
    try {
      const res = await fetch(`${BACKEND_API}/rate-limit`);
      const data = await safeParseJson(res);
      if (res.ok && data) return data;
    } catch {
      // Fallback
    }

    const directRes = await fetch(`${GITHUB_DIRECT_API}/rate_limit`);
    if (directRes.ok) {
      const data = await directRes.json();
      return { limit: data.rate.limit, remaining: data.rate.remaining };
    }
    return { limit: 60, remaining: 60 };
  }

  return { fetchUser, fetchRepos, fetchDuel, fetchRateLimit };
}
