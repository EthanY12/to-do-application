import axios from "axios";
import authService from "./authServer";

jest.mock("axios");

describe("authService", () => {
  describe("register", () => {
    it("should register a user successfully", async () => {
      const mockResponse = { message: "User registered" };
      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await authService.register("testuser", "password");

      expect(result.data).toEqual(mockResponse);
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/register",
        { username: "testuser", password: "password" },
      );
    });

    it("should throw an error when registration fails", async () => {
      const errorMessage = "Registration failed";
      axios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        authService.register("testuser", "password"),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("login", () => {
    it("should login a user and store the user data in localStorage", async () => {
      const mockUser = { id: 1, username: "testuser", token: "testtoken" };
      axios.post.mockResolvedValueOnce({ data: mockUser });

      const result = await authService.login("testuser", "password");

      expect(result).toEqual(mockUser);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockUser),
      );
    });

    it("should throw an error when login fails", async () => {
      const errorMessage = "Login failed";
      axios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        authService.login("testuser", "wrongpassword"),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("logout", () => {
    it("should remove the user from localStorage", () => {
      localStorage.setItem("user", JSON.stringify({ username: "testuser" }));

      authService.logout();

      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("getCurrentUser", () => {
    it("should return the current user from localStorage", () => {
      const mockUser = { username: "testuser" };
      localStorage.setItem("user", JSON.stringify(mockUser));

      const result = authService.getCurrentUser();

      expect(result).toEqual(mockUser);
    });

    it("should return null if no user is found in localStorage", () => {
      localStorage.removeItem("user");

      const result = authService.getCurrentUser();

      expect(result).toBeNull();
    });
  });
});
