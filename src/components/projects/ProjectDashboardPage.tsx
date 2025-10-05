import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight,
  MapPin, 
  Droplets, 
  Zap, 
  Package, 
  Home, 
  Lightbulb, 
  Globe,
  FileText,
  Settings,
  Save,
  Building2,
  Calendar,
  MapPin as MapPinIcon,
  Upload,
  Info,
  CheckCircle,
  AlertCircle,
  EyeOff,
  Navigation
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
          <div className="project-dashboard-basic-info-container space-y-8">
            {/* Progress Header */}
            <div className="project-dashboard-progress-header bg-gradient-to-r from-primary-emerald/10 to-primary-emerald/5 rounded-xl p-6 border border-primary-emerald/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-emerald/20 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary-emerald" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Project Basic Information</h2>
                    <p className="text-slate-600">Complete your project details to proceed with certification</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">Completion</div>
                  <div className="text-2xl font-bold text-primary-emerald">
                    {Math.round((Object.values(formData).filter(value => value && value.toString().trim() !== '').length / 15) * 100)}%
                  </div>
                </div>
              </div>
              <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-primary-emerald h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(Object.values(formData).filter(value => value && value.toString().trim() !== '').length / 15) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Building Information Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="project-dashboard-section-card bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="section-header bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-primary-emerald" />
                  <h3 className="text-lg font-semibold text-slate-900">Building Information</h3>
                  <div className="flex items-center space-x-1">
                    {formData.buildingTitle && formData.occupancyCategory ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-1">Essential details about your building or space</p>
              </div>
              
              <div className="section-content p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Building/Space Title *
                      <Info className="inline h-3 w-3 ml-1 text-slate-400" />
                    </label>
                    <input
                      type="text"
                      value={formData.buildingTitle}
                      onChange={(e) => handleInputChange('buildingTitle', e.target.value)}
                      placeholder="Enter building or space name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Occupancy Category *
                      <Info className="inline h-3 w-3 ml-1 text-slate-400" />
                    </label>
                    <select
                      value={formData.occupancyCategory}
                      onChange={(e) => handleInputChange('occupancyCategory', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                    >
                      <option value="">Select occupancy category</option>
                      <option value="Office">Office</option>
                      <option value="Retail">Retail</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Residential">Residential</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Mixed-Use">Mixed-Use</option>
                      <option value="Assembly">Assembly</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Gross Building Area *
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={formData.grossFloorArea}
                        onChange={(e) => handleInputChange('grossFloorArea', e.target.value)}
                        placeholder="Enter total area"
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                      <div className="px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg text-slate-700 font-medium flex items-center">
                        {formData.unitType === 'sqft' ? 'sq ft' : 'sq m'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Target Certification Area *
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={formData.targetCertificationArea}
                        onChange={(e) => handleInputChange('targetCertificationArea', e.target.value)}
                        placeholder="Enter target area"
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                      <div className="px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg text-slate-700 font-medium flex items-center">
                        {formData.unitType === 'sqft' ? 'sq ft' : 'sq m'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location Details Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="project-dashboard-section-card bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="section-header bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-5 w-5 text-primary-emerald" />
                  <h3 className="text-lg font-semibold text-slate-900">Location Details</h3>
                  <div className="flex items-center space-x-1">
                    {formData.address1 && formData.city && formData.state ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-1">Physical address and geographical coordinates</p>
              </div>
              
              <div className="section-content p-6">
                <div className="space-y-6">
                  {/* Address Fields */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="lg:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address1}
                        onChange={(e) => handleInputChange('address1', e.target.value)}
                        placeholder="Enter street address"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        value={formData.address2}
                        onChange={(e) => handleInputChange('address2', e.target.value)}
                        placeholder="Apartment, suite, etc."
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="Enter postal code"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter state or province"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Country/Region *
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      >
                        <option value="">Select country</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        <option value="Brazil">Brazil</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Geo Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Geographic Coordinates
                      <Info className="inline h-3 w-3 ml-1 text-slate-400" />
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={formData.geoLocation}
                        onChange={(e) => handleInputChange('geoLocation', e.target.value)}
                        placeholder="latitude, longitude (e.g., 44.500000,-89.500000)"
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                      />
                      <button className="px-4 py-3 bg-primary-emerald text-white border border-primary-emerald rounded-r-lg hover:bg-primary-emerald/90 transition-colors flex items-center">
                        <Navigation className="h-4 w-4 mr-2" />
                        Locate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Settings Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="project-dashboard-section-card bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="section-header bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-primary-emerald" />
                  <h3 className="text-lg font-semibold text-slate-900">Project Settings</h3>
                  <div className="flex items-center space-x-1">
                    {formData.startDateBuilding && formData.buildingPartOf ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-1">Timeline and project configuration</p>
              </div>
              
              <div className="section-content p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Project Start Date *
                      <Calendar className="inline h-3 w-3 ml-1 text-slate-400" />
                    </label>
                    <input
                      type="date"
                      value={formData.startDateBuilding}
                      onChange={(e) => handleInputChange('startDateBuilding', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Building is Part Of
                      <Info className="inline h-3 w-3 ml-1 text-slate-400" />
                    </label>
                    <input
                      type="text"
                      value={formData.buildingPartOf}
                      onChange={(e) => handleInputChange('buildingPartOf', e.target.value)}
                      placeholder="e.g., Campus, Complex, Development"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none transition-all duration-200 hover:border-slate-400"
                    />
                  </div>
                  
                  <div className="lg:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Data Confidentiality
                      <Info className="inline h-3 w-3 ml-1 text-slate-400" />
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="confidentialData"
                          value="No"
                          checked={formData.confidentialData === 'No'}
                          onChange={(e) => handleInputChange('confidentialData', e.target.value)}
                          className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                        />
                        <span className="ml-2 text-slate-700">Public</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="confidentialData"
                          value="Yes"
                          checked={formData.confidentialData === 'Yes'}
                          onChange={(e) => handleInputChange('confidentialData', e.target.value)}
                          className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                        />
                        <span className="ml-2 text-slate-700">Confidential</span>
                        <EyeOff className="h-3 w-3 ml-1 text-slate-400" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Media Upload Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="project-dashboard-section-card bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="section-header bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <Upload className="h-5 w-5 text-primary-emerald" />
                  <h3 className="text-lg font-semibold text-slate-900">Project Media</h3>
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-1">Upload photos and videos of your building or space</p>
              </div>
              
              <div className="section-content p-6">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-primary-emerald/50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Upload Media Files</h4>
                  <p className="text-slate-600 mb-4">Drag and drop files here, or click to browse</p>
                  <button className="px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium">
                    Choose Files
                  </button>
                  <p className="text-xs text-slate-500 mt-2">Supports: JPG, PNG, MP4, MOV (Max 10MB each)</p>
                </div>
              </div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between items-center pt-6 border-t border-slate-200"
            >
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Info className="h-4 w-4" />
                <span>All changes are automatically saved</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handleSaveAndNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
                >
                  <span>Continue to Next Section</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
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
