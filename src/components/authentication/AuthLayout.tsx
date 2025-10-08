import React, { ReactNode, useState } from 'react';
import { Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import EmeraldNebula from '../common/EmeraldNebula';

interface AuthLayoutProps {
  children: ReactNode;
  showBranding?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, showBranding = false }) => {
  const [isNebulaActive, setIsNebulaActive] = useState(false);

  const handleNebulaInteraction = (isActive: boolean) => {
    setIsNebulaActive(isActive);
  };

  const benefits = [
    'Independent third-party certification',
    'Incremental recognition milestones',
    'Expert support throughout',
    'Globally recognized credentials',
  ];

  return (
    <div className="auth-layout-container min-h-screen bg-gradient-to-br from-neutral-charcoal via-primary-forest to-black relative overflow-hidden">
      {/* Emerald Nebula Background */}
      <EmeraldNebula 
        onParticleInteraction={handleNebulaInteraction}
        className="z-0"
      />

      {showBranding ? (
        /* Two Column Layout with Branding */
        <div className="flex min-h-screen">
          {/* Left Side - Branding */}
          <motion.div
            className="auth-layout-branding hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 relative z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="auth-layout-logo-section mb-12">
              <div className="auth-layout-logo flex items-center space-x-3 mb-8">
                <div className="auth-layout-logo-icon bg-primary-emerald p-3 rounded-xl shadow-lg shadow-primary-emerald/30">
                  <Award className="auth-layout-logo-award h-8 w-8 text-white" />
                </div>
                <span className="auth-layout-logo-text text-3xl font-bold text-white drop-shadow-lg">EcoZero Certify</span>
              </div>
              
              <h1 className="auth-layout-title text-4xl xl:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Start Your Certification Journey
              </h1>
              <p className="auth-layout-subtitle text-xl text-neutral-cream/90 drop-shadow-md">
                Join thousands of organizations achieving net zero
              </p>
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
                  <CheckCircle className="auth-layout-benefit-icon h-6 w-6 text-primary-emerald flex-shrink-0 mt-0.5 drop-shadow-sm" />
                  <span className="auth-layout-benefit-text text-neutral-cream/90 text-lg drop-shadow-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Glassmorphism Form */}
          <div className="auth-layout-form-section w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12 relative z-10">
            <motion.div
              className="auth-layout-form-container w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Mobile Logo */}
              <div className="auth-layout-mobile-logo lg:hidden flex items-center justify-center space-x-3 mb-8">
                <div className="auth-layout-mobile-logo-icon bg-primary-emerald p-2 rounded-lg shadow-lg shadow-primary-emerald/30">
                  <Award className="auth-layout-mobile-logo-award h-6 w-6 text-white" />
                </div>
                <span className="auth-layout-mobile-logo-text text-2xl font-bold text-white drop-shadow-lg">EcoZero Certify</span>
              </div>

              {/* Glassmorphism Form Card */}
              <div className={`auth-layout-form-card bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl transition-all duration-500 ${
                isNebulaActive ? 'bg-white/8 border-white/20 shadow-primary-emerald/20' : ''
              }`}>
                {React.isValidElement(children) ? React.cloneElement(children, { 
                  onNebulaInteraction: handleNebulaInteraction 
                } as any) : children}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Centered Form Layout */
        <div className="auth-layout-form-section w-full flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12 relative z-10">
          <motion.div
            className="auth-layout-form-container w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Centered Logo */}
            <div className="auth-layout-logo flex items-center justify-center space-x-3 mb-8">
              <div className="auth-layout-logo-icon bg-primary-emerald p-3 rounded-xl shadow-lg shadow-primary-emerald/30">
                <Award className="auth-layout-logo-award h-8 w-8 text-white" />
              </div>
              <span className="auth-layout-logo-text text-3xl font-bold text-white drop-shadow-lg">EcoZero Certify</span>
            </div>

            {/* Glassmorphism Form Card */}
            <div className={`auth-layout-form-card bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl transition-all duration-500 ${
              isNebulaActive ? 'bg-white/8 border-white/20 shadow-primary-emerald/20' : ''
            }`}>
              {React.isValidElement(children) ? React.cloneElement(children, { 
                onNebulaInteraction: handleNebulaInteraction 
              } as any) : children}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;

