import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockLoginFn = jest.fn();
jest.mock("../../redux/services/authApi", () => ({
  useLoginMutation: () => [mockLoginFn, { isLoading: false }],
}));

delete (window as any).location;
(window as any).location = { href: "" };

describe("Login Component", () => {
  test("calls login API and redirects on success", async () => {
    mockLoginFn.mockReturnValueOnce({
      unwrap: () =>
        Promise.resolve({
          token: "fakeToken",
          user: { name: "John Doe" },
        }),
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/نام کاربری/i), {
      target: { value: "testUser" },
    });

    fireEvent.change(screen.getByLabelText(/رمز عبور/i), {
      target: { value: "testPass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ورود/i }));

    await waitFor(() => {
      expect(mockLoginFn).toHaveBeenCalledWith({
        username: "testUser",
        password: "testPass",
      });
    });

    expect(localStorage.getItem("token")).toBe("fakeToken");
    expect(localStorage.getItem("user")).toBe(JSON.stringify({ name: "John Doe" }));

    expect(window.location.href).toBe("/");

    const { toast } = require("react-toastify");
    expect(toast.success).toHaveBeenCalledWith("ورود موفقیت‌آمیز بود!");
  });
});
