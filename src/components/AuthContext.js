import { createContext, useState, useContext } from 'react';

// Create the authentication context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// AuthProvider to wrap around your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulating login/logout logic (you would replace this with real logic)
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
