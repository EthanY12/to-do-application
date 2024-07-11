// src/tests/unit/Login.unit.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // for the "toBeInTheDocument" matcher
import Login from "../../components/Login"; // Adjust the path as necessary
import { MemoryRouter } from "react-router-dom";

// Mock the authService.login function
jest.mock("../../services/authServer", () => ({
  login: jest.fn(),
}));

import authService from "../../services/authServer";

describe("Login Component", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    authService.login.mockClear();
  });

  it("renders Login component correctly", () => {
    render(<Login onLogin={jest.fn()} />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls login function on form submit with correct data", async () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(authService.login).toHaveBeenCalledWith("testuser", "password");
  });
});
