import bcrypt from 'bcryptjs';
import { StoredUser, User } from '../types';

// In-memory storage for mock users
let mockUsers: StoredUser[] = [];

// In-memory storage for current session
let currentSession: {
  token: string | null;
  user: User | null;
  userType: 'customer' | 'admin' | null;
} = {
  token: null,
  user: null,
  userType: null,
};

// Initialize mock users (empty for open authentication)
export const initializeMockUsers = (): void => {
  // No predefined users - accept any credentials
  mockUsers = [];
};

// Get all mock users
export const getMockUsers = (): StoredUser[] => {
  return mockUsers;
};

// Save mock users
const saveMockUsers = (users: StoredUser[]): void => {
  mockUsers = users;
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

// Store authentication data (persistent)
export const storeAuthData = (token: string, user: User): void => {
  const authData = {
    token,
    user,
    userType: user.type,
  };
  
  // Store in memory
  currentSession = authData;
  
  // Store in localStorage for persistence
  localStorage.setItem('authData', JSON.stringify(authData));
};

// Get stored authentication data (from localStorage or memory)
export const getStoredAuthData = (): { token: string | null; user: User | null; userType: 'customer' | 'admin' | null } => {
  try {
    // Try to get from localStorage first
    const stored = localStorage.getItem('authData');
    if (stored) {
      const authData = JSON.parse(stored);
      // Verify token is still valid
      if (authData.token && verifyToken(authData.token)) {
        // Update memory session
        currentSession = authData;
        return authData;
      } else {
        // Token expired, clear storage
        clearAuthData();
      }
    }
  } catch (error) {
    console.error('Error reading auth data from localStorage:', error);
    clearAuthData();
  }
  
  return currentSession;
};

// Clear authentication data
export const clearAuthData = (): void => {
  currentSession = {
    token: null,
    user: null,
    userType: null,
  };
  
  // Clear from localStorage
  localStorage.removeItem('authData');
};

// Check if user exists - always returns false for open authentication
export const userExists = (email: string): boolean => {
  // Allow any email to sign up
  return false;
};

// Create new user - accepts any credentials
export const createUser = (email: string, password: string, name: string, organization?: string): StoredUser => {
  const users = getMockUsers();
  
  // Check if user already exists for this email and type
  let existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.type === 'customer');
  
  if (existingUser) {
    return existingUser;
  }
  
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

// Authenticate user - accepts any credentials and creates user on-the-fly
export const authenticateUser = (email: string, password: string, userType: 'customer' | 'admin'): StoredUser | null => {
  // Accept any email and password combination
  // Create or return existing user
  const users = getMockUsers();
  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.type === userType);
  
  if (!user) {
    // Create new user on-the-fly
    user = {
      id: `${userType}-${Date.now()}`,
      email,
      password: bcrypt.hashSync(password, 10),
      name: userType === 'admin' ? 'Admin User' : 'Customer User',
      type: userType,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveMockUsers(users);
  }
  
  return user;
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
