import React, { useState, useEffect, useCallback } from 'react';
import { Save, ArrowRight, ArrowLeft } from 'lucide-react';
import { questionnaireData } from '../../data/questionnaireData';
import { 
  QuestionResponse, 
  FileUploadResponse
} from '../../types';
import KpiCard from './KpiCard';
import ProgressSidebar from './ProgressSidebar';
import { useProject } from '../../context/ProjectContext';

interface QuestionnairePageProps {
  categoryId?: string;
  onSaveAndNext?: () => void;
  onSave?: () => void;
  onPrevious?: () => void;
}

const QuestionnairePage: React.FC<QuestionnairePageProps> = ({ 
  categoryId, 
  onSaveAndNext, 
  onSave, 
  onPrevious 
}) => {
  const [activeTab, setActiveTab] = useState<string>(categoryId || 'integrative-process');
  
  // Use ProjectContext for state management
  const {
    responses,
    uploads,
    lastSaved,
    isSaving,
    addResponse,
    addUpload,
    removeUpload,
    calculateOverallProgress,
    getCategoryProgresses,
    autoSave
  } = useProject();

  // Update activeTab when categoryId changes
  useEffect(() => {
    if (categoryId) {
      setActiveTab(categoryId);
    }
  }, [categoryId]);

  const handleResponseChange = useCallback((response: QuestionResponse) => {
    addResponse(response);
  }, [addResponse]);

  const handleFileUpload = useCallback((uploadId: string, file: File) => {
    const uploadResponse: FileUploadResponse = {
      uploadId,
      file,
      status: 'completed'
    };
    addUpload(uploadResponse);
  }, [addUpload]);

  const handleFileRemove = useCallback((uploadId: string) => {
    removeUpload(uploadId);
  }, [removeUpload]);

  const handleSave = useCallback(async () => {
    if (onSave) {
      onSave();
    } else {
      await autoSave();
    }
  }, [onSave, autoSave]);

  const handleSaveAndNext = useCallback(async () => {
    await handleSave();
    if (onSaveAndNext) {
      onSaveAndNext();
    }
  }, [handleSave, onSaveAndNext]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setActiveTab(categoryId);
  }, []);

  // Get progress data from context
  const overallProgress = calculateOverallProgress();
  const categoryProgresses = getCategoryProgresses();

  const activeCategory = questionnaireData.find(cat => cat.id === activeTab);

  if (!activeCategory) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Category Not Found</h2>
          <p className="text-slate-600">The selected category could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="certification-questionnaire-container min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Progress Sidebar - Left Column (25-30% width) - Hidden on mobile */}
      <div className="certification-questionnaire-sidebar-column w-80 lg:w-96 flex-shrink-0">
        <ProgressSidebar
          categories={questionnaireData}
          categoryProgresses={categoryProgresses}
          overallProgress={overallProgress}
          activeCategoryId={activeTab}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      {/* Main Content - Right Column (70-75% width) - Full width on mobile */}
      <div className="certification-questionnaire-main-column flex-1 flex flex-col w-full lg:w-auto h-screen">
        {/* Sticky Header */}
        <div className="certification-questionnaire-header bg-white border-b border-slate-200 sticky top-0 z-10 flex-shrink-0">
          <div className="certification-questionnaire-header-content px-6 py-6">
            <div className="certification-questionnaire-header-main flex items-center justify-between">
              <div className="certification-questionnaire-header-info">
                <h1 className="certification-questionnaire-title text-2xl font-bold text-slate-800">
                  {activeCategory.title}
                </h1>
                {activeCategory.description && (
                  <p className="certification-questionnaire-description text-slate-600 mt-1">
                    {activeCategory.description}
                  </p>
                )}
              </div>
              <div className="certification-questionnaire-header-actions flex items-center space-x-4">
                {isSaving && (
                  <div className="certification-questionnaire-saving-indicator flex items-center space-x-2 text-sm text-slate-500">
                    <svg className="certification-questionnaire-spinner w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving...</span>
                  </div>
                )}
                {lastSaved && !isSaving && (
                  <div className="certification-questionnaire-last-saved text-sm text-slate-500">
                    Last saved: {new Date(lastSaved).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area - Only this area scrolls */}
        <div className="certification-questionnaire-content flex-1 overflow-y-auto">
          <div className="certification-questionnaire-main-content px-6 py-8">
            {/* KPI Cards */}
            <div className="certification-questionnaire-kpis space-y-6">
              {activeCategory.kpis.map((kpi) => (
                <KpiCard
                  key={kpi.id}
                  kpi={kpi}
                  responses={responses}
                  uploads={uploads}
                  onResponseChange={handleResponseChange}
                  onFileUpload={handleFileUpload}
                  onFileRemove={handleFileRemove}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="certification-questionnaire-actions bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
              <div className="certification-questionnaire-actions-content flex items-center justify-between">
                <div className="certification-questionnaire-actions-left">
                  {onPrevious && (
                    <button
                      onClick={onPrevious}
                      className="certification-questionnaire-prev-button flex items-center space-x-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                    >
                      <ArrowLeft className="certification-questionnaire-prev-icon h-4 w-4" />
                      <span>Previous</span>
                    </button>
                  )}
                </div>
                
                <div className="certification-questionnaire-actions-right flex items-center space-x-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="certification-questionnaire-save-button flex items-center space-x-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    <Save className="certification-questionnaire-save-icon h-4 w-4" />
                    <span>{isSaving ? 'Saving...' : 'Save'}</span>
                  </button>
                  
                  {onSaveAndNext && (
                    <button
                      onClick={handleSaveAndNext}
                      disabled={isSaving}
                      className="certification-questionnaire-save-next-button flex items-center space-x-2 px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      <span>Save & Next</span>
                      <ArrowRight className="certification-questionnaire-next-icon h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
