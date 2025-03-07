import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddPost from "./AddPost";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockAddPostFn = jest.fn();
jest.mock("../../../redux/services/postApi", () => ({
  useAddPostMutation: () => [mockAddPostFn],
}));

describe("AddPost Component", () => {
  const authors = [{ id: "1", name: "Alice" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("opens modal, submits form, and shows success toast", async () => {
    mockAddPostFn.mockReturnValueOnce({
      unwrap: () => Promise.resolve("Post created"),
    });

    render(<AddPost authors={authors} />);

    fireEvent.click(screen.getByText(/افزودن پست جدید/i));

    expect(screen.getByText(/ایجاد پست جدید/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/عنوان/i), {
      target: { value: "عنوان تستی" },
    });
    fireEvent.change(screen.getByLabelText(/محتوا/i), {
      target: { value: "محتوای تستی" },
    });
    fireEvent.change(screen.getByLabelText(/نویسنده/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ارسال/i }));

    await waitFor(() => {
      expect(mockAddPostFn).toHaveBeenCalled();
    });

    expect(toast.success).toHaveBeenCalledWith("پست جدید با موفقیت ایجاد شد!");
  });

  test("shows error toast on failure", async () => {
    mockAddPostFn.mockReturnValueOnce({
      unwrap: () => Promise.reject("error"),
    });

    render(<AddPost authors={authors} />);

    fireEvent.click(screen.getByText(/افزودن پست جدید/i));
    expect(screen.getByText(/ایجاد پست جدید/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/عنوان/i), {
      target: { value: "عنوان ناموفق" },
    });
    fireEvent.change(screen.getByLabelText(/محتوا/i), {
      target: { value: "محتوای ناموفق" },
    });
    fireEvent.change(screen.getByLabelText(/نویسنده/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ارسال/i }));

    await waitFor(() => {
      expect(mockAddPostFn).toHaveBeenCalled();
    });

    const { toast } = require("react-toastify");
    expect(toast.error).toHaveBeenCalledWith("خطا در ایجاد پست جدید!");
  });
});
