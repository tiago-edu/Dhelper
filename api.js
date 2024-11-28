import axios from "axios";

// Criação da instância do axios com configurações básicas
const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

// Interceptor de requisição: Adiciona tokens ou headers de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta: Tratamento centralizado de erros e logs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        "Erro do servidor:",
        error.response.status,
        error.response.data
      );
      if (error.response.status === 401) {
        console.warn(
          "Token inválido ou expirado, redirecionando para o login..."
        );
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
    } else {
      console.error("Erro na requisição:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
