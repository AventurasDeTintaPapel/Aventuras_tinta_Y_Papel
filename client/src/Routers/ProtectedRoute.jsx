// ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rutas que requieran autenticación
const ProtectedRoute = ({ children, user }) => {
  // Verifica si el usuario está autenticado y si es administrador
  if (!user || user.rol !== 'admin') {
    // Redirige a la página de login si no es administrador
    return <Navigate to="/login" replace />;
  }

  // Si es administrador, muestra el contenido protegido
  return children;
};

export default ProtectedRoute;
