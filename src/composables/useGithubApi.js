// useGithubApi — Composable for all GitHub API calls
// All requests go through our secure backend proxy.
// ZERO GitHub tokens in the frontend.

const API_BASE = "/api";

export function useGithubApi() {
  async function fetchUser(username) {
    const res = await fetch(`${API_BASE}/user/${encodeURIComponent(username)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "User not found" }));
      throw new Error(err.error || "User not found");
    }
    return res.json();
  }

  async function fetchRepos(username, sort = "updated", perPage = 30) {
    const res = await fetch(
      `${API_BASE}/repos/${encodeURIComponent(username)}?sort=${sort}&per_page=${perPage}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return res.json();
  }

  async function fetchDuel(user1, user2) {
    const res = await fetch(
      `${API_BASE}/duel?user1=${encodeURIComponent(user1)}&user2=${encodeURIComponent(user2)}`
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Duel failed" }));
      throw new Error(err.error || "One or both users not found");
    }
    return res.json();
  }

  async function fetchRateLimit() {
    const res = await fetch(`${API_BASE}/rate-limit`);
    return res.json();
  }

  return { fetchUser, fetchRepos, fetchDuel, fetchRateLimit };
}
