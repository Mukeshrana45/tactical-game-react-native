# Tactical Game (React Native)

A turn-based tactical strategy game built using React Native.

This project demonstrates clean architecture, reducer-based state management, immutable updates, AI separation, and unit testing using Jest.

---

## 🚀 Features

- 8x8 grid-based tactical board
- Two unit types:
  - Knight (High HP, melee)
  - Archer (Ranged attack)
- Movement range highlighting
- Attack range highlighting
- Turn-based gameplay
- Basic AI opponent
- Win condition detection
- Immutable state updates
- Modular game engine architecture
- Unit-tested core logic

---

## 🧠 Tech Stack

- React Native (0.84)
- JavaScript
- useReducer (State Management)
- Modular Engine Architecture
- Jest (Unit Testing)
- Android APK Build

---

## 📂 Project Structure
TacticalGame/
│
├── src/
│ ├── engine/ # Movement, Combat, AI logic
│ ├── screens/ # Game UI (GameScreen)
│ ├── state/ # Reducer and initial state
│ ├── components/ # UI components
│ └── utils/ # Helper utilities
│
├── tests/ # Jest unit tests
│
├── android/ # Android native project
├── App.tsx
├── package.json
└── README.md

---

---

## 🧩 Architecture Overview

- UI Layer → React Native components
- State Layer → useReducer for centralized state management
- Engine Layer → Pure functions (Movement, Combat, AI)
- Tests → Isolated unit tests for engine logic

The project follows separation of concerns:
- UI handles rendering only
- Reducer handles state transitions
- Engine handles pure game logic

---

## 🧪 Running the Project

### Install dependencies

```bash
npm install
###Start Metro
npx react-native start
###Run Android
npx react-native run-android
###🧪 Running Tests
npm test
###📦 Building APK (Android)
cd android
gradlew.bat assembleRelease
###APK output location:
android/app/build/outputs/apk/release/app-release.apk

---
🎯 Learning Goals

This project was built to practice:

Reducer-based state management

Immutable state updates

Modular architecture design

Basic AI movement strategy

Unit testing in React Native

Android APK generation
## 📸 Gameplay Screenshot

![Gameplay Screenshot](assets/screenshot.png)

---
👨‍💻 Author

Mukesh Kumar
Undergraduate (2nd Year), Department of Instrumentation and Control Engineering, NIT Tiruchirappalli.
