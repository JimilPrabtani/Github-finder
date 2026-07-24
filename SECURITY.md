# Security Policy

Gitfind is a personal/portfolio project — a Vue 3 frontend paired with a
Node.js/Express API proxy that keeps the GitHub Personal Access Token
server-side. There's no formal SLA or bug bounty, but reports are taken
seriously and addressed on a best-effort basis.

## Supported Versions

Only the latest code on the `master` branch is supported with security
fixes. There are no maintained older releases — if you're running a fork
or an older checkout, please update to the latest commit before reporting
an issue.

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report vulnerabilities privately via GitHub's
[Private Vulnerability Reporting](https://github.com/JimilPrabtani/Github-finder/security/advisories/new)
feature (repo → **Security** tab → **Report a vulnerability**). This opens
a private advisory visible only to the maintainer until it's resolved.

When reporting, please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce (or a proof-of-concept)
- The affected file(s)/endpoint(s), if known

**What to expect:**

- Acknowledgement of your report within a few days
- An assessment of the issue and, if valid, a fix on `master`
- Credit in the fix's commit/changelog, if you'd like it

## Scope

In scope:

- The Express API proxy (`server/`) — GitHub PAT handling, input
  validation, CORS/rate-limit configuration
- The Vue frontend (`src/`) — XSS, insecure data handling, auth/authorization
  logic
- Build/deploy configuration (`amplify.yml`, `vite.config.js`)

Out of scope:

- Denial-of-service / rate-limit exhaustion reports
- Vulnerabilities in third-party dependencies (report those upstream;
  dependency updates are tracked separately via `npm audit`/Dependabot)
- Issues that require physical or already-compromised-device access
