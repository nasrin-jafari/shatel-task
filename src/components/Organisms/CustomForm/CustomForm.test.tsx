import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomForm from "./CustomForm";

describe("CustomForm component", () => {
  it("renders fields and calls onSubmit with correct data", async () => {
    const mockOnSubmit = jest.fn();
    const fields = [
      { name: "username", label: "Username", type: "text" },
      { name: "rememberMe", label: "Remember Me", type: "checkbox" },
    ];

    render(<CustomForm fields={fields} onSubmit={mockOnSubmit} textBtn="Submit" defaultValues={{ username: "", rememberMe: false }} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testUser" },
    });

    fireEvent.click(screen.getByLabelText(/remember me/i));

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        username: "testUser",
        rememberMe: true,
      });
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
