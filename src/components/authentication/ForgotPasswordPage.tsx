import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { validateEmail } from '../../utils/validation';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      return;
    }

    setIsSubmitting(true);

    // Mock password reset (implement with backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="forgot-password-success-content text-center space-y-6">
          <div className="forgot-password-success-icon-container w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="forgot-password-success-icon h-8 w-8 text-green-600" />
          </div>
          <div className="forgot-password-success-text space-y-2">
            <h2 className="forgot-password-success-title text-2xl font-bold text-white drop-shadow-lg">Email Sent!</h2>
            <p className="forgot-password-success-description text-white/90">
              We've sent password reset instructions to <strong className="text-primary-emerald">{email}</strong>
            </p>
            <p className="forgot-password-success-note text-white/70 text-sm">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="forgot-password-success-button btn-primary w-full"
          >
            Back to Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="forgot-password-form space-y-6 px-1">
        <div className="forgot-password-form-content">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="forgot-password-form-back-button flex items-center space-x-2 text-primary-emerald hover:text-primary-emerald/80 transition-colors mb-6"
          >
            <ArrowLeft className="forgot-password-form-back-icon h-4 w-4" />
            <span className="forgot-password-form-back-text text-sm font-medium">Back to Login</span>
          </button>

          <h2 className="forgot-password-form-title text-2xl font-bold text-white drop-shadow-lg mb-2">Reset Password</h2>
          <p className="forgot-password-form-description text-white/80 text-sm mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="forgot-password-form-error bg-red-50 border border-red-500 text-red-700 rounded-lg p-3 text-sm mb-4"
            >
              {error}
            </motion.div>
          )}

          <label htmlFor="email" className="forgot-password-form-label block text-white text-sm font-medium mb-2 drop-shadow-sm">
            Email Address
          </label>
          <div className="forgot-password-form-input-container relative">
            <Mail className="forgot-password-form-input-icon absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 focus:bg-white/30 outline-none transition-all"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="forgot-password-form-submit btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="forgot-password-form-submit-loader h-5 w-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send Reset Link</span>
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;

