import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostList from "./PostList";

jest.mock("../../../hooks/useIsAdmin", () => jest.fn());
jest.mock("../../../redux/services/postApi", () => ({
  useDeletePostMutation: jest.fn(() => [jest.fn()]),
  useEditPostMutation: jest.fn(() => [jest.fn()]),
}));

describe("PostList Component", () => {
  const mockPosts = [
    {
      id: "1",
      title: "Title 1",
      content: "Content 1",
      userId: "1",
      date: "2023-01-01T12:00:00.000Z",
    },
  ];
  const mockAuthors = [{ id: "1", name: "Alice" }];

  test("renders without edit/delete if user is not admin", () => {
    const useIsAdmin = require("../../../hooks/useIsAdmin");
    (useIsAdmin as jest.Mock).mockReturnValue(false);

    render(<PostList posts={mockPosts} authors={mockAuthors} />);

    expect(screen.queryByText(/ویرایش/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/حذف/i)).not.toBeInTheDocument();
  });

  test("shows edit/delete columns if user is admin", () => {
    const useIsAdmin = require("../../../hooks/useIsAdmin");
    (useIsAdmin as jest.Mock).mockReturnValue(true);

    render(<PostList posts={mockPosts} authors={mockAuthors} />);

    expect(screen.getByText(/ویرایش/i)).toBeInTheDocument();
    expect(screen.getByText(/حذف/i)).toBeInTheDocument();
  });

  test("opens EditPost modal on edit click", () => {
    const useIsAdmin = require("../../../hooks/useIsAdmin");
    (useIsAdmin as jest.Mock).mockReturnValue(true);

    render(<PostList posts={mockPosts} authors={mockAuthors} />);
    fireEvent.click(screen.getByText(/ویرایش/i));

    expect(screen.getByText(/ویرایش پست/i)).toBeInTheDocument();
  });
});
