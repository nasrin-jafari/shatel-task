import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  beforeEach(() => {
    localStorage.clear();

    delete (window as any).location;
    (window as any).location = { href: "" };
  });

  test("should not render if no user in localStorage", () => {
    render(<Header />);

    expect(screen.queryByText(/خوش آمدید/i)).not.toBeInTheDocument();
  });

  test("should render user info if user is found in localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Ali" }));

    render(<Header />);

    expect(screen.getByText("خوش آمدید، Ali!")).toBeInTheDocument();

    expect(screen.getByText(/خروج/i)).toBeInTheDocument();
  });

  test("should logout user on button click", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Ali" }));
    localStorage.setItem("token", "fakeToken");

    render(<Header />);

    const logoutButton = screen.getByText(/خروج/i);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();

    expect(window.location.href).toBe("/login");
  });
});
