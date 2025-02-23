import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Posts from "./Posts";

// Mock the necessary hooks from postApi and userApi
jest.mock("../../redux/services/postApi", () => ({
  useGetPostsQuery: jest.fn(),
  useAddPostMutation: jest.fn(),
  useDeletePostMutation: jest.fn(), // Add the mock for useDeletePostMutation
}));

jest.mock("../../redux/services/userApi", () => ({
  useGetAuthorsQuery: jest.fn(),
}));

import { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } from "../../redux/services/postApi";
import { useGetAuthorsQuery } from "../../redux/services/userApi";

describe("Posts Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAddPostMutation as jest.Mock).mockReturnValue([jest.fn(), {}]);
    (useDeletePostMutation as jest.Mock).mockReturnValue([jest.fn(), {}]); // Mock return value for deletePost
  });

  test("shows loading state when posts are loading", () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    (useGetAuthorsQuery as jest.Mock).mockReturnValue({
      data: [],
    });

    render(<Posts />);
    expect(screen.getByText("در حال بارگذاری...")).toBeInTheDocument();
  });

  test("renders posts and authors when data is loaded", () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: [
        { id: "1", title: "Post A", content: "Content A", userId: "1", date: "2023-02-23T00:00:00Z" },
        { id: "2", title: "Post B", content: "Content B", userId: "2", date: "2023-02-22T00:00:00Z" },
      ],
      isLoading: false,
    });

    (useGetAuthorsQuery as jest.Mock).mockReturnValue({
      data: [
        { id: "1", name: "Author A" },
        { id: "2", name: "Author B" },
      ],
    });

    render(<Posts />);

    expect(screen.getByText("لیست پست‌ها")).toBeInTheDocument();
    expect(screen.getByText("Post A")).toBeInTheDocument();
    expect(screen.getByText("Post B")).toBeInTheDocument();
    expect(screen.getByText(/افزودن پست جدید/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/جستجوی عنوان/i)).toBeInTheDocument();
  });

  test("filters posts based on search input", () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: [
        { id: "1", title: "Hello World", content: "Something", userId: "1", date: "2023-02-23T00:00:00Z" },
        { id: "2", title: "React Testing", content: "RTL", userId: "2", date: "2023-02-22T00:00:00Z" },
      ],
      isLoading: false,
    });
    (useGetAuthorsQuery as jest.Mock).mockReturnValue({
      data: [],
    });

    render(<Posts />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByText("React Testing")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/جستجوی عنوان/i);
    fireEvent.change(searchInput, { target: { value: "hello" } });

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByText("React Testing")).not.toBeInTheDocument();
  });
});
