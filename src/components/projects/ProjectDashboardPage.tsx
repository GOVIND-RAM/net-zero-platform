import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Droplets, 
  Zap, 
  Package, 
  Home, 
  Lightbulb, 
  Globe,
  FileText,
  Settings,
  Save
} from 'lucide-react';
import QuestionnairePage from './QuestionnairePage';
import { ProjectProvider } from '../../context/ProjectContext';

interface ProjectData {
  name: string;
  groupCertification: boolean;
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
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState<ProjectData>({
    ...projectData,
    buildingTitle: projectData.buildingTitle || projectData.name || '',
    occupancyCategory: projectData.occupancyCategory || '',
    targetCertificationArea: projectData.targetCertificationArea || '',
    buildingPartOf: projectData.buildingPartOf || '',
    confidentialData: projectData.confidentialData || 'No',
    startDateBuilding: projectData.startDateBuilding || '',
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

  const handleSaveAndNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
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
          <div className="project-dashboard-basic-info-section space-y-6">
            <h3 className="project-dashboard-basic-info-title text-xl font-semibold text-slate-900 mb-4">Building Info</h3>
            
            <div className="project-dashboard-basic-info-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Building/Space title
                </label>
                <input
                  type="text"
                  value={formData.buildingTitle}
                  onChange={(e) => handleInputChange('buildingTitle', e.target.value)}
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Building/Space occupancy category
                  <span className="project-dashboard-form-label-info text-slate-400 ml-1">i</span>
                </label>
                <input
                  type="text"
                  value={formData.occupancyCategory}
                  onChange={(e) => handleInputChange('occupancyCategory', e.target.value)}
                  placeholder="Enter occupancy category"
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Gross building area/Gross space area
                </label>
                <div className="project-dashboard-form-input-group flex">
                  <input
                    type="number"
                    value={formData.grossFloorArea}
                    onChange={(e) => handleInputChange('grossFloorArea', e.target.value)}
                    className="project-dashboard-form-input project-dashboard-form-input-with-unit flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <div className="project-dashboard-form-input-unit px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg text-slate-600 font-medium">
                    {formData.unitType === 'sqft' ? 'sq ft' : 'sq m'}
                  </div>
                </div>
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Target certification area
                </label>
                <div className="project-dashboard-form-input-group flex">
                  <input
                    type="number"
                    value={formData.targetCertificationArea}
                    onChange={(e) => handleInputChange('targetCertificationArea', e.target.value)}
                    placeholder="Enter target area"
                    className="project-dashboard-form-input project-dashboard-form-input-with-unit flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <div className="project-dashboard-form-input-unit px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg text-slate-600 font-medium">
                    {formData.unitType === 'sqft' ? 'sq ft' : 'sq m'}
                  </div>
                </div>
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Geo location
                </label>
                <div className="project-dashboard-form-input-group flex">
                  <input
                    type="text"
                    value={formData.geoLocation}
                    onChange={(e) => handleInputChange('geoLocation', e.target.value)}
                    placeholder="latitude, longitude i.e. 44.500000,-89.500000"
                    className="project-dashboard-form-input project-dashboard-form-input-with-button flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <button className="project-dashboard-form-geo-button px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg hover:bg-slate-200 transition-colors">
                    <MapPin className="project-dashboard-form-geo-icon h-5 w-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="project-dashboard-address-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Address 1
                </label>
                <input
                  type="text"
                  value={formData.address1}
                  onChange={(e) => handleInputChange('address1', e.target.value)}
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Address 2
                </label>
                <input
                  type="text"
                  value={formData.address2}
                  onChange={(e) => handleInputChange('address2', e.target.value)}
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Country/Region
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="project-dashboard-form-select w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                >
                  <option value="India">India</option>
                </select>
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Postal code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Start date
                </label>
                <input
                  type="text"
                  value={formData.startDateBuilding}
                  onChange={(e) => handleInputChange('startDateBuilding', e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  This building is part of
                  <span className="project-dashboard-form-label-info text-slate-400 ml-1">i</span>
                </label>
                <input
                  type="text"
                  value={formData.buildingPartOf}
                  onChange={(e) => handleInputChange('buildingPartOf', e.target.value)}
                  className="project-dashboard-form-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Do you wish to keep your project data submissions confidential?
                </label>
                <select
                  value={formData.confidentialData}
                  onChange={(e) => handleInputChange('confidentialData', e.target.value)}
                  className="project-dashboard-form-select w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              
              <div className="project-dashboard-form-field-group">
                <label className="project-dashboard-form-label block text-sm font-medium text-slate-700 mb-2">
                  Please upload photographs and videos of your building/space.
                  <span className="project-dashboard-form-label-info text-slate-400 ml-1">i</span>
                </label>
                <button className="project-dashboard-form-upload-button w-full px-4 py-3 border border-primary-emerald text-primary-emerald rounded-lg hover:bg-primary-emerald/10 transition-colors">
                  View/Upload
                </button>
              </div>
            </div>
            
            <div className="project-dashboard-form-actions flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="project-dashboard-form-save-button flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="project-dashboard-form-save-icon h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      
      case 'integrative-process':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="integrative-process" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={undefined}
            />
          </ProjectProvider>
        );
      case 'location-transportation':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="location-transportation" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
            />
          </ProjectProvider>
        );
      case 'water-efficiency':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="water-efficiency" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
            />
          </ProjectProvider>
        );
      case 'energy-atmosphere':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="energy-atmosphere" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
            />
          </ProjectProvider>
        );
      case 'materials-resources':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="materials-resources" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
            />
          </ProjectProvider>
        );
      case 'indoor-environmental-quality':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="indoor-environmental-quality" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
            />
          </ProjectProvider>
        );
      case 'innovation':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="innovation" 
              onSave={handleSave}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
            />
          </ProjectProvider>
        );
      case 'regional-priority':
        return (
          <ProjectProvider projectId={projectData.name || 'default-project'}>
            <QuestionnairePage 
              categoryId="regional-priority" 
              onSave={handleSave}
              onPrevious={handlePrevious}
            />
          </ProjectProvider>
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
                {projectData.name} Certification
              </h1>
            </div>
            <div className="project-dashboard-header-right flex items-center space-x-4">
              <button className="project-dashboard-settings-button p-2 text-slate-600 hover:text-primary-emerald hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="project-dashboard-settings-icon h-5 w-5" />
              </button>
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
  );
};

export default ProjectDashboardPage;
