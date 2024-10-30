import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Perfil = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "Nenhuma descrição disponível",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token de autenticação não encontrado.");
          navigate("/login");
          return;
        }

        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({
          name: response.data.name,
          email: response.data.email,
          description:
            response.data.description || "Nenhuma descrição disponível",
        });
      } catch (error) {
        setError(
          "Erro ao buscar dados do usuário. Por favor, faça login novamente."
        );
        console.error("Erro ao buscar perfil:", error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <Nav />
      <div className="px-16 mb-12">
        <div className="p-8 bg-white shadow mt-24 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div className="relative">
              <div className="mx-auto absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                <img
                  src="https://picsum.photos/180/180"
                  className="rounded-full mb-10"
                  alt={`${user.name}_Perfil`}
                />
              </div>
            </div>
          </div>

          <div className="mt-36 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{user.name}</h1>
            <p className="font-light text-gray-600 mt-3">{user.email}</p>
          </div>

          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">
              {user.description}
            </p>
            <button
              onClick={handleLogout}
              className="text-indigo-500 py-2 px-4 font-medium mt-4 text-center"
            >
              Exit
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Perfil;
