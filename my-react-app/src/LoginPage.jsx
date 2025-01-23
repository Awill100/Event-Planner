import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase method for signing in
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate(); // Hook to navigate after login

  // Validate input fields
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

    return validationErrors;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Sign in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      setErrors({});
      setLoginStatus("");
      // Redirect to MainPage after successful login
      navigate("/main");
    } catch (error) {
      setLoginStatus("Invalid email or password");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Navigate to Sign Up page
  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="title">Login</h2>

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
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <button type="submit" className="button">
          Login
        </button>

        {loginStatus && <p className="status-message">{loginStatus}</p>}

        <div className="signup-link">
          <p>Don't have an account?</p>
          <button type="button" className="button" onClick={goToSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
