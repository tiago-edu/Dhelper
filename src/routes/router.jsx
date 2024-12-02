// router.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Us from "../pages/Us";
import Perfil from "../pages/Perfil";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import AddPlace from "../pages/AddPlace";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        exact
        path="/addplace"
        element={
          <ProtectedRoute adminOnly={true}>
            <AddPlace />
          </ProtectedRoute>
        }
      />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route exact path="/about" element={<Us />} />
      <Route exact path="/contact" element={<Contact />} />

      {/* Rotas protegidas */}
      <Route
        exact
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />

      {/* Exemplo de rota apenas para admin */}
      <Route
        exact
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            {/* Substitua pelo componente da página de administrador */}
            <h1>Página de Administrador</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
