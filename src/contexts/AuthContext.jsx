import React, { createContext, useState, useContext, useEffect } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    verificacionLog();
  }, []);

  const login = (email) => {
    const token = `fake-token-${email}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email); // Guardamos el email también
    
    setUser(email);
    setAdmin(email === "admin@gmail.com");
    dispararSweetBasico("Usuario logueado","", "success", "Confirmar");
    navigate('/perfil');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setUser(null);
    setAdmin(false);
    dispararSweetBasico("Sesion cerrada","", "success", "Confirmar");
  };

  const verificacionLog = () => {
    const userToken = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");
    
    if (userToken && userEmail) {
      setUser(userEmail);
      setAdmin(userEmail === "admin@gmail.com");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      admin, 
      login, 
      logout, 
      verificacionLog 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);