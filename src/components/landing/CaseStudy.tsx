import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Award, Calendar, TrendingDown } from 'lucide-react';

const CaseStudy: React.FC = () => {
  return (
    <section className="case-study-section bg-gradient-to-br from-primary-emerald/10 to-accent-gold/10 section-padding">
      <div className="case-study-container container-custom">
        <motion.div
          className="case-study-grid grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Content */}
          <motion.div
            className="case-study-content space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="case-study-badge flex items-center space-x-2">
              <Quote className="case-study-badge-icon h-6 w-6 text-primary-emerald" />
              <span className="case-study-badge-text text-sm font-semibold text-primary-emerald uppercase tracking-wide">
                Success Story
              </span>
            </div>

            <h2 className="case-study-title text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-charcoal">
              Real Organizations,{' '}
              <span className="case-study-title-highlight text-primary-emerald">Real Results</span>
            </h2>

            <div className="case-study-card bg-white rounded-2xl p-6 shadow-lg">
              <div className="case-study-company flex items-center space-x-4 mb-4">
                <div className="case-study-company-logo w-12 h-12 bg-gradient-to-br from-primary-emerald to-accent-gold rounded-full flex items-center justify-center">
                  <span className="case-study-company-initials text-white font-bold text-lg">TC</span>
                </div>
                <div className="case-study-company-info">
                  <h3 className="case-study-company-name text-xl font-heading font-bold text-neutral-charcoal">
                    TechCorp Industries
                  </h3>
                  <p className="case-study-company-description text-gray-600">Global Technology Company</p>
                </div>
              </div>

              <div className="case-study-achievement flex items-center space-x-2 mb-4">
                <Award className="case-study-achievement-icon h-5 w-5 text-accent-gold" />
                <span className="case-study-achievement-text text-lg font-semibold text-neutral-charcoal">
                  Achieved Net Zero Certification 6 Years Ahead of Schedule
                </span>
              </div>

              <blockquote className="case-study-quote text-gray-700 italic leading-relaxed">
                "By partnering with EcoZero Certify, we accelerated our net zero goals and demonstrated our commitment to sustainability to our stakeholders. The incremental recognition approach kept our team motivated throughout the journey."
              </blockquote>

              <div className="case-study-stats flex items-center space-x-4 mt-4 text-sm text-gray-600">
                <div className="case-study-stat-item flex items-center space-x-1">
                  <Calendar className="case-study-stat-icon h-4 w-4" />
                  <span className="case-study-stat-text">Certified 2024</span>
                </div>
                <div className="case-study-stat-item flex items-center space-x-1">
                  <TrendingDown className="case-study-stat-icon h-4 w-4" />
                  <span className="case-study-stat-text">85% Emissions Reduction</span>
                </div>
              </div>
            </div>

            <motion.button
              className="case-study-cta-button btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More Success Stories
            </motion.button>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="case-study-visual relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="case-study-visual-card bg-white rounded-3xl p-8 shadow-xl">
              {/* Company Building/Office Visual */}
              <div className="case-study-building-visual relative h-80 bg-gradient-to-br from-primary-forest to-primary-emerald rounded-2xl overflow-hidden">
                <div className="case-study-building-overlay absolute inset-0 bg-black/20" />
                <div className="case-study-building-content absolute inset-0 flex items-center justify-center">
                  <div className="case-study-building-text text-center text-white">
                    <div className="case-study-building-icon text-6xl mb-4">🏢</div>
                    <div className="case-study-building-title text-2xl font-bold mb-2">TechCorp HQ</div>
                    <div className="case-study-building-status text-sm opacity-90">Net Zero Certified</div>
                  </div>
                </div>
                
                {/* Floating Achievement Badges */}
                <motion.div
                  className="case-study-floating-badge case-study-badge-certified absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="case-study-badge-content flex items-center space-x-2">
                    <Award className="case-study-badge-icon h-5 w-5 text-accent-gold" />
                    <span className="case-study-badge-text font-semibold text-sm">Certified</span>
                  </div>
                </motion.div>

                <motion.div
                  className="case-study-floating-badge case-study-badge-reduction absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="case-study-badge-content flex items-center space-x-2">
                    <TrendingDown className="case-study-badge-icon h-5 w-5 text-green-600" />
                    <span className="case-study-badge-text font-semibold text-sm">85% Reduction</span>
                  </div>
                </motion.div>
              </div>

              {/* Progress Timeline */}
              <div className="case-study-timeline mt-6 space-y-4">
                <h4 className="case-study-timeline-title font-heading font-bold text-neutral-charcoal">Certification Journey</h4>
                <div className="case-study-timeline-steps space-y-3">
                  {[
                    { phase: 'Assessment', status: 'completed', date: '2023 Q1' },
                    { phase: 'Planning', status: 'completed', date: '2023 Q2' },
                    { phase: 'Implementation', status: 'completed', date: '2023 Q4' },
                    { phase: 'Certification', status: 'completed', date: '2024 Q1' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.phase}
                      className="case-study-timeline-step flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="case-study-timeline-dot w-3 h-3 bg-primary-emerald rounded-full" />
                      <span className="case-study-timeline-phase font-medium text-neutral-charcoal">{item.phase}</span>
                      <span className="case-study-timeline-date text-sm text-gray-500 ml-auto">{item.date}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;