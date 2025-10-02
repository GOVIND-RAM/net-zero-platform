import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import {
  organizationOptions,
  projectTypeOptions,
  certificationLevelOptions,
  industryOptions,
  countryOptions,
  stateOptions
} from '../../data/mockData';

interface ProjectRegistrationFormProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (data: any) => void;
}

const ProjectRegistrationForm: React.FC<ProjectRegistrationFormProps> = ({
  currentStep,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    projectName: '',
    organization: '',
    projectType: '',
    description: '',
    
    // Step 2: Location & Details
    country: '',
    state: '',
    city: '',
    address: '',
    industry: '',
    
    // Step 3: Certification Details
    certificationLevel: '',
    targetDate: '',
    budget: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Project Name *
        </label>
        <input
          type="text"
          value={formData.projectName}
          onChange={(e) => handleInputChange('projectName', e.target.value)}
          className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          placeholder="Enter project name"
          required
        />
      </div>

      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Organization *
        </label>
        <div className="relative">
          <select
            value={formData.organization}
            onChange={(e) => handleInputChange('organization', e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all appearance-none"
            required
          >
            <option value="">Select organization</option>
            {organizationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          <a href="#" className="text-primary-emerald hover:text-primary-forest font-medium transition-colors">
            Click here to add new organization
          </a>
        </p>
      </div>

      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Project Type *
        </label>
        <div className="relative">
          <select
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all appearance-none"
            required
          >
            <option value="">Select project type</option>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Project Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all resize-none"
          placeholder="Describe your project goals and objectives"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-neutral-charcoal text-sm font-medium mb-2">
            Country *
          </label>
          <div className="relative">
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all appearance-none"
              required
            >
              <option value="">Select country</option>
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-neutral-charcoal text-sm font-medium mb-2">
            State/Province *
          </label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all appearance-none"
              required
            >
              <option value="">Select state</option>
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-neutral-charcoal text-sm font-medium mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
            placeholder="Enter city"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          placeholder="Enter full address"
          required
        />
      </div>

      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Industry *
        </label>
        <div className="relative">
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all appearance-none"
            required
          >
            <option value="">Select industry</option>
            {industryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Certification Level *
        </label>
        <div className="relative">
          <select
            value={formData.certificationLevel}
            onChange={(e) => handleInputChange('certificationLevel', e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all appearance-none"
            required
          >
            <option value="">Select certification level</option>
            {certificationLevelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-neutral-charcoal text-sm font-medium mb-2">
            Target Completion Date *
          </label>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => handleInputChange('targetDate', e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-neutral-charcoal text-sm font-medium mb-2">
            Budget (USD)
          </label>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
            placeholder="Enter budget amount"
          />
        </div>
      </div>

      <div>
        <label className="block text-neutral-charcoal text-sm font-medium mb-2">
          Additional Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={4}
          className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all resize-none"
          placeholder="Any additional information or requirements"
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {renderCurrentStep()}
      
      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="text-gray-600 hover:text-neutral-charcoal font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        
        <div className="flex space-x-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onPrevious}
              className="btn-secondary"
            >
              Previous
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={onNext}
              className="btn-primary"
            >
              Save & Continue
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Project</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProjectRegistrationForm;

