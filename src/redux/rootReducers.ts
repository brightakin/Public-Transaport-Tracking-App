import { combineReducers } from "redux";
import vehicle from "../redux/slices/vehicleSlice";
export default combineReducers<any>({
  vehicle,
});
