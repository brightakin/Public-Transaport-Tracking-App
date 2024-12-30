import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification, setVehicles } from "../redux/slices/vehicleSlice";
import { connectSocket } from "../services/socketService";
import { useAppDispatch } from "../hooks/reduxHooks";

const SocketListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = connectSocket();

    // Listen for vehicle updates
    socket.on("vehicleUpdate", (data: any) => {
      dispatch(setVehicles(data));
    });

    // Listen for notifications
    socket.on("notification", (notification: any) => {
      dispatch(addNotification(notification));
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return null;
};

export default SocketListener;
