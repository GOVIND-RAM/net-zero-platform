import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings,
  MapPin, 
  Droplets, 
  Zap, 
  Package, 
  Home, 
  Lightbulb, 
  Globe,
  FileText
} from 'lucide-react';
import QuestionnairePage from './QuestionnairePage';
import ProjectDetailsDisplay from './ProjectDetailsDisplay';
import { ProjectProvider } from '../../context/ProjectContext';

interface ProjectData {
  name: string;
  groupCertification: boolean;
  ratingSystem: string;
  unitType: 'sqft' | 'sqm';
  startDate: string;
  endDate: string;
  projectType: string;
  grossFloorArea: string;
  owner: string;
  ownerRepresentative: string;
  ownerType: string;
  ownerCountry: string;
  ownerState: string;
  email: string;
  projectCharacteristics: string[];
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  geoLocation: string;
  // Additional fields from the image
  buildingTitle: string;
  occupancyCategory: string;
  targetCertificationArea: string;
  buildingPartOf: string;
  confidentialData: string;
  startDateBuilding: string;
}

interface Tab {
  id: string;
  name: string;
  icon: any;
}

const ProjectDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectData: ProjectData = location.state?.projectData || {};
  const buildingType = location.state?.buildingType || 'building';
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState<ProjectData>({
    ...projectData,
    buildingTitle: projectData.buildingTitle || projectData.name || '',
    occupancyCategory: projectData.occupancyCategory || '',
    targetCertificationArea: projectData.targetCertificationArea || '',
    buildingPartOf: projectData.buildingPartOf || '',
    confidentialData: projectData.confidentialData || 'No',
    startDateBuilding: projectData.startDateBuilding || '',
    ratingSystem: projectData.ratingSystem || 'CertifyPro v4 BD+C: New Construction',
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('projectFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('projectFormData', JSON.stringify(formData));
  }, [formData]);

  const tabs: Tab[] = [
    { id: 'basic-info', name: 'Basic Info', icon: FileText },
    { id: 'integrative-process', name: 'Integrative Process', icon: Settings },
    { id: 'location-transportation', name: 'Location and Transportation', icon: MapPin },
    { id: 'water-efficiency', name: 'Water Efficiency', icon: Droplets },
    { id: 'energy-atmosphere', name: 'Energy and Atmosphere', icon: Zap },
    { id: 'materials-resources', name: 'Materials and Resources', icon: Package },
    { id: 'indoor-environmental-quality', name: 'Indoor Environmental Quality', icon: Home },
    { id: 'innovation', name: 'Innovation', icon: Lightbulb },
    { id: 'regional-priority', name: 'Regional Priority', icon: Globe },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNavigateToCategory = (categoryId: string) => {
    setActiveTab(categoryId);
  };

  const handleSaveAndNext = () => {
    // Save current data first
    localStorage.setItem('projectFormData', JSON.stringify(formData));
    
    // Navigate to next tab in sequence - always go to next tab regardless of completion
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1];
      console.log(`Navigating from ${activeTab} to ${nextTab.id}`);
      setActiveTab(nextTab.id);
    } else {
      console.log(`Already at last tab: ${activeTab}`);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSave = () => {
    localStorage.setItem('projectFormData', JSON.stringify(formData));
    // Show success message or toast
    alert('Data saved successfully!');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic-info':
        return (
          <ProjectDetailsDisplay 
            projectData={formData} 
            buildingType={buildingType}
          />
        );
      
      
      case 'integrative-process':
        return (
            <QuestionnairePage 
              categoryId="integrative-process" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={undefined}
            onNavigateToCategory={handleNavigateToCategory}
            />
        );
      case 'location-transportation':
        return (
            <QuestionnairePage 
              categoryId="location-transportation" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
            onNavigateToCategory={handleNavigateToCategory}
            />
        );
      case 'water-efficiency':
        return (
            <QuestionnairePage 
              categoryId="water-efficiency" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
              onNavigateToCategory={handleNavigateToCategory}
            />
        );
      case 'energy-atmosphere':
        return (
            <QuestionnairePage 
              categoryId="energy-atmosphere" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
              onNavigateToCategory={handleNavigateToCategory}
            />
        );
      case 'materials-resources':
        return (
            <QuestionnairePage 
              categoryId="materials-resources" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
              onNavigateToCategory={handleNavigateToCategory}
            />
        );
      case 'indoor-environmental-quality':
        return (
            <QuestionnairePage 
              categoryId="indoor-environmental-quality" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
              onNavigateToCategory={handleNavigateToCategory}
            />
        );
      case 'innovation':
        return (
            <QuestionnairePage 
              categoryId="innovation" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
              onNavigateToCategory={handleNavigateToCategory}
            />
        );
      case 'regional-priority':
        return (
            <QuestionnairePage 
              categoryId="regional-priority" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
              onNavigateToCategory={handleNavigateToCategory}
            />
        );
      
      default:
        return (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <ProjectProvider projectId={formData.name || 'default-project'}>
    <div className="project-dashboard-page min-h-screen bg-slate-50">
      {/* Header */}
      <div className="project-dashboard-header bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="project-dashboard-header-container max-w-7xl mx-auto px-6 py-4">
          <div className="project-dashboard-header-content flex items-center justify-between">
            <button
              onClick={handleBack}
              className="project-dashboard-back-button flex items-center text-slate-600 hover:text-primary-emerald transition-colors group"
            >
              <ArrowLeft className="project-dashboard-back-icon h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="project-dashboard-back-text font-medium">Back to Dashboard</span>
            </button>
            <div className="project-dashboard-header-title flex-1 text-center">
              <h1 className="project-dashboard-header-title-text text-2xl font-bold text-slate-900">
                {projectData.name} {buildingType ? buildingType.charAt(0).toUpperCase() + buildingType.slice(1) : 'Building'} Certification
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="project-dashboard-tabs-navigation bg-white border-b border-slate-200">
        <div className="project-dashboard-tabs-container max-w-7xl mx-auto px-6">
          <div className="project-dashboard-tabs-wrapper flex items-center">
            <nav className="project-dashboard-tabs-nav flex space-x-1 overflow-x-auto flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`project-dashboard-tab-button flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-emerald text-primary-emerald'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className="project-dashboard-tab-icon h-4 w-4" />
                  <span className="project-dashboard-tab-text">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="project-dashboard-main-content max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="project-dashboard-tab-content-container bg-white rounded-xl shadow-lg border border-slate-200 p-8"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
    </ProjectProvider>
  );
};

export default ProjectDashboardPage;
