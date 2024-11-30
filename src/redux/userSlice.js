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
        error.response?.data?.error || "Erro ao registrar o usuário."
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

      // Após o login, buscamos o perfil do usuário
      const profileResponse = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      return {
        user: profileResponse.data,
        token: response.data.token,
        role: response.data.role,
      };
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
      return rejectWithValue(
        error.response?.data?.error || "Erro ao efetuar login."
      );
    }
  }
);

// Atualizar perfil do usuário logado
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await api.put("/users/profile", updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return rejectWithValue(
        error.response?.data?.error || "Erro ao atualizar perfil."
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

// Editar usuário (administrador)
export const editUser = createAsyncThunk(
  "user/edit",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}`, updatedData, {
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
    role: localStorage.getItem("role") || null,
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
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
        state.role = action.payload.role;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
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
      // Edit user (administrador)
      .addCase(editUser.fulfilled, (state, action) => {
        // Atualiza o usuário na lista de usuários
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
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
