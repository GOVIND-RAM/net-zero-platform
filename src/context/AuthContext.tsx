import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, User, SignupFormData } from '../types';
import {
  initializeMockUsers,
  generateToken,
  storeAuthData,
  getStoredAuthData,
  clearAuthData,
  userExists,
  createUser,
  authenticateUser,
  storedUserToUser,
  verifyToken,
} from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    userType: null,
    loading: true,
  });

  // Initialize mock users and check for existing session
  useEffect(() => {
    initializeMockUsers();
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const { token, user, userType } = getStoredAuthData();
    
    if (token && user && verifyToken(token)) {
      setAuthState({
        isAuthenticated: true,
        user,
        userType,
        loading: false,
      });
    } else {
      clearAuthData();
      setAuthState({
        isAuthenticated: false,
        user: null,
        userType: null,
        loading: false,
      });
    }
  };

  const signup = async (data: SignupFormData): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if user already exists
      if (userExists(data.email)) {
        return { success: false, message: 'Email already exists' };
      }

      // Create new user
      const storedUser = createUser(data.email, data.password, data.name, data.organization);
      const user = storedUserToUser(storedUser);

      // Generate token and store auth data
      const token = generateToken(user.id);
      storeAuthData(token, user);

      // Update auth state
      setAuthState({
        isAuthenticated: true,
        user,
        userType: user.type,
        loading: false,
      });

      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      return { success: false, message: 'An error occurred during signup. Please try again.' };
    }
  };

  const login = async (
    email: string,
    password: string,
    userType: 'customer' | 'admin'
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const storedUser = authenticateUser(email, password, userType);

      if (!storedUser) {
        return { success: false, message: 'Invalid credentials' };
      }

      const user = storedUserToUser(storedUser);
      const token = generateToken(user.id);
      storeAuthData(token, user);

      setAuthState({
        isAuthenticated: true,
        user,
        userType: user.type,
        loading: false,
      });

      return { success: true, message: `Welcome back, ${user.name}!` };
    } catch (error) {
      return { success: false, message: 'An error occurred during login. Please try again.' };
    }
  };

  const googleSignIn = async (): Promise<{ success: boolean; message: string }> => {
    // Mock Google Sign-In for now
    return { success: false, message: 'Google Sign-In is not yet implemented' };
  };

  const logout = () => {
    clearAuthData();
    setAuthState({
      isAuthenticated: false,
      user: null,
      userType: null,
      loading: false,
    });
  };

  const updateUser = async (data: Partial<User>): Promise<void> => {
    if (!authState.user) return;

    const updatedUser = { ...authState.user, ...data };
    const { token } = getStoredAuthData();

    if (token) {
      storeAuthData(token, updatedUser);
      setAuthState((prev: AuthState) => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  const isAdmin = (): boolean => {
    return authState.userType === 'admin';
  };

  const value: AuthContextType = {
    authState,
    signup,
    login,
    googleSignIn,
    logout,
    updateUser,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

