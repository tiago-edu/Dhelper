import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, editUser } from "../redux/userSlice";
import Nav from "../components/Nav";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error: globalError } = useSelector(
    (state) => state.users || {}
  );

  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [fetchedUsers, setFetchedUsers] = useState([]); // Estado para armazenar usuários

  useEffect(() => {
    dispatch(fetchUsers());
    
    // Lógica de autenticação e requisição dos dados
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLocalError("Token de autenticação não encontrado.");
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFetchedUsers(response.data); // Armazena os dados da API
        console.log(response.data);
      } catch (err) {
        setLocalError("Erro ao carregar os dados.");
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setLocalError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const updatedUser = { userId: selectedUser.id, updatedData: formData };
      await dispatch(editUser(updatedUser)).unwrap();
      setSuccessMessage("Usuário atualizado com sucesso!");
      setLocalError(null);
      setSelectedUser(null); // Reset selected user
      setFormData({ name: "", email: "", role: "" }); // Reset form fields
    } catch (err) {
      setLocalError(
        err.message || "Erro ao atualizar usuário. Tente novamente."
      );
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h2>
        {(localError || globalError) && (
          <p className="text-red-500">{localError || globalError}</p>
        )}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="flex">
          <div className="w-1/2 pr-4">
            <h3 className="text-lg font-bold mb-2">Lista de Usuários</h3>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="space-y-2">
                {fetchedUsers && fetchedUsers.length > 0 ? (
                  fetchedUsers.map((user) => (
                    <li
                    
                      key={user.id}
                      className="p-2 border rounded-md cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectUser(user)}
                    >
                      <p>{user.name} ({user.email})</p>
                    </li>
                  ))
                ) : (
                  <p>Nenhum usuário encontrado.</p>
                )}
              </ul>
            )}
          </div>
          <div className="w-1/2">
            {selectedUser && (
              <>
                <h3 className="text-lg font-bold mb-2">
                  Editar Usuário: {selectedUser.name}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecione um cargo</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuário</option>
                  </select>
                  <button
                    type="submit"
                    className={`mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Atualizando..." : "Atualizar Usuário"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
