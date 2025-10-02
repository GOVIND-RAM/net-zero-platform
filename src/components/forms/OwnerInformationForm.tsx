import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectData {
  owner: string;
  ownerRepresentative: string;
  ownerType: string;
  ownerCountry: string;
  ownerState: string;
  email: string;
  projectCharacteristics: string[];
}

interface OwnerInformationFormProps {
  data: ProjectData;
  onNext: (data: Partial<ProjectData>) => void;
  onPrevious: () => void;
  onCancel: () => void;
}

const OwnerInformationForm: React.FC<OwnerInformationFormProps> = ({
  data,
  onNext,
  onPrevious,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProjectData>({
    owner: data.owner || '',
    ownerRepresentative: data.ownerRepresentative || '',
    ownerType: data.ownerType || '',
    ownerCountry: data.ownerCountry || 'India',
    ownerState: data.ownerState || '',
    email: data.email || '',
    projectCharacteristics: data.projectCharacteristics || [],
  });

  const ownerTypes = [
    'Government',
    'Private Corporation',
    'Non-Profit Organization',
    'Educational Institution',
    'Healthcare Organization',
    'Real Estate Developer',
    'Other',
  ];

  const countries = [
    'India',
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  // Removed project characteristics as requested

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCharacteristicChange = (characteristic: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      projectCharacteristics: checked
        ? [...prev.projectCharacteristics, characteristic]
        : prev.projectCharacteristics.filter(c => c !== characteristic)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-slate-200 p-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Owner Information</h1>
        <p className="text-slate-600">Please provide details about the project owner and organization.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Owner Organization */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Owner *
          </label>
          <input
            type="text"
            required
            value={formData.owner}
            onChange={(e) => handleInputChange('owner', e.target.value)}
            placeholder="Organization of the owner"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          />
          <p className="text-sm text-slate-500 mt-1">
            <a href="#" className="text-primary-emerald hover:underline">Click here to add new organization if not existing.</a>
          </p>
        </div>

        {/* Owner's Representative */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Owner's representative (Employee or Officer of Owner) *
          </label>
          <input
            type="text"
            required
            value={formData.ownerRepresentative}
            onChange={(e) => handleInputChange('ownerRepresentative', e.target.value)}
            placeholder="Primary contact for owner organization"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          />
        </div>

        {/* Owner Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Owner type *
          </label>
          <select
            required
            value={formData.ownerType}
            onChange={(e) => handleInputChange('ownerType', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          >
            <option value="">Select owner type</option>
            {ownerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Owner Country */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Owner Country/Region
          </label>
          <select
            value={formData.ownerCountry}
            onChange={(e) => handleInputChange('ownerCountry', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Owner State */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            State
          </label>
          <select
            value={formData.ownerState || ''}
            onChange={(e) => handleInputChange('ownerState', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email address of the primary contact"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            ← Previous
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default OwnerInformationForm;
