import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Login Component", () => {
  test("renders login form", () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("displays error on failed login", async () => {
    const onLogin = jest.fn().mockRejectedValue(new Error("Login failed"));

    render(<Login onLogin={onLogin} />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });

  test("calls login service on form submit", async () => {
    const onLogin = jest.fn().mockResolvedValue({});

    render(<Login onLogin={onLogin} />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith("testuser", "password");
    });
  });
});
