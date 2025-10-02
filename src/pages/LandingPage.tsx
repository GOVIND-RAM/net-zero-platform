import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/ui/Hero';
import CertificationTypes from '../components/ui/CertificationTypes';
import ProcessTimeline from '../components/ui/ProcessTimeline';
import FeatureShowcase from '../components/ui/FeatureShowcase';
import PlatformFeatures from '../components/ui/PlatformFeatures';
import CaseStudy from '../components/ui/CaseStudy';
import WhyChooseUs from '../components/ui/WhyChooseUs';
import CTASection from '../components/ui/CTASection';
import Footer from '../components/ui/Footer';

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

