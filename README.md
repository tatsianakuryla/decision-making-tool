# 🎯 Decision Making Tool

An interactive single-page application (SPA) designed to empower streamers, content creators, and gamers to make smart, randomized decisions with precision and style. Users can effortlessly manage a list of weighted options — add, edit, import, export — and visualize the outcome through a dynamic, animated decision wheel. With seamless routing, persistent storage, and a fully responsive interface, this tool delivers both functionality and delight in every spin.

---

## 📚 Table of Contents

- [🚀 Live Demo](#-live-demo)
- [📦 Project Structure](#-project-structure)
- [🛠 Installation & Usage](#-installation--usage)
- [🧹 Linting & Formatting](#-linting--formatting)
- [🧪 Technologies & Tools](#-technologies--tools)
- [🧭 Features](#-features)

---
## 🚀 Live Demo

🔗 [Launch the App](https://tatsianakuryla.github.io/decision-making-tool/#/options)

---

## 📦 Project Structure
```
src/
├── assets/ # Static assets
├── components/ # Application components
│ ├── decision-picker/ # Wheel, animations, and canvas rendering
│ ├── dom/ # DOM manipulation helpers
│ ├── id-generator/ # Unique ID logic
│ ├── local-storage/ # Persistence utilities
│ ├── options-exporter/ # Export logic (.json)
│ ├── options-importer/ # Import logic (.json/.csv)
│ ├── options-storage/ # Option state management
│ └── router/ # Hash-based routing logic
├── images/ # App images
├── styles/ # SCSS/CSS files
├── utils/ # Helper functions
├── index.html # HTML entry (empty <body>)
└── index.ts # Application entry point
```
---

## 🛠 Installation & Usage

```bash
# 1. Install dependencies
npm install
```
```bash
# 2. Run the development server
npm run start
```
```bash
# 3. Build the project for production
npm run build
```
```bash
# 4. Preview the production build
npm run preview
```
```bash
# 5. Prepare the production build before deployment
npm run predeploy
```
```bash
# 6. Deploy to GitHub Pages
npm run deploy
```
---

## 🧹 Linting & Formatting
```bash
# TypeScript linting and autofix
npm run lint
```
```bash
# Prettier formatting
npm run format
```
```bash
# StyleLint for CSS/SCSS
npm run stylelint
```

## 🧪 Technologies & Tools
 - TypeScript (Strict mode)
- Webpack for bundling
- ESLint, StyleLint, Prettier
- Husky, Lint-Staged, CommitLint
- Canvas API for custom drawing
- Hash Router for SPA navigation
- No frameworks — pure HTML/CSS/TypeScript

### 🧭 Features
- Add, edit, and remove weighted options
- Save/load options from .json or paste list
- Visual decision wheel with weighted sections
- Animated spinning and option picking
- Sound toggle and duration control
- SPA routing with error page fallback
- Fully keyboard- and mouse-navigable
