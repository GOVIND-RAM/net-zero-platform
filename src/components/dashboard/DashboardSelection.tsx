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
  Search,
  Menu,
  FolderOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CertificationTypeCard from './CertificationTypeCard';

interface CertificationType {
  id: string;
  name: string;
  icon: any;
  description: string;
  category: string;
  estimatedTime: string;
}

const DashboardSelection: React.FC = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const certificationTypes: CertificationType[] = [
    { 
      id: 'building', 
      name: 'Building', 
      icon: Building2, 
      description: 'Indian Green Building Council certification for commercial and residential buildings',
      category: 'Buildings',
      estimatedTime: '6-12 months'
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio', 
      icon: Briefcase, 
      description: 'Manage multiple building certifications across your real estate portfolio in India',
      category: 'Buildings',
      estimatedTime: '12-24 months'
    },
    { 
      id: 'home', 
      name: 'Home', 
      icon: Home, 
      description: 'Certify individual homes for sustainable living and energy efficiency in India',
      category: 'Buildings',
      estimatedTime: '3-6 months'
    },
    { 
      id: 'community-center', 
      name: 'Township', 
      icon: Users, 
      description: 'Certify township and community developments for sustainable living in India',
      category: 'Communities',
      estimatedTime: '8-12 months'
    },
    { 
      id: 'campus', 
      name: 'Campus', 
      icon: GraduationCap, 
      description: 'Achieve green campus certification for educational institutions across India',
      category: 'Communities',
      estimatedTime: '12-18 months'
    },
    { 
      id: 'warehouse', 
      name: 'Factory', 
      icon: Warehouse, 
      description: 'Optimize industrial and logistics facilities for energy efficiency and sustainability',
      category: 'Business',
      estimatedTime: '6-9 months'
    },
    { 
      id: 'community', 
      name: 'Smart Cities', 
      icon: UsersRound, 
      description: 'Certify smart cities and urban developments for comprehensive sustainability in India',
      category: 'Communities',
      estimatedTime: '18-36 months'
    },
    { 
      id: 'city', 
      name: 'Cities', 
      icon: Building, 
      description: 'Achieve city-wide sustainability and green development across Indian cities',
      category: 'Communities',
      estimatedTime: '36-60 months'
    },
    { 
      id: 'business', 
      name: 'Business', 
      icon: Store, 
      description: 'Certify business facilities for corporate sustainability goals in India',
      category: 'Business',
      estimatedTime: '6-12 months'
    },
    { 
      id: 'product', 
      name: 'Product', 
      icon: Package, 
      description: 'Certify products for sustainable manufacturing and lifecycle in India',
      category: 'Business',
      estimatedTime: '3-9 months'
    },
    { 
      id: 'process', 
      name: 'Process', 
      icon: Workflow, 
      description: 'Optimize business processes for operational sustainability in India',
      category: 'Business',
      estimatedTime: '4-8 months'
    },
    { 
      id: 'fleet', 
      name: 'Fleet', 
      icon: Truck, 
      description: 'Certify transportation fleets for emission reduction in India',
      category: 'Business',
      estimatedTime: '6-12 months'
    },
    { 
      id: 'supply-chain', 
      name: 'Supply Chain', 
      icon: Network, 
      description: 'Achieve end-to-end sustainability across supply chains in India',
      category: 'Business',
      estimatedTime: '12-24 months'
    },
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

  const categories = ['All', 'Buildings', 'Communities', 'Business'];


  const handleMyProjects = () => {
    navigate('/dashboard/myprojects');
  };
  
  const filteredCertifications = (() => {
    let filtered = selectedCategory === 'All' 
      ? certificationTypes 
      : certificationTypes.filter(type => type.category === selectedCategory);
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(type => 
        type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  })();

  return (
    <div className="dashboard-selection-page min-h-screen bg-slate-100">
      {/* Enhanced Navbar */}
      <nav className="dashboard-selection-navbar bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="dashboard-selection-navbar-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dashboard-selection-navbar-content flex items-center justify-between h-16">
            {/* Logo */}
            <div className="dashboard-selection-logo flex items-center space-x-3">
              <div className="dashboard-selection-logo-icon bg-gradient-to-br from-primary-emerald to-primary-emerald/80 p-2 rounded-lg shadow-sm">
                <Award className="dashboard-selection-logo-award h-6 w-6 text-white" />
              </div>
              <span className="dashboard-selection-logo-text text-xl font-bold text-slate-900 hidden sm:block">EcoZero Certify</span>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="dashboard-search-container hidden md:flex flex-1 max-w-md mx-8">
              <div className="dashboard-search-wrapper relative w-full">
                <Search className="dashboard-search-icon absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dashboard-search-input w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none text-sm bg-slate-50/50 backdrop-blur-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="dashboard-search-clear absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="dashboard-actions flex items-center space-x-2">
              {/* My Projects */}
              <button 
                onClick={handleMyProjects}
                className="dashboard-my-projects-button hidden sm:flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-primary-emerald hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <FolderOpen className="dashboard-my-projects-icon h-4 w-4" />
                <span className="dashboard-my-projects-text text-sm font-medium hidden lg:block">My Projects</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="dashboard-mobile-menu-button md:hidden p-2 text-slate-600 hover:text-primary-emerald hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <Menu className="dashboard-mobile-menu-icon h-5 w-5" />
              </button>

              {/* User Menu */}
              <div className="dashboard-selection-user-menu relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="dashboard-selection-user-button flex items-center space-x-3 hover:bg-slate-100 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="dashboard-selection-user-avatar w-10 h-10 bg-gradient-to-br from-primary-emerald to-primary-emerald/80 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                    {authState.user?.avatar ? (
                      <img
                        src={authState.user.avatar}
                        alt={authState.user.name}
                        className="dashboard-selection-user-avatar-image w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <div className="dashboard-selection-user-info hidden sm:block text-left">
                    <p className="dashboard-selection-user-name text-sm font-medium text-slate-900">
                      {authState.user?.name}
                    </p>
                    <p className="dashboard-selection-user-email text-xs text-slate-500">
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
                      className="dashboard-selection-dropdown-backdrop fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="dashboard-selection-dropdown absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50"
                    >
                      <div className="dashboard-selection-dropdown-header px-4 py-3 border-b border-slate-200">
                        <p className="dashboard-selection-dropdown-user-name text-sm font-medium text-slate-900">
                          {authState.user?.name}
                        </p>
                        <p className="dashboard-selection-dropdown-user-email text-xs text-slate-500 truncate">
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-200 shadow-lg"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search certifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none text-sm bg-slate-50"
                  />
                </div>

                {/* Mobile My Projects */}
                <button 
                  onClick={handleMyProjects}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-primary-emerald hover:bg-slate-100 rounded-lg transition-all duration-200"
                >
                  <FolderOpen className="h-5 w-5" />
                  <span className="font-medium">My Projects</span>
                </button>

                {/* Mobile User Info */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-emerald to-primary-emerald/80 rounded-full flex items-center justify-center text-white font-semibold">
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
                    <div>
                      <p className="font-medium text-slate-900">{authState.user?.name}</p>
                      <p className="text-sm text-slate-500">{authState.user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="dashboard-welcome-section bg-gradient-to-r from-primary-emerald to-primary-emerald/80 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-white">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, {authState.user?.name?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-primary-emerald-100 text-base sm:text-lg">
                Ready to continue your sustainability journey? Choose your next certification path.
              </p>
            </div>
          </div>



          {/* Category Filter */}
          <div className="dashboard-category-filter mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-0">
                {searchQuery ? `Search Results (${filteredCertifications.length})` : 'All Certifications'}
              </h2>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  Clear search
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-emerald text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-300 hover:border-primary-emerald hover:text-primary-emerald'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Certification Types Grid */}
          <div className="dashboard-selection-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCertifications.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CertificationTypeCard
                  icon={type.icon}
                  title={type.name}
                  description={type.description}
                  estimatedTime={type.estimatedTime}
                  onClick={() => handleCertificationSelect(type.id)}
                />
              </motion.div>
            ))}

            {/* Add New Card */}
            <motion.div
              className="dashboard-selection-add-new-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: filteredCertifications.length * 0.05 }}
            >
              <CertificationTypeCard
                icon={Plus}
                title="Request New Type"
                description="Don't see what you're looking for? Request a new certification type."
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
              className="dashboard-selection-modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddNewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="dashboard-selection-modal bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="dashboard-selection-modal-title text-2xl font-bold text-slate-900 mb-4">
                  Request New Certification Type
                </h3>
                <p className="dashboard-selection-modal-description text-slate-600 mb-6">
                  Don't see your certification type? Let us know what you're looking for and we'll add it to our platform.
                </p>
                <div className="dashboard-selection-modal-form space-y-4">
                  <input
                    type="text"
                    placeholder="Certification type name"
                    className="dashboard-selection-modal-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
                  />
                  <textarea
                    placeholder="Additional details (optional)"
                    rows={3}
                    className="dashboard-selection-modal-textarea w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
                  />
                  <div className="dashboard-selection-modal-actions flex space-x-3">
                    <button
                      onClick={() => setShowAddNewModal(false)}
                      className="dashboard-selection-modal-cancel flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle submit
                        setShowAddNewModal(false);
                      }}
                      className="dashboard-selection-modal-submit flex-1 btn-primary"
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

