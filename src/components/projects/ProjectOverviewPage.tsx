import React, { useState } from 'react';
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
  Building2,
  User
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
  email: string;
  projectCharacteristics: string[];
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  geoLocation: string;
}

interface KPICategory {
  id: string;
  name: string;
  points: number;
  icon: any;
  description: string;
  color: string;
}

const ProjectOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectData: ProjectData = location.state?.projectData || {};
  const [activeTab, setActiveTab] = useState('overview');

  const kpiCategories: KPICategory[] = [
    {
      id: 'location-transportation',
      name: 'Location and Transportation',
      points: 18,
      icon: MapPin,
      description: 'Sustainable site selection and transportation strategies',
      color: 'bg-blue-500'
    },
    {
      id: 'water-efficiency',
      name: 'Water Efficiency',
      points: 12,
      icon: Droplets,
      description: 'Water conservation and efficiency measures',
      color: 'bg-cyan-500'
    },
    {
      id: 'energy-atmosphere',
      name: 'Energy and Atmosphere',
      points: 38,
      icon: Zap,
      description: 'Energy performance and atmospheric protection',
      color: 'bg-yellow-500'
    },
    {
      id: 'materials-resources',
      name: 'Materials and Resources',
      points: 13,
      icon: Package,
      description: 'Sustainable material selection and waste management',
      color: 'bg-green-500'
    },
    {
      id: 'indoor-environmental-quality',
      name: 'Indoor Environmental Quality',
      points: 17,
      icon: Home,
      description: 'Indoor air quality and occupant comfort',
      color: 'bg-purple-500'
    },
    {
      id: 'innovation',
      name: 'Innovation',
      points: 6,
      icon: Lightbulb,
      description: 'Innovative design and performance strategies',
      color: 'bg-orange-500'
    },
    {
      id: 'regional-priority',
      name: 'Regional Priority',
      points: 4,
      icon: Globe,
      description: 'Regional environmental priorities and challenges',
      color: 'bg-red-500'
    }
  ];

  const handleKPIClick = (categoryId: string) => {
    navigate(`/project/kpi/${categoryId}`, { state: { projectData } });
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'basic-info', name: 'Basic Info' },
  ];

  return (
    <div className="project-overview-page min-h-screen bg-slate-50">
      {/* Header */}
      <div className="project-overview-page-header bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="project-overview-page-header-container max-w-7xl mx-auto px-6 py-4">
          <div className="project-overview-page-header-content flex items-center justify-between">
            <div className="project-overview-page-header-left flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="project-overview-page-back-button flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="project-overview-page-back-icon h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="project-overview-page-header-info">
                <h1 className="project-overview-page-header-title text-2xl font-bold text-slate-900">{projectData.name}</h1>
                <p className="project-overview-page-header-subtitle text-slate-600">{projectData.ratingSystem}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="project-overview-page-tabs-navigation bg-white border-b border-slate-200">
        <div className="project-overview-page-tabs-container max-w-7xl mx-auto px-6">
          <nav className="project-overview-page-tabs-nav flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`project-overview-page-tab-button py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-emerald text-primary-emerald'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="project-overview-page-main-content max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="project-overview-page-content space-y-8"
          >
            {/* Project Summary */}
            <div className="project-overview-page-summary bg-white rounded-xl shadow-lg border border-slate-200 p-8">
              <h2 className="project-overview-page-summary-title text-2xl font-bold text-slate-900 mb-6">Project Summary</h2>
              
              <div className="project-overview-page-summary-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Details */}
                <div className="project-overview-page-project-details">
                  <h3 className="project-overview-page-project-details-title text-lg font-semibold text-slate-900 mb-4 flex items-center">
                    <Building2 className="project-overview-page-project-details-icon h-5 w-5 mr-2 text-primary-emerald" />
                    Project Details
                  </h3>
                  <div className="project-overview-page-project-details-content space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Project Type:</span>
                      <span className="font-medium">{projectData.projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gross Floor Area:</span>
                      <span className="font-medium">{projectData.grossFloorArea} {projectData.unitType === 'sqft' ? 'sq ft' : 'sq m'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Timeline:</span>
                      <span className="font-medium">{projectData.startDate} to {projectData.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Group Certification:</span>
                      <span className="font-medium">{projectData.groupCertification ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                {/* Owner Information */}
                <div className="project-overview-page-owner-information">
                  <h3 className="project-overview-page-owner-information-title text-lg font-semibold text-slate-900 mb-4 flex items-center">
                    <User className="project-overview-page-owner-information-icon h-5 w-5 mr-2 text-primary-emerald" />
                    Owner Information
                  </h3>
                  <div className="project-overview-page-owner-information-content space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Organization:</span>
                      <span className="font-medium">{projectData.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Representative:</span>
                      <span className="font-medium">{projectData.ownerRepresentative}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="font-medium">{projectData.ownerType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Country:</span>
                      <span className="font-medium">{projectData.ownerCountry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium">{projectData.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Address */}
              <div className="project-overview-page-project-address mt-8">
                <h3 className="project-overview-page-project-address-title text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <MapPin className="project-overview-page-project-address-icon h-5 w-5 mr-2 text-primary-emerald" />
                  Project Address
                </h3>
                <div className="project-overview-page-project-address-content text-slate-600">
                  <div>{projectData.address1}</div>
                  {projectData.address2 && <div>{projectData.address2}</div>}
                  <div>{projectData.city}, {projectData.state} {projectData.postalCode}</div>
                  <div>{projectData.country}</div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Coordinates:</span> {projectData.geoLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Categories */}
            <div className="project-overview-page-kpi-categories bg-white rounded-xl shadow-lg border border-slate-200 p-8">
              <h2 className="project-overview-page-kpi-categories-title text-2xl font-bold text-slate-900 mb-6">Key Performance Indicators</h2>
              <p className="project-overview-page-kpi-categories-description text-slate-600 mb-8">
                Click on any category below to view detailed requirements and track your progress.
              </p>
              
              <div className="project-overview-page-kpi-categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpiCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleKPIClick(category.id)}
                    className="project-overview-page-kpi-category-card bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-primary-emerald hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <div className="project-overview-page-kpi-category-card-header flex items-center justify-between mb-4">
                      <div className={`project-overview-page-kpi-category-card-icon p-3 rounded-lg ${category.color}`}>
                        <category.icon className="project-overview-page-kpi-category-card-icon-svg h-6 w-6 text-white" />
                      </div>
                      <div className="project-overview-page-kpi-category-card-points text-right">
                        <div className="project-overview-page-kpi-category-card-points-value text-2xl font-bold text-slate-900">{category.points}</div>
                        <div className="project-overview-page-kpi-category-card-points-label text-sm text-slate-500">points</div>
                      </div>
                    </div>
                    
                    <h3 className="project-overview-page-kpi-category-card-title text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary-emerald transition-colors">
                      {category.name}
                    </h3>
                    <p className="project-overview-page-kpi-category-card-description text-sm text-slate-600 mb-4">
                      {category.description}
                    </p>
                    
                    <div className="project-overview-page-kpi-category-card-action flex items-center text-primary-emerald font-medium text-sm group-hover:text-primary-emerald/80">
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'basic-info' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="project-overview-page-basic-info bg-white rounded-xl shadow-lg border border-slate-200 p-8"
          >
            <h2 className="project-overview-page-basic-info-title text-2xl font-bold text-slate-900 mb-6">Basic Information</h2>
            <p className="project-overview-page-basic-info-description text-slate-600 mb-8">
              This section contains the basic project information that was provided during registration.
            </p>
            
            {/* Basic Info content would go here */}
            <div className="project-overview-page-basic-info-placeholder text-center py-12">
              <div className="project-overview-page-basic-info-placeholder-icon text-slate-400 mb-4">
                <Building2 className="project-overview-page-basic-info-placeholder-icon-svg h-12 w-12 mx-auto" />
              </div>
              <p className="project-overview-page-basic-info-placeholder-text text-slate-600">Basic information details will be displayed here.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
