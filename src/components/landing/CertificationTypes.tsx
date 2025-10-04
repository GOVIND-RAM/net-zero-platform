import React from 'react';
import { motion } from 'framer-motion';
import { Building, Briefcase, Users, ArrowRight } from 'lucide-react';

const CertificationTypes: React.FC = () => {
  const certifications = [
    {
      icon: Building,
      title: 'Net Zero for Buildings',
      description: 'Comprehensive certification for individual buildings and facilities',
      features: [
        'Emissions Assessment',
        'Energy Efficiency',
        'Water Management',
        'Waste Reduction'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Briefcase,
      title: 'Net Zero for Portfolios',
      description: 'Portfolio-wide certification for real estate and investment groups',
      features: [
        'Portfolio Emissions',
        'Energy Portfolio',
        'Water Portfolio',
        'Waste Portfolio'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Users,
      title: 'Net Zero for Businesses',
      description: 'Enterprise certification for companies and organizations',
      features: [
        'Business Emissions',
        'Energy Management',
        'Water Stewardship',
        'Waste Management'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    }
  ];

  return (
    <section id="certifications" className="certification-types-section bg-white section-padding">
      <div className="certification-types-container container-custom">
        <motion.div
          className="certification-types-header text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="certification-types-title text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-charcoal mb-6">
            Comprehensive Net Zero Certification
          </h2>
          <p className="certification-types-description text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the certification path that fits your organization and start your journey to net zero emissions.
          </p>
        </motion.div>

        <div className="certification-types-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="certification-type-card card p-8 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`certification-type-icon ${cert.iconBg} inline-flex p-4 rounded-2xl mb-6`}>
                <cert.icon className={`h-8 w-8 ${cert.color}`} />
              </div>

              <h3 className="certification-type-title text-2xl font-heading font-bold text-neutral-charcoal mb-4">
                {cert.title}
              </h3>

              <p className="certification-type-description text-gray-600 mb-6 leading-relaxed">
                {cert.description}
              </p>

              <ul className="certification-type-features space-y-3 mb-8">
                {cert.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    className="certification-type-feature flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <div className="feature-bullet w-2 h-2 bg-primary-emerald rounded-full flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className="certification-type-cta flex items-center space-x-2 text-primary-emerald font-semibold group-hover:text-primary-forest transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="certification-types-additional mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="certification-types-includes bg-gradient-to-r from-primary-emerald/10 to-accent-gold/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="includes-title text-2xl font-heading font-bold text-neutral-charcoal mb-4">
              All Certifications Include
            </h3>
            <div className="includes-features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Independent Verification',
                'Expert Support',
                'Progress Tracking',
                'Global Recognition'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="include-feature-item flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="include-bullet w-2 h-2 bg-primary-emerald rounded-full" />
                  <span className="font-medium text-neutral-charcoal">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationTypes;