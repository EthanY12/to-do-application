import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import authService from "../services/authServer";

jest.mock("../services/authServer");

describe("Login Component", () => {
  test("renders login form", () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("displays error on failed login", async () => {
    authService.login.mockRejectedValueOnce(new Error("Login failed"));

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
  });

  test("calls login service on form submit", async () => {
    const mockUser = { username: "testuser" };
    authService.login.mockResolvedValueOnce(mockUser);

    render(<Login onLogin={jest.fn()} />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText(/login/i));

    expect(authService.login).toHaveBeenCalledWith("testuser", "password");
  });
});
