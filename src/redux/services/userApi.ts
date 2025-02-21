import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./apiBase";
import { Author, UserProfile } from "../../types";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAuthors: builder.query<Author[], void>({
      query: () => "/authors",
    }),
    getProfile: builder.query<UserProfile, string>({
      query: (userId) => `/profile?id=${userId}`,
    }),
  }),
});

export const { useGetAuthorsQuery, useGetProfileQuery } = userApi;
