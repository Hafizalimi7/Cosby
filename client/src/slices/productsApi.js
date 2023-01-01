// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
//fetches data from the backend
export const productsApi = createApi({
  reducerPath: "productsApi",//giving our api serive a name
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `products`,//passing in the end point and making a query to products
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery } = productsApi; //creates a custom hook