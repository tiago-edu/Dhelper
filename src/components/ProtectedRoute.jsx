import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // Redireciona para login se não estiver logado
    return <Navigate to="/login" />;
  }

  if (adminOnly && userRole !== "Admin") {
    // Redireciona para a página inicial se o usuário não for administrador
    return <Navigate to="/" />;
  }

  // Renderiza o componente filho apenas para usuários autorizados
  return token && (!adminOnly || userRole === "Admin") ? children : null;
};

export default ProtectedRoute;
