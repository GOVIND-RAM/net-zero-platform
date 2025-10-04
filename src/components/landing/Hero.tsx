import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, Users, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const floatingCards = [
    { icon: CheckCircle, text: 'Zero Prerequisites', color: 'text-green-600' },
    { icon: Award, text: 'Incremental Recognition', color: 'text-accent-gold' },
    { icon: Users, text: 'Expert Support', color: 'text-primary-emerald' },
  ];

  const stats = [
    { number: '500+', label: 'Organizations Certified' },
    { number: '50+', label: 'Countries Worldwide' },
    { number: '10M+', label: 'Tons CO2 Eliminated' },
    { number: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="home" className="hero-section min-h-screen bg-gradient-to-br from-neutral-cream to-white flex items-center overflow-hidden">
      <div className="hero-container container-custom section-padding">
        <div className="hero-content-grid grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="hero-left-content space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="hero-badge inline-flex items-center space-x-2 bg-primary-emerald/10 text-primary-emerald px-4 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Globe className="h-4 w-4" />
              <span>Aligned with Indian Agreement & GHG Protocol</span>
            </motion.div>

            <motion.h1
              className="hero-title text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-neutral-charcoal leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Achieve Net Zero Certification with{' '}
              <span className="text-primary-emerald">Confidence</span>
            </motion.h1>

            <motion.p
              className="hero-description text-lg sm:text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Independent third-party certification for buildings, businesses, and portfolios. 
              Eliminate Scope 1, 2, and 3 emissions with expert support every step of the way.
            </motion.p>

            <motion.div
              className="hero-cta-buttons flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                className="btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Consultation
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Visual */}
          <motion.div
            className="hero-right-content relative lg:ml-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Hero Illustration */}
            <div className="hero-illustration relative bg-gradient-to-br from-primary-emerald/20 to-accent-gold/20 rounded-3xl p-8 lg:p-12">
              <div className="hero-stats-grid grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="hero-stat-card bg-white rounded-xl p-4 text-center shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="hero-stat-number text-2xl font-bold text-primary-emerald">
                      {stat.number}
                    </div>
                    <div className="hero-stat-label text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Abstract Sustainability Visual */}
              <div className="hero-sustainability-visual relative h-64 bg-gradient-to-br from-primary-forest to-primary-emerald rounded-2xl flex items-center justify-center">
                <motion.div
                  className="sustainability-visual-content text-white text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="sustainability-icon text-6xl mb-4">🌱</div>
                  <div className="sustainability-title text-xl font-semibold">Net Zero Journey</div>
                  <div className="sustainability-subtitle text-sm opacity-90">Sustainable Future</div>
                </motion.div>
              </div>
            </div>

            {/* Floating Cards - Repositioned to avoid overlap */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.text}
                className={`hero-floating-card absolute bg-white rounded-xl shadow-lg p-3 lg:p-4 flex items-center space-x-2 lg:space-x-3 z-10 ${
                  index === 0 ? 'top-2 right-2 lg:top-4 lg:right-4' : 
                  index === 1 ? 'bottom-2 left-2 lg:bottom-4 lg:left-4' : 
                  'top-1/2 right-2 lg:right-4'
                }`}
                initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? 20 : -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <card.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${card.color}`} />
                <span className="font-semibold text-neutral-charcoal whitespace-nowrap text-sm lg:text-base">
                  {card.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;