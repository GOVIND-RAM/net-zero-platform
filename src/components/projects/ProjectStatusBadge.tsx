import React from 'react';

type ProjectStatus = 'Certified' | 'In Progress' | 'Pending Review' | 'Draft' | 'Under Review';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md' | 'lg';
}

const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ 
  status, 
  size = 'md' 
}) => {
  const getStatusStyles = (status: ProjectStatus) => {
    switch (status) {
      case 'Certified':
        return {
          bg: 'bg-green-50',
          border: 'border-green-500',
          text: 'text-green-700',
          dot: 'bg-green-500'
        };
      case 'In Progress':
        return {
          bg: 'bg-accent-gold/10',
          border: 'border-accent-gold',
          text: 'text-accent-gold',
          dot: 'bg-accent-gold'
        };
      case 'Pending Review':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          text: 'text-blue-700',
          dot: 'bg-blue-500'
        };
      case 'Under Review':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-500',
          text: 'text-yellow-700',
          dot: 'bg-yellow-500'
        };
      case 'Draft':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          text: 'text-gray-700',
          dot: 'bg-gray-400'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          text: 'text-gray-700',
          dot: 'bg-gray-400'
        };
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-2 py-1 text-xs',
          dot: 'w-1.5 h-1.5'
        };
      case 'lg':
        return {
          container: 'px-4 py-2 text-base',
          dot: 'w-2.5 h-2.5'
        };
      default: // md
        return {
          container: 'px-3 py-1.5 text-sm',
          dot: 'w-2 h-2'
        };
    }
  };

  const styles = getStatusStyles(status);
  const sizeClasses = getSizeClasses(size);

  return (
    <span className={`inline-flex items-center ${styles.bg} ${styles.border} ${styles.text} border rounded-full font-medium ${sizeClasses.container}`}>
      <span className={`${styles.dot} ${sizeClasses.dot} rounded-full mr-2`}></span>
      {status}
    </span>
  );
};

export default ProjectStatusBadge;

