import React from 'react';
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
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-slate-200">
            <div className="bg-primary-emerald p-2 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-900">EcoZero Certify</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'text-primary-emerald bg-primary-emerald/10'
                      : 'text-gray-700 hover:text-primary-emerald hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="px-4 py-4 border-t border-slate-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
              <div className="ml-3">
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
      <div className="pl-64">
        {/* Top navigation bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {location.pathname !== '/dashboard' && (
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-600 hover:text-primary-emerald transition-colors mr-4"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back to Dashboard
                </Link>
              )}
              <h1 className="text-2xl font-bold text-neutral-charcoal">
                {certificationType ? `${certificationType.charAt(0).toUpperCase() + certificationType.slice(1)} Projects` : 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary-emerald transition-colors">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

