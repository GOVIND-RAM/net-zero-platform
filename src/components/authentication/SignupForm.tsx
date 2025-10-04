import React, { useState } from 'react';
import { User, Mail, Lock, Building, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignupFormData } from '../../types';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
  getPasswordErrors,
} from '../../utils/validation';
import GoogleSignInButton from './GoogleSignInButton';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signup, googleSignIn } = useAuth();
  
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const passwordValidation = validatePassword(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupFormData, string>> = {};

    // Name validation
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordValidation.hasMinLength || !passwordValidation.hasUpperCase || 
               !passwordValidation.hasLowerCase || !passwordValidation.hasNumber || 
               !passwordValidation.hasSpecialChar) {
      newErrors.password = 'Password does not meet requirements';
    }

    // Confirm password validation
    const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.error;
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(formData);
      
      if (result.success) {
        setSubmitSuccess(result.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await googleSignIn();
    if (result.success) {
      navigate('/dashboard');
    } else {
      setSubmitError(result.message);
    }
  };

  const getPasswordStrengthColor = () => {
    if (!formData.password) return 'bg-slate-700';
    switch (passwordValidation.strength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-slate-700';
    }
  };

  const getPasswordStrengthWidth = () => {
    if (!formData.password) return 'w-0';
    switch (passwordValidation.strength) {
      case 'weak':
        return 'w-1/3';
      case 'medium':
        return 'w-2/3';
      case 'strong':
        return 'w-full';
      default:
        return 'w-0';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form space-y-5">
      <h2 className="signup-form-title text-2xl font-bold text-neutral-charcoal mb-6">Create Account</h2>

      {/* Success Message */}
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="signup-form-success-message bg-green-50 border border-green-500 text-green-700 rounded-lg p-3 text-sm"
        >
          {submitSuccess}
        </motion.div>
      )}

      {/* Error Message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="signup-form-error-message bg-red-50 border border-red-500 text-red-700 rounded-lg p-3 text-sm"
        >
          {submitError}
        </motion.div>
      )}

      {/* Full Name */}
      <div className="signup-form-field-group">
        <label htmlFor="name" className="signup-form-label block text-neutral-charcoal text-sm font-medium mb-2">
          Full Name
        </label>
        <div className="signup-form-input-container relative">
          <User className="signup-form-input-icon absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="signup-form-input w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          />
        </div>
        {errors.name && (
          <p className="signup-form-error text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="signup-form-field-group">
        <label htmlFor="email" className="signup-form-label block text-neutral-charcoal text-sm font-medium mb-2">
          Email Address
        </label>
        <div className="signup-form-input-container relative">
          <Mail className="signup-form-input-icon absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="signup-form-input w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          />
        </div>
        {errors.email && (
          <p className="signup-form-error text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="signup-form-field-group">
        <label htmlFor="password" className="signup-form-label block text-neutral-charcoal text-sm font-medium mb-2">
          Password
        </label>
        <div className="signup-form-input-container relative">
          <Lock className="signup-form-input-icon absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="signup-form-input w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-12 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="signup-form-password-toggle absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="signup-form-password-strength mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Password strength:</span>
              <span className={`text-xs font-medium ${
                passwordValidation.strength === 'weak' ? 'text-red-600' :
                passwordValidation.strength === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {passwordValidation.strength.charAt(0).toUpperCase() + passwordValidation.strength.slice(1)}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getPasswordStrengthColor()} ${getPasswordStrengthWidth()} transition-all duration-300`}
              />
            </div>
          </div>
        )}

        {/* Password Requirements */}
        {formData.password && passwordValidation.strength !== 'strong' && (
          <div className="mt-2 space-y-1">
            {getPasswordErrors(passwordValidation).map((error, index) => (
              <p key={index} className="text-red-600 text-xs">• {error}</p>
            ))}
          </div>
        )}
        
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-neutral-charcoal text-sm font-medium mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="signup-form-input w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-12 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Organization (Optional) */}
      <div>
        <label htmlFor="organization" className="block text-neutral-charcoal text-sm font-medium mb-2">
          Organization Name <span className="text-gray-500">(Optional)</span>
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Your organization name"
            className="signup-form-input w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          />
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="signup-form-checkbox mt-1 h-4 w-4 rounded border-gray-300 text-primary-emerald focus:ring-2 focus:ring-primary-emerald/30"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-neutral-charcoal">
          I agree to the{' '}
          <button type="button" className="text-primary-emerald hover:text-primary-forest transition-colors font-medium">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-primary-emerald hover:text-primary-forest transition-colors font-medium">
            Privacy Policy
          </button>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="signup-form-submit btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </motion.button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">OR</span>
        </div>
      </div>

      {/* Google Sign-In */}
      <GoogleSignInButton text="Sign up with Google" onClick={handleGoogleSignIn} disabled={isSubmitting} />

      {/* Footer Link */}
      <p className="signup-form-footer text-center text-gray-600 text-sm mt-6">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="signup-form-login-link text-primary-emerald hover:text-primary-forest font-medium transition-colors"
        >
          Log in
        </button>
      </p>
    </form>
  );
};

export default SignupForm;

