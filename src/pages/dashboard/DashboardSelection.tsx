import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Briefcase,
  Home,
  Users,
  GraduationCap,
  Warehouse,
  UsersRound,
  Building,
  Store,
  Package,
  Workflow,
  Truck,
  Network,
  Plus,
  LogOut,
  User as UserIcon,
  Settings,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CertificationTypeCard from '../../components/dashboard/CertificationTypeCard';

interface CertificationType {
  id: string;
  name: string;
  icon: any;
}

const DashboardSelection: React.FC = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddNewModal, setShowAddNewModal] = useState(false);

  const certificationTypes: CertificationType[] = [
    { id: 'building', name: 'Building', icon: Building2 },
    { id: 'portfolio', name: 'Portfolio', icon: Briefcase },
    { id: 'home', name: 'Home', icon: Home },
    { id: 'community-center', name: 'Community center', icon: Users },
    { id: 'campus', name: 'Campus', icon: GraduationCap },
    { id: 'warehouse', name: 'Warehouse', icon: Warehouse },
    { id: 'community', name: 'Community', icon: UsersRound },
    { id: 'city', name: 'City', icon: Building },
    { id: 'business', name: 'Business', icon: Store },
    { id: 'product', name: 'Product', icon: Package },
    { id: 'process', name: 'Process', icon: Workflow },
    { id: 'fleet', name: 'Fleet', icon: Truck },
    { id: 'supply-chain', name: 'Supply chain', icon: Network },
  ];

  const handleCertificationSelect = (typeId: string) => {
    navigate(`/dashboard/projects/${typeId}`);
  };

  const handleAddNew = () => {
    setShowAddNewModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!authState.user?.name) return 'U';
    return authState.user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="dashboard-selection-page min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary-emerald p-2 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">EcoZero Certify</span>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 hover:bg-slate-100 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-emerald rounded-full flex items-center justify-center text-white font-semibold">
                  {authState.user?.avatar ? (
                    <img
                      src={authState.user.avatar}
                      alt={authState.user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getUserInitials()
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-900">
                    {authState.user?.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {authState.user?.email}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-200">
                        <p className="text-sm font-medium text-slate-900">
                          {authState.user?.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {authState.user?.email}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to profile
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <UserIcon className="h-4 w-4" />
                        <span>Profile</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to settings
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </button>
                      
                      <div className="border-t border-slate-200 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <h1 className="text-4xl font-bold text-slate-900 text-center mb-12">
            I want to pursue net zero certification for my
          </h1>

          {/* Certification Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificationTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CertificationTypeCard
                  icon={type.icon}
                  title={type.name}
                  onClick={() => handleCertificationSelect(type.id)}
                />
              </motion.div>
            ))}

            {/* Add New Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: certificationTypes.length * 0.05 }}
            >
              <CertificationTypeCard
                icon={Plus}
                title="Add new"
                onClick={handleAddNew}
                isAddNew
              />
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Add New Modal */}
      <AnimatePresence>
        {showAddNewModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddNewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Request New Certification Type
                </h3>
                <p className="text-slate-600 mb-6">
                  Don't see your certification type? Let us know what you're looking for and we'll add it to our platform.
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Certification type name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <textarea
                    placeholder="Additional details (optional)"
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowAddNewModal(false)}
                      className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle submit
                        setShowAddNewModal(false);
                      }}
                      className="flex-1 btn-primary"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardSelection;

