import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import the auth from your firebase.js

const FirebaseTest = () => {
  useEffect(() => {
    // Check Firebase Authentication connection
    const authStatus = getAuth();

    const unsubscribe = onAuthStateChanged(authStatus, (user) => {
      if (user) {
        console.log("User is logged in:", user.email);
      } else {
        console.log("User is not logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return <div>Firebase Connection Test</div>;
};

export default FirebaseTest;
