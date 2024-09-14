import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import api from "../../api";

// Criação do contexto
export const PlaceContext = createContext({});

// Validação das props do provider
PlaceContextProvider.propTypes = {
  children: PropTypes.node,
};

export function PlaceContextProvider({ children }) {
  // Estado dos lugares e do usuário
  const [places, setPlaces] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Funções utilitárias de autenticação e headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
      return { Authorization: `Bearer ${token}` };
    } else {
      console.error("Token de autorização não encontrado ou inválido.");
      return {};
    }
  };

  const logError = (message, error) => {
    console.error(message);
    if (error.response) {
      console.error("Resposta do servidor:", error.response);
      console.error("Dados do erro:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Sem resposta do servidor. Request:", error.request);
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
    }
    console.error("Configuração do Axios:", error.config);
  };

  // Funções de gerenciamento de lugares
  const fetchPlaces = useCallback(async () => {
    try {
      const response = await api.get("/places");
      setPlaces(response.data);
    } catch (error) {
      logError("Erro ao buscar lugares:", error);
    }
  }, []);

  const addPlace = async (place) => {
    try {
      const response = await api.post("/places", place, {
        headers: getAuthHeaders(),
      });
      setPlaces((prevPlaces) => [...prevPlaces, response.data]);
    } catch (error) {
      logError("Erro ao adicionar lugar:", error);
    }
  };

  const getPlace = (placeId) => {
    return places.find((p) => p.id === +placeId);
  };

  const updatePlace = async (placeId, newAttributes) => {
    try {
      const updatedData = {
        ...newAttributes, // Atribui todos os novos atributos fornecidos
      };

      const response = await api.put(`/places/${placeId}`, updatedData, {
        headers: getAuthHeaders(),
      });

      setPlaces((prevPlaces) =>
        prevPlaces.map((place) =>
          place.id === placeId ? response.data : place
        )
      );
    } catch (error) {
      logError("Erro ao atualizar lugar:", error);
    }
  };

  const deletePlace = async (placeId) => {
    try {
      await api.delete(`/places/${placeId}`, {
        headers: getAuthHeaders(),
      });
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== placeId)
      );
    } catch (error) {
      logError("Erro ao deletar lugar:", error);
    }
  };

  // Efeito para buscar lugares ao montar o componente
  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  // Funções de gerenciamento de autenticação
  const loginUser = async (credentials) => {
    try {
      const response = await api.post("/users/login", credentials);
      const userData = response.data;

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.error("Token JWT não fornecido durante o login.");
      }
    } catch (error) {
      logError("Erro ao fazer login:", error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Objeto de valor do contexto
  const placeContext = {
    places,
    addPlace,
    getPlace,
    updatePlace,
    deletePlace,
    fetchPlaces,
    user,
    loginUser,
    logoutUser,
  };

  return (
    <PlaceContext.Provider value={placeContext}>
      {children}
    </PlaceContext.Provider>
  );
}
