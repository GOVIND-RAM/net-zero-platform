import React from 'react';

interface CategoryProgressBarProps {
  categoryName: string;
  percentage: number;
  completedKpis?: number;
  totalKpis?: number;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryProgressBar: React.FC<CategoryProgressBarProps> = ({
  categoryName,
  percentage,
  completedKpis,
  totalKpis,
  isActive = false,
  onClick
}) => {
  return (
    <div 
      className={`category-progress-bar-component-container p-3 rounded-lg transition-colors ${
        onClick ? 'cursor-pointer hover:bg-slate-50' : ''
      } ${isActive ? 'bg-primary-emerald/5 border border-primary-emerald/20' : ''}`}
      onClick={onClick}
    >
      <div className="category-progress-bar-component-header flex items-center justify-between mb-2">
        <span className={`category-progress-bar-component-title text-sm font-medium ${
          isActive ? 'text-primary-emerald' : 'text-slate-700'
        }`}>
          {categoryName}
        </span>
        <span className={`category-progress-bar-component-percentage text-sm font-semibold ${
          isActive ? 'text-primary-emerald' : 'text-slate-600'
        }`}>
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="category-progress-bar-component-progress-container w-full">
        <div className="category-progress-bar-component-progress-bg w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`category-progress-bar-component-progress-fill h-2 rounded-full transition-all duration-500 ${
              isActive ? 'bg-primary-emerald' : 'bg-primary-emerald'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
      
      {completedKpis !== undefined && totalKpis !== undefined && (
        <div className="category-progress-bar-component-kpi-count mt-1">
          <span className="category-progress-bar-component-kpi-text text-xs text-slate-500">
            {completedKpis}/{totalKpis} KPIs
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryProgressBar;
