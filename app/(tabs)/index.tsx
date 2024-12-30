import MapView from "@/src/components/MapView";
import { StyleSheet } from "react-native";

//Mapbox.setConnected(true);

export default function HomeScreen() {
  return <MapView />;
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
});
