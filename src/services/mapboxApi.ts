import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const mapboxKey: any = process.env.EXPO_PUBLIC_MAPBOX_KEY;
const MAPBOX_ACCESS_TOKEN = mapboxKey;

type LocationFeature = {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
};

type RouteResponse = {
  routes: {
    geometry: {
      coordinates: [number, number][]; // Array of [longitude, latitude]
    };
  }[];
};

export const mapboxApi = createApi({
  reducerPath: "mapboxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mapbox.com",
  }),
  endpoints: (builder) => ({
    searchLocations: builder.query<LocationFeature[], string>({
      query: (query) => ({
        url: `/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
        },
      }),
      transformResponse: (response: { features: LocationFeature[] }) => {
        return response.features;
      },
    }),
    getRoute: builder.query<
      [number, number][],
      {
        start: { latitude: number; longitude: number };
        end: { latitude: number; longitude: number };
      }
    >({
      query: ({ start, end }) => ({
        url: `/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}`,
        params: {
          geometries: "geojson",
          access_token: MAPBOX_ACCESS_TOKEN,
        },
      }),
      transformResponse: (response: RouteResponse) =>
        response.routes[0].geometry.coordinates,
    }),
  }),
});

export const { useSearchLocationsQuery, useGetRouteQuery } = mapboxApi;
