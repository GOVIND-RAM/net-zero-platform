import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FormStepper from './FormStepper';
import ProjectRegistrationForm from './ProjectRegistrationForm';

const NewProjectPage: React.FC = () => {
  const { certificationType } = useParams<{ certificationType: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      name: 'Basic Information',
      description: 'Project details and organization'
    },
    {
      id: 2,
      name: 'Location & Details',
      description: 'Address and industry information'
    },
    {
      id: 3,
      name: 'Certification',
      description: 'Certification level and timeline'
    }
  ];

  const getCertificationTypeDisplay = (type: string) => {
    switch (type) {
      case 'building':
        return 'Building Certification';
      case 'portfolio':
        return 'Portfolio Certification';
      case 'home':
        return 'Home Certification';
      case 'community-center':
        return 'Community Center Certification';
      case 'campus':
        return 'Campus Certification';
      case 'warehouse':
        return 'Warehouse Certification';
      case 'community':
        return 'Community Certification';
      case 'city':
        return 'City Certification';
      case 'business':
        return 'Business Certification';
      case 'product':
        return 'Product Certification';
      case 'process':
        return 'Process Certification';
      case 'fleet':
        return 'Fleet Certification';
      case 'supply-chain':
        return 'Supply Chain Certification';
      default:
        return 'Project Certification';
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (data: any) => {
    // TODO: Implement project creation logic
    console.log('Project data:', data);
    
    // For now, just navigate back to the dashboard
    navigate(`/dashboard/projects/${certificationType}`);
  };

  const handleCancel = () => {
    navigate(`/dashboard/projects/${certificationType}`);
  };

  return (
    <div className="new-project-page min-h-screen bg-gradient-to-br from-primary-forest via-primary-forest/90 to-neutral-charcoal">
      {/* Header */}
      <div className="new-project-page-header bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="new-project-page-header-container max-w-4xl mx-auto px-6 py-6">
          <div className="new-project-page-header-content flex items-center space-x-4">
            <button
              onClick={handleCancel}
              className="new-project-page-back-button flex items-center text-white hover:text-neutral-cream/80 transition-colors"
            >
              <ArrowLeft className="new-project-page-back-icon h-5 w-5 mr-2" />
              <span className="new-project-page-back-text">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="new-project-page-main-content max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="new-project-page-header-section text-center mb-12">
          <h1 className="new-project-page-title text-4xl font-bold text-white mb-4">
            Create New {getCertificationTypeDisplay(certificationType || '')}
          </h1>
          <p className="new-project-page-description text-neutral-cream/80 text-lg">
            Register your project and start your journey towards net-zero certification
          </p>
        </div>

        {/* Form Container */}
        <div className="new-project-page-form-container bg-white rounded-2xl p-8 sm:p-12 shadow-2xl">
          {/* Stepper */}
          <FormStepper currentStep={currentStep} steps={steps} />

          {/* Form */}
          <ProjectRegistrationForm
            currentStep={currentStep}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Progress Indicator */}
        <div className="new-project-page-progress-indicator mt-8 text-center">
          <div className="new-project-page-progress-content inline-flex items-center space-x-2 text-neutral-cream/60">
            <span className="new-project-page-progress-text text-sm">Step {currentStep} of {steps.length}</span>
            <div className="new-project-page-progress-dots flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`new-project-page-progress-dot w-2 h-2 rounded-full transition-all duration-300 ${
                    index + 1 <= currentStep
                      ? 'bg-primary-emerald'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;

