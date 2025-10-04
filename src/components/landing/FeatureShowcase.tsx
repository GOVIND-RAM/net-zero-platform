import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, CheckCircle, TrendingUp, Shield } from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      id: 'incremental',
      title: 'Celebrate Progress at Every Milestone',
      description: 'Receive tangible certificates throughout your journey - from initial assessment to carbon offset purchases to final certification. Demonstrate progress to stakeholders with multiple recognition benchmarks.',
      icon: Award,
      image: '🌱',
      points: [
        'Assessment Certificate',
        'Net Zero Plan Certificate',
        'Progress Milestones',
        'Final Certification'
      ],
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      id: 'framework',
      title: 'Built on Global Standards',
      description: 'Based on the GHG Protocol and aligned with the Indian Agreement. Our rating system agnostic approach gives you flexibility to use your preferred framework while achieving recognized certification.',
      icon: Globe,
      image: '🌍',
      points: [
        'GHG Protocol Based',
        'Indian Agreement Aligned',
        'Framework Flexible',
        'Globally Recognized'
      ],
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    }
  ];

  return (
    <section className="feature-showcase-section bg-white section-padding">
      <div className="feature-showcase-container container-custom">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className={`feature-showcase-item mb-24 last:mb-0 ${feature.bgColor} rounded-3xl p-8 lg:p-12`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`feature-showcase-grid grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Content */}
              <motion.div
                className={`feature-showcase-content space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="feature-showcase-header flex items-center space-x-3">
                  <div className={`feature-showcase-icon-container p-3 rounded-xl ${feature.iconBg}`}>
                    <feature.icon className={`feature-showcase-icon h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <span className="feature-showcase-badge text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Key Feature
                  </span>
                </div>

                <h3 className="feature-showcase-title text-3xl sm:text-4xl font-heading font-bold text-neutral-charcoal">
                  {feature.title}
                </h3>

                <p className="feature-showcase-description text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="feature-showcase-points grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {feature.points.map((point, pointIndex) => (
                    <motion.div
                      key={point}
                      className="feature-showcase-point flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + pointIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="feature-showcase-point-icon h-5 w-5 text-primary-emerald flex-shrink-0" />
                      <span className="feature-showcase-point-text font-medium text-neutral-charcoal">{point}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="feature-showcase-cta btn-primary mt-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Visual */}
              <motion.div
                className={`feature-showcase-visual ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="feature-showcase-visual-container relative">
                  {/* Main Visual */}
                  <div className="feature-showcase-main-visual bg-white rounded-2xl p-8 shadow-xl">
                    <div className="feature-showcase-visual-content text-center">
                      <div className="feature-showcase-visual-icon text-8xl mb-6">{feature.image}</div>
                      <div className="feature-showcase-progress-bars space-y-4">
                        <div className="feature-showcase-progress-bar h-4 bg-gradient-to-r from-primary-emerald to-accent-gold rounded-full" />
                        <div className="feature-showcase-progress-bar h-4 bg-gradient-to-r from-accent-gold to-primary-emerald rounded-full" />
                        <div className="feature-showcase-progress-bar h-4 bg-gradient-to-r from-primary-emerald to-accent-gold rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="feature-showcase-floating-element feature-showcase-floating-top absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <div className="feature-showcase-floating-content flex items-center space-x-2">
                      <TrendingUp className="feature-showcase-floating-icon h-5 w-5 text-green-600" />
                      <span className="feature-showcase-floating-text font-semibold text-sm">Progress Tracking</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="feature-showcase-floating-element feature-showcase-floating-bottom absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4"
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: -5 }}
                  >
                    <div className="feature-showcase-floating-content flex items-center space-x-2">
                      <Shield className="feature-showcase-floating-icon h-5 w-5 text-blue-600" />
                      <span className="feature-showcase-floating-text font-semibold text-sm">Secure Platform</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureShowcase;