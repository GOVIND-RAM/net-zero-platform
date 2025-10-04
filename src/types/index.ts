// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  organization?: string;
  avatar?: string;
  createdAt: string;
  type: 'customer' | 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userType: 'customer' | 'admin' | null;
  loading: boolean;
}

// Form Data Types
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization?: string;
  agreeToTerms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Certification Types
export interface CertificationType {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
}

// Password Strength
export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface PasswordValidation {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  strength: PasswordStrength;
}

// Auth Context Types
export interface AuthContextType {
  authState: AuthState;
  signup: (data: SignupFormData) => Promise<{ success: boolean; message: string }>;
  login: (email: string, password: string, userType: 'customer' | 'admin') => Promise<{ success: boolean; message: string }>;
  googleSignIn: () => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  isAdmin: () => boolean;
}

// Mock User for storage
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  organization?: string;
  avatar?: string;
  createdAt: string;
  type: 'customer' | 'admin';
}

// Questionnaire Types
export interface QuestionnaireQuestion {
  id: string;
  label: string;
  type: 'dropdown' | 'yes-no' | 'multiselect';
  options?: string[];
  required?: boolean;
  description?: string;
}

export interface QuestionnaireRequiredUpload {
  id: string;
  label: string;
  description?: string;
  fileTypes?: string[];
  maxSize?: number; // in MB
}

export interface QuestionnaireKpi {
  id: string;
  title: string;
  description?: string;
  questions: QuestionnaireQuestion[];
  uploads: QuestionnaireRequiredUpload[];
  maxPoints?: number;
}

export interface QuestionnaireCategory {
  id: string;
  title: string;
  description?: string;
  kpis: QuestionnaireKpi[];
}

// User Response Types
export interface QuestionResponse {
  questionId: string;
  value: string | string[] | boolean;
  timestamp: string;
}

export interface FileUploadResponse {
  uploadId: string;
  file: File;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface KpiProgress {
  kpiId: string;
  completedQuestions: number;
  totalQuestions: number;
  completedUploads: number;
  totalUploads: number;
  isComplete: boolean;
}

export interface CategoryProgress {
  categoryId: string;
  completedKpis: number;
  totalKpis: number;
  overallProgress: number; // percentage
}

export interface ProjectQuestionnaireState {
  projectId: string;
  responses: QuestionResponse[];
  uploads: FileUploadResponse[];
  lastSaved: string;
  isDirty: boolean;
}

