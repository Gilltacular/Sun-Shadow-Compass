# ☀️ Sun Shadow Compass

**Real-Time Solar Shadow Direction Calculator for EVA Navigation Training**

---

<div align="center">

![Status](https://img.shields.io/badge/Status-Planning-yellow)
![Phase](https://img.shields.io/badge/Phase-Earth_Mode-blue)
![License](https://img.shields.io/badge/License-TBD-lightgrey)
![Platform](https://img.shields.io/badge/Platform-Web_→_iOS-orange)

</div>

---

## Status

🔧 **In Planning — Active Design Phase**

Core use case and scope are defined. Solar position algorithm researched and selected. Input architecture, UI/UX design, and implementation are in progress.

This is a portfolio capstone project intended to demonstrate full-stack planning, research methodology, and iterative software design — from concept through deployment.

---

## 🧭 Project Overview

Sun Shadow Compass is a web-based application that calculates the direction a shadow will fall for any given time, date, and location on Earth. The result is displayed in large, high-contrast digits optimized for reading outdoors in direct sunlight.

The tool is designed to replace manual shadow-angle reference tables used during extravehicular activity (EVA) navigation training. On bodies without a magnetic field — such as the Moon — crew cannot use a traditional compass. Instead, they orient themselves using the sun's position and the shadow it casts. Training for this technique on Earth is complicated by the sun's rapid apparent motion (~15°/hour), which makes pre-computed tables complex and unwieldy — sometimes spanning five pages for a single training exercise.

This app replaces those tables with a lightweight, real-time digital calculation that runs entirely in the browser.

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
A client-side web application that calculates solar azimuth and shadow direction for any location and time on Earth. Designed as a training aid for personnel practicing sun-compass navigation techniques under terrestrial conditions.

**Phase 2 — Moon Mode (Future)**
An expansion to support lunar surface calculations. This requires a fundamentally different ephemeris model (e.g., JPL DE series or ELP2000), selenographic coordinate systems, and the Moon's unique rotational characteristics. This is a significant research and engineering effort scoped for a future iteration.

---

## ⚙️ How It Works

The app accepts two input modes:
```
Shadow Angle = (Solar Azimuth + 180°) mod 360°
```

The shadow always falls in the exact opposite direction of the sun's bearing. The sun's altitude (elevation above the horizon) determines shadow *length* but not shadow *direction* on a flat surface.

The result is rendered in large, high-contrast digits designed to be read in direct sunlight without shade.

---

## 🔬 Solar Position Engine — Research & Selection

Two candidate JavaScript libraries were evaluated for the Earth-mode calculation engine:

| Criterion | SunCalc.js | nrel-spa |
|---|---|---|
| **Algorithm Basis** | Jean Meeus, *Astronomical Algorithms* (simplified) | NREL SPA (Reda & Andreas, 2008), full C port |
| **Azimuth Accuracy** | ~0.08° | ±0.0003° (~1 arc-second) |
| **Minified Size** | ~7 KB (~2 KB gzipped) | ~10 KB (~3 KB gzipped) |
| **Dependencies** | None | None |
| **License** | BSD-2-Clause | MIT |
| **Maintenance** | Mature, widely adopted | Actively maintained |
| **API Complexity** | Single function call — returns azimuth + altitude | Requires UTC offset, returns fractional-hour values |

### Decision: SunCalc.js

SunCalc.js was selected because its ~0.08° accuracy is well within the practical tolerance for shadow-compass navigation. For context, a typical handheld magnetic compass resolves to ~1–2°, and field perception of shadow direction is no finer than that. The observatory-grade precision of nrel-spa (±0.0003°) would be relevant for solar panel tracking or astronomical instrumentation but represents unnecessary complexity for this use case.

The library's minimal API — `SunCalc.getPosition(date, lat, lng)` returning azimuth and altitude directly — maps cleanly to our input-output model with no excess computation.

---

## 🖥️ Platform & Architecture

- **Hosting**: GitHub Pages, deployed from this repository
- **Architecture**: Fully client-side — no backend server required
- **Compute**: All solar position calculations run in-browser via JavaScript
- **Framework**: TBD (under evaluation)
- **Initial Target**: Web app (mobile-responsive)
- **Future Target**: Native iOS application

---

## 📋 Roadmap

- [x] Define use case and scope
- [x] Research solar position algorithms (SunCalc.js vs. NREL SPA)
- [x] Select Earth-mode calculation engine (SunCalc.js)
- [ ] Define input architecture (device sensors vs. manual entry flow)
- [ ] Design UI/UX for high-glare outdoor readability
- [ ] Select frontend framework and build toolchain
- [ ] Implement Earth-mode shadow angle calculation
- [ ] Validate output against NOAA Solar Calculator
- [ ] Deploy to GitHub Pages on portfolio site
- [ ] Research lunar ephemeris models (JPL DE / ELP2000) for Moon Mode
- [ ] Implement Moon Mode

---

## Known Dev Dependency Vulnerabilities

- **esbuild <=0.24.2** — Dev server vulnerability (GHSA-67mh-4wv8-2f99)
- **Impact:** Development server only. Production builds are unaffected.
- **Status:** Accepted risk. Fix requires Vite 8 upgrade (breaking change). Deferred to post-implementation phase.
- **Mitigation:** Avoid visiting untrusted websites while dev server is running.

---

## 💡 Skills Demonstrated

- **Research Methodology** — Evaluated multiple solar position algorithms against accuracy, performance, and licensing requirements before selecting a solution
- **Iterative Design** — Phased approach with Earth Mode first, Moon Mode as a scoped future iteration requiring distinct ephemeris models
- **Domain Research** — Investigated Apollo-era sun compass hardware, lunar vs. terrestrial solar mechanics, and NASA/NOAA calculation references
- **Trade-Off Analysis** — Documented library comparison with quantified accuracy figures, bundle sizes, and justification for final selection
- **Full-Stack Planning** — Client-side architecture, GitHub Pages deployment, and future iOS migration path
- **Technical Writing** — Comprehensive README documenting rationale and decisions for portfolio review

---

## 📚 References

- Reda, I. & Andreas, A. (2004). *Solar Position Algorithm for Solar Radiation Applications*. Solar Energy, 76(5), 577–589.
- Meeus, J. (1991). *Astronomical Algorithms*. Willmann-Bell.
- NOAA Global Monitoring Laboratory — [Solar Position Calculator](https://gml.noaa.gov/grad/solcalc/azel.html)
- Apollo 15 Training Sun Compass — [National Space Centre](https://www.spacecentre.co.uk/collections/categories/apollo/apollo-15-training-sun-compass)
- NASA Scientific Visualization Studio — [The Sun's Path at Different Lunar Latitudes](https://svs.gsfc.nasa.gov/5038)
- SunCalc.js — [GitHub](https://github.com/mourner/suncalc) / [npm](https://www.npmjs.com/package/suncalc)

---

## License

TBD

---

<div align="center">

[![Author](https://img.shields.io/badge/Author-Jon_Gill-purple)](https://github.com/Gilltacular)
[![Portfolio](https://img.shields.io/badge/Portfolio-gilltacular.github.io-blue)](https://gilltacular.github.io)

</div>

---

Built by **Jon Gill** — [gilltacular.github.io](https://gilltacular.github.io)

*Portfolio capstone demonstrating research-driven software design, astronomical computation, and iterative project planning to solve a real world problem.*

1. **Device Input** — Automatically pulls current time, date, and GPS coordinates from the device's browser APIs (Geolocation + system clock).
2. **Manual Input** — User enters date, time, latitude, and longitude by hand. Useful for planning future scenarios or simulating conditions at remote locations.

Once inputs are received, the solar azimuth is calculated using established astronomical models. The shadow direction is then derived geometrically:
