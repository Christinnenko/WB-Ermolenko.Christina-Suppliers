import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CitySupply,
  StatusSupply,
  Supply,
  TypeSupply,
  WarehouseSupply,
} from "./interfaces";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  endpoints: (builder) => ({
    getStatuses: builder.query<StatusSupply[], void>({
      query: () => "/api/statuses",
    }),
    getCities: builder.query<CitySupply[], void>({
      query: () => "/api/cities",
    }),
    getSupplyTypes: builder.query<TypeSupply[], void>({
      query: () => "/api/supplyTypes",
    }),
    getWarehouses: builder.query<WarehouseSupply[], void>({
      query: () => "/api/warehouses",
    }),
    getSupplies: builder.query<Supply[], void>({
      query: () => "/api/supplies",
    }),
  }),
});

export const {
  useGetStatusesQuery,
  useGetCitiesQuery,
  useGetSupplyTypesQuery,
  useGetWarehousesQuery,
  useGetSuppliesQuery,
} = apiSlice;
