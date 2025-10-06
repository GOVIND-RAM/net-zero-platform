import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Building2, 
  Home, 
  Warehouse, 
  School, 
  Factory,
  Users,
  Globe,
  Briefcase,
  Truck,
  Leaf,
  CheckCircle,
  Package
} from 'lucide-react';

interface BuildingType {
  id: string;
  name: string;
  description: string;
  icon: any;
  certificationTypes: string[];
  color: string;
}

const BuildingTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');

  const buildingTypes: BuildingType[] = [
    {
      id: 'building',
      name: 'Building',
      description: 'Indian Green Building Council certification for commercial and residential buildings',
      icon: Building2,
      certificationTypes: [],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      description: 'Manage multiple building certifications across your real estate portfolio in India',
      icon: Briefcase,
      certificationTypes: [],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'home',
      name: 'Home',
      description: 'Certify individual homes for sustainable living and energy efficiency in India',
      icon: Home,
      certificationTypes: [],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'community-center',
      name: 'Township',
      description: 'Certify township and community developments for sustainable living in India',
      icon: Users,
      certificationTypes: [],
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'campus',
      name: 'Campus',
      description: 'Achieve green campus certification for educational institutions across India',
      icon: School,
      certificationTypes: [],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'warehouse',
      name: 'Factory',
      description: 'Optimize industrial and logistics facilities for energy efficiency and sustainability',
      icon: Warehouse,
      certificationTypes: [],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'community',
      name: 'Smart Cities',
      description: 'Develop sustainable smart cities with integrated green infrastructure',
      icon: Globe,
      certificationTypes: [],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Certify business centers and corporate facilities for sustainability',
      icon: Briefcase,
      certificationTypes: [],
      color: 'from-slate-500 to-slate-600'
    },
    {
      id: 'product',
      name: 'Product',
      description: 'Certify sustainable products and materials for green building',
      icon: Leaf,
      certificationTypes: [],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'process',
      name: 'Process',
      description: 'Optimize manufacturing and industrial processes for sustainability',
      icon: Factory,
      certificationTypes: [],
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'fleet',
      name: 'Fleet',
      description: 'Manage transportation and fleet operations for environmental efficiency',
      icon: Truck,
      certificationTypes: [],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'supply-chain',
      name: 'Supply Chain',
      description: 'Optimize supply chain operations for sustainability and efficiency',
      icon: Package,
      certificationTypes: [],
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      // Navigate to project creation with the selected building type
      navigate('/project/create', { state: { buildingType: selectedType } });
    }
  };

  const handleBack = () => {
    navigate('/dashboard/myprojects');
  };

  return (
    <div className="building-type-selection-page min-h-screen bg-slate-50">
      {/* Header */}
      <div className="building-type-selection-header bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="building-type-selection-header-container max-w-6xl mx-auto px-6 py-4">
          <div className="building-type-selection-header-content flex items-center justify-between">
            <button
              onClick={handleBack}
              className="building-type-selection-back-button flex items-center text-slate-600 hover:text-primary-emerald transition-colors group"
            >
              <ArrowLeft className="building-type-selection-back-icon h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="building-type-selection-back-text font-medium">Back to My Projects</span>
            </button>
            
            <div className="building-type-selection-title-section text-center">
              <h1 className="building-type-selection-title text-2xl font-bold text-slate-900">Select Building Type</h1>
              <p className="building-type-selection-subtitle text-slate-600">Choose the type of building or facility you want to certify</p>
            </div>
            
            <div className="building-type-selection-spacer w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="building-type-selection-main-content max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="building-type-selection-content"
        >
          {/* Introduction */}
          <div className="building-type-selection-intro bg-white rounded-xl p-8 border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-emerald/20 rounded-lg">
                <Building2 className="h-6 w-6 text-primary-emerald" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Choose Your Certification Path</h2>
            </div>
            <p className="text-slate-600">
              Select the type of building or facility you want to certify. Each building type has specific certification standards and requirements tailored to its unique characteristics and environmental impact.
            </p>
          </div>

          {/* Building Types Grid */}
          <div className="building-type-selection-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {buildingTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleTypeSelect(type.id)}
                className={`building-type-selection-card bg-white rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedType === type.id
                    ? 'border-primary-emerald shadow-lg ring-2 ring-primary-emerald/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="building-type-selection-card-content p-6">
                  {/* Icon and Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${type.color} text-white`}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">{type.name}</h3>
                      <p className="text-sm text-slate-600">{type.description}</p>
                    </div>
                    {selectedType === type.id && (
                      <CheckCircle className="h-6 w-6 text-primary-emerald" />
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="building-type-selection-actions flex justify-center space-x-4">
            <button
              onClick={handleBack}
              className="building-type-selection-cancel-button px-8 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedType}
              className={`building-type-selection-continue-button px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedType
                  ? 'bg-primary-emerald text-white hover:bg-primary-emerald/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Continue to Project Creation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuildingTypeSelection;
