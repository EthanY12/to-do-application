import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../../components/Register";
import authService from "../../services/authServer";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../services/authServer");

describe("Register Component Unit Tests", () => {
  beforeEach(() => {
    authService.register.mockClear();
  });

  it("calls register service on form submit", async () => {
    authService.register.mockResolvedValueOnce({});

    render(
      <Router>
        <Register />
      </Router>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        username: "testuser",
        password: "password",
      });
    });
  });

  it("shows error message on failed registration", async () => {
    authService.register.mockRejectedValueOnce({
      response: { data: { message: "Registration failed" } },
    });

    render(
      <Router>
        <Register />
      </Router>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });
  });
});
