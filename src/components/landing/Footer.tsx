import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Certifications',
      links: [
        { name: 'Buildings', href: '#buildings' },
        { name: 'Portfolios', href: '#portfolios' },
        { name: 'Businesses', href: '#businesses' },
        { name: 'Communities', href: '#communities' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#documentation' },
        { name: 'Best Practices', href: '#best-practices' },
        { name: 'Case Studies', href: '#case-studies' },
        { name: 'FAQs', href: '#faqs' },
        { name: 'Blog', href: '#blog' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#team' },
        { name: 'Partners', href: '#partners' },
        { name: 'Careers', href: '#careers' },
        { name: 'Contact', href: '#contact' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Youtube, href: '#youtube', label: 'YouTube' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@ecozerocertify.com' },
    { icon: Phone, text: '+91 9876543210' },
    { icon: MapPin, text: 'Banglore, India' }
  ];

  return (
    <footer className="footer bg-neutral-charcoal text-white">
      <div className="footer-container container-custom section-padding">
        {/* Main Footer Content */}
        <div className="footer-main-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            className="footer-brand-column lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo flex items-center space-x-2 mb-6">
              <div className="footer-logo-icon bg-primary-emerald p-2 rounded-lg">
                <Leaf className="footer-logo-leaf h-6 w-6 text-white" />
              </div>
              <span className="footer-logo-text text-2xl font-heading font-bold">
                EcoZero Certify
              </span>
            </div>
            
            <p className="footer-description text-gray-300 mb-6 leading-relaxed">
              Accelerating the path to net zero through independent certification and expert support.
            </p>

            <div className="footer-contact-info space-y-3">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.text}
                  className="footer-contact-item flex items-center space-x-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <info.icon className="footer-contact-icon h-4 w-4 text-primary-emerald" />
                  <span className="footer-contact-text text-sm">{info.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Columns */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="footer-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="footer-section-title text-lg font-heading font-bold mb-6">
                {section.title}
              </h3>
              <ul className="footer-section-links space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    className="footer-section-link-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="footer-section-link text-gray-300 hover:text-primary-emerald transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="footer-social-section border-t border-gray-700 pt-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-social-content flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="footer-social-links flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="footer-social-link bg-gray-700 hover:bg-primary-emerald p-3 rounded-lg transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="footer-social-icon h-5 w-5" />
                </motion.a>
              ))}
            </div>

            <div className="footer-social-info text-center sm:text-right">
              <p className="footer-social-info-text text-gray-300 text-sm mb-2">
                Based on GHG Protocol | Indian Agreement Aligned
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="footer-bottom border-t border-gray-700 pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="footer-copyright text-gray-400 text-sm">
              © 2025 EcoZero Certify. All rights reserved.
            </p>
            <div className="footer-bottom-links flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="footer-bottom-link text-gray-400 hover:text-primary-emerald transition-colors duration-300 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;