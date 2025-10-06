import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { questionnaireData } from '../data/questionnaireData';
import { 
  QuestionResponse, 
  FileUploadResponse, 
  CategoryProgress,
  ProjectQuestionnaireState 
} from '../types';

interface ProjectContextType {
  // State
  responses: QuestionResponse[];
  uploads: FileUploadResponse[];
  lastSaved: string;
  isDirty: boolean;
  isSaving: boolean;
  
  // Actions
  addResponse: (response: QuestionResponse) => void;
  removeResponse: (questionId: string) => void;
  addUpload: (upload: FileUploadResponse) => void;
  removeUpload: (uploadId: string) => void;
  updateUpload: (uploadId: string, updates: Partial<FileUploadResponse>) => void;
  
  // Progress calculations
  calculateCategoryProgress: (categoryId: string) => CategoryProgress;
  calculateOverallProgress: () => number;
  getCategoryProgresses: () => CategoryProgress[];
  
  // Manual save
  saveProjectData: () => Promise<void>;
  
  // Data management
  clearAllData: () => void;
  resetProjectData: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
  projectId?: string;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ 
  children, 
  projectId = 'default-project' 
}) => {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [uploads, setUploads] = useState<FileUploadResponse[]>([]);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved state on component mount
  useEffect(() => {
    if (projectId) {
      const savedState = localStorage.getItem(`questionnaire_${projectId}`);
      if (savedState) {
        try {
          const parsedState: ProjectQuestionnaireState = JSON.parse(savedState);
          setResponses(parsedState.responses || []);
          setUploads(parsedState.uploads || []);
          setLastSaved(parsedState.lastSaved || '');
          console.log(`Loaded saved data for project ${projectId}:`, {
            responses: parsedState.responses?.length || 0,
            uploads: parsedState.uploads?.length || 0
          });
        } catch (error) {
          console.error('Failed to load saved state:', error);
        }
      } else {
        console.log(`No saved data found for project ${projectId}`);
      }
    }
  }, [projectId]);

  // Manual save functionality - only when Save/Save & Next buttons are clicked
  const saveProjectData = useCallback(async () => {
    if (!projectId) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const state: ProjectQuestionnaireState = {
        projectId,
        responses,
        uploads,
        lastSaved: new Date().toISOString(),
        isDirty: false
      };

      // Save to localStorage for persistence
      localStorage.setItem(`questionnaire_${projectId}`, JSON.stringify(state));
      setLastSaved(new Date().toISOString());
      setIsDirty(false);
      console.log(`Saved project data for ${projectId}:`, {
        responses: responses.length,
        uploads: uploads.length
      });
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, responses, uploads]);

  // Response management - manual save only
  const addResponse = useCallback((response: QuestionResponse) => {
    setResponses(prev => {
      const existingIndex = prev.findIndex(r => r.questionId === response.questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = response;
        return updated;
      } else {
        return [...prev, response];
      }
    });
    setIsDirty(true);
  }, []);

  const removeResponse = useCallback((questionId: string) => {
    setResponses(prev => prev.filter(r => r.questionId !== questionId));
    setIsDirty(true);
  }, []);

  // Upload management - manual save only
  const addUpload = useCallback((upload: FileUploadResponse) => {
    setUploads(prev => {
      const existingIndex = prev.findIndex(u => u.uploadId === upload.uploadId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = upload;
        return updated;
      } else {
        return [...prev, upload];
      }
    });
    setIsDirty(true);
  }, []);

  const removeUpload = useCallback((uploadId: string) => {
    setUploads(prev => prev.filter(u => u.uploadId !== uploadId));
    setIsDirty(true);
  }, []);

  const updateUpload = useCallback((uploadId: string, updates: Partial<FileUploadResponse>) => {
    setUploads(prev => prev.map(u => 
      u.uploadId === uploadId ? { ...u, ...updates } : u
    ));
    setIsDirty(true);
  }, []);

  // Progress calculations - Category specific
  const calculateCategoryProgress = useCallback((categoryId: string): CategoryProgress => {
    const category = questionnaireData.find(cat => cat.id === categoryId);
    if (!category) {
      return {
        categoryId,
        completedKpis: 0,
        totalKpis: 0,
        overallProgress: 0
      };
    }

    // Debug logging to help identify issues
    // console.log(`Calculating progress for category: ${categoryId}`);
    // console.log(`Current responses count: ${responses.length}`);
    // console.log(`Current uploads count: ${uploads.length}`);

    const categoryKpis = category.kpis;
    const totalKpis = categoryKpis.length;
    
    let completedKpis = 0;
    let totalQuestions = 0;
    let completedQuestions = 0;
    let totalUploads = 0;
    let completedUploads = 0;

    categoryKpis.forEach(kpi => {
      const kpiQuestions = kpi.questions.length;
      const kpiUploads = kpi.uploads.length;
      
      totalQuestions += kpiQuestions;
      totalUploads += kpiUploads;

      // Count completed questions for this specific KPI
      let kpiCompletedQuestions = 0;
      kpi.questions.forEach(question => {
        const response = responses.find(r => r.questionId === question.id);
        if (response && response.value !== '' && response.value !== null) {
          kpiCompletedQuestions++;
          // console.log(`Found response for question ${question.id} in category ${categoryId}:`, response.value);
        }
      });
      
      // Count completed uploads for this specific KPI
      let kpiCompletedUploads = 0;
      kpi.uploads.forEach(upload => {
        const uploadResponse = uploads.find(u => u.uploadId === upload.id);
        if (uploadResponse && uploadResponse.status === 'completed') {
          kpiCompletedUploads++;
        }
      });

      completedQuestions += kpiCompletedQuestions;
      completedUploads += kpiCompletedUploads;

      // KPI is complete if all questions answered and all uploads completed
      if (kpiCompletedQuestions === kpiQuestions && kpiCompletedUploads === kpiUploads) {
        completedKpis++;
      }
    });

    const totalItems = totalQuestions + totalUploads;
    if (totalItems === 0) return {
      categoryId,
      completedKpis,
      totalKpis,
      overallProgress: 0
    };
    
    const progress = Math.round(((completedQuestions + completedUploads) / totalItems) * 100);
    const overallProgress = Math.min(progress, 100); // Cap at 100%

    return {
      categoryId,
      completedKpis,
      totalKpis,
      overallProgress
    };
  }, [responses, uploads]);

  const calculateOverallProgress = useCallback((): number => {
    // console.log(`Calculating overall progress - responses: ${responses.length}, uploads: ${uploads.length}`);
    
    let totalQuestions = 0;
    let completedQuestions = 0;
    let totalUploads = 0;
    let completedUploads = 0;

    questionnaireData.forEach(category => {
      category.kpis.forEach(kpi => {
        const kpiQuestions = kpi.questions.length;
        const kpiUploads = kpi.uploads.length;
        
        totalQuestions += kpiQuestions;
        totalUploads += kpiUploads;

        const kpiCompletedQuestions = responses.filter(r => 
          kpi.questions.some(q => q.id === r.questionId && r.value !== '' && r.value !== null)
        ).length;
        
        const kpiCompletedUploads = uploads.filter(u => 
          kpi.uploads.some(up => up.id === u.uploadId && u.status === 'completed')
        ).length;

        completedQuestions += kpiCompletedQuestions;
        completedUploads += kpiCompletedUploads;
      });
    });

    const totalItems = totalQuestions + totalUploads;
    if (totalItems === 0) return 0;
    
    const progress = Math.round(((completedQuestions + completedUploads) / totalItems) * 100);
    // console.log(`Overall progress calculation: ${completedQuestions + completedUploads}/${totalItems} = ${progress}%`);
    return Math.min(progress, 100); // Cap at 100%
  }, [responses, uploads]);

  const getCategoryProgresses = useCallback((): CategoryProgress[] => {
    return questionnaireData.map(category => calculateCategoryProgress(category.id));
  }, [calculateCategoryProgress]);

  // Data management functions
  const clearAllData = useCallback(() => {
    if (!projectId) return;
    localStorage.removeItem(`questionnaire_${projectId}`);
    setResponses([]);
    setUploads([]);
    setLastSaved('');
    setIsDirty(false);
    setIsSaving(false);
  }, [projectId]);

  const resetProjectData = useCallback(() => {
    setResponses([]);
    setUploads([]);
    setLastSaved('');
    setIsDirty(false);
    setIsSaving(false);
  }, []);

  const contextValue: ProjectContextType = {
    responses,
    uploads,
    lastSaved,
    isDirty,
    isSaving,
    addResponse,
    removeResponse,
    addUpload,
    removeUpload,
    updateUpload,
    calculateCategoryProgress,
    calculateOverallProgress,
    getCategoryProgresses,
    saveProjectData,
    clearAllData,
    resetProjectData
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
