import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, BookOpen, Cloud, ArrowRight } from 'lucide-react';

const PlatformFeatures: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Data-Driven Dashboard',
      description: 'Track emissions, energy, water, waste metrics in real-time with comprehensive analytics and reporting.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Access subject matter experts and peer collaboration opportunities to accelerate your net zero journey.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      icon: BookOpen,
      title: 'Best Practices Library',
      description: 'Learn from industry-leading net zero strategies and proven methodologies from certified organizations.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Cloud,
      title: 'Secure & Scalable',
      description: 'Highly secure, cloud-based platform with enterprise-grade security. Free to sign up and get started.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    }
  ];

  return (
    <section id="platform" className="bg-gradient-to-br from-neutral-cream to-white section-padding">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-charcoal mb-6">
            Powerful Platform, Seamless Experience
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Cloud-based tools and resources to accelerate your net zero journey with expert support and proven methodologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="card p-6 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`inline-flex p-4 rounded-2xl ${feature.iconBg} mb-6`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-heading font-bold text-neutral-charcoal mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              <motion.button
                className="flex items-center space-x-2 text-primary-emerald font-semibold group-hover:text-primary-forest transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Platform Stats */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '99.9%', label: 'Uptime Guarantee' },
                { number: '256-bit', label: 'SSL Encryption' },
                { number: '24/7', label: 'Expert Support' },
                { number: 'Free', label: 'Sign Up' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-primary-emerald mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformFeatures;