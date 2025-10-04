import React, { ReactNode } from 'react';
import { Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const benefits = [
    'Independent third-party certification',
    'Incremental recognition milestones',
    'Expert support throughout',
    'Globally recognized credentials',
  ];

  return (
    <div className="auth-layout-container min-h-screen bg-gradient-to-br from-primary-forest via-primary-forest/90 to-neutral-charcoal flex">
      {/* Left Side - Branding */}
      <motion.div
        className="auth-layout-branding hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="auth-layout-logo-section mb-12">
          <div className="auth-layout-logo flex items-center space-x-3 mb-8">
            <div className="auth-layout-logo-icon bg-primary-emerald p-3 rounded-xl">
              <Award className="auth-layout-logo-award h-8 w-8 text-white" />
            </div>
            <span className="auth-layout-logo-text text-3xl font-bold text-white">EcoZero Certify</span>
          </div>
          
          <h1 className="auth-layout-title text-4xl xl:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="auth-layout-subtitle text-xl text-neutral-cream/80">{subtitle}</p>
          )}
        </div>

        {/* Benefits List */}
        <div className="auth-layout-benefits space-y-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="auth-layout-benefit-item flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CheckCircle className="auth-layout-benefit-icon h-6 w-6 text-primary-emerald flex-shrink-0 mt-0.5" />
              <span className="auth-layout-benefit-text text-neutral-cream/80 text-lg">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="auth-layout-decoration auth-layout-decoration-1 absolute top-20 left-10 w-72 h-72 bg-primary-emerald/10 rounded-full blur-3xl" />
        <div className="auth-layout-decoration auth-layout-decoration-2 absolute bottom-20 left-20 w-96 h-96 bg-primary-emerald/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Right Side - Form */}
      <div className="auth-layout-form-section w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12">
        <motion.div
          className="auth-layout-form-container w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Mobile Logo */}
          <div className="auth-layout-mobile-logo lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="auth-layout-mobile-logo-icon bg-primary-emerald p-2 rounded-lg">
              <Award className="auth-layout-mobile-logo-award h-6 w-6 text-white" />
            </div>
            <span className="auth-layout-mobile-logo-text text-2xl font-bold text-white">EcoZero Certify</span>
          </div>

          <div className="auth-layout-form-card bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;

