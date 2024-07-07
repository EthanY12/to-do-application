import authService from './authServer';

jest.mock('./authServer');

describe('authService', () => {
  const mockUser = { id: 1, username: 'testuser', token: 'testtoken' };

  beforeEach(() => {
    localStorage.clear();
    authService.login.mockResolvedValue(mockUser);
  });

  test('login should login a user and store the user data in localStorage', async () => {
    const result = await authService.login('testuser', 'password');

    expect(result).toEqual(mockUser);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });
});
