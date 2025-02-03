// import { createContext, useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('userRole');
//     if (token && role) {
//       setIsAuthenticated(true);
//       setUserRole(role);
//     }
//   }, []);

//   const login = (token, role) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userRole', role);
//     setIsAuthenticated(true);
//     setUserRole(role);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     setIsAuthenticated(false);
//     setUserRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BASE_URL from '../api/BaseUrl';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Function to check if the user is blocked
  const checkIfBlocked = useCallback(async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/is-blocked`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      return response.data; // `true` for blocked, `false` for not blocked
    } catch (error) {
      console.error('Error checking block status:', error);
      return true; // Treat as blocked in case of an error
    }
  }, []);

  // Function to handle logout
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  }, []);

  // Function to initialize user authentication
  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token && role) {
      const isBlocked = await checkIfBlocked(token);
      if (!isBlocked) {
        setIsAuthenticated(true);
        setUserRole(role);
      } else {
        logout();
      }
    }
  }, [checkIfBlocked, logout]);

  // Periodic block status check
  useEffect(() => {
    let interval;
    const token = localStorage.getItem('token');

    if (token) {
      initializeAuth();

      interval = setInterval(async () => {
        const isBlocked = await checkIfBlocked(token);
        if (isBlocked) {
          logout();
        }
      }, 60000); 
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [checkIfBlocked, initializeAuth, logout]);

  // Login function
  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
