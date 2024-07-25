import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('AuthProvider: Loaded token from localStorage:', token);
    setIsAuthenticated(!!token); // Set authenticated if token exists
  }, []);

  const login = (token) => {
    console.log('AuthProvider: Logging in with token');
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    console.log('AuthProvider: Logging out');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
