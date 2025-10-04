import React from 'react';
import DonutChart from '../common/DonutChart';
import CategoryProgressBar from '../common/CategoryProgressBar';
import { QuestionnaireCategory, CategoryProgress } from '../../types';
import { useProject } from '../../context/ProjectContext';

interface ProgressSidebarProps {
  categories: QuestionnaireCategory[];
  categoryProgresses: CategoryProgress[];
  overallProgress: number;
  activeCategoryId?: string;
  onCategoryClick?: (categoryId: string) => void;
}

const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  categories,
  categoryProgresses,
  overallProgress,
  activeCategoryId,
  onCategoryClick
}) => {
  const { clearAllData } = useProject();

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all questionnaire data? This action cannot be undone.')) {
      clearAllData();
    }
  };

  return (
    <div className="progress-sidebar-component-container w-full bg-white border-r border-slate-200 sticky top-0 h-screen overflow-y-auto lg:block hidden">
      <div className="progress-sidebar-component-content p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="progress-sidebar-component-header mb-8">
          <h2 className="progress-sidebar-component-title text-xl font-bold text-slate-800 mb-2">
            Certification Progress
          </h2>
          <p className="progress-sidebar-component-subtitle text-sm text-slate-600">
            Track your completion across all categories
          </p>
        </div>

        {/* Overall Progress Donut Chart */}
        <div className="progress-sidebar-component-overall-progress mb-8">
          <DonutChart 
            percentage={overallProgress}
            size={140}
            strokeWidth={10}
            label="Overall Progress"
          />
        </div>

        {/* Category Progress Bars */}
        <div className="progress-sidebar-component-categories">
          <h3 className="progress-sidebar-component-categories-title text-lg font-semibold text-slate-800 mb-4">
            Category Breakdown
          </h3>
          <div className="progress-sidebar-component-categories-list space-y-3">
            {categories.map((category) => {
              const progress = categoryProgresses.find(p => p.categoryId === category.id);
              const isActive = category.id === activeCategoryId;
              
              return (
                <CategoryProgressBar
                  key={category.id}
                  categoryName={category.title}
                  percentage={progress?.overallProgress || 0}
                  completedKpis={progress?.completedKpis}
                  totalKpis={progress?.totalKpis}
                  isActive={isActive}
                  onClick={onCategoryClick ? () => onCategoryClick(category.id) : undefined}
                />
              );
            })}
          </div>
        </div>

        {/* Data Management */}
        <div className="progress-sidebar-component-data-management mt-8 pt-6 border-t border-slate-200">
          <div className="progress-sidebar-component-data-management-content">
            <h4 className="progress-sidebar-component-data-management-title text-sm font-medium text-slate-700 mb-3">
              Data Management
            </h4>
            <button
              onClick={handleClearData}
              className="progress-sidebar-component-clear-button w-full px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              Clear All Data
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="progress-sidebar-component-footer mt-6 pt-4 border-t border-slate-200">
          <div className="progress-sidebar-component-footer-content text-center">
            <p className="progress-sidebar-component-footer-text text-xs text-slate-500">
              Complete all questions and uploads to finish certification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;
