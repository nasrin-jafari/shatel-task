import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./apiBase";
import { Author } from "../../types";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAuthors: builder.query<Author[], void>({
      query: () => "/authors",
    }),
  }),
});

export const { useGetAuthorsQuery } = userApi;
