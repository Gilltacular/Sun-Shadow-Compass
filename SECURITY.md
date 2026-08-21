# Security Policy

## Project Security Architecture

Sun Shadow Compass is designed with a **privacy-first, client-side-only architecture**. Understanding this design philosophy is essential to evaluating the project's security posture.

### Zero Backend Attack Surface

This application operates with **zero backend server infrastructure**. All calculations execute in-browser via JavaScript. There is:

- ❌ No database to inject (SQL, NoSQL, or otherwise)
- ❌ No server-side code to exploit (RCE, SSRF, etc.)
- ❌ No API endpoints to compromise
- ❌ No third-party analytics or telemetry SDKs
- ❌ No external data transmission after initial load

### Attack Surface Reduction

| Attack Vector | Risk Eliminated By Architecture |
| ------------- | ------------------------------- |
| SQL Injection | No SQL database |
| Server-Side XSS | No server-side templating |
| API Compromise | No API endpoints |
| Data Breach | No stored user data |
| Third-Party Telemetry | No external tracking scripts |

## Supported Versions

| Version | Status | Security Notes |
| ------- | ------ | -------------- |
| Current Development (Earth Mode) | ✅ Active | Security review ongoing |
| Production Release (GitHub Pages) | ✅ Stable | Static deploy, no server-side execution |
| Legacy/Branch Versions | ⚠️ Use Caution | May contain untested code changes |

## Reporting a Vulnerability

Even client-side applications can have security issues. If you believe you've found a security vulnerability in Sun Shadow Compass, please report it responsibly.

### How to Report

**Preferred Method:** Create a private issue via GitHub Security Advisories (if available) or open a standard GitHub issue labeled `[Security]`

**Alternative Method:** Email `vulnerability.authentic389@passmail.net` with subject `[VULN] Sun Shadow Compass - [Vulnerability Type]`

**PGP Key:** Available upon request via secure channel

### What to Include

- **Vulnerability Type:** (e.g., XSS, CSP violation, dependency vulnerability, privacy concern)
- **Location:** File path, component name, or browser console output
- **Impact:** What could an attacker achieve?
- **Reproduction Steps:** Browser version, steps to reproduce, proof-of-concept code if applicable
- **Browser Compatibility:** Which browsers are affected?

### Response Timeline

Following OWASP Vulnerability Disclosure best practices:

| Stage | Expected Timeline |
| ----- | ----------------- |
| Initial Acknowledgment | Within 48 hours |
| Vulnerability Assessment | Within 14 days |
| Remediation (if confirmed) | Within 30 days or longer for breaking changes |
| Public Disclosure | After fix is available, with CVE consideration |

[OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)

## Safe Harbor

If you conduct vulnerability research in accordance with this policy, I will not initiate legal action against you for good-faith testing and reporting. This includes:

- Testing the application in your own browser environment
- Inspecting client-side code and dependencies
- Reporting vulnerabilities through designated channels
- Allowing reasonable time for remediation before disclosure

## Scope

This security policy covers:

| Component | In Scope | Notes |
| --------- | -------- | ----- |
| Client-Side JavaScript | ✅ Yes | All solar calculation and UI logic |
| Geolocation API Handling | ✅ Yes | Browser permission model implementation |
| PWA Service Worker | ✅ Yes | Cache behavior, offline functionality |
| Third-Party Dependencies | ✅ Yes | nrel-spa, Svelte, Vite plugins |
| Dev Dependency Vulnerabilities | ⚠️ Documented | Listed separately below |
| Production Deployment (GitHub Pages) | ✅ Yes | Static file hosting security |

## Known Security Considerations

### Dev Dependency Vulnerabilities

The following vulnerabilities exist in **development dependencies only**. Production builds and deployed artifacts are **unaffected**:

| Severity | Package | Advisory ID | Impact | Mitigation |
| -------- | ------- | ----------- | ------ | ---------- |
| Critical | vitest | GHSA-5xrq-8626-4rwp | Arbitrary file read (dev server only) | Accepted risk — fix deferred |
| High | vite | GHSA-fx2h-pf6j-xcff | FS deny bypass (Windows dev server) | Accepted risk — fix deferred |
| Moderate | esbuild | GHSA-67mh-4wv8-2f99 | Dev server exposure | Avoid untrusted sites while dev server running |
| Moderate | vite | GHSA-4w7w-66w2-5vf9 | Path traversal (optimized deps) | Accepted risk — fix deferred |
| Moderate | vite | GHSA-v6wh-96g9-6wx3 | NTLMv2 hash disclosure (UNC path) | Windows-only, accepted risk |

**Status:** Accepted risk. Fix requires Vite 8 upgrade (breaking change, 3 major versions). Deferred to post-implementation maintenance phase.

**Mitigation:** Avoid visiting untrusted websites while dev server is running locally.

### Geolocation Privacy Considerations

This app requests GPS coordinates via the browser's Geolocation API. Users should understand:

- **Permission Required:** Browser will explicitly ask for location access
- **Local Processing Only:** Location data is calculated in-browser and never transmitted to external servers
- **No Persistence:** Coordinates are not stored on any server or persistent storage beyond browser session/cache
- **User Control:** Location permission can be revoked at any time via browser settings
- **Alternative:** Manual coordinate entry available for users preferring not to share location

### PWA Cache Behavior

As a Progressive Web App, this project uses a service worker to cache resources for offline functionality. Users should be aware:

- **Cache Lifetime:** Cached assets remain until service worker updates or cache is manually cleared
- **Privacy:** Cache may persist across browser sessions
- **Clearing Cache:** Can be cleared via browser "Clear Site Data" or uninstalling PWA

## Security References

This project's security architecture aligns with:

- **OWASP Top 10 2025:** [owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
- **OWASP Client-Side Security:** [cheatsheetseries.owasp.org/cheatsheets/Cross-SiteScripting_(XSS)_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Cross-SiteScripting_(XSS)_Prevention_Cheat_Sheet.html)
- **OWASP Geolocation Privacy:** [owasp.org/www-community/controls/Privacy-Friendly_Geolocation](https://owasp.org/www-community/controls/Privacy-Friendly_Geolocation)
- **OWASP PWA Best Practices:** [owasp.org/www-project-progressive-web-apps/](https://owasp.org/www-project-progressive-web-apps/)
- **NREL Security Standards:** [nrel.gov/grid/solar-position-algorithm](https://www.nrel.gov/grid/solar-position_algorithm.html)

## Credits

Security architecture and client-side privacy design by Jon Gill, August 2026.

Solar position engine: nrel-spa v2.0.2 (NREL, U.S. Department of Energy).

---

Last Updated: August 2026
