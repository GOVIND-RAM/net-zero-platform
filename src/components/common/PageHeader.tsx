import React from 'react';
import { PlusCircle } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showCreateButton?: boolean;
  createButtonText?: string;
  onCreateClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showCreateButton = false,
  createButtonText = "Create New Project",
  onCreateClick
}) => {
  return (
    <div className="page-header mb-8">
      <div className="page-header-content flex items-center justify-between">
        <div className="page-header-text">
          <h1 className="page-header-title text-4xl font-bold text-neutral-charcoal mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="page-header-subtitle text-gray-600 text-lg">
              {subtitle}
            </p>
          )}
        </div>
        
        {showCreateButton && (
          <button
            onClick={onCreateClick}
            className="page-header-create-button btn-primary flex items-center space-x-2"
          >
            <PlusCircle className="page-header-create-icon h-5 w-5" />
            <span className="page-header-create-text">{createButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

