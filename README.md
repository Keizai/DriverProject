# Ride Sharing Driver Application 🚗

A mobile application for drivers to manage ride requests efficiently. This app allows drivers to:

- View nearby ride requests on a map.
- Accept or decline ride requests with real-time status updates.
- Monitor API requests, Redux state changes, and logs using **Reactotron**.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [Running the App](#running-the-app)
5. [Testing](#testing)
6. [Performance Optimizations](#performance-optimizations)
7. [Debugging with Reactotron](#debugging-with-reactotron)
8. [FAQ](#faq)

---

## Features

- Interactive map to display ride requests using **React Native Maps**.
- **Redux Toolkit** for managing ride data and status updates.
- Mock RESTful API powered by **axios-mock-adapter**.
- Unit tests for Redux slices using **Jest**.
- Real-time debugging and performance monitoring with **Reactotron**.

---

## Tech Stack

- **React Native**: Front-end framework for mobile app development.
- **Redux Toolkit**: Simplified state management.
- **Axios**: For HTTP requests.
- **Reactotron**: Debugging tool for Redux, network requests, and more.
- **Jest**: Testing framework for unit and integration tests.
- **TypeScript**: For type safety and better developer experience.

---

## Setup Instructions

Follow these steps to set up the project:

### Prerequisites

1. Install **Node.js** (version 16.x or later): [Download here](https://nodejs.org/)
2. Install **Yarn** (if not already installed):
   ```bash
   npm install -g yarn
   ```
3. Install **React Native CLI**:
   ```bash
   npm install -g react-native-cli
   ```
4. Ensure you have Android Studio or Xcode installed for running the app on emulators.

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/ride-sharing-driver-app.git
   cd ride-sharing-driver-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up a development environment for React Native:
   Follow the official [React Native setup guide](https://reactnative.dev/docs/environment-setup).

4. (Optional) Install **Reactotron** for debugging:
   Download it from [Reactotron GitHub](https://github.com/infinitered/reactotron).

---

## Running the App

1. Start the Metro bundler:

   ```bash
   yarn start
   ```

2. Run the app on an emulator or physical device:

   - For iOS:
     ```bash
     yarn ios
     ```
   - This app is not supported Android becuase it don't integrate the Google Map

3. (Optional) Monitor debugging with Reactotron:
   - Ensure the app and Reactotron are running on the same network.
   - Check the logs, Redux actions, and API requests in the Reactotron app.

---

## Testing

Run unit tests using Jest:

```bash
yarn test
```

### Coverage

Generate a test coverage report:

```bash
yarn test --coverage
```

---

## Performance Optimizations

1. **Memoization**:
   - Used `Reselect` to prevent unnecessary recomputations in selectors.
2. **React.memo**:
   - Optimized static components (buttons) to avoid re-renders.

---

## Debugging with Reactotron

### Features:

- Monitor Redux actions and state changes.
- Inspect API requests and responses.
- View logs and performance metrics in real-time.

### Setup:

- Reactotron is pre-configured in `ReactotronConfig.js`.
- To enable:
  1. Start Reactotron on your computer.
  2. Run the app in development mode.

---

## FAQ

### **1. Why is the app not connecting to Reactotron?**

Ensure the app and Reactotron are on the same network. If using a physical device, update the `host` in `ReactotronConfig.js` to your computer's IP.

### **2. How do I mock API responses?**

API responses are mocked using `axios-mock-adapter` in `/src/services/index.ts`. Adjust the mock responses as needed for development or testing.

### **3. Why is the map not displaying?**

- Ensure `react-native-maps` is correctly installed and linked.

---
