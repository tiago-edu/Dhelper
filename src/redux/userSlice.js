import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Ação de login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials) => {
    const response = await api.post("/users/login", credentials);
    const userData = response.data;

    if (userData.token) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return userData;
  }
);

// Slice para gerenciar estado do usuário
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.userInfo = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.token = action.payload.token;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
