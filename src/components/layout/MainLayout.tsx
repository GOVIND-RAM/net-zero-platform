import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { 
  Award, 
  Home, 
  Building, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Briefcase,
  GraduationCap,
  Warehouse,
  UsersRound,
  Store,
  Package,
  Workflow,
  Truck,
  Network
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { certificationType } = useParams<{ certificationType: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getCertificationTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'building': 'Building Projects',
      'portfolio': 'Portfolio Projects',
      'home': 'Home Projects',
      'community-center': 'Community Center Projects',
      'campus': 'Campus Projects',
      'warehouse': 'Warehouse Projects',
      'community': 'Community Projects',
      'city': 'City Projects',
      'business': 'Business Projects',
      'product': 'Product Projects',
      'process': 'Process Projects',
      'fleet': 'Fleet Projects',
      'supply-chain': 'Supply Chain Projects'
    };
    return typeMap[type] || 'Projects';
  };

  const getCertificationTypeIcon = (type: string) => {
    const iconMap: { [key: string]: any } = {
      'building': Building,
      'portfolio': Briefcase,
      'home': Home,
      'community-center': Users,
      'campus': GraduationCap,
      'warehouse': Warehouse,
      'community': UsersRound,
      'city': Building,
      'business': Store,
      'product': Package,
      'process': Workflow,
      'fleet': Truck,
      'supply-chain': Network
    };
    return iconMap[type] || FileText;
  };

  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/dashboard'
    }
  ];

  // Add the current certification type to sidebar if we're on a project page
  if (certificationType) {
    sidebarItems.push({
      name: getCertificationTypeDisplay(certificationType),
      href: `/dashboard/projects/${certificationType}`,
      icon: getCertificationTypeIcon(certificationType),
      current: location.pathname.includes(`/projects/${certificationType}`)
    });
  }

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <div className="main-layout-container min-h-screen bg-slate-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="main-layout-mobile-overlay fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Desktop Sidebar */}
      <div className={`main-layout-sidebar fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } hidden md:block`}>
        <div className="sidebar-content flex flex-col h-full">
          {/* Logo */}
          <div className={`sidebar-header flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} px-4 py-3 border-b border-slate-200`}>
            <div className="sidebar-logo flex items-center">
              <div className="sidebar-logo-icon bg-primary-emerald p-1.5 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              {isSidebarOpen && (
                <span className="ml-3 text-lg font-bold text-slate-900">EcoZero Certify</span>
              )}
            </div>
            {/* Sidebar Toggle Button in Sidebar */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-600 hover:text-primary-emerald hover:bg-gray-100 rounded border border-gray-200 hover:border-primary-emerald transition-colors"
              title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="sidebar-navigation flex-1 px-3 py-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'text-primary-emerald bg-primary-emerald/10'
                      : 'text-gray-700 hover:text-primary-emerald hover:bg-gray-100'
                  }`}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  <Icon className={`h-6 w-6 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                  {isSidebarOpen && item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="sidebar-user-section px-3 py-3 border-t border-slate-200">
            {isSidebarOpen ? (
              <>
                <div className="sidebar-user-info flex items-center mb-3">
                  <div className="sidebar-user-avatar w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">U</span>
                  </div>
                  <div className="sidebar-user-details ml-3">
                    <p className="text-sm font-medium text-gray-900">User Name</p>
                    <p className="text-xs text-gray-500">user@example.com</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="sidebar-user-collapsed flex flex-col items-center space-y-3">
                <div className="sidebar-user-avatar-collapsed w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <div className={`main-layout-mobile-sidebar fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 md:hidden ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}>
        <div className="mobile-sidebar-content flex flex-col h-full">
          {/* Logo */}
          <div className="mobile-sidebar-header flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <div className="mobile-sidebar-logo flex items-center">
              <div className="mobile-sidebar-logo-icon bg-primary-emerald p-1.5 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-lg font-bold text-slate-900">EcoZero Certify</span>
            </div>
            {/* Mobile Sidebar Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-600 hover:text-primary-emerald hover:bg-gray-100 rounded border border-gray-200 hover:border-primary-emerald transition-colors"
              title="Close sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mobile-sidebar-navigation flex-1 px-3 py-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'text-primary-emerald bg-primary-emerald/10'
                      : 'text-gray-700 hover:text-primary-emerald hover:bg-gray-100'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="h-6 w-6 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="mobile-sidebar-user-section px-3 py-3 border-t border-slate-200">
            <div className="mobile-sidebar-user-info flex items-center mb-3">
              <div className="mobile-sidebar-user-avatar w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
              <div className="mobile-sidebar-user-details ml-3">
                <p className="text-sm font-medium text-gray-900">User Name</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`main-content-wrapper transition-all duration-300 ${isSidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}>
        {/* Top navigation bar */}
        <div className="main-top-navbar bg-white border-b border-slate-200 px-4 py-2 lg:px-6 lg:py-3">
          <div className="top-navbar-content flex items-center justify-between">
            <div className="top-navbar-left flex items-center min-w-0 flex-1">
              {location.pathname !== '/dashboard' && !location.pathname.includes('/dashboard/projects/') && (
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center text-gray-600 hover:text-primary-emerald transition-colors mr-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">Back to Dashboard</span>
                </Link>
              )}
              <h1 className="text-lg lg:text-2xl font-bold text-neutral-charcoal truncate">
                {certificationType ? `${certificationType.charAt(0).toUpperCase() + certificationType.slice(1)} Projects` : 'Dashboard'}
              </h1>
            </div>
            <div className="top-navbar-right flex items-center space-x-2">
              <button className="text-gray-600 hover:text-primary-emerald transition-colors p-1.5">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="main-page-content p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

