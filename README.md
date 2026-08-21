# ☀️ Sun Shadow Compass

**Real-Time Solar Shadow Direction Calculator for EVA Navigation Training**

---

<div align="center">

![Status](https://img.shields.io/badge/Status-In_Development-green)
![Phase](https://img.shields.io/badge/Phase-Earth_Mode-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Platform](https://img.shields.io/badge/Platform-Web_(PWA)_→_iOS-orange)
![Privacy](https://img.shields.io/badge/Privacy-Client_Side_only-purple)

</div>

---

## Status

🔧 **In Development — Implementation Phase**

Core planning is complete. Solar position engine selected and vendored. Input architecture, UI/UX specifications, and testing methodology are locked. Foundational scaffolding (Svelte + Vite + TypeScript) is operational. Utility modules and state management are implemented. UI components and PWA configuration are in progress.

---

## 🧭 Project Overview

Sun Shadow Compass is a progressive web application that calculates the direction a shadow will fall for any given time, date, and location on Earth. The result is displayed in large, high-contrast digits optimized for reading outdoors in direct sunlight.

The tool is designed to replace manual shadow-angle reference tables used during extravehicular activity (EVA) navigation training. On bodies without a magnetic field — such as the Moon — crew cannot use a traditional compass. Instead, they orient themselves using the sun's position and the shadow it casts. Training for this technique on Earth is complicated by the sun's rapid apparent motion (~15°/hour), which makes pre-computed tables complex and unwieldy — sometimes spanning five pages for a single training exercise.

This app replaces those tables with a lightweight, real-time digital calculation that runs **entirely in the browser, even offline**, with zero backend attack surface.

---

## 🌑 Background & Historical Context

During the Apollo program, astronauts trained with a physical cardboard sun compass — most notably for Apollo 15's stand-up EVA (SEVA). The device consisted of a central gnomon that cast a shadow onto a circular dial marked with lunar topographic reference lines. Crew aligned the shadow against known time-of-day data to determine heading. (ref: https://apollo15hub.org/items/show/286)

Key differences between Earth and lunar solar navigation:

| Factor | Earth | Moon |
|---|---|---|
| **Magnetic Field** | Present (compass usable) | Absent (compass useless) |
| **Axial Tilt** | ~23.44° | ~1.54° |
| **Solar Day** | 24 hours | ~29.53 Earth days |
| **Atmospheric Refraction** | Must be accounted for | None (no atmosphere) |
| **Sun Motion Rate** | ~15°/hour | Substantially slower |
| **Navigation Tables** | Complex (multiple pages) | Simple (few rows per EVA) |

This project addresses the Earth-side training problem: replacing the complex terrestrial tables with a single, fast, portable tool.

---

## 🚀 Vision & Phased Roadmap

**Phase 1 — Earth Mode (Current Focus)**
A client-side progressive web app that calculates solar azimuth and shadow direction for any location and time on Earth. Designed as a training aid for personnel practicing sun-compass navigation techniques under terrestrial conditions. Works fully offline as an installable PWA. **Zero backend = zero server-side attack surface.**

**Phase 2 — Moon Mode (Future)**
An expansion to support lunar surface calculations. This requires a fundamentally different ephemeris model (e.g., JPL DE series or ELP2000), selenographic coordinate systems, and the Moon's unique rotational characteristics. This is a significant research and engineering effort scoped for a future iteration.

---

## ⚙️ How It Works

The app accepts two input modes:

1. **Device Input** — Automatically pulls current time, date, and GPS coordinates from the device's browser APIs (Geolocation + system clock).
2. **Manual Input** — User enters date, time, latitude, and longitude by hand. Useful for planning future scenarios or simulating conditions at remote locations.

Once inputs are received, the solar azimuth is calculated using the NREL Solar Position Algorithm. The shadow direction is then derived geometrically:
```
Shadow Angle = (Solar Azimuth + 180°) mod 360°
```

The shadow always falls in the exact opposite direction of the sun's bearing. The sun's altitude (elevation above the horizon) determines shadow *length* but not shadow *direction* on a flat surface. Altitude also drives the app's three-tier display logic:

| Condition | Sun Altitude | Display Behavior |
|-----------|-------------|-----------------|
| Normal | > 0° | Full-brightness shadow angle |
| Below Horizon | ≤ 0° and > -18° | Dimmed theoretical bearing + "Sun below horizon" message |
| Astronomical Night | ≤ -18° | Blank display + "astronomical darkness" message |

The result is rendered in large, high-contrast digits designed to be read in direct sunlight without shade.

---

## 🔒 Privacy & Security Design

### Client-Only Architecture

This application operates with **zero backend server infrastructure**. All calculations execute in-browser via JavaScript. There is no database, no API endpoint, and no data transmission to external servers after initial load (if deployed statically).

| Threat Category | Risk Eliminated by Architecture |
|-----------------|--------------------------------|
| SQL Injection | No SQL database to inject |
| Server-Side XSS | No server-side templating to inject |
| Database Breach | No stored data to exfiltrate |
| API Compromise | No API endpoints to exploit |
| Third-Party Telemetry | No analytics SDK or tracking pixels |

### Geolocation Permission Handling

The app requests GPS coordinates via the browser's Geolocation API, which requires explicit user consent. The permission model ensures:

- User must approve location access before data is transmitted
- Location data is processed locally and never persisted
- Users can revoke permission at any time via browser settings
- Manual coordinate entry is provided as a privacy-preserving alternative

### Dependency Evaluation

Two candidate JavaScript libraries were evaluated for the Earth-mode calculation engine:

| Criterion | SunCalc.js | nrel-spa | Winner |
|---|---|---|---|
| **Algorithm Basis** | Jean Meeus, *Astronomical Algorithms* (simplified) | NREL SPA (Reda & Andreas, 2004), full C port | nrel-spa |
| **Azimuth Accuracy** | ~0.08° | ±0.0003° (~1 arc-second) | nrel-spa |
| **Minified Size** | ~7 KB (~2 KB gzipped) | ~10 KB (~3 KB gzipped) | Similar |
| **Dependencies** | None | None | Tie |
| **License** | BSD-2-Clause | MIT (wrapper) / NREL government terms | Both viable |
| **Source Authority** | Community | U.S. Dept. of Energy — National Renewable Energy Laboratory | nrel-spa |

**Decision:** nrel-spa was selected because it is a direct JavaScript port of the NREL Solar Position Algorithm — a product of the U.S. Department of Energy's National Renewable Energy Laboratory. Government-sourced math is preferred for a tool intended for government training use. The library implements the full SPA algorithm published by Reda & Andreas (2004) with observatory-grade accuracy (±0.0003°). Standard atmospheric refraction (1013.25 hPa, 15°C) is included for realistic altitude calculations near the horizon. The library is vendored directly into the repository with full license attribution — no npm runtime dependency.

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|---|
| **Framework** | Svelte | 5.56.8 | Compiles to minimal runtime, no virtual DOM |
| **Build Tool** | Vite | 5.4.21 | ES module bundling, asset hashing |
| **Language** | TypeScript | 5.3.0 | Strict mode enabled |
| **PWA Plugin** | vite-plugin-pwa | Latest | Workbox-powered service worker generation |
| **Test Runner** | Vitest | Latest | Vite-native, zero additional config |
| **Solar Engine** | nrel-spa | 2.0.2 | NREL SPA (Reda & Andreas, 2004), vendored into repo |
| **Svelte Plugin** | @sveltejs/vite-plugin-svelte | ^4.0.0-next.6 | Pre-release, confirmed stable for Svelte 5 |
| **Runtime** | Node.js | 24.19.0 | Development environment |
| **Package Manager** | npm | 11.17.0 | Security features active (allow-scripts) |
| **OS** | Manjaro Linux | — | Development environment |

**Architecture:** Fully client-side — no backend server required. All solar position calculations run in-browser via JavaScript. Deployed as a static build to GitHub Pages.

**Offline Capability:** The app is a Progressive Web App (PWA). On first visit, a service worker caches the entire application. After that, all functionality works with no internet connection — including fonts, libraries, and calculations.

---

## 🎨 UI/UX Specifications

The interface is designed for outdoor field use in high-glare conditions.

**Three Theme Modes:**

| Theme | Background | Foreground | Purpose |
|-------|------------|------------|---|
| Daylight (default) | #ffffff | #000000 | Daytime outdoor use |
| Dark | #1a1a1a | #f5f5f5 | Low-light conditions |
| Red Light | #1a0000 | #ff6600 | Night operations — preserves scotopic vision |

All themes exceed 15:1 contrast ratio.

**Typography:**

| Element | Font | Weight | Standard |
|---------|------|--------|---|
| Shadow angle display | Source Code Pro | 900 (Black) | NASA Horizon Design System, MIL-STD-1472G |
| Body text / labels | Roboto | 400 (Regular) | NASA-approved sans-serif family |

Fonts are self-hosted as WOFF2 files — no CDN dependency. Source Code Pro was selected over the originally specified Roboto Mono because Roboto Mono does not offer a 900 weight.

**Touch Targets:**

| Element Type | Minimum | Recommended |
|-------------|---------|---|
| Primary buttons | 48×48px | 64×64px |
| Form inputs | 44px height | 48px+ height |
| Settings button | 48×48px | 64×64px |

Glove-friendly design with large touch targets compensating for reduced fingertip precision.

**Typography Authority:** NASA Horizon Design System, NASA Flight Deck Documentation Report (Degani, 1992), MIL-STD-1472G (active DoD standard).

---

## 📱 Platform & Deployment

- **Hosting:** GitHub Pages, deployed from this repository
- **Architecture:** Fully client-side — no backend server required
- **PWA:** Installable on iOS and Android, works offline after first visit
- **Future iOS:** Migration path via Capacitor (framework-agnostic web-to-native wrapper)

**iOS PWA Install:** iOS Safari does not support automatic install prompts. Users must manually tap Share → "Add to Home Screen." A dismissible instructions banner is shown for first-time iOS visitors.

---

## 🧪 Testing & Validation

**Primary Validation — NREL Reference Cases (Automated):**
The NREL SPA C source ships with a `reference.dat` file containing canonical input/output pairs. Three reference cases are tested with exact atmospheric parameters (pressure, temperature, elevation, ΔT) at ±0.001° tolerance using Vitest.

**Secondary Validation — Independent Government Sources (Manual):**

| Source | Role | Tolerance |
|--------|---|---|
| USNO Solar Calculator (Navy) | Secondary validation | ±0.01° |
| JPL Horizons (NASA/JPL) | Gold-standard tertiary | ±0.001° |
| NOAA Solar Calculator | Supplementary (deprecated) | ±0.02° |

**Additional Test Coverage:**
- Seasonal/geographic edge cases (solstices, equinoxes, polar regions)
- Shadow direction sanity checks (geometric certainty: N/S/E/W opposites)
- Sun-below-horizon tier trigger conditions
- ~25 automated tests (Vitest) + ~8-10 manual cross-validation checks

---

## Known Dev Dependency Vulnerabilities

All vulnerabilities are in devDependencies only. Production builds and deployed artifacts are unaffected.

| Severity | Package | Advisory ID | Title | Scope |
|----------|---|---|---|---|
| Critical | vitest | GHSA-5xrq-8626-4rwp | Arbitrary file read when Vitest UI server is running | Dev only |
| High | vite | GHSA-fx2h-pf6j-xcff | server.fs.deny bypass on Windows alternate paths | Dev server only |
| Moderate | esbuild | GHSA-67mh-4wv8-2f99 | Dev server accessible to malicious websites | Dev server only |
| Moderate | vite | GHSA-4w7w-66w2-5vf9 | Path traversal in optimized deps .map handling | Dev server only |
| Moderate | vite | GHSA-v6wh-96g9-6wx3 | NTLMv2 hash disclosure via UNC path on Windows | Dev server only |
| Moderate | vite-plugin-pwa | (cascade via vite) | Cascade from vulnerable vite | Dev only |
| Moderate | @sveltejs/vite-plugin-svelte | (cascade via vite) | Cascade from vulnerable vite | Dev only |

**Status:** Accepted risk. Fix requires Vite 8 upgrade (breaking change, 3 major versions). Deferred to post-implementation maintenance phase.

**Mitigation:** Avoid visiting untrusted websites while dev server is running.

---

## 📋 Roadmap

- [x] Define use case and scope
- [x] Research solar position algorithms (SunCalc.js vs. nrel-spa)
- [x] Select Earth-mode calculation engine (nrel-spa 2.0.2)
- [x] Define input architecture (device sensors vs. manual entry)
- [x] Design UI/UX for high-glare outdoor readability
- [x] Select frontend framework and build toolchain (Svelte 5 + Vite)
- [x] Define testing methodology (NREL reference + USNO/JPL cross-validation)
- [x] Define offline/PWA architecture
- [x] Define iOS migration path (Capacitor)
- [x] Scaffold project (Svelte + Vite + TypeScript)
- [x] Vendor nrel-spa into repository
- [x] Implement utility modules (sunCalc, geoLocation, timezone, dmsConverter)
- [x] Implement settings store (localStorage persistence)
- [x] Implement theme system (three modes, CSS variables)
- [ ] Create shared type definitions
- [ ] Configure PWA service worker (vite-plugin-pwa)
- [ ] Write unit tests (Vitest)
- [ ] Build UI components (DisplayPanel, SettingsPanel, ThemeSwitcher, PWABanner)
- [ ] Validate output against USNO and JPL Horizons
- [ ] Deploy to GitHub Pages
- [ ] Research lunar ephemeris models (JPL DE / ELP2000) for Moon Mode
- [ ] Implement Moon Mode

---

## 💡 Skills Demonstrated

- **Research Methodology:** Evaluated multiple solar position algorithms against accuracy, performance, licensing, and government-source requirements before selecting a solution
- **Iterative Design:** Phased approach with Earth Mode first, Moon Mode as a scoped future iteration requiring distinct ephemeris models
- **Domain Research:** Investigated Apollo-era sun compass hardware, lunar vs. terrestrial solar mechanics, and NASA/NOAA/NREL calculation references
- **Trade-Off Analysis:** Documented library comparison with quantified accuracy figures, bundle sizes, and justification for final selection
- **Accessibility Engineering:** High-contrast theming (15:1+), glove-friendly touch targets, WCAG AA/AAA compliance, night-vision-preserving red light mode
- **Offline-First Architecture:** PWA with service worker, self-hosted assets, zero runtime CDN dependencies
- **Testing Rigor:** Multi-source validation against NREL reference data, USNO, and JPL Horizons with documented tolerances
- **Technical Writing:** Comprehensive README documenting rationale and decisions for portfolio review
- **Privacy-Conscious Architecture:** Client-side-only design eliminates backend attack surface and third-party telemetry

---

## 📚 References

- Reda, I. & Andreas, A. (2004). *Solar Position Algorithm for Solar Radiation Applications*. Solar Energy, 76(5), 577–589.
- Meeus, J. (1991). *Astronomical Algorithms*. Willmann-Bell.
- Degani, A. (1992). *On the Typography of Flight-Deck Documentation*. NASA Contractor Report #177605.
- MIL-STD-1472G. *Department of Defense Design Criteria Standard: Human Engineering.* (Active)
- NASA Horizon Design System — [Brand Guidelines](https://www.nasa.gov/nasa-brand-center/brand-guidelines)
- nrel-spa — [GitHub](https://github.com/acamarata/nrel-spa) (v2.0.2, MIT wrapper)
- NOAA Global Monitoring Laboratory — [Solar Position Calculator](https://gml.noaa.gov/grad/solcalc/azel.html) (supplementary, deprecated)
- USNO — [Solar Calculator](https://aa.usno.navy.mil/data/AltAz)
- JPL Horizons — [Web Interface](https://ssd.jpl.nasa.gov/horizons)
- Apollo 15 Training Sun Compass — [National Space Centre](https://www.spacecentre.co.uk/collections/categories/apollo/apollo-15-training-sun-compass)
- NASA Scientific Visualization Studio — [The Sun's Path at Different Lunar Latitudes](https://svs.gsfc.nasa.gov/5038)

---

## License

MIT License — See [LICENSE](LICENSE) file for details.

---

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-yellow)](#license)
[![Author](https://img.shields.io/badge/Author-Jon_Gill-purple)](https://github.com/Gilltacular)
[![Portfolio](https://img.shields.io/badge/Portfolio-gilltacular.github.io-blue)](https://gilltacular.github.io)

</div>

---

Built by **Jon Gill** — [gilltacular.github.io](https://gilltacular.github.io)

*Portfolio capstone demonstrating research-driven software design, astronomical computation, accessibility engineering, privacy-conscious architecture, and iterative project planning to solve a real-world problem.*
