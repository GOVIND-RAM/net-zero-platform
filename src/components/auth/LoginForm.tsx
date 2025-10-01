import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validation';
import GoogleSignInButton from './GoogleSignInButton';

type LoginTab = 'customer' | 'admin';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, googleSignIn } = useAuth();
  
  const [activeTab, setActiveTab] = useState<LoginTab>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleTabChange = (tab: LoginTab) => {
    setActiveTab(tab);
    setErrors({});
    setSubmitError('');
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
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
      const result = await login(email, password, activeTab);
      
      if (result.success) {
        setSubmitSuccess(result.message);
        setTimeout(() => {
          if (activeTab === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
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

  const handleDummyLogin = async (userType: 'customer' | 'admin') => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      // Use dummy credentials for quick testing
      const dummyEmail = userType === 'admin' ? 'admin@test.com' : 'customer@test.com';
      const dummyPassword = 'test123';
      
      const result = await login(dummyEmail, dummyPassword, userType);
      
      if (result.success) {
        setSubmitSuccess(`Logged in as test ${userType}!`);
        setTimeout(() => {
          if (userType === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
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

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => handleTabChange('customer')}
          className={`login-form-tab flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'customer'
              ? 'bg-white text-primary-emerald shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Customer Login
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('admin')}
          className={`login-form-tab flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'admin'
              ? 'bg-white text-primary-emerald shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Admin Login
        </button>
      </div>

      {/* Admin Badge */}
      {activeTab === 'admin' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-2 bg-primary-emerald/10 border border-primary-emerald/30 rounded-lg py-2"
        >
          <Shield className="h-4 w-4 text-primary-emerald" />
          <span className="text-primary-emerald text-sm font-medium">Admin Portal</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-2xl font-bold text-neutral-charcoal">
          {activeTab === 'customer' ? 'Welcome Back' : 'Admin Sign In'}
        </h2>

        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-500 text-green-700 rounded-lg p-3 text-sm"
          >
            {submitSuccess}
          </motion.div>
        )}

        {/* Error Message */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-500 text-red-700 rounded-lg p-3 text-sm"
          >
            {submitError}
          </motion.div>
        )}

        {/* Admin Warning */}
        {activeTab === 'admin' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-sm text-center"
          >
            Admin access only. Unauthorized access is prohibited.
          </motion.p>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-neutral-charcoal text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                setSubmitError('');
              }}
              placeholder="Enter your email"
              className="login-form-input w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-neutral-charcoal text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                setSubmitError('');
              }}
              placeholder="Enter your password"
              className="login-form-input w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-12 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          {activeTab === 'customer' ? (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-form-checkbox h-4 w-4 rounded border-gray-300 text-primary-emerald focus:ring-2 focus:ring-primary-emerald/30"
              />
              <label htmlFor="rememberMe" className="text-sm text-neutral-charcoal">
                Keep me logged in
              </label>
            </div>
          ) : (
            <div />
          )}
          
          {activeTab === 'customer' && (
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-primary-emerald hover:text-primary-forest transition-colors font-medium"
            >
              Forgot password?
            </button>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="login-form-submit btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <span>{activeTab === 'customer' ? 'Sign In' : 'Admin Sign In'}</span>
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

        {/* Dummy Login Section - Customer */}
        {activeTab === 'customer' && (
          <div className="dummy-login-section-wrapper bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="dummy-login-badge bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                TEST MODE
              </div>
              <p className="text-blue-700 text-sm font-medium">Quick Login for Testing</p>
            </div>
            
            <motion.button
              type="button"
              onClick={() => handleDummyLogin('customer')}
              disabled={isSubmitting}
              className="dummy-login-btn-customer w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>🧪</span>
                  <span>Login as Test Customer</span>
                </>
              )}
            </motion.button>
            
            <p className="text-blue-600 text-xs text-center mt-3">
              No credentials needed - instant access for testing
            </p>
          </div>
        )}

        {/* Dummy Login Section - Admin */}
        {activeTab === 'admin' && (
          <div className="dummy-login-section-wrapper bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="dummy-login-badge bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">
                TEST MODE
              </div>
              <p className="text-purple-700 text-sm font-medium">Quick Admin Access for Testing</p>
            </div>
            
            <motion.button
              type="button"
              onClick={() => handleDummyLogin('admin')}
              disabled={isSubmitting}
              className="dummy-login-btn-admin w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  <span>Login as Test Admin</span>
                </>
              )}
            </motion.button>
            
            <p className="text-purple-600 text-xs text-center mt-3">
              No credentials needed - instant access for testing
            </p>
          </div>
        )}

        {/* Google Sign-In (Only for customers) */}
        {activeTab === 'customer' && (
          <>
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <GoogleSignInButton onClick={handleGoogleSignIn} disabled={isSubmitting} />

            {/* Footer Link */}
            <p className="text-center text-gray-600 text-sm mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-primary-emerald hover:text-primary-forest font-medium transition-colors"
              >
                Sign up
              </button>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;

