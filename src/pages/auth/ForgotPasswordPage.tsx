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
      <AuthLayout title="Check Your Email" subtitle="We've sent you password reset instructions">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-neutral-charcoal">Email Sent!</h2>
            <p className="text-gray-700">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <p className="text-gray-600 text-sm">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary w-full"
          >
            Back to Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot Password?" subtitle="Enter your email to reset your password">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="flex items-center space-x-2 text-primary-emerald hover:text-primary-forest transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Login</span>
          </button>

          <h2 className="text-2xl font-bold text-neutral-charcoal mb-2">Reset Password</h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-500 text-red-700 rounded-lg p-3 text-sm mb-4"
            >
              {error}
            </motion.div>
          )}

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
                setError('');
              }}
              placeholder="Enter your email"
              className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
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

