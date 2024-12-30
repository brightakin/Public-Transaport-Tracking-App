import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./rootReducers"; // This should already combine your other slices
import { mapboxApi } from "../services/mapboxApi";
import vehicle from "../redux/slices/vehicleSlice";

// Persist configuration
const persistConfig = {
  key: "tracking",
  storage: AsyncStorage,
  blacklist: ["auth"], // Specify reducers you don't want to persist
  stateReconciler: autoMergeLevel2,
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: {
    vehicle, // Add the persisted reducer here
    [mapboxApi.reducerPath]: mapboxApi.reducer, // Include mapboxApi slice
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      mapboxApi.middleware
    ),
});

// Create the persistor
export const persistor = persistStore(store);

// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
