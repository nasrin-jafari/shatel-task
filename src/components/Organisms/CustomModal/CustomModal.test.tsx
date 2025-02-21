import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomModal from "./CustomModal";

import "@testing-library/jest-dom";

describe("CustomModal Component", () => {
  test("does not render when isOpen = false", () => {
    const { container } = render(
      <CustomModal isOpen={false} onClose={jest.fn()}>
        <p>Modal Content</p>
      </CustomModal>
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders children when isOpen = true", () => {
    render(
      <CustomModal isOpen={true} onClose={jest.fn()}>
        <p>Modal Content</p>
      </CustomModal>
    );

    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
  });

  test("calls onClose when clicking on backdrop", () => {
    const mockOnClose = jest.fn();
    render(
      <CustomModal isOpen={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </CustomModal>
    );

    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when clicking on close button", () => {
    const mockOnClose = jest.fn();
    render(
      <CustomModal isOpen={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </CustomModal>
    );

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("click inside modal content does not call onClose", () => {
    const mockOnClose = jest.fn();
    render(
      <CustomModal isOpen={true} onClose={mockOnClose}>
        <div data-testid="modal-content">Modal Content</div>
      </CustomModal>
    );
    const content = screen.getByTestId("modal-content");
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
