import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface ProjectData {
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  geoLocation: string;
}

interface ProjectAddressFormProps {
  data: ProjectData;
  onNext: (data: Partial<ProjectData>) => void;
  onPrevious: () => void;
  onCancel: () => void;
}

const ProjectAddressForm: React.FC<ProjectAddressFormProps> = ({
  data,
  onNext,
  onPrevious,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProjectData>({
    address1: data.address1 || '',
    address2: data.address2 || '',
    city: data.city || '',
    country: data.country || 'India',
    state: data.state || '',
    postalCode: data.postalCode || '',
    geoLocation: data.geoLocation || '',
  });

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

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleGeoLocationClick = () => {
    // Mock geo-location - in real app, this would open a map picker
    const mockLat = '63.588753';
    const mockLng = '-154.493062';
    setFormData(prev => ({ ...prev, geoLocation: `${mockLat}, ${mockLng}` }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-slate-200 p-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Project Address</h1>
        <p className="text-slate-600">Please provide the complete address and location details for your project.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Address 1 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Address 1 *
          </label>
          <input
            type="text"
            required
            value={formData.address1}
            onChange={(e) => handleInputChange('address1', e.target.value)}
            placeholder="Street address"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          />
        </div>

        {/* Address 2 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Address 2
          </label>
          <input
            type="text"
            value={formData.address2}
            onChange={(e) => handleInputChange('address2', e.target.value)}
            placeholder="Apartment # / Suite #"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            City *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="City"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          />
        </div>

        {/* Country/Region */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Country/Region
          </label>
          <select
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            State
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
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

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Postal code *
            <span className="text-slate-400 ml-1">?</span>
          </label>
          <input
            type="text"
            required
            value={formData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            placeholder="Postal code"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
          />
        </div>

        {/* Geo Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Geo location *
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              required
              value={formData.geoLocation}
              onChange={(e) => handleInputChange('geoLocation', e.target.value)}
              placeholder="latitude, longitude i.e. 44.500000,-89.500000"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
            />
            <button
              type="button"
              onClick={handleGeoLocationClick}
              className="px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors flex items-center"
            >
              <MapPin className="h-5 w-5 text-slate-600" />
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Click the map pin to automatically detect location or enter coordinates manually.
          </p>
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

export default ProjectAddressForm;
