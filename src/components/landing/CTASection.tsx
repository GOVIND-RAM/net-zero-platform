import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    organizationType: '',
    agreeToCommunications: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const organizationTypes = [
    'Building',
    'Portfolio',
    'Business',
    'Community',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="cta-section bg-gradient-to-br from-primary-emerald to-primary-forest section-padding">
        <div className="cta-container container-custom">
          <motion.div
            className="cta-success-message text-center text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-success-card bg-white/10 rounded-3xl p-8 lg:p-12 max-w-2xl mx-auto">
              <CheckCircle className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="cta-success-title text-3xl sm:text-4xl font-heading font-bold mb-4">
                Thank You!
              </h2>
              <p className="cta-success-description text-xl mb-8 opacity-90">
                We've received your consultation request. Our team will contact you within 24 hours to discuss your net zero certification journey.
              </p>
              <motion.button
                className="cta-resubmit-button bg-white text-primary-emerald px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Request
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="cta-section bg-gradient-to-br from-primary-emerald to-primary-forest section-padding">
      <div className="cta-container container-custom">
        <motion.div
          className="cta-header text-center text-white mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Ready to Begin Your Net Zero Journey?
          </h2>
          <p className="cta-description text-lg sm:text-xl opacity-90 max-w-3xl mx-auto">
            Join organizations worldwide in eliminating emissions and achieving certification. 
            Start with a free consultation to assess your current status.
          </p>
        </motion.div>

        <motion.div
          className="cta-form-wrapper max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="cta-form-card bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="cta-form space-y-6">
              <div className="form-field-group">
                <label htmlFor="companyName" className="cta-form-label block text-sm font-semibold text-neutral-charcoal mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="cta-form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-emerald focus:border-transparent transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="email" className="cta-form-label block text-sm font-semibold text-neutral-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="cta-form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-emerald focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="organizationType" className="cta-form-label block text-sm font-semibold text-neutral-charcoal mb-2">
                  Organization Type *
                </label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  required
                  className="cta-form-select w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-emerald focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select organization type</option>
                  {organizationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="cta-checkbox-group flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToCommunications"
                  name="agreeToCommunications"
                  checked={formData.agreeToCommunications}
                  onChange={handleInputChange}
                  className="cta-checkbox mt-1 h-4 w-4 text-primary-emerald border-gray-300 rounded focus:ring-primary-emerald"
                />
                <label htmlFor="agreeToCommunications" className="cta-checkbox-label text-sm text-gray-600">
                  I agree to receive communications about net zero certification and related services.
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="cta-submit-button w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Request Consultation</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="cta-contact-section mt-8 pt-6 border-t border-gray-200">
              <div className="cta-contact-content text-center">
                <p className="cta-contact-text text-gray-600 mb-4">Or call us directly</p>
                <motion.a
                  href="tel:+91-9876543210"
                  className="cta-phone-link inline-flex items-center space-x-2 text-primary-emerald font-semibold hover:text-primary-forest transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="h-5 w-5" />
                  <span>+91 9876543210</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;