import { createApi } from "@reduxjs/toolkit/query/react";
import { Post } from "../../types";
import baseQueryWithReauth from "./apiBase";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "/posts",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `/posts?id=${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useEditPostMutation, useDeletePostMutation } = postApi;
