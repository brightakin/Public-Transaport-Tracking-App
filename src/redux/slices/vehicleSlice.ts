import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  vehicles: [], // Array to store vehicle data
  notifications: [], // Array to store notifications
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    addNotification: (state: any, action: any) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { setVehicles, addNotification, clearNotifications } =
  vehicleSlice.actions;

export const vehicle = (state: RootState): any => state.vehicle;

export default vehicleSlice.reducer;
