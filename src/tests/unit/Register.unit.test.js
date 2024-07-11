import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../../components/Register";
import authService from "../../services/authServer";

jest.mock("../../services/authServer");

describe("Register Component Unit Tests", () => {
  test("renders Register component correctly", () => {
    render(
      <Router>
        <Register />
      </Router>,
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i }),
    ).toBeInTheDocument();
  });

  test("updates state on input change", () => {
    render(
      <Router>
        <Register />
      </Router>,
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password");
  });

  test("calls register service on form submit", async () => {
    authService.register.mockResolvedValueOnce({ username: "testuser" });

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
      expect(authService.register).toHaveBeenCalledWith("testuser", "password");
    });
  });

  test("shows error message on failed registration", async () => {
    authService.register.mockRejectedValueOnce(
      new Error("Registration failed"),
    );

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
