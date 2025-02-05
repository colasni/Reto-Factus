//import React from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, setShowLoginModal } = useAuth();

  if (!isAuthenticated) {
    setShowLoginModal(true); // Abre el modal en vez de redirigir
    return null; // Evita que la página protegida se renderice
  }

  return element;
};

export default ProtectedRoute;
