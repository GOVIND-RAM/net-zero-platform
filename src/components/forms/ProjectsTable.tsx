import React, { useState } from 'react';
import { Project } from '../../services/mockData';
import ProjectStatusBadge from './ProjectStatusBadge';
import { Search, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';

interface ProjectsTableProps {
  projects: Project[];
  onViewProject?: (project: Project) => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (project: Project) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onViewProject,
  onEditProject,
  onDeleteProject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Project>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 mt-6 shadow-lg">
      {/* Search and Filters */}
      <div className="p-6 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-primary-emerald transition-colors"
                onClick={() => handleSort('name')}
              >
                Project Name
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-primary-emerald transition-colors"
                onClick={() => handleSort('organization')}
              >
                Organization
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Progress
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-primary-emerald transition-colors"
                onClick={() => handleSort('location')}
              >
                Location
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-primary-emerald transition-colors"
                onClick={() => handleSort('lastUpdated')}
              >
                Last Updated
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedProjects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-neutral-cream transition-colors cursor-pointer"
                onClick={() => onViewProject?.(project)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {project.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {project.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {project.organization}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ProjectStatusBadge status={project.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-primary-emerald h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(project.lastUpdated)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewProject?.(project);
                      }}
                      className="text-primary-emerald hover:text-primary-forest transition-colors"
                      title="View Project"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProject?.(project);
                      }}
                      className="text-gray-600 hover:text-primary-emerald transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject?.(project);
                      }}
                      className="text-red-600 hover:text-red-700 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            {searchTerm ? 'No projects found matching your search.' : 'No projects found.'}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-slate-200 rounded-b-2xl">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {sortedProjects.length} of {projects.length} projects
          </span>
          <span>
            {searchTerm && `Filtered by: "${searchTerm}"`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;

