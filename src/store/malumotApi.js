import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const malumotApi = createApi({
  reducerPath: "malumotApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Malumot"],
  endpoints: (builder) => ({
    getMalumotlar: builder.query({
      query: () => "/malumotlar",
      providesTags: ["Malumot"],
    }),
    addMalumot: builder.mutation({
      query: (body) => ({
        url: "/malumotlar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Malumot"],
    }),
    updateMalumot: builder.mutation({
        query: ({ id, ...body }) => ({
          url: `/malumotlar/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Malumot"],
      }),
      deleteMalumot: builder.mutation({
        query: (id) => ({
          url: `/malumotlar/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Malumot"],
      }),
      
  }),
});

export const {
  useGetMalumotlarQuery,
  useAddMalumotMutation,
  useUpdateMalumotMutation,
  useDeleteMalumotMutation,
} = malumotApi;
