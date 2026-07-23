# Walkthrough — Full-Stack Structure

---

## Architecture

```
Vue 3 + Vite (port 5173)  ──►  Express Backend (port 3001)  ──►  GitHub API
   (zero secrets)                 (PAT in .env only)              (api.github.com)
```

---

## What Was Built

### Backend — `server/`

| File | Purpose |
|:---|:---|
| [index.js](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/server/index.js) | Express server with Helmet, CORS whitelist, JSON parsing |
| [routes/github.js](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/server/routes/github.js) | 4 secure proxy endpoints (`/api/user/:username`, `/api/repos/:username`, `/api/duel`, `/api/rate-limit`) |
| [middleware/rateLimiter.js](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/server/middleware/rateLimiter.js) | Rate limiting — 30 requests/min/IP |
| [.env.example](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/server/.env.example) | Template for environment variables |

### Frontend — `src/`

| File | Purpose |
|:---|:---|
| [App.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/App.vue) | Root component with sketch doodles and favorites modal |
| [HomeView.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/views/HomeView.vue) | Main page orchestrating all components |
| [SearchBar.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/SearchBar.vue) | Search input with enter key support |
| [ProfileCard.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/ProfileCard.vue) | User profile with avatar, persona, bookmark, export |
| [LanguageBreakdown.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/LanguageBreakdown.vue) | Language distribution bar chart |
| [ActivityStats.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/ActivityStats.vue) | Account age, gists, activity rating |
| [RepoList.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/RepoList.vue) | Repository cards with filter & sort |
| [ResourceHub.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/ResourceHub.vue) | 35+ learning resources with live search & category filters |
| [DuelMode.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/DuelMode.vue) | Profile duel battle with winner banner |
| [FavoritesModal.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/FavoritesModal.vue) | Bookmarks modal drawer |
| [ExportBadge.vue](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/components/ExportBadge.vue) | html2canvas PNG export button |
| [themeStore.js](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/stores/themeStore.js) | Pinia store for dark/light theme (localStorage) |
| [userStore.js](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/stores/userStore.js) | Pinia store for user, repos, favorites, recents |
| [useGithubApi.js](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/src/composables/useGithubApi.js) | All API calls through backend proxy — zero tokens in frontend |

---

## Security Measures Implemented

| Threat | Mitigation |
|:---|:---|
| API key exposure | GitHub PAT lives **only** in `server/.env` — never in browser |
| Rate limit abuse | `express-rate-limit` (30 req/min/IP) |
| XSS attacks | Vue auto-escaping + Helmet security headers |
| CORS bypass | Whitelist locked to localhost:5173 + production URL |
| Input injection | Regex validation of usernames in backend |
| Data leakage | Backend strips GitHub response to only safe public fields |

---

## Verification Results

- ✅ Backend running on `http://localhost:3001` with health check
- ✅ Frontend running on `http://localhost:5173` via Vite
- ✅ Searched "octocat" — full profile rendered (avatar, bio, 23,378 followers, languages, activity stats, repos)
- ✅ Resource hub with 6 category filter pills working
- ✅ Theme toggle visible and functional
- ✅ Zero console errors

![App loaded with sketchbook design](file:///C:/Users/Deepali's%20laptop/.gemini/antigravity-ide/brain/a83298e6-5b7d-43da-bb0f-38b6a9ea5b91/app_loaded_1784812520163.png)

![Profile metrics after searching octocat](file:///C:/Users/Deepali's%20laptop/.gemini/antigravity-ide/brain/a83298e6-5b7d-43da-bb0f-38b6a9ea5b91/profile_metrics_1784812703362.png)

---

## How to Run Locally

```bash
# Terminal 1 — Backend
cd server
npm install
# Add your GitHub PAT to server/.env
node index.js

# Terminal 2 — Frontend
npm install
npm run dev
```

Then open `http://localhost:5173`

---

## Next Steps for AWS Amplify Deployment

1. **Generate a GitHub Classic PAT** at [github.com/settings/tokens](https://github.com/settings/tokens) with `read:user` scope
2. Push to a GitHub repo
3. In AWS Amplify Console → **New App** → Connect your repo
4. Add environment variable: `GITHUB_PAT = ghp_your_token_here`
5. The [amplify.yml](file:///c:/Users/Deepali's%20laptop/Desktop/Cybersecurity/HTML,%20CSS,%20%20JS/Github-finder/amplify.yml) build spec handles the rest
