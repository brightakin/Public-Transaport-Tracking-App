import * as SQLite from "expo-sqlite";

// Open or create the SQLite database
const db = SQLite.openDatabaseSync("routes.db");

// Function to create the 'routes' table
export const createRoutesTable = async () => {
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS routes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      start_latitude REAL,
      start_longitude REAL,
      end_latitude REAL,
      end_longitude REAL,
      coordinates TEXT
    );`);
  } catch (error) {
    console.error("Error creating routes table: ", error);
  }
};

export const fetchRoutes = async (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number }
) => {
  try {
    // Use a query to match the start and end points
    const query = `
      SELECT * FROM routes
    `;
    const result: any = await (
      await db
    ).getFirstAsync(query, [
      start.latitude,
      start.longitude,
      end.latitude,
      end.longitude,
    ]);

    // Parse the JSON string back to an array of coordinates
    const routes = result.coordinates; // Parse JSON string back to array

    return routes; // Return the first route's coordinates or null if not found
  } catch (error) {
    console.error("Error fetching routes:", error);
    return null;
  }
};

// Function to insert a route into the database
export const insertRoute = async (
  start: { start_latitude: number; start_longitude: number },
  end: { end_latitude: number; end_longitude: number },
  coordinates: [number, number][] | any // Coordinates are passed as an array of [number, number] tuples
) => {
  try {
    const { start_latitude, start_longitude } = start;
    const { end_latitude, end_longitude } = end;

    // Convert the coordinates array to a JSON string before inserting into SQLite
    const coordinatesString = JSON.stringify(coordinates);

    // Insert the route into the routes table
    const result = await db.runAsync(
      `INSERT INTO routes (start_latitude, start_longitude, end_latitude, end_longitude, coordinates) VALUES (?, ?, ?, ?, ?)`,
      [
        start_latitude,
        start_longitude,
        end_latitude,
        end_longitude,
        coordinatesString,
      ]
    );
  } catch (error) {
    console.error("Error inserting route into database:", error);
  }
};

// Function to update a route by ID
export const updateRoute = async (
  id: number,
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
  coordinates: [number, number][]
) => {
  try {
    await db.runAsync(
      `UPDATE routes 
      SET start_latitude = ?, start_longitude = ?, end_latitude = ?, end_longitude = ?, coordinates = ?
      WHERE id = ?`,
      [
        start.latitude,
        start.longitude,
        end.latitude,
        end.longitude,
        JSON.stringify(coordinates),
        id,
      ]
    );
  } catch (error) {
    console.error("Error updating route: ", error);
  }
};

// Function to delete a route by ID
export const deleteRoute = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM routes WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting route: ", error);
  }
};
