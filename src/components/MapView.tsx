import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import MapboxGL from "@rnmapbox/maps";
import {
  useSearchLocationsQuery,
  useGetRouteQuery,
  mapboxApi,
} from "../services/mapboxApi"; // Import hooks
import { fontPixel } from "@/utils/normalize";
import { useDispatch, useSelector } from "react-redux";
import * as Network from "expo-network";
import { createRoutesTable, insertRoute } from "../services/dbService";
import { fetchRoutesFromDb } from "@/utils/getOfflineRoutes";
import { useAppSelector } from "../hooks/reduxHooks";
const mapboxKey: any = process.env.EXPO_PUBLIC_MAPBOX_KEY;

MapboxGL.setAccessToken(mapboxKey);

const MapView = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [activeInput, setActiveInput] = useState<any>("start");
  const [offlineRouteCoordinates, setOfflineRouteCoordinates] = useState<any[]>(
    []
  );
  const vehicles = useAppSelector((state: any) => state?.vehicle?.vehicles);

  // Use RTK Query hooks
  const {
    data: searchResults,
    isLoading: isSearching,
    error: searchError,
  } = useSearchLocationsQuery(searchQuery, {
    skip: !searchQuery, // Skip the query if searchQuery is empty
  });

  const {
    data: routeCoordinates,
    isLoading: isRouting,
    error,
  } = useGetRouteQuery({ start, end }, { skip: !start || !end });

  const selectLocation = (location: any) => {
    const { geometry }: any = location;
    const coordinates = {
      latitude: geometry?.coordinates[1],
      longitude: geometry?.coordinates[0],
    };

    if (activeInput === "start") {
      setStart(coordinates);
      setActiveInput("end");
    } else {
      setEnd(coordinates);
      setActiveInput("start");
    }

    // Close the location list by resetting searchQuery
    setSearchQuery(""); // Clear search query
    dispatch(mapboxApi.util.resetApiState());
  };

  const renderMarkers = (items: any[], iconColor: string) => {
    return items.map(
      (item: { id: string | undefined; lng: number; lat: number }) => (
        <MapboxGL.PointAnnotation
          key={item.id}
          id={item.id}
          coordinate={[item.lng, item.lat]}
        >
          <View style={[styles.marker, { backgroundColor: iconColor }]} />
        </MapboxGL.PointAnnotation>
      )
    );
  };

  const renderRoute = () => {
    const coordinates =
      offlineRouteCoordinates.length > 0
        ? offlineRouteCoordinates
        : routeCoordinates;
    if (coordinates?.length > 0) {
      return (
        <MapboxGL.ShapeSource
          id="routeSource"
          shape={{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          }}
        >
          <MapboxGL.LineLayer
            id="routeLayer"
            style={{ lineWidth: 5, lineColor: "blue" }}
          />
        </MapboxGL.ShapeSource>
      );
    }
    return null;
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Create the table when the app opens
        await createRoutesTable();
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDatabase();
  }, []);

  useEffect(() => {
    if (routeCoordinates?.length > 0) {
      // Insert the route into the database after the route is fetched
      const coordinatesString = JSON.stringify(routeCoordinates); // Ensure coordinates are passed as an array
      if (start && end) {
        insertRoute(start, end, routeCoordinates); // Pass coordinates as array
      }
    }
  }, [routeCoordinates, start, end]);
  // console.log(offlineRouteCoordinates);
  const handleGetRoute = async () => {
    if (!start || !end) {
      //  Alert.alert("Error", "Please set both start and end points.");
      return;
    }

    const isOnline = await Network.getNetworkStateAsync().then(
      (state) => state.isConnected && state.isInternetReachable
    );

    if (isOnline) {
      setOfflineRouteCoordinates([]);
    } else {
      const route = await fetchRoutesFromDb(start, end);
      if (route) {
        setOfflineRouteCoordinates(JSON.parse(route));
      } else {
        // Alert.alert(
        //   "Offline Error",
        //   "No stored route found for these locations."
        // );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputToggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeInput === "start" ? styles.activeToggle : null,
            ]}
            testID="toggle-start"
            onPress={() => setActiveInput("start")}
          >
            <Text
              style={[
                styles.toggleText,
                { color: activeInput === "start" ? "white" : "black" },
              ]}
            >
              Start
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeInput === "end" ? styles.activeToggle : null,
            ]}
            onPress={() => setActiveInput("end")}
          >
            <Text
              style={[
                styles.toggleText,
                { color: activeInput === "end" ? "white" : "black" },
              ]}
            >
              End
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder={
            activeInput === "start"
              ? "Search Start Location"
              : "Search End Location"
          }
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="search-input"
        />
        {isSearching && <Text>Loading...</Text>}
        {searchResults && searchResults.length === 0 && !isSearching && (
          <Text>No results found</Text>
        )}
        {searchQuery && !isSearching && searchResults && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                onPress={() => {
                  selectLocation(item);
                  handleGetRoute();
                }}
                style={styles.searchResult}
              >
                <Text style={[styles.toggleText, { color: "black" }]}>
                  {item.place_name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={12} centerCoordinate={[3.3792, 6.5244]} />
        {/* Render Buses */}
        {/* {renderMarkers(mockData.buses, "blue")} */}
        {/* Render Trains */}
        {renderMarkers(vehicles, "red")}
        {/* Start Marker */}
        {start && (
          <MapboxGL.PointAnnotation
            id="start"
            coordinate={[start.longitude, start.latitude]}
          >
            <View style={[styles.marker, { backgroundColor: "green" }]} />
          </MapboxGL.PointAnnotation>
        )}
        {/* End Marker */}
        {end && (
          <MapboxGL.PointAnnotation
            id="end"
            coordinate={[end.longitude, end.latitude]}
          >
            <View style={[styles.marker, { backgroundColor: "red" }]} />
          </MapboxGL.PointAnnotation>
        )}
        {/* Render Route */}
        {renderRoute()}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    width: "100%",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  inputToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "gray",
  },
  toggleText: {
    color: "white",
    fontSize: fontPixel(16),
    fontWeight: "600",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "black",
    fontSize: fontPixel(16),
    fontWeight: "600",
  },
  searchResult: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default MapView;
