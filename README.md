# Space Exploration App

## Overview

This project is a 3D space exploration app built with Three.js.
The user rides an autopilot shuttle that orbits planets and travels between celestial bodies in a simplified solar system.

---

## Features

- Mimics the solar system: Sun, 8 planets, and selected moons (12–15 objects total).
- Autopilot shuttle: starts orbiting Earth, flies smoothly to other planets when clicked.
- Third-person camera: follows shuttle, user can rotate view with the mouse.
- Click & Travel system:
  - Click a planet/moon/Sun → info panel pops up
  - Travel button initiates shuttle flight to the target
- Orbit transitions: shuttle smoothly enters and leaves orbit along tangent paths.
- Rocket flame effects: flames intensify during travel, weaken during orbit.
- Gamified info panel: first visit shows only basic info; after orbiting, full info (mass, atmosphere, age) is revealed.

## Resources Needed

- 3D Models (GLB): Shuttle (player vehicle)
- Textures: Planets, Moon, Sun, Saturn rings, optional particle textures
- Particles: Rocket flames, background stars
- UI: HTML overlays for info panel and Travel button
- Libraries: Three.js, GLTFLoader, OrbitControls, optional Tween.js

## Installation & Setup

- Clone the repository.
- Install dependencies (if using a bundler like Vite/webpack).
- Run a local server (Three.js requires http:// or https://).
- Open index.html in a browser.

## Controls

- Mouse: rotate camera around shuttle.
- Click a planet/moon/Sun: open info panel.
- Travel button: shuttle moves to selected celestial body.

## Learning Goals

- Three.js object hierarchy, GLB model loading
- Delta-based animations and orbit mechanics
- Particle systems and dynamic textures
- Camera rigging with user-controlled view
- Raycasting & UI interaction
- Simple gamification (progressive info unlock)
