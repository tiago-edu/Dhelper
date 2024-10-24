import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Ações assíncronas
export const fetchPlaces = createAsyncThunk("places/fetchPlaces", async () => {
  const response = await api.get("/places");
  return response.data;
});

export const addPlace = createAsyncThunk(
  "places/addPlace",
  async (place, { getState }) => {
    const token = getState().user.token;
    const response = await api.post("/places", place, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updatePlace = createAsyncThunk(
  "places/updatePlace",
  async ({ placeId, newAttributes }, { getState }) => {
    const token = getState().user.token;
    const response = await api.put(`/places/${placeId}`, newAttributes, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deletePlace = createAsyncThunk(
  "places/deletePlace",
  async (placeId, { getState }) => {
    const token = getState().user.token;
    await api.delete(`/places/${placeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return placeId;
  }
);

// Slice para gerenciar estado dos lugares
const placesSlice = createSlice({
  name: "places",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.fulfilled, (state, action) => action.payload)
      .addCase(addPlace.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        const index = state.findIndex(
          (place) => place.id === action.payload.id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        return state.filter((place) => place.id !== action.payload);
      });
  },
});

export default placesSlice.reducer;
