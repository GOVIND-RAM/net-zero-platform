import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Users, Globe, Award, Target, Star } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: CheckCircle,
      title: 'No Prerequisites',
      description: 'Meet organizations where they are - no minimum requirements to start your net zero journey.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      icon: Shield,
      title: 'Independent Verification',
      description: 'Third-party credibility with unbiased assessment and certification processes.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Continuous Support',
      description: 'Expert guidance throughout your entire journey with dedicated support teams.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Globe,
      title: 'Global Recognition',
      description: 'Certification that matters - recognized by stakeholders worldwide.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    }
  ];

  const stats = [
    { icon: Award, number: '500+', label: 'Organizations Certified' },
    { icon: Globe, number: '50+', label: 'Countries Worldwide' },
    { icon: Target, number: '10M+', label: 'Tons CO2 Eliminated' },
    { icon: Star, number: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-charcoal mb-6">
            Why Organizations Trust Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the expertise, tools, and support you need to achieve net zero emissions with confidence.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex p-4 rounded-2xl ${reason.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className={`h-8 w-8 ${reason.color}`} />
              </div>

              <h3 className="text-xl font-heading font-bold text-neutral-charcoal mb-4">
                {reason.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-gradient-to-br from-primary-emerald/10 to-accent-gold/10 rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-charcoal mb-4">
              Trusted by Organizations Worldwide
            </h3>
            <p className="text-gray-600">
              Join hundreds of organizations that have achieved net zero certification with our support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className={`inline-flex p-3 rounded-xl bg-primary-emerald/10 mb-4`}>
                    <stat.icon className="h-6 w-6 text-primary-emerald" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary-emerald mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-neutral-charcoal mb-8">
              Built on Global Standards
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                'GHG Protocol',
                'Indian Agreement',
                'ISO 14001',
                'CDP Framework'
              ].map((standard, index) => (
                <motion.div
                  key={standard}
                  className="bg-white rounded-xl px-6 py-3 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-semibold text-neutral-charcoal">{standard}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;