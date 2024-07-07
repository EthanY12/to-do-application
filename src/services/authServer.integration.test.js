import authService from './authServer';
import ticketService from './ticketService';

jest.mock('./authServer');
jest.mock('./ticketService');

describe('authService and ticketService Integration Tests', () => {
  const mockUser = { id: 1, username: 'testuser', token: 'testtoken' };

  beforeEach(() => {
    authService.register.mockResolvedValue(mockUser);
    authService.login.mockResolvedValue(mockUser);
    ticketService.getTickets.mockResolvedValue([]);
  });

  test('should register, login, and fetch tickets for a user', async () => {
    // Register user
    const registerResult = await authService.register('testuser', 'password');
    expect(registerResult).toEqual(mockUser);

    // Login user
    const loginResult = await authService.login('testuser', 'password');
    expect(loginResult).toEqual(mockUser);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));

    // Fetch tickets
    const tickets = await ticketService.getTickets();
    expect(tickets).toEqual([]);
  });
});
