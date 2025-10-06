import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FolderOpen,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'active' | 'completed' | 'on-hold' | 'pending';
  progress: number;
  startDate: string;
  lastUpdated: string;
  certification: string;
}

const MyProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock project data with Indian names
  const projects: Project[] = [
    {
      id: '1',
      name: 'Infosys Tech Park Phase 2',
      type: 'Building',
      location: 'Bangalore, Karnataka',
      status: 'active',
      progress: 75,
      startDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      certification: 'IGBC Platinum'
    },
    {
      id: '2',
      name: 'IIT Delhi Green Campus',
      type: 'Campus',
      location: 'New Delhi, Delhi',
      status: 'active',
      progress: 45,
      startDate: '2024-02-01',
      lastUpdated: '2024-01-18',
      certification: 'IGBC Gold'
    },
    {
      id: '3',
      name: 'Godrej Garden City',
      type: 'Community',
      location: 'Mumbai, Maharashtra',
      status: 'completed',
      progress: 100,
      startDate: '2023-09-01',
      lastUpdated: '2024-01-10',
      certification: 'IGBC Platinum'
    },
    {
      id: '4',
      name: 'Reliance Logistics Hub',
      type: 'Warehouse',
      location: 'Ahmedabad, Gujarat',
      status: 'pending',
      progress: 15,
      startDate: '2024-03-01',
      lastUpdated: '2024-01-15',
      certification: 'IGBC Gold'
    },
    {
      id: '5',
      name: 'Phoenix MarketCity',
      type: 'Building',
      location: 'Chennai, Tamil Nadu',
      status: 'on-hold',
      progress: 30,
      startDate: '2023-12-01',
      lastUpdated: '2024-01-05',
      certification: 'IGBC Silver'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'on-hold': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'on-hold': return <AlertCircle className="h-3 w-3" />;
      case 'pending': return <Clock className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.certification.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    // Only show completed and active projects
    const isActiveOrCompleted = project.status === 'active' || project.status === 'completed';
    return matchesSearch && matchesStatus && isActiveOrCompleted;
  });

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/dashboard?project=${projectId}`);
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleNewProject = () => {
    navigate('/project/select-type');
  };

  return (
    <div className="my-projects-page min-h-screen bg-slate-100">
      {/* Header */}
      <div className="my-projects-header bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="my-projects-header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="my-projects-header-content flex items-center justify-between h-16">
            {/* Back Button & Title */}
            <div className="my-projects-back-section flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="my-projects-back-button flex items-center space-x-2 text-slate-600 hover:text-primary-emerald transition-colors"
              >
                <ArrowLeft className="my-projects-back-icon h-5 w-5" />
                <span className="my-projects-back-text font-medium">Back to Dashboard</span>
              </button>
            </div>

            {/* Page Title */}
            <div className="my-projects-title-section flex items-center space-x-3">
              <FolderOpen className="my-projects-title-icon h-8 w-8 text-primary-emerald" />
              <h1 className="my-projects-title text-2xl font-bold text-slate-900">My Projects</h1>
            </div>

            {/* New Project Button */}
            <button
              onClick={handleNewProject}
              className="my-projects-new-button flex items-center space-x-2 bg-primary-emerald text-white px-4 py-2 rounded-lg hover:bg-primary-emerald/90 transition-colors"
            >
              <Plus className="my-projects-new-icon h-4 w-4" />
              <span className="my-projects-new-text font-medium">New Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="my-projects-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Stats Overview */}
          <div className="my-projects-stats grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="my-projects-stat-card bg-white rounded-xl p-6 border border-slate-200">
              <div className="my-projects-stat-content flex items-center justify-between">
                <div className="my-projects-stat-info">
                  <p className="my-projects-stat-label text-sm text-slate-600">Total Projects</p>
                  <p className="my-projects-stat-value text-2xl font-bold text-slate-900">{filteredProjects.length}</p>
                </div>
                <FolderOpen className="my-projects-stat-icon h-8 w-8 text-primary-emerald" />
              </div>
            </div>
            
            <div className="my-projects-stat-card bg-white rounded-xl p-6 border border-slate-200">
              <div className="my-projects-stat-content flex items-center justify-between">
                <div className="my-projects-stat-info">
                  <p className="my-projects-stat-label text-sm text-slate-600">Active</p>
                  <p className="my-projects-stat-value text-2xl font-bold text-green-600">
                    {filteredProjects.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <Clock className="my-projects-stat-icon h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="my-projects-stat-card bg-white rounded-xl p-6 border border-slate-200">
              <div className="my-projects-stat-content flex items-center justify-between">
                <div className="my-projects-stat-info">
                  <p className="my-projects-stat-label text-sm text-slate-600">Completed</p>
                  <p className="my-projects-stat-value text-2xl font-bold text-blue-600">
                    {filteredProjects.filter(p => p.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="my-projects-stat-icon h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="my-projects-search-filter bg-white rounded-xl p-6 border border-slate-200 mb-6">
            <div className="my-projects-search-filter-content flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="my-projects-search-container flex-1 relative">
                <Search className="my-projects-search-icon absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="my-projects-search-input w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="my-projects-filter-container relative">
                <Filter className="my-projects-filter-icon absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="my-projects-filter-select pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/20 outline-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="my-projects-grid grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="my-projects-card bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-200"
              >
                {/* Project Header */}
                <div className="my-projects-card-header flex items-start justify-between mb-4">
                  <div className="my-projects-card-title-section flex-1">
                    <h3 className="my-projects-card-title text-lg font-semibold text-slate-900 mb-1">{project.name}</h3>
                    <p className="my-projects-card-subtitle text-sm text-slate-600">{project.type} • {project.certification}</p>
                  </div>
                  <div className="my-projects-card-status-section flex items-center space-x-2">
                    <span className={`my-projects-card-status inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status}</span>
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="my-projects-card-details space-y-3 mb-4">
                  <div className="my-projects-card-location flex items-center space-x-2 text-sm text-slate-600">
                    <MapPin className="my-projects-card-location-icon h-4 w-4" />
                    <span className="my-projects-card-location-text">{project.location}</span>
                  </div>
                  <div className="my-projects-card-date flex items-center space-x-2 text-sm text-slate-600">
                    <Calendar className="my-projects-card-date-icon h-4 w-4" />
                    <span className="my-projects-card-date-text">Started {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="my-projects-card-progress mb-4">
                  <div className="my-projects-card-progress-header flex items-center justify-between text-sm mb-2">
                    <span className="my-projects-card-progress-label text-slate-600">Progress</span>
                    <span className="my-projects-card-progress-value font-medium text-slate-900">{project.progress}%</span>
                  </div>
                  <div className="my-projects-card-progress-bar w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="my-projects-card-progress-fill bg-primary-emerald h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="my-projects-card-actions flex items-center justify-between">
                  <div className="my-projects-card-updated text-xs text-slate-500">
                    Updated {new Date(project.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="my-projects-card-action-buttons flex items-center space-x-2">
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className="my-projects-card-view-button p-2 text-slate-600 hover:text-primary-emerald hover:bg-slate-100 rounded-lg transition-colors"
                      title="View Project"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="my-projects-card-edit-button p-2 text-slate-600 hover:text-primary-emerald hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="my-projects-card-delete-button p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="my-projects-empty-state text-center py-12">
              <FolderOpen className="my-projects-empty-icon h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="my-projects-empty-title text-lg font-medium text-slate-900 mb-2">No projects found</h3>
              <p className="my-projects-empty-description text-slate-600 mb-6">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first project.'
                }
              </p>
              <button
                onClick={handleNewProject}
                className="my-projects-empty-button inline-flex items-center space-x-2 bg-primary-emerald text-white px-6 py-3 rounded-lg hover:bg-primary-emerald/90 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Create New Project</span>
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MyProjectsPage;
