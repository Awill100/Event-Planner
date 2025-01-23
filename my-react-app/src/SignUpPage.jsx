import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import the auth object from firebaseConfig
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase auth method for creating users
import "./SignUpPage.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate the inputs
  const validate = () => {
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    return validationErrors;
  };

  // Handle the sign-up submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log("Trying to sign up with email:", email); // Debugging line
      // Create the user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      setErrors({});
      // Redirect to the login page after successful sign-up
      navigate("/");
    } catch (error) {
      console.error("Firebase Error:", error); // Debugging line
      setErrors({ firebase: error.message });
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignUp}>
        <h2 className="title">Sign Up</h2>

        <div className="input-group">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div className="input-group">
          <label className="label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        {errors.firebase && <p className="error-message">{errors.firebase}</p>}

        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
