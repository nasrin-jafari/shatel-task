import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import EditPost from "./EditPost";
import "@testing-library/jest-dom";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockEditPostFn = jest.fn();
jest.mock("../../../redux/services/postApi", () => ({
  useEditPostMutation: () => [mockEditPostFn],
}));

describe("EditPost Component", () => {
  const authors = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ];

  const samplePost = {
    id: "123",
    title: "پست نمونه",
    content: "محتوای نمونه",
    userId: "1",
    date: "2023-01-01T12:00:00.000Z",
  };

  test("edits post and shows success toast", async () => {
    mockEditPostFn.mockReturnValueOnce({
      unwrap: () => Promise.resolve("Edited OK"),
    });

    const handleClose = jest.fn();

    render(<EditPost post={samplePost} authors={authors} onClose={handleClose} />);

    expect(screen.getByText(/ویرایش پست/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/عنوان/i), {
      target: { value: "عنوان ویرایش شده" },
    });
    fireEvent.change(screen.getByLabelText(/محتوا/i), {
      target: { value: "محتوای ویرایش شده" },
    });

    fireEvent.change(screen.getByLabelText(/نویسنده/i), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ویرایش/i }));

    await waitFor(() => {
      expect(mockEditPostFn).toHaveBeenCalled();
    });

    const { toast } = require("react-toastify");
    expect(toast.success).toHaveBeenCalledWith("پست با موفقیت ویرایش شد!");

    expect(handleClose).toHaveBeenCalled();
  });

  test("shows error toast on failure", async () => {
    mockEditPostFn.mockReturnValueOnce({
      unwrap: () => Promise.reject("error"),
    });

    const handleClose = jest.fn();

    render(<EditPost post={samplePost} authors={authors} onClose={handleClose} />);

    fireEvent.change(screen.getByLabelText(/عنوان/i), {
      target: { value: "عنوان جدید" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ویرایش/i }));

    await waitFor(() => {
      expect(mockEditPostFn).toHaveBeenCalled();
    });

    const { toast } = require("react-toastify");
    expect(toast.error).toHaveBeenCalledWith("خطا در ویرایش پست!");
  });
});
