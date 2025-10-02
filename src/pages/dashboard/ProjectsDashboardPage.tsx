import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import PageHeader from '../../components/common/PageHeader';
import ProjectsTable from '../../components/forms/ProjectsTable';
import { getProjectsByType, Project } from '../../services/mockData';

const ProjectsDashboardPage: React.FC = () => {
  const { certificationType } = useParams<{ certificationType: string }>();
  const navigate = useNavigate();
  
  // Get projects for the specific certification type
  const projects = getProjectsByType(certificationType || '');

  const handleCreateProject = () => {
    navigate(`/project/create`);
  };

  const handleViewProject = (project: Project) => {
    // TODO: Navigate to project details page
    console.log('View project:', project);
  };

  const handleEditProject = (project: Project) => {
    // TODO: Navigate to project edit page
    console.log('Edit project:', project);
  };

  const handleDeleteProject = (project: Project) => {
    // TODO: Implement delete functionality
    console.log('Delete project:', project);
  };

  const getCertificationTypeDisplay = (type: string) => {
    switch (type) {
      case 'building':
        return 'Building Projects';
      case 'portfolio':
        return 'Portfolio Projects';
      case 'home':
        return 'Home Projects';
      case 'community-center':
        return 'Community Center Projects';
      case 'campus':
        return 'Campus Projects';
      case 'warehouse':
        return 'Warehouse Projects';
      case 'community':
        return 'Community Projects';
      case 'city':
        return 'City Projects';
      case 'business':
        return 'Business Projects';
      case 'product':
        return 'Product Projects';
      case 'process':
        return 'Process Projects';
      case 'fleet':
        return 'Fleet Projects';
      case 'supply-chain':
        return 'Supply Chain Projects';
      default:
        return 'Projects';
    }
  };

  const getCertificationTypeDescription = (type: string) => {
    switch (type) {
      case 'building':
        return 'Manage your building certification projects and track progress towards net-zero emissions.';
      case 'portfolio':
        return 'Oversee multiple building certifications across your real estate portfolio.';
      case 'home':
        return 'Track residential home certifications and sustainable living initiatives.';
      case 'community-center':
        return 'Manage community center certifications and social sustainability projects.';
      case 'campus':
        return 'Monitor educational campus certifications and green campus initiatives.';
      case 'warehouse':
        return 'Track warehouse facility certifications and logistics sustainability.';
      case 'community':
        return 'Oversee community-wide sustainability certifications and local initiatives.';
      case 'city':
        return 'Manage city-level certifications and municipal sustainability programs.';
      case 'business':
        return 'Track business facility certifications and corporate sustainability goals.';
      case 'product':
        return 'Monitor product certifications and sustainable manufacturing processes.';
      case 'process':
        return 'Manage process certifications and operational sustainability improvements.';
      case 'fleet':
        return 'Track transportation fleet certifications and emission reduction programs.';
      case 'supply-chain':
        return 'Oversee supply chain certifications and end-to-end sustainability initiatives.';
      default:
        return 'Manage your certification projects and track progress.';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title={getCertificationTypeDisplay(certificationType || '')}
          subtitle={getCertificationTypeDescription(certificationType || '')}
          showCreateButton={true}
          createButtonText="Create New Project"
          onCreateClick={handleCreateProject}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-neutral-charcoal">{projects.length}</p>
              </div>
              <div className="bg-primary-emerald/10 p-3 rounded-lg">
                <svg className="h-6 w-6 text-primary-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Certified</p>
                <p className="text-3xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'Certified').length}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-accent-gold">
                  {projects.filter(p => p.status === 'In Progress').length}
                </p>
              </div>
              <div className="bg-accent-gold/10 p-3 rounded-lg">
                <svg className="h-6 w-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-blue-600">
                  {projects.filter(p => p.status === 'Pending Review').length}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <ProjectsTable
          projects={projects}
          onViewProject={handleViewProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </MainLayout>
  );
};

export default ProjectsDashboardPage;

