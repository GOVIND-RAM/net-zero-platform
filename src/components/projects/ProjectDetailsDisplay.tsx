import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  User, 
  Lock,
  CheckCircle,
  Info
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
  buildingTitle: string;
  occupancyCategory: string;
  targetCertificationArea: string;
  buildingPartOf: string;
  confidentialData: string;
  startDateBuilding: string;
  buildingType?: string;
}

interface ProjectDetailsDisplayProps {
  projectData: ProjectData;
  buildingType?: string;
}

const ProjectDetailsDisplay: React.FC<ProjectDetailsDisplayProps> = ({ 
  projectData, 
  buildingType 
}) => {
  // Filter out empty values and create display sections
  const getDisplaySections = () => {
    const sections = [];

    // Project Basic Information
    if (projectData.name || projectData.projectType || projectData.grossFloorArea) {
      sections.push({
        title: 'Project Basic Information',
        icon: Building2,
        color: 'text-primary-emerald',
        bgColor: 'bg-primary-emerald/10',
        fields: [
          { label: 'Project Name', value: projectData.name },
          { label: 'Project Type', value: projectData.projectType },
          { label: 'Building Type', value: buildingType ? buildingType.charAt(0).toUpperCase() + buildingType.slice(1) : 'Building' },
          { label: 'Gross Floor Area', value: projectData.grossFloorArea ? `${projectData.grossFloorArea} ${projectData.unitType === 'sqft' ? 'sq ft' : 'sq m'}` : '' },
          { label: 'Target Certification Area', value: projectData.targetCertificationArea ? `${projectData.targetCertificationArea} ${projectData.unitType === 'sqft' ? 'sq ft' : 'sq m'}` : '' },
          { label: 'Rating System', value: projectData.ratingSystem },
          { label: 'Group Certification', value: projectData.groupCertification ? 'Yes' : 'No' },
        ].filter(field => field.value)
      });
    }


    // Owner Information
    if (projectData.owner || projectData.ownerRepresentative || projectData.email) {
      sections.push({
        title: 'Owner Information',
        icon: User,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        fields: [
          { label: 'Owner', value: projectData.owner },
          { label: 'Owner Representative', value: projectData.ownerRepresentative },
          { label: 'Owner Type', value: projectData.ownerType },
          { label: 'Email', value: projectData.email },
          { label: 'Country', value: projectData.ownerCountry },
          { label: 'State', value: projectData.ownerState },
        ].filter(field => field.value)
      });
    }

    // Location Details
    if (projectData.address1 || projectData.city || projectData.state) {
      sections.push({
        title: 'Location Details',
        icon: MapPin,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        fields: [
          { label: 'Street Address', value: projectData.address1 },
          { label: 'Address Line 2', value: projectData.address2 },
          { label: 'City', value: projectData.city },
          { label: 'State/Province', value: projectData.state },
          { label: 'Postal Code', value: projectData.postalCode },
          { label: 'Country', value: projectData.country },
          { label: 'Geographic Coordinates', value: projectData.geoLocation },
        ].filter(field => field.value)
      });
    }

    // Project Timeline
    if (projectData.startDate || projectData.endDate || projectData.startDateBuilding) {
      sections.push({
        title: 'Project Timeline',
        icon: Calendar,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        fields: [
          { label: 'Project Start Date', value: projectData.startDate },
          { label: 'Project End Date', value: projectData.endDate },
          { label: 'Building Start Date', value: projectData.startDateBuilding },
        ].filter(field => field.value)
      });
    }

    return sections;
  };

  const sections = getDisplaySections();

  return (
    <div className="project-details-display space-y-6">
      {/* Header */}
      <div className="project-details-display-header bg-gradient-to-r from-primary-emerald/10 to-primary-emerald/5 rounded-xl p-6 border border-primary-emerald/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary-emerald/20 rounded-lg">
            <Building2 className="h-6 w-6 text-primary-emerald" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Project Details</h2>
            <p className="text-slate-600">Review your project information</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Lock className="h-4 w-4" />
          <span>This information is read-only and cannot be edited</span>
        </div>
      </div>

      {/* Display Sections */}
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="project-details-display-section bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className={`section-header px-6 py-4 border-b border-slate-200 ${section.bgColor}`}>
            <div className="flex items-center space-x-3">
              <section.icon className={`h-5 w-5 ${section.color}`} />
              <h3 className={`text-lg font-semibold ${section.color}`}>{section.title}</h3>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>
          
          <div className="section-content p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="project-details-display-field">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    {field.label}
                  </label>
                  <div className="project-details-display-value p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Project Characteristics */}
      {projectData.projectCharacteristics && projectData.projectCharacteristics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sections.length * 0.1 }}
          className="project-details-display-section bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="section-header bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <Info className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">Project Characteristics</h3>
            </div>
          </div>
          
          <div className="section-content p-6">
            <div className="flex flex-wrap gap-2">
              {projectData.projectCharacteristics.map((characteristic, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-emerald/10 text-primary-emerald border border-primary-emerald/20"
                >
                  {characteristic}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {sections.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="project-details-display-empty bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center"
        >
          <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No Project Details Available</h3>
          <p className="text-slate-600">
            Complete the project creation form to see your project details here.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectDetailsDisplay;
