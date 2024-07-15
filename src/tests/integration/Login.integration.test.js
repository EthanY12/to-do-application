import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../components/Login";
import authService from "../../services/authServer";

jest.mock("../../services/authServer");

describe("Login Component Integration", () => {
  test("logs in and navigates to tickets page", async () => {
    const mockUser = { username: "testuser" };
    authService.login.mockResolvedValueOnce(mockUser);

    render(
      <MemoryRouter>
        <Login onLogin={jest.fn()} />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText(/login/i));

    expect(authService.login).toHaveBeenCalledWith("testuser", "password");
    expect(await screen.findByText(/tickets/i)).toBeInTheDocument();
  });
});
