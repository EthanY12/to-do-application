import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import authService from "../services/authServer";
import userEvent from "@testing-library/user-event";

jest.mock("../services/authServer");

describe("Login Component Unit Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders Login component correctly", () => {
    render(
      <Router>
        <Login />
      </Router>,
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("updates state on input change", () => {
    render(
      <Router>
        <Login />
      </Router>,
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password");
  });

  test("calls login service on form submit", async () => {
    authService.login.mockResolvedValue({
      user: { id: 1, username: "testuser", token: "testtoken" },
    });

    render(
      <Router>
        <Login />
      </Router>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith("testuser", "password");
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify({ id: 1, username: "testuser", token: "testtoken" }),
    );
  });

  test("shows error message on failed login", async () => {
    authService.login.mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <Router>
        <Login />
      </Router>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith(
        "testuser",
        "wrongpassword",
      );
    });

    expect(
      screen.getByText(/login failed. please check your credentials./i),
    ).toBeInTheDocument();
  });
});
