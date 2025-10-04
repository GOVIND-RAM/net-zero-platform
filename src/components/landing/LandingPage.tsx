import React from 'react';
import Navbar from '../layout/Navbar';
import Hero from './Hero';
import CertificationTypes from './CertificationTypes';
import ProcessTimeline from './ProcessTimeline';
import FeatureShowcase from './FeatureShowcase';
import PlatformFeatures from './PlatformFeatures';
import CaseStudy from './CaseStudy';
import WhyChooseUs from './WhyChooseUs';
import CTASection from './CTASection';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-container">
      <Navbar />
      <Hero />
      <CertificationTypes />
      <ProcessTimeline />
      <FeatureShowcase />
      <PlatformFeatures />
      <CaseStudy />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;

