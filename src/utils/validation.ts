import { PasswordValidation, PasswordStrength } from '../types';

// Email validation
export const validateEmail = (email: string): { isValid: boolean; error: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, error: '' };
};

// Name validation
export const validateName = (name: string): { isValid: boolean; error: string } => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.length < 3) {
    return { isValid: false, error: 'Name must be at least 3 characters long' };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, error: 'Name can only contain letters and spaces' };
  }
  
  return { isValid: true, error: '' };
};

// Password validation with strength indicator
export const validatePassword = (password: string): PasswordValidation => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const validationsPassed = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;
  
  let strength: PasswordStrength = 'weak';
  if (validationsPassed >= 5) {
    strength = 'strong';
  } else if (validationsPassed >= 3) {
    strength = 'medium';
  }
  
  return {
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    strength,
  };
};

// Get password error messages
export const getPasswordErrors = (validation: PasswordValidation): string[] => {
  const errors: string[] = [];
  
  if (!validation.hasMinLength) {
    errors.push('At least 8 characters');
  }
  if (!validation.hasUpperCase) {
    errors.push('At least 1 uppercase letter');
  }
  if (!validation.hasLowerCase) {
    errors.push('At least 1 lowercase letter');
  }
  if (!validation.hasNumber) {
    errors.push('At least 1 number');
  }
  if (!validation.hasSpecialChar) {
    errors.push('At least 1 special character');
  }
  
  return errors;
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): { isValid: boolean; error: string } => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true, error: '' };
};

