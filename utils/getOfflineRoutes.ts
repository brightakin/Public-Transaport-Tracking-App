import { fetchRoutes, insertRoute } from "@/src/services/dbService";
export const fetchRoutesFromDb = async (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number }
) => {
  const routes = await fetchRoutes(start, end);

  return routes;
};
