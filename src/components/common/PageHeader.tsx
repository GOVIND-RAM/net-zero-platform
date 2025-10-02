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
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-neutral-charcoal mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 text-lg">
              {subtitle}
            </p>
          )}
        </div>
        
        {showCreateButton && (
          <button
            onClick={onCreateClick}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>{createButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

