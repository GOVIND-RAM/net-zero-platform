import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CertificationTypes from '../components/CertificationTypes';
import ProcessTimeline from '../components/ProcessTimeline';
import FeatureShowcase from '../components/FeatureShowcase';
import PlatformFeatures from '../components/PlatformFeatures';
import CaseStudy from '../components/CaseStudy';
import WhyChooseUs from '../components/WhyChooseUs';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
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

