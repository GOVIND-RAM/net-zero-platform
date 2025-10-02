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
  Building2,
  Calendar,
  User,
  Mail,
  FileText,
  Settings,
  Upload,
  BarChart3,
  Info,
  Save
} from 'lucide-react';

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
    { id: 'location-transportation', name: 'Location and Transportation', icon: MapPin },
    { id: 'water-efficiency', name: 'Water Efficiency', icon: Droplets },
    { id: 'energy-atmosphere', name: 'Energy and Atmosphere', icon: Zap },
    { id: 'materials-resources', name: 'Materials and Resources', icon: Package },
    { id: 'indoor-environmental-quality', name: 'Indoor Environmental Quality', icon: Home },
    { id: 'innovation', name: 'Innovation', icon: Lightbulb },
    { id: 'regional-priority', name: 'Regional Priority', icon: Globe },
    { id: 'net-zero-plan', name: 'Net Zero Plan', icon: BarChart3 },
    { id: 'carbon-offset', name: 'Carbon Offset', icon: Globe },
    { id: 'net-zero-milestone', name: 'Net Zero Milestone', icon: Calendar },
    { id: 'summary-emissions', name: 'Summary of Emissions', icon: BarChart3 },
    { id: 'project-files', name: 'Project Files', icon: Upload },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('projectFormData', JSON.stringify(formData));
    // Show success message or toast
    alert('Data saved successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic-info':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Building Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Building/Space title
                </label>
                <input
                  type="text"
                  value={formData.buildingTitle}
                  onChange={(e) => handleInputChange('buildingTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Building/Space occupancy category
                  <span className="text-slate-400 ml-1">i</span>
                </label>
                <input
                  type="text"
                  value={formData.occupancyCategory}
                  onChange={(e) => handleInputChange('occupancyCategory', e.target.value)}
                  placeholder="Enter occupancy category"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gross building area/Gross space area
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={formData.grossFloorArea}
                    onChange={(e) => handleInputChange('grossFloorArea', e.target.value)}
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <div className="px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg text-slate-600 font-medium">
                    {formData.unitType === 'sqft' ? 'sq ft' : 'sq m'}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target certification area
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={formData.targetCertificationArea}
                    onChange={(e) => handleInputChange('targetCertificationArea', e.target.value)}
                    placeholder="Enter target area"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <div className="px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg text-slate-600 font-medium">
                    {formData.unitType === 'sqft' ? 'sq ft' : 'sq m'}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Geo location
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={formData.geoLocation}
                    onChange={(e) => handleInputChange('geoLocation', e.target.value)}
                    placeholder="latitude, longitude i.e. 44.500000,-89.500000"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <button className="px-4 py-3 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg hover:bg-slate-200 transition-colors">
                    <MapPin className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address 1
                </label>
                <input
                  type="text"
                  value={formData.address1}
                  onChange={(e) => handleInputChange('address1', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address 2
                </label>
                <input
                  type="text"
                  value={formData.address2}
                  onChange={(e) => handleInputChange('address2', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Country/Region
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                >
                  <option value="India">India</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Postal code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Start date
                </label>
                <input
                  type="text"
                  value={formData.startDateBuilding}
                  onChange={(e) => handleInputChange('startDateBuilding', e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  This building is part of
                  <span className="text-slate-400 ml-1">i</span>
                </label>
                <input
                  type="text"
                  value={formData.buildingPartOf}
                  onChange={(e) => handleInputChange('buildingPartOf', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Do you wish to keep your project data submissions confidential?
                </label>
                <select
                  value={formData.confidentialData}
                  onChange={(e) => handleInputChange('confidentialData', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Please upload photographs and videos of your building/space.
                  <span className="text-slate-400 ml-1">i</span>
                </label>
                <button className="w-full px-4 py-3 border border-primary-emerald text-primary-emerald rounded-lg hover:bg-primary-emerald/10 transition-colors">
                  View/Upload
                </button>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'location-transportation':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Location and Transportation (18 points)</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has the project earned CertifyPro for Neighborhood Development Location credit?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="leed-nd-credit" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="leed-nd-credit" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Is the project site located in a dense urban area or near diverse uses?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="dense-urban" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="dense-urban" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What is the project's proximity to quality transit (bus, rail, etc.)?
                </label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none">
                  <option value="">Select proximity</option>
                  <option value="within-0.25">Within 0.25 miles</option>
                  <option value="within-0.5">Within 0.5 miles</option>
                  <option value="within-1">Within 1 mile</option>
                  <option value="more-than-1">More than 1 mile</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Are there bicycle facilities (bike racks, storage, showers)?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="bicycle-facilities" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="bicycle-facilities" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How has the parking footprint been reduced compared to conventional design?
                </label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none">
                  <option value="">Select reduction</option>
                  <option value="25">25% reduction</option>
                  <option value="50">50% reduction</option>
                  <option value="75">75% reduction</option>
                  <option value="none">No reduction</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'water-efficiency':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Water Efficiency (12 points)</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has the project implemented indoor water use reduction strategies?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="indoor-water-reduction" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="indoor-water-reduction" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What fixtures and fittings are installed to reduce potable water consumption?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  placeholder="Describe the fixtures and fittings used..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has water usage been modeled, and how much percentage reduction is achieved?
                </label>
                <input
                  type="number"
                  placeholder="Enter percentage reduction"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'energy-atmosphere':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Energy and Atmosphere (38 points)</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Was a fundamental commissioning and verification process carried out?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="fundamental-commissioning" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="fundamental-commissioning" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Does the project comply with minimum energy performance standards?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="energy-performance" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="energy-performance" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has fundamental refrigerant management been applied to avoid CFC-based systems?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="refrigerant-management" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="refrigerant-management" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What strategies were used to optimize energy performance (modeling, design)?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  placeholder="Describe energy optimization strategies..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Does the project use renewable energy sources (solar, wind, etc.)?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="renewable-energy" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="renewable-energy" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'materials-resources':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Materials and Resources (13 points)</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Is there a system for storage and collection of recyclables on-site?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="recyclables-storage" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="recyclables-storage" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has a construction and demolition waste management plan been implemented?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="waste-management" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="waste-management" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What is the long-term commitment plan for materials optimization?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  placeholder="Describe materials optimization plan..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Are environmental product declarations (EPDs) available for major products?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="environmental-declarations" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="environmental-declarations" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'indoor-environmental-quality':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Indoor Environmental Quality (17 points)</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has the project met minimum indoor air quality performance?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="indoor-air-quality" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="indoor-air-quality" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What measures are in place for tobacco smoke control?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  placeholder="Describe tobacco smoke control measures..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Are low-emitting materials used (paints, adhesives, flooring)?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="low-emitting-materials" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="low-emitting-materials" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How was thermal comfort designed and verified?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  placeholder="Describe thermal comfort design..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Does the project maximize daylighting for occupants?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="daylighting" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="daylighting" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'innovation':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Innovation (6 points)</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Did the project achieve innovative performance beyond standard credits?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="innovative-performance" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="innovative-performance" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has the project employed a CertifyPro Accredited Professional (CertifyPro AP)?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="certifypro-ap" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="certifypro-ap" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'regional-priority':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Regional Priority (4 points)</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has the project earned credits designated as regional priorities?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="regional-credits" value="yes" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="regional-credits" value="no" className="h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300" />
                    <span className="ml-2 text-slate-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Which credits were prioritized due to local environmental conditions?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  placeholder="Describe prioritized credits..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Were any additional measures taken to meet regional challenges?
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  placeholder="Describe additional measures..."
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        );
      
      case 'net-zero-plan':
        return (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Net Zero Plan</h3>
            <p className="text-slate-600">Net zero planning tools and strategies will be available here.</p>
          </div>
        );
      
      case 'carbon-offset':
        return (
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Carbon Offset</h3>
            <p className="text-slate-600">Carbon offset tracking and management tools will be available here.</p>
          </div>
        );
      
      case 'net-zero-milestone':
        return (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Net Zero Milestone</h3>
            <p className="text-slate-600">Milestone tracking and progress monitoring will be available here.</p>
          </div>
        );
      
      case 'summary-emissions':
        return (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Summary of Emissions</h3>
            <p className="text-slate-600">Emissions summary and reporting will be available here.</p>
          </div>
        );
      
      case 'project-files':
        return (
          <div className="text-center py-12">
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Project Files</h3>
            <p className="text-slate-600">File upload and management will be available here.</p>
          </div>
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {projectData.name} Certification
                </h1>
                <p className="text-slate-600">{projectData.ratingSystem}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-emerald text-primary-emerald'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-slate-200 p-8"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDashboardPage;
