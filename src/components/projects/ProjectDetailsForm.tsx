import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Calendar, Ruler, ArrowRight } from 'lucide-react';

interface ProjectData {
  name: string;
  groupCertification: boolean;
  ratingSystem: string;
  unitType: 'sqft' | 'sqm';
  startDate: string;
  endDate: string;
  projectType: string;
  grossFloorArea: string;
}

interface ProjectDetailsFormProps {
  data: ProjectData;
  onNext: (data: Partial<ProjectData>) => void;
  onCancel: () => void;
}

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({
  data,
  onNext,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProjectData>({
    name: data.name || '',
    groupCertification: data.groupCertification || false,
    ratingSystem: data.ratingSystem || 'CertifyPro v4 BD+C: New Construction',
    unitType: data.unitType || 'sqft',
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    projectType: data.projectType || '',
    grossFloorArea: data.grossFloorArea || '',
  });

  const ratingSystems = [
    'CertifyPro v4 BD+C: New Construction',
    'CertifyPro v4 BD+C: Core and Shell',
    'CertifyPro v4 ID+C: Commercial Interiors',
    'CertifyPro v4 O+M: Existing Buildings',
    'CertifyPro v4 ND: Neighborhood Development',
  ];

  const projectTypes = [
    'Office',
    'Retail',
    'Healthcare',
    'Education',
    'Hospitality',
    'Residential',
    'Industrial',
    'Mixed-Use',
  ];

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="project-details-form bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
    >
      {/* Form Header */}
      <div className="project-details-form-header bg-gradient-to-r from-primary-emerald to-primary-emerald/90 px-8 py-6">
        <h1 className="project-details-form-title text-2xl font-bold text-white mb-2">Project Details</h1>
        <p className="project-details-form-description text-white/90">Please provide the basic information about your project.</p>
      </div>
      
      <div className="project-details-form-content p-8">

        <form onSubmit={handleSubmit} className="project-details-form-fields space-y-8">
          {/* Project Name */}
          <div className="project-details-form-field-group project-details-form-project-name-field bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
            <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-3">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter a name to identify your project"
              className="project-details-form-input w-full px-4 py-4 border border-slate-300 rounded-xl focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none text-lg font-medium transition-all duration-200 hover:border-slate-400"
            />
          </div>

          {/* Group Certification */}
          <div className="project-details-form-field-group project-details-form-group-certification-field bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-4">
              Group certification project
              <span className="text-slate-400 ml-1 text-xs">?</span>
            </label>
            <div className="project-details-form-radio-group flex space-x-8">
              <label className="project-details-form-radio-option flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="groupCertification"
                  checked={formData.groupCertification === true}
                  onChange={() => handleInputChange('groupCertification', true)}
                  className="project-details-form-radio-input h-5 w-5 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                />
                <span className="project-details-form-radio-label ml-3 text-slate-700 font-medium group-hover:text-slate-900">Yes</span>
              </label>
              <label className="project-details-form-radio-option flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="groupCertification"
                  checked={formData.groupCertification === false}
                  onChange={() => handleInputChange('groupCertification', false)}
                  className="project-details-form-radio-input h-5 w-5 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                />
                <span className="project-details-form-radio-label ml-3 text-slate-700 font-medium group-hover:text-slate-900">No</span>
              </label>
            </div>
          </div>

          {/* Rating System */}
          <div className="project-details-form-field-group project-details-form-rating-system-field bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-4">
              Rating system
            </label>
            <select
              value={formData.ratingSystem}
              onChange={(e) => handleInputChange('ratingSystem', e.target.value)}
              className="project-details-form-select w-full px-4 py-4 border border-slate-300 rounded-xl focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none font-medium transition-all duration-200 hover:border-slate-400"
            >
              {ratingSystems.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
            <p className="project-details-form-help-text text-sm text-slate-500 mt-3 flex items-center">
              <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
              Looking for CertifyPro v4 ND registration? <button type="button" className="project-details-form-help-link text-primary-emerald hover:underline font-medium ml-1">Email CertifyPro</button> for details.
            </p>
          </div>

          {/* Unit Type */}
          <div className="project-details-form-field-group project-details-form-unit-type-field bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-4">
              Unit type
              <span className="text-slate-400 ml-1 text-xs">?</span>
            </label>
            <div className="project-details-form-radio-group flex space-x-8">
              <label className="project-details-form-radio-option flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="unitType"
                  checked={formData.unitType === 'sqft'}
                  onChange={() => handleInputChange('unitType', 'sqft')}
                  className="project-details-form-radio-input h-5 w-5 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                />
                <span className="project-details-form-radio-label ml-3 text-slate-700 font-medium group-hover:text-slate-900">Square Feet/IP</span>
              </label>
              <label className="project-details-form-radio-option flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="unitType"
                  checked={formData.unitType === 'sqm'}
                  onChange={() => handleInputChange('unitType', 'sqm')}
                  className="project-details-form-radio-input h-5 w-5 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                />
                <span className="project-details-form-radio-label ml-3 text-slate-700 font-medium group-hover:text-slate-900">Square Meters/SI</span>
              </label>
            </div>
          </div>

          {/* Date Fields */}
          <div className="project-details-form-dates-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="project-details-form-field-group project-details-form-start-date-field bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-4">
                Start date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="project-details-form-date-input w-full px-4 py-4 border border-slate-300 rounded-xl focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none font-medium transition-all duration-200 hover:border-slate-400"
              />
              <p className="project-details-form-help-text text-sm text-slate-500 mt-3 flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                Anticipated development start
              </p>
            </div>

            <div className="project-details-form-field-group project-details-form-end-date-field bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-4">
                End date *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="project-details-form-date-input w-full px-4 py-4 border border-slate-300 rounded-xl focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none font-medium transition-all duration-200 hover:border-slate-400"
              />
              <p className="project-details-form-help-text text-sm text-slate-500 mt-3 flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                Anticipated development end
              </p>
            </div>
          </div>

          {/* Project Type and Gross Floor Area */}
          <div className="project-details-form-project-type-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="project-details-form-field-group project-details-form-project-type-field bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-4">
                Anticipated type *
              </label>
              <select
                required
                value={formData.projectType}
                onChange={(e) => handleInputChange('projectType', e.target.value)}
                className="project-details-form-select w-full px-4 py-4 border border-slate-300 rounded-xl focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none font-medium transition-all duration-200 hover:border-slate-400"
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="project-details-form-field-group project-details-form-gross-floor-area-field bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="project-details-form-label block text-sm font-semibold text-slate-700 mb-4">
                Gross floor area *
              </label>
              <div className="project-details-form-input-group flex">
                <input
                  type="number"
                  required
                  value={formData.grossFloorArea}
                  onChange={(e) => handleInputChange('grossFloorArea', e.target.value)}
                  placeholder="Total project space"
                  className="project-details-form-number-input flex-1 px-4 py-4 border border-slate-300 rounded-l-xl focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none font-medium transition-all duration-200 hover:border-slate-400"
                />
                <div className="project-details-form-unit-display px-4 py-4 bg-gradient-to-r from-slate-100 to-slate-200 border border-l-0 border-slate-300 rounded-r-xl text-slate-700 font-semibold">
                  {formData.unitType === 'sqft' ? 'sq ft' : 'sq m'}
                </div>
              </div>
              <p className="project-details-form-help-text text-sm text-slate-500 mt-3 flex items-center">
                <Ruler className="mr-2 h-4 w-4 text-green-500" />
                Used to calculate review fees and is the basis for several CertifyPro credits.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="project-details-form-actions flex justify-end space-x-4 pt-8 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="project-details-form-cancel-button px-8 py-4 text-slate-600 hover:text-slate-900 transition-all duration-200 font-semibold rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="project-details-form-continue-button px-8 py-4 bg-gradient-to-r from-primary-emerald to-primary-emerald/90 text-white rounded-xl hover:from-primary-emerald/90 hover:to-primary-emerald/80 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProjectDetailsForm;
