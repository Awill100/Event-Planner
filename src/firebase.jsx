// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyCxPag-TKJHxjT_ib8rB57uVBs9XWZTRnU",
  authDomain: "weather-app-b92e3.firebaseapp.com",
  projectId: "weather-app-b92e3",
  storageBucket: "weather-app-b92e3.firebasestorage.app",
  messagingSenderId: "875514629599",
  appId: "1:875514629599:web:9f1692974f90f29744486a",
  measurementId: "G-9ZYBP0C8FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth and firestore services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
