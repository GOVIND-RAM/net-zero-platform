import React, { useState } from 'react';
import { QuestionnaireKpi, QuestionResponse, FileUploadResponse } from '../../types';
import FileUpload from '../common/FileUpload';

interface KpiCardProps {
  kpi: QuestionnaireKpi;
  responses: QuestionResponse[];
  uploads: FileUploadResponse[];
  onResponseChange: (response: QuestionResponse) => void;
  onFileUpload: (uploadId: string, file: File) => void;
  onFileRemove: (uploadId: string) => void;
  disabled?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({
  kpi,
  responses,
  uploads,
  onResponseChange,
  onFileUpload,
  onFileRemove,
  disabled = false
}) => {
  const [expanded, setExpanded] = useState(true);

  // Calculate progress
  const completedQuestions = responses.filter(r => 
    kpi.questions.some(q => q.id === r.questionId && r.value !== '' && r.value !== null)
  ).length;
  const totalQuestions = kpi.questions.length;
  
  const completedUploads = uploads.filter(u => 
    kpi.uploads.some(up => up.id === u.uploadId && u.status === 'completed')
  ).length;
  const totalUploads = kpi.uploads.length;

  const progressPercentage = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  const handleQuestionChange = (questionId: string, value: string | string[] | boolean) => {
    const response: QuestionResponse = {
      questionId,
      value,
      timestamp: new Date().toISOString()
    };
    onResponseChange(response);
  };

  const getResponseValue = (questionId: string) => {
    const response = responses.find(r => r.questionId === questionId);
    return response?.value || '';
  };

  const renderQuestion = (question: any) => {
    const currentValue = getResponseValue(question.id);

    switch (question.type) {
      case 'dropdown':
        return (
          <select
            value={currentValue as string}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-emerald focus:border-primary-emerald transition-colors"
            disabled={disabled}
          >
            <option value="">Select an option...</option>
            {question.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'yes-no':
        return (
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="yes"
                checked={currentValue === 'yes'}
                onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                className="w-4 h-4 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                disabled={disabled}
              />
              <span className="text-sm font-medium text-slate-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="no"
                checked={currentValue === 'no'}
                onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                className="w-4 h-4 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                disabled={disabled}
              />
              <span className="text-sm font-medium text-slate-700">No</span>
            </label>
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {question.options?.map((option: string) => {
              const selectedValues = Array.isArray(currentValue) ? currentValue : [];
              const isSelected = selectedValues.includes(option);
              
              return (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      const newValues = isSelected
                        ? selectedValues.filter(v => v !== option)
                        : [...selectedValues, option];
                      handleQuestionChange(question.id, newValues);
                    }}
                    className="w-4 h-4 text-primary-emerald focus:ring-primary-emerald border-slate-300 rounded"
                    disabled={disabled}
                  />
                  <span className="text-sm font-medium text-slate-700">{option}</span>
                </label>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="kpi-card-container bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div 
        className="kpi-card-header px-6 py-4 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="kpi-card-header-content flex items-center justify-between">
          <div className="kpi-card-header-info flex-1">
            <div className="kpi-card-header-title-section flex items-center space-x-3">
              <h3 className="kpi-card-title text-lg font-semibold text-slate-800">
                {kpi.title}
              </h3>
              {kpi.maxPoints && (
                <span className="kpi-card-points-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-emerald/10 text-primary-emerald">
                  {kpi.maxPoints} points
                </span>
              )}
            </div>
            {kpi.description && (
              <p className="kpi-card-description text-sm text-slate-600 mt-1">{kpi.description}</p>
            )}
          </div>
          <div className="kpi-card-header-controls flex items-center">
            {/* Expand/Collapse Icon */}
            <svg 
              className={`kpi-card-expand-icon w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="kpi-card-content p-6 space-y-8">
          {/* Questions Section */}
          {kpi.questions.length > 0 && (
            <div className="kpi-card-questions-section space-y-6">
              <h4 className="kpi-card-questions-title text-base font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Questions & Inputs
              </h4>
              <div className="kpi-card-questions-list space-y-6">
                {kpi.questions.map((question) => (
                  <div key={question.id} className="kpi-card-question-item space-y-2">
                    <label className="kpi-card-question-label block text-sm font-medium text-slate-700">
                      {question.label}
                      {question.required && (
                        <span className="kpi-card-question-required text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {question.description && (
                      <p className="kpi-card-question-description text-xs text-slate-500">{question.description}</p>
                    )}
                    <div className="kpi-card-question-input">
                      {renderQuestion(question)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Uploads Section */}
          {kpi.uploads.length > 0 && (
            <div className="kpi-card-uploads-section space-y-6">
              <div className="kpi-card-uploads-header flex items-center space-x-2 border-b border-slate-200 pb-2">
                <svg className="kpi-card-uploads-icon w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h4 className="kpi-card-uploads-title text-base font-semibold text-slate-800">
                  Required Documentation
                </h4>
              </div>
              <div className="kpi-card-uploads-list space-y-6">
                {kpi.uploads.map((upload) => {
                  const existingFile = uploads.find(u => u.uploadId === upload.id);
                  return (
                    <FileUpload
                      key={upload.id}
                      upload={upload}
                      onFileUpload={onFileUpload}
                      onFileRemove={onFileRemove}
                      existingFile={existingFile}
                      disabled={disabled}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
