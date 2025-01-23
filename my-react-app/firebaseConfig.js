// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth module from Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrBNGfWAvP0ZMfFAeimrx5MH7dxWUdk0s",
  authDomain: "event-planner-b8317.firebaseapp.com",
  projectId: "event-planner-b8317",
  storageBucket: "event-planner-b8317.firebasestorage.app",
  messagingSenderId: "388101445099",
  appId: "1:388101445099:web:a74c8b89a058b67c67f5ae",
  measurementId: "G-EJ50W1P03S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export auth so you can use it in your app (e.g., for login/signup)
export { auth };
