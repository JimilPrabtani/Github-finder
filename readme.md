# 🎨 Gitfind — Hand-Drawn GitHub User Finder & Developer Hub

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5+-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Hosting-FF9900?style=for-the-badge&logo=awsamplify&logoColor=white)](https://aws.amazon.com/amplify/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A hand-drawn sketchbook styled web application that lets developers search GitHub profiles, compare users in head-to-head duels, export custom sketch profile badges, and explore 35+ handpicked developer & AI learning hubs. Built with **Vue 3 (Vite)** and a **Node.js Express API proxy** for zero-token client security.

---

## ✨ Features

- 🎨 **Hand-Drawn Sketchbook Aesthetic**: Wobbly asymmetric borders, paper graph background grid, marker highlighter overlays, masking tape accents, and handwritten Google Fonts (`Caveat`, `Kalam`, `Patrick Hand`).
- 🌙 **Dark Notebook / Light Sketch Theme**: Seamless toggle between warm paper (`#fcfaf2`) and dark slate notebook paper (`#12151e`) with `localStorage` memory.
- 🔍 **Single User Profile Search**: Displays avatars, bio, location, join date, followers/following/repo counts, and external links.
- 📊 **Language Breakdown & Persona Assignment**: Calculates programming language distribution percentage bar charts and assigns developer personas (*"🐍 Python Alchemist"*, *"⚡ JS/TS Web Wizard"*, *"⚙️ Systems Architect"*, etc.).
- 📈 **Contribution & Activity Metrics**: Calculates total account age in years/days, public gists, and activity levels (*"⚡ Hyper-Active Contributor"*).
- ⚔️ **Profile Duel Mode**: Head-to-head battle comparing two GitHub users with dynamic score calculations and winner trophy banners.
- 📸 **Export Profile Badge as Image (`html2canvas`)**: One-click download of hand-drawn profile badges as crisp PNG files.
- 🏷️ **Developer & AI Learning Hub**: Live keyword search and category tag filtering across 35+ open-source tools, AI platforms (Hugging Face, Ollama, Gemini), cybersecurity academies (PortSwigger, TryHackMe), enterprise learning hubs (AWS, Azure, CrowdStrike, Palo Alto), and 16 essential GitHub repos.
- ⭐ **Bookmarks & Recent Searches**: Save favorite profiles to a modal drawer and quickly re-search recent lookups.

---

## 🔒 Security & Architecture

Gitfind implements a **Full-Stack Hybrid Security Architecture** to keep secrets hidden and protect against rate-limit abuse:

```
┌──────────────────────────────────────┐
│        Vue 3 + Vite Frontend         │
│   (Zero GitHub tokens in client)     │
└──────────────────┬───────────────────┘
                   │  fetch("/api/user/:username")
                   ▼
┌──────────────────────────────────────┐
│     Node.js + Express API Proxy      │
│  • Holds GitHub PAT in server .env   │
│  • Rate Limiting (30 req/min/IP)     │
│  • Helmet HTTP security headers      │
│  • Username regex input validation   │
│  • Response field sanitization       │
└──────────────────┬───────────────────┘
                   │  Authorization: token ghp_***
                   ▼
┌──────────────────────────────────────┐
│          GitHub REST API v3          │
└──────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API `<script setup>`), Pinia (State Management), Vue Router
- **Build Tool**: Vite 6
- **Styling**: Vanilla CSS3 Custom Properties (CSS Tokens, Hand-Drawn Wobbly Radius, Dynamic Theme Attributes)
- **Backend API Proxy**: Node.js, Express.js
- **Security Middleware**: Helmet, CORS (Domain Locking), Express Rate Limit
- **Deployment**: AWS Amplify Hosting

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/JimilPrabtani/Github-finder.git
cd Github-finder
```

### 2. Setup & Start Backend Server
```bash
cd server
npm install

# (Optional) Add your GitHub Personal Access Token to .env for 5,000 req/hr rate limit
cp .env.example .env

# Start Node server
node index.js
```
*Backend runs on `http://localhost:3001`*

### 3. Setup & Start Frontend
Open a new terminal window in the project root:
```bash
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## ☁️ Deployment to AWS Amplify

This project includes a pre-configured `amplify.yml` build spec ready for **AWS Amplify Hosting**.

1. Generate a **GitHub Classic Token** (`read:user` scope) at [github.com/settings/tokens](https://github.com/settings/tokens).
2. Push your code to GitHub.
3. Open **AWS Amplify Console** $\rightarrow$ **New App** $\rightarrow$ **Host Web App**.
4. Connect your GitHub repository branch (`master`).
5. Under **Environment Variables**, add:
   - `GITHUB_PAT` = `ghp_your_token_here`
6. Click **Save and Deploy**. AWS Amplify will automatically build and host the app.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/JimilPrabtani/Github-finder/issues). See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed submission guidelines.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

Developed with ❤️ by **Jimil Prabtani**
- **GitHub**: [@JimilPrabtani](https://github.com/JimilPrabtani)
- **Repository**: [https://github.com/JimilPrabtani/Github-finder/tree/master](https://github.com/JimilPrabtani/Github-finder/tree/master)
