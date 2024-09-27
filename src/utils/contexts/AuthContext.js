import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext with a default value of undefined
const AuthContext = createContext(undefined);

// Create the AuthProvider to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Navigate to different routes when needed

  // Login method to update context
  const login = (userData) => {
    setUser(userData);
  };

  // Logout method to clear context
  const logout = () => {
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  // Return the AuthContext.Provider with value containing the context data
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
