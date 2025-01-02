import React, { createContext, useState, useContext } from 'react';

// Create an AuthContext to manage user authentication
const AuthContext = createContext();

// Simulated user data
const mockUser = { email: "admin@gmail.com", password: "123" }; // Replace with your mock user

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the logged-in user
  const [loading, setLoading] = useState(true); // Handle loading state

  // Simulate the login method
  const login = async (email, password) => {
    if (email === mockUser.email && password === mockUser.password) {
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser)); // Store user in localStorage
    } else {
      throw new Error("Invalid email or password");
    }
  };

  // Simulate the signup method (for demo purposes, stores the mock user)
  const signup = async (email, password) => {
    if (email === mockUser.email) {
      throw new Error("This email is already registered");
    }
    // In a real app, you would add the user to your database here
    setUser({ email, password });
    localStorage.setItem('user', JSON.stringify({ email, password }));
  };

  // Simulate the logout method
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is logged in on initial load (localStorage check)
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
