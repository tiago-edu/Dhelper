import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Ações assíncronas para interagir com a API

// Registro de usuário
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
      return rejectWithValue(
        error.response.data.message || "Erro ao registrar o usuário."
      );
    }
  }
);

// Login de usuário
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      return response.data;
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
      return rejectWithValue(
        error.response?.data?.message || "Erro ao efetuar login."
      );
    }
  }
);

// Buscar todos os usuários
export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return rejectWithValue("Erro ao buscar usuários.");
    }
  }
);

// Buscar usuário por ID
export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return rejectWithValue("Erro ao buscar usuário.");
    }
  }
);

// Editar usuário
export const editUser = createAsyncThunk(
  "user/edit",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/edit/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return rejectWithValue("Erro ao atualizar usuário.");
    }
  }
);

// Deletar usuário
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return userId; // Retorna o ID do usuário deletado
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return rejectWithValue("Erro ao deletar usuário.");
    }
  }
);

// Slice para gerenciar o estado de usuário
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Login user
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch all users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch user by ID
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Edit user
      .addCase(editUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
