import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchPost from "./SearchPost";

describe("SearchPost Component", () => {
  test("renders input with placeholder and calls onChange", () => {
    const mockOnChange = jest.fn();
    render(<SearchPost value="" onChange={mockOnChange} />);

    
    const inputElement = screen.getByPlaceholderText(/جستجوی عنوان.../i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");

    
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("displays the correct value from props", () => {
    render(<SearchPost value="hello" onChange={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText(/جستجوی عنوان.../i);
    expect(inputElement).toHaveValue("hello");
  });
});
