# Contributing to Gitfind 🎨

Thank you for considering contributing to **Gitfind**! Contributions from the community help make this tool better for developers worldwide.

---

## 🚀 How to Contribute

### 1. Reporting Bugs
- Before creating an issue, search the [Issues tab](https://github.com/JimilPrabtani/Github-finder/issues) to see if it has already been reported.
- If not, create a new issue detailing:
  - Clear title describing the bug
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details (Browser, OS)

### 2. Suggesting Enhancements
- Feature requests are welcome! Open an issue with tag `enhancement`.
- Describe the motivation and how the feature improves the developer experience.

### 3. Submitting Pull Requests (PR)

1. **Fork the Repository**
   Click "Fork" on [GitHub](https://github.com/JimilPrabtani/Github-finder).

2. **Clone your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Github-finder.git
   cd Github-finder
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/awesome-new-feature
   ```

4. **Make & Test your Changes**
   - Run the frontend (`npm run dev`) and backend (`cd server && node index.js`).
   - Ensure the hand-drawn sketchbook UI remains responsive on desktop and mobile.

5. **Commit your Changes**
   Write clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add dark mode auto-detection"
   ```

6. **Push to GitHub & Submit PR**
   ```bash
   git push origin feature/awesome-new-feature
   ```
   Then open a Pull Request against `JimilPrabtani/Github-finder` `master` branch.

---

## 🎨 Style Guidelines

- **Vue Components**: Use Vue 3 Composition API `<script setup>` syntax.
- **Hand-Drawn CSS Theme**: Use CSS custom variables defined in `src/assets/styles/variables.css` (`--paper-bg`, `--sketch-border`, `--marker-yellow`, etc.).
- **Security First**: Never expose API keys or tokens in client code; keep external API requests routed through the Node proxy in `server/routes/github.js`.

---

## 📄 Code of Conduct

Be respectful, friendly, and supportive to all contributors!
