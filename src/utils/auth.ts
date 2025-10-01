import bcrypt from 'bcryptjs';
import { StoredUser, User } from '../types';

// Storage keys
const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';
const USER_TYPE_KEY = 'userType';
const MOCK_USERS_KEY = 'mockUsers';

// Initialize mock users with default admin
export const initializeMockUsers = (): void => {
  const existingUsers = getMockUsers();
  if (existingUsers.length === 0) {
    const defaultAdmin: StoredUser = {
      id: '1',
      email: 'admin@certifypro.com',
      password: bcrypt.hashSync('Admin@123', 10),
      name: 'Admin User',
      type: 'admin',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([defaultAdmin]));
  }
};

// Get all mock users
export const getMockUsers = (): StoredUser[] => {
  const users = localStorage.getItem(MOCK_USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save mock users
const saveMockUsers = (users: StoredUser[]): void => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

// Generate mock JWT token
export const generateToken = (userId: string): string => {
  return btoa(JSON.stringify({ userId, timestamp: Date.now() }));
};

// Verify token
export const verifyToken = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token));
    // Token expires after 24 hours
    const expirationTime = 24 * 60 * 60 * 1000;
    return Date.now() - decoded.timestamp < expirationTime;
  } catch {
    return false;
  }
};

// Store authentication data
export const storeAuthData = (token: string, user: User): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  localStorage.setItem(USER_TYPE_KEY, user.type);
};

// Get stored authentication data
export const getStoredAuthData = (): { token: string | null; user: User | null; userType: 'customer' | 'admin' | null } => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userData = localStorage.getItem(USER_DATA_KEY);
  const userType = localStorage.getItem(USER_TYPE_KEY) as 'customer' | 'admin' | null;
  
  let user: User | null = null;
  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch {
      user = null;
    }
  }
  
  return { token, user, userType };
};

// Clear authentication data
export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  localStorage.removeItem(USER_TYPE_KEY);
};

// Check if user exists
export const userExists = (email: string): boolean => {
  const users = getMockUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Create new user
export const createUser = (email: string, password: string, name: string, organization?: string): StoredUser => {
  const users = getMockUsers();
  const newUser: StoredUser = {
    id: `user-${Date.now()}`,
    email,
    password: bcrypt.hashSync(password, 10),
    name,
    organization,
    type: 'customer',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveMockUsers(users);
  return newUser;
};

// Authenticate user
export const authenticateUser = (email: string, password: string, userType: 'customer' | 'admin'): StoredUser | null => {
  const users = getMockUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.type === userType);
  
  if (!user) {
    return null;
  }
  
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  return isPasswordValid ? user : null;
};

// Convert stored user to user (remove password)
export const storedUserToUser = (storedUser: StoredUser): User => {
  const { password, ...user } = storedUser;
  return user;
};

// Update user data
export const updateStoredUser = (userId: string, updates: Partial<StoredUser>): StoredUser | null => {
  const users = getMockUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = { ...users[userIndex], ...updates };
  saveMockUsers(users);
  return users[userIndex];
};

