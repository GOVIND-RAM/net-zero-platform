import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validation';
import GoogleSignInButton from './GoogleSignInButton';

type LoginTab = 'customer' | 'admin';

interface LoginFormProps {
  onNebulaInteraction?: (isActive: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onNebulaInteraction }) => {
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
    <div className="space-y-6 px-1">
      {/* Tabs */}
      <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => handleTabChange('customer')}
          className={`login-form-tab flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center ${
            activeTab === 'customer'
              ? 'bg-white/15 text-white shadow-lg border border-white/20'
              : 'text-white/80 hover:text-white hover:bg-white/8'
          }`}
        >
          Customer Login
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('admin')}
          className={`login-form-tab flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center ${
            activeTab === 'admin'
              ? 'bg-white/15 text-white shadow-lg border border-white/20'
              : 'text-white/80 hover:text-white hover:bg-white/8'
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-2xl mb-2">
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4"
          >
            <p className="text-red-300 text-sm text-center font-medium drop-shadow-sm">
              ⚠️ Admin access only. Unauthorized access is prohibited.
            </p>
          </motion.div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-white text-sm font-medium mb-2 drop-shadow-lg">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/80" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                setSubmitError('');
              }}
              onFocus={() => onNebulaInteraction?.(true)}
              onBlur={() => onNebulaInteraction?.(false)}
              placeholder="Enter your email"
              className="login-form-input w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 focus:bg-white/15 outline-none transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-white text-sm font-medium mb-2 drop-shadow-lg">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/80" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                setSubmitError('');
              }}
              onFocus={() => onNebulaInteraction?.(true)}
              onBlur={() => onNebulaInteraction?.(false)}
              placeholder="Enter your password"
              className="login-form-input w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 rounded-lg pl-11 pr-12 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 focus:bg-white/15 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-2">
          {activeTab === 'customer' ? (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-form-checkbox h-4 w-4 rounded border-white/30 text-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 bg-white/10"
              />
              <label htmlFor="rememberMe" className="text-sm text-white">
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
              className="text-sm text-primary-emerald hover:text-primary-emerald/90 transition-colors font-medium drop-shadow-sm"
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
            <div className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-white/60">OR</span>
          </div>
        </div>

        {/* Dummy Login Section - Customer */}
        {activeTab === 'customer' && (
          <div className="dummy-login-section-wrapper bg-primary-emerald/10 backdrop-blur-sm border border-primary-emerald/30 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="dummy-login-badge bg-primary-emerald text-white text-xs font-semibold px-2 py-1 rounded">
                TEST MODE
              </div>
              <p className="text-white text-sm font-medium">Quick Login for Testing</p>
            </div>
            
            <motion.button
              type="button"
              onClick={() => handleDummyLogin('customer')}
              disabled={isSubmitting}
              className="dummy-login-btn-customer w-full bg-primary-emerald hover:bg-primary-forest text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
            
            <p className="text-primary-emerald text-xs text-center mt-3 drop-shadow-sm">
              No credentials needed - instant access for testing
            </p>
          </div>
        )}

        {/* Dummy Login Section - Admin */}
        {activeTab === 'admin' && (
          <div className="dummy-login-section-wrapper bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="dummy-login-badge bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">
                TEST MODE
              </div>
              <p className="text-white text-sm font-medium">Quick Admin Access for Testing</p>
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
            
            <p className="text-purple-300 text-xs text-center mt-3 drop-shadow-sm">
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
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/60">OR</span>
              </div>
            </div>

            <GoogleSignInButton onClick={handleGoogleSignIn} disabled={isSubmitting} />

            {/* Footer Link */}
            <p className="text-center text-white text-sm mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-primary-emerald hover:text-primary-emerald/90 font-medium transition-colors drop-shadow-sm"
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

