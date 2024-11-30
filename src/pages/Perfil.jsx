import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, logoutUser } from "../redux/userSlice";
import api from "../../api";

const Perfil = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [description, setDescription] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentUser,
    status,
    error: updateError,
  } = useSelector((state) => state.user);

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
          description: response.data.description || "",
        });
        setDescription(response.data.description || "");
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
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword && newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const updatedData = {};
    if (description !== user.description) {
      updatedData.description = description;
    }
    if (newPassword) {
      updatedData.password = newPassword;
    }

    if (Object.keys(updatedData).length === 0) {
      setMessage("Nenhuma alteração foi feita.");
      return;
    }

    try {
      await dispatch(updateProfile(updatedData)).unwrap();
      setMessage("Perfil atualizado com sucesso.");
      setUser((prevUser) => ({
        ...prevUser,
        description: description,
      }));
      setNewPassword("");
      setConfirmPassword("");
      setIsEditing(false); // Sai do modo de edição
    } catch (err) {
      setError(err || "Erro ao atualizar perfil.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="px-16 mb-12">
        <div className="p-8 bg-white shadow mt-24 rounded-xl">
          <div className="flex flex-col items-center">
            <img
              src="https://picsum.photos/180/180"
              className="rounded-full mb-4"
              alt={`${user.name}_Perfil`}
            />

            <h1 className="text-4xl font-medium text-gray-700">{user.name}</h1>
            <p className="font-light text-gray-600 mt-1">{user.email}</p>
          </div>

          <div className="mt-8">
            {isEditing ? (
              <form
                onSubmit={handleUpdateProfile}
                className="space-y-6 w-full max-w-md mx-auto"
              >
                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descrição do perfil
                  </label>
                  <textarea
                    id="description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    rows="4"
                    placeholder="Escreva algo sobre você"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="w-full mt-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nova Senha
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Nova Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  />
                </div>

                <div className="w-full mt-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirmar Nova Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmar Nova Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  />
                </div>

                {message && (
                  <p className="text-green-500 text-center mt-4">{message}</p>
                )}
                {error && (
                  <p className="text-red-500 text-center mt-4">{error}</p>
                )}

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mt-6">{user.description}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  Editar Perfil
                </button>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleLogout}
                className="text-indigo-500 py-2 px-4 font-medium hover:underline focus:outline-none"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
