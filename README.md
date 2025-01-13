# **Public Transport Tracking App**

A real-time public transport tracking application designed to provide users with accurate and up-to-date information about public transport services, including buses, trains, and other modes of transport. The app helps commuters by providing live location updates, route suggestions, and scheduled timings for a more efficient and informed travel experience.

## **Features**

- **Real-Time Transport Tracking**: Track the location of buses, trains, and other public transport vehicles on an interactive map.
- **Route Suggestions**: Get the best route suggestions based on your location, destination, and real-time transport data.
- **Scheduled Timings**: View upcoming bus/train schedules and set reminders for upcoming transport services.

## **Technologies Used**

This app uses a combination of modern technologies and libraries to ensure a smooth, responsive, and efficient user experience:

### **Frontend**

- **React Native**: A cross-platform mobile framework for building native apps using JavaScript and React.
- **Expo**: A set of tools built around React Native to streamline development, testing, and deployment.
- **Expo Router**: A routing library used for managing app navigation in a modular way, ensuring easy and efficient navigation between screens.
- **React Navigation**: Manages app navigation flow, including stack and tab navigation, to provide a seamless user experience.
- **Redux**: A predictable state container for JavaScript apps that manages the state of transport data, user preferences, and app configurations.
- **Expo Location**: Provides location services to track the user’s position in real time, enabling features like live transport tracking.
- **Mapbox**: Integrated for rendering interactive, customizable maps. It allows the app to display real-time transport data, routes, and user locations with high levels of customization and control over the map design.

### **Backend**

- **Node.js & Express**: Server-side technologies used for handling HTTP requests, serving live transport data, and managing authentication and user profiles.
- **Socket.io**: A real-time communication library for streaming transport data, including live location updates and real-time notifications.

### **Maps and Data**

- **MapBox SDK**: Provides an interactive map view with real-time updates of transport vehicle locations, route planning, and directions.
- **Public Transport Data APIs**: Used to fetch live transport data, including real-time locations, schedules, and route information for buses, trains, and other public transport services.

## **Installation**

### **Prerequisites**

Before running the app, make sure you have the following tools installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org)
- **Expo CLI**: Install Expo CLI globally by running the following command:
  ```bash
  npm install -g expo-cli

### **Setup**

1. **Clone the repository** to your local machine:
   git clone https://github.com/your-username/public-transport-tracking-app.git
2. cd public-transport-tracking-app
3. Get the env file and add it to the root directory
4. npm install
5. npx expo prebuild
6. npx expo run:android
7. npx expo start

