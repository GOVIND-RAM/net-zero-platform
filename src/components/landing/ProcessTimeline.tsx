import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Award, ArrowRight } from 'lucide-react';

const ProcessTimeline: React.FC = () => {
  const phases = [
    {
      icon: Search,
      badge: 'Phase 1',
      title: 'Carbon Assessment',
      description: 'Calculate your Scope 1, 2, and 3 emissions baseline. Receive a comprehensive emissions assessment certificate upon completion.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      icon: FileText,
      badge: 'Phase 2',
      title: 'Net Zero Roadmap',
      description: 'Develop a customized net zero transition plan with our expert support. Implement best-in-class strategies and receive your net zero plan certificate.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Award,
      badge: 'Phase 3',
      title: 'Achieve Certification',
      description: 'Reach net zero status and receive official certification. Submit annual documentation to maintain your certified status.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    }
  ];

  return (
    <section id="process" className="process-timeline-section bg-gradient-to-br from-neutral-cream to-white section-padding">
      <div className="process-timeline-container container-custom">
        <motion.div
          className="process-timeline-header text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="process-timeline-title text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-charcoal mb-6">
            Your Path to Net Zero - Three Simple Phases
          </h2>
          <p className="process-timeline-description text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We meet you where you are and guide you to certification with expert support at every step.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="process-timeline-desktop hidden lg:block">
          <div className="process-timeline-desktop-container relative">
            {/* Connection Line */}
            <div className="process-timeline-connection-line absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-emerald via-accent-gold to-primary-emerald transform -translate-y-1/2" />
            
            <div className="process-timeline-phases-grid grid grid-cols-3 gap-8">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  className="process-timeline-phase-item relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Phase Card */}
                  <div className="process-timeline-phase-card card p-8 text-center">
                    <div className={`process-timeline-phase-icon-container inline-flex p-4 rounded-2xl ${phase.iconBg} mb-6`}>
                      <phase.icon className={`process-timeline-phase-icon h-8 w-8 ${phase.color}`} />
                    </div>

                    <div className={`process-timeline-phase-badge inline-block px-3 py-1 rounded-full text-sm font-semibold ${phase.bgColor} ${phase.color} mb-4`}>
                      {phase.badge}
                    </div>

                    <h3 className="process-timeline-phase-title text-2xl font-heading font-bold text-neutral-charcoal mb-4">
                      {phase.title}
                    </h3>

                    <p className="process-timeline-phase-description text-gray-600 leading-relaxed mb-6">
                      {phase.description}
                    </p>

                    {/* Certificate Icon */}
                    <div className="process-timeline-phase-certificate flex justify-center">
                      <div className="process-timeline-phase-certificate-icon bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 p-4 rounded-xl">
                        <Award className="process-timeline-phase-certificate-award h-8 w-8 text-accent-gold" />
                      </div>
                    </div>
                  </div>

                  {/* Arrow to next phase */}
                  {index < phases.length - 1 && (
                    <div className="process-timeline-phase-arrow absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="process-timeline-phase-arrow-icon h-6 w-6 text-primary-emerald" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="process-timeline-mobile lg:hidden space-y-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              className="process-timeline-mobile-phase-item relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="process-timeline-mobile-phase-card card p-6">
                <div className="process-timeline-mobile-phase-content flex items-start space-x-4">
                  <div className={`process-timeline-mobile-phase-icon-container p-3 rounded-xl ${phase.iconBg} flex-shrink-0`}>
                    <phase.icon className={`process-timeline-mobile-phase-icon h-6 w-6 ${phase.color}`} />
                  </div>
                  
                  <div className="process-timeline-mobile-phase-details flex-1">
                    <div className={`process-timeline-mobile-phase-badge inline-block px-3 py-1 rounded-full text-sm font-semibold ${phase.bgColor} ${phase.color} mb-3`}>
                      {phase.badge}
                    </div>
                    
                    <h3 className="process-timeline-mobile-phase-title text-xl font-heading font-bold text-neutral-charcoal mb-3">
                      {phase.title}
                    </h3>
                    
                    <p className="process-timeline-mobile-phase-description text-gray-600 leading-relaxed mb-4">
                      {phase.description}
                    </p>
                    
                    <div className="process-timeline-mobile-phase-certificate flex items-center justify-center">
                      <div className="process-timeline-mobile-phase-certificate-icon bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 p-3 rounded-lg">
                        <Award className="process-timeline-mobile-phase-certificate-award h-6 w-6 text-accent-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Line for Mobile */}
              {index < phases.length - 1 && (
                <div className="process-timeline-mobile-connector flex justify-center my-4">
                  <div className="process-timeline-mobile-connector-line w-0.5 h-8 bg-gradient-to-b from-primary-emerald to-accent-gold" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="process-timeline-cta mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="process-timeline-cta-card bg-gradient-to-r from-primary-emerald/10 to-accent-gold/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="process-timeline-cta-title text-2xl font-heading font-bold text-neutral-charcoal mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="process-timeline-cta-description text-gray-600 mb-6">
              Begin with Phase 1 and receive your first certificate upon completion of the assessment.
            </p>
            <motion.button
              className="process-timeline-cta-button btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Phase 1 Assessment
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTimeline;