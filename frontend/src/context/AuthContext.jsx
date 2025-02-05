import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [showLoginModal, setShowLoginModal] = useState(false);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setShowLoginModal(false); // Cierra el modal después del login
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, showLoginModal, setShowLoginModal, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
