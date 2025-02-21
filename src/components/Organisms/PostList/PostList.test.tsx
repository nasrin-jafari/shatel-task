import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostList from "./PostList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import useIsAdmin from "../../../hooks/useIsAdmin";
import { postApi } from "../../../redux/services/postApi";

jest.mock("../../../hooks/useIsAdmin", () => jest.fn());

describe("PostList Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [postApi.reducerPath]: postApi.reducer,
      },
    });
  });

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
    (useIsAdmin as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <PostList posts={mockPosts} authors={mockAuthors} />
      </Provider>
    );

    expect(screen.queryByText(/ویرایش/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/حذف/i)).not.toBeInTheDocument();
  });

  test("shows edit/delete columns if user is admin", () => {
    (useIsAdmin as jest.Mock).mockReturnValue(true);

    render(
      <Provider store={store}>
        <PostList posts={mockPosts} authors={mockAuthors} />
      </Provider>
    );

    expect(screen.getByText(/ویرایش/i)).toBeInTheDocument();
    expect(screen.getByText(/حذف/i)).toBeInTheDocument();
  });

  test("opens EditPost modal on edit click", () => {
    (useIsAdmin as jest.Mock).mockReturnValue(true);

    render(
      <Provider store={store}>
        <PostList posts={mockPosts} authors={mockAuthors} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/ویرایش/i));

    expect(screen.getByText(/ویرایش پست/i)).toBeInTheDocument();
  });
});
