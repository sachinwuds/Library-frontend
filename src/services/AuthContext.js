import { createContext, useState, useContext } from 'react';

// Create the authentication context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize the isAuthenticated state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is authenticated in localStorage on page load
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Login function: set isAuthenticated to true and store in localStorage
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Persist login state
  };

  // Logout function: set isAuthenticated to false and remove from localStorage
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear login state on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
