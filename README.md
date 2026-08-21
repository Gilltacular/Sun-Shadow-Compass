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
