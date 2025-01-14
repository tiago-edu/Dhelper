import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Ações assíncronas
export const  fetchPlaces = createAsyncThunk(
  "places/fetchPlaces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/places");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar lugares:", error);
      return rejectWithValue(
        error.response?.data?.message || "Erro ao buscar lugares."
      );
    }
  }
);

export const addPlace = createAsyncThunk(
  "places/addPlace",
  async (place, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const response = await api.post("/places", place, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
      console.log("Token obtido:", token);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar lugar:", error);
      return rejectWithValue(
        error.response?.data?.message || "Erro ao adicionar lugar."
      );
    }
  }
);

export const updatePlace = createAsyncThunk(
  "places/updatePlace",
  async ({ placeId, newAttributes }, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const response = await api.put(`/places/${placeId}`, newAttributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar lugar:", error);
      return rejectWithValue(
        error.response?.data?.message || "Erro ao atualizar lugar."
      );
    }
  }
);

export const deletePlace = createAsyncThunk(
  "places/deletePlace",
  async (placeId, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      await api.delete(`/places/${placeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return placeId;
    } catch (error) {
      console.error("Erro ao deletar lugar:", error);
      return rejectWithValue(
        error.response?.data?.message || "Erro ao deletar lugar."
      );
    }
  }
);

// Slice para gerenciar estado dos lugares
const placesSlice = createSlice({
  name: "places",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Places
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Place
      .addCase(addPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Place
      .addCase(updatePlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (place) => place.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Place
      .addCase(deletePlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((place) => place.id !== action.payload);
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default placesSlice.reducer;
