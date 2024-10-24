import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./placesSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    places: placesReducer,
    user: userReducer,
  },
});

export default store;
