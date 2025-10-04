import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectDetailsForm from './ProjectDetailsForm';
import OwnerInformationForm from './OwnerInformationForm';
import ProjectAddressForm from './ProjectAddressForm';
import ProjectAgreementPage from './ProjectAgreementPage';

interface ProjectData {
  // Project Details
  name: string;
  groupCertification: boolean;
  ratingSystem: string;
  unitType: 'sqft' | 'sqm';
  startDate: string;
  endDate: string;
  projectType: string;
  grossFloorArea: string;
  
  // Owner Information
  owner: string;
  ownerRepresentative: string;
  ownerType: string;
  ownerCountry: string;
  ownerState: string;
  email: string;
  projectCharacteristics: string[];
  
  // Project Address
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  geoLocation: string;
}

const ProjectCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    groupCertification: false,
    ratingSystem: 'CertifyPro v4 BD+C: New Construction',
    unitType: 'sqft',
    startDate: '',
    endDate: '',
    projectType: '',
    grossFloorArea: '',
    owner: '',
    ownerRepresentative: '',
    ownerType: '',
    ownerCountry: 'India',
    ownerState: '',
    email: '',
    projectCharacteristics: [],
    address1: '',
    address2: '',
    city: '',
    country: 'India',
    state: '',
    postalCode: '',
    geoLocation: '',
  });

  const steps = [
    { id: 1, title: 'Project Details', description: 'Basic project information' },
    { id: 2, title: 'Owner Information', description: 'Organization and contact details' },
    { id: 3, title: 'Project Address', description: 'Location and geo-coordinates' },
    { id: 4, title: 'Agreement', description: 'Review and confirm project data' },
  ];

  const handleNext = (data: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Navigate to project dashboard with tabbed interface
    navigate('/project/dashboard', { state: { projectData } });
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectDetailsForm
            data={projectData}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case 2:
        return (
          <OwnerInformationForm
            data={projectData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onCancel={handleCancel}
          />
        );
      case 3:
        return (
          <ProjectAddressForm
            data={projectData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onCancel={handleCancel}
          />
        );
      case 4:
        return (
          <ProjectAgreementPage
            data={projectData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            onCancel={handleCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="project-creation-page min-h-screen bg-slate-50">
      {/* Header */}
      <div className="project-creation-page-header bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="project-creation-page-header-container max-w-6xl mx-auto px-6 py-3">
          <div className="project-creation-page-header-content flex items-center justify-between mb-3">
            <button
              onClick={handleCancel}
              className="project-creation-page-back-button flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="project-creation-page-back-icon h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="project-creation-page-back-text font-medium">Back to Dashboard</span>
            </button>
            
            <div className="project-creation-page-title-section text-center">
              <h1 className="project-creation-page-title text-xl font-bold text-slate-900">Create New Project</h1>
              <p className="project-creation-page-subtitle text-slate-600 text-sm">Complete the steps below to register your project</p>
            </div>
            
            <div className="project-creation-page-spacer w-32"></div> {/* Spacer for centering */}
          </div>
          
          {/* Progress Steps - Improved Design */}
          <div className="project-creation-page-progress-steps relative">
            <div className="project-creation-page-progress-steps-container flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="project-creation-page-step flex flex-col items-center relative">
                  {/* Step Circle */}
                  <div className={`project-creation-page-step-circle relative z-10 flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-primary-emerald text-white shadow-lg shadow-primary-emerald/25'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="project-creation-page-step-check-icon h-6 w-6" />
                    ) : (
                      <span className="project-creation-page-step-number">{step.id}</span>
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className="project-creation-page-step-content mt-2 text-center max-w-32">
                    <p className={`project-creation-page-step-title text-xs font-semibold transition-colors ${
                      currentStep >= step.id ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="project-creation-page-step-description text-xs text-slate-500 mt-0.5 leading-tight">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className={`project-creation-page-step-connector absolute top-6 left-12 w-full h-0.5 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-primary-emerald' : 'bg-slate-200'
                    }`} style={{ width: 'calc(100% - 3rem)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="project-creation-page-main-content max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="project-creation-page-step-content"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectCreationPage;
