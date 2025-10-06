# Backend API Documentation - Complete Implementation Guide

## 📋 Overview

This document provides comprehensive documentation for implementing the backend API for the EcoZero Certify platform. It includes all the latest changes, data models, and implementation details needed to transition from mock data to real-time backend integration.

**Base URL**: `https://api.ecozerocertify.com/v1`  
**Version**: 1.0  
**Last Updated**: December 2024

---

## 🏗️ Architecture Overview

### **Current Frontend Implementation**
- **State Management**: React Context (`ProjectContext`) with localStorage persistence
- **Data Flow**: Single shared context across all questionnaire tabs
- **Persistence**: Manual save on "Save" and "Save & Next" button clicks
- **Progress Calculation**: Real-time progress based on saved responses and uploads

### **Backend Integration Strategy**
- **Replace localStorage**: Implement API calls for data persistence
- **Maintain Context Structure**: Keep existing React Context pattern
- **Add API Layer**: Create service functions for backend communication
- **Error Handling**: Implement robust error handling and retry logic

---

## 🔐 Authentication & Authorization

### **JWT Token Management**
```typescript
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
}
```

### **Token Refresh Strategy**
```typescript
// Auto-refresh token before expiration
const refreshTokenIfNeeded = async () => {
  const token = localStorage.getItem('authToken');
  const decoded = jwt.decode(token);
  
  if (decoded && decoded.exp < Date.now() / 1000 + 300) { // 5 minutes before expiry
    await refreshAuthToken();
  }
};
```

---

## 📊 Data Models

### **Project Data Model**
```typescript
interface ProjectData {
  id: string;
  name: string;
  buildingType: string;
  certificationType: string;
  ratingSystem: string;
  unitType: 'sqft' | 'sqm';
  startDate: string;
  endDate: string;
  projectType: string;
  grossFloorArea: string;
  owner: string;
  ownerRepresentative: string;
  ownerType: string;
  ownerCountry: string;
  ownerState: string;
  email: string;
  projectCharacteristics: string[];
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'approved' | 'rejected';
  completionPercentage: number;
  totalPoints: number;
  earnedPoints: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
```

### **Questionnaire Response Model**
```typescript
interface QuestionResponse {
  id: string;
  projectId: string;
  questionId: string;
  categoryId: string;
  value: string | number | boolean | null;
  points: number;
  createdAt: string;
  updatedAt: string;
}

interface FileUploadResponse {
  id: string;
  projectId: string;
  uploadId: string;
  categoryId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  status: 'uploading' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}
```

### **Progress Calculation Model**
```typescript
interface CategoryProgress {
  categoryId: string;
  completedKpis: number;
  totalKpis: number;
  overallProgress: number;
  points: {
    earned: number;
    total: number;
    percentage: number;
  };
}

interface ProjectProgress {
  projectId: string;
  overallProgress: number;
  categories: CategoryProgress[];
  totalPoints: number;
  earnedPoints: number;
  lastUpdated: string;
}
```

---

## 🔄 API Integration Implementation

### **1. Project Context API Integration**

Replace the current localStorage-based `ProjectContext` with API calls:

```typescript
// src/context/ProjectContext.tsx - Updated Implementation
interface ProjectContextType {
  // Existing state
  responses: QuestionResponse[];
  uploads: FileUploadResponse[];
  lastSaved: string;
  isDirty: boolean;
  isSaving: boolean;
  
  // Existing actions
  addResponse: (response: QuestionResponse) => void;
  removeResponse: (questionId: string) => void;
  addUpload: (upload: FileUploadResponse) => void;
  removeUpload: (uploadId: string) => void;
  updateUpload: (uploadId: string, updates: Partial<FileUploadResponse>) => void;
  
  // Progress calculations
  calculateCategoryProgress: (categoryId: string) => CategoryProgress;
  calculateOverallProgress: () => number;
  getCategoryProgresses: () => CategoryProgress[];
  
  // API Integration
  saveProjectData: () => Promise<void>;
  loadProjectData: () => Promise<void>;
  syncWithBackend: () => Promise<void>;
  
  // Data management
  clearAllData: () => void;
  resetProjectData: () => void;
}
```

### **2. API Service Layer**

Create a new service layer for backend communication:

```typescript
// src/services/api.ts
class ApiService {
  private baseURL = process.env.REACT_APP_API_URL || 'https://api.ecozerocertify.com/v1';
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Project endpoints
  async getProject(projectId: string): Promise<ProjectData> {
    const response = await this.request<{ data: ProjectData }>(`/projects/${projectId}`);
    return response.data;
  }

  async updateProject(projectId: string, data: Partial<ProjectData>): Promise<ProjectData> {
    const response = await this.request<{ data: ProjectData }>(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  // Questionnaire endpoints
  async getQuestionnaireResponses(projectId: string, categoryId?: string): Promise<QuestionResponse[]> {
    const endpoint = categoryId 
      ? `/projects/${projectId}/responses/${categoryId}`
      : `/projects/${projectId}/responses`;
    const response = await this.request<{ data: QuestionResponse[] }>(endpoint);
    return response.data;
  }

  async saveQuestionnaireResponses(
    projectId: string, 
    responses: QuestionResponse[]
  ): Promise<void> {
    await this.request(`/projects/${projectId}/responses`, {
      method: 'POST',
      body: JSON.stringify({ responses }),
    });
  }

  // File upload endpoints
  async getSignedUploadUrl(
    projectId: string,
    categoryId: string,
    uploadId: string,
    file: File
  ): Promise<{ uploadUrl: string; fileId: string }> {
    const response = await this.request<{ data: { uploadUrl: string; fileId: string } }>('/upload/sign-url', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        projectId,
        categoryId,
        uploadId,
      }),
    });
    return response.data;
  }

  async completeFileUpload(
    projectId: string,
    categoryId: string,
    uploadId: string,
    fileId: string
  ): Promise<FileUploadResponse> {
    const response = await this.request<{ data: FileUploadResponse }>('/upload/complete', {
      method: 'POST',
      body: JSON.stringify({
        fileId,
        projectId,
        categoryId,
        uploadId,
      }),
    });
    return response.data;
  }

  // Progress endpoints
  async getProjectProgress(projectId: string): Promise<ProjectProgress> {
    const response = await this.request<{ data: ProjectProgress }>(`/projects/${projectId}/progress`);
    return response.data;
  }
}

export const apiService = new ApiService();
```

### **3. Updated Project Context with API Integration**

```typescript
// src/context/ProjectContext.tsx - Updated Implementation
export const ProjectProvider: React.FC<ProjectProviderProps> = ({ 
  children, 
  projectId 
}) => {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [uploads, setUploads] = useState<FileUploadResponse[]>([]);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load project data on mount
  useEffect(() => {
    if (projectId) {
      loadProjectData();
    }
  }, [projectId]);

  // Load project data from backend
  const loadProjectData = useCallback(async () => {
    if (!projectId) return;

    setIsLoading(true);
    try {
      // Load responses
      const responsesData = await apiService.getQuestionnaireResponses(projectId);
      setResponses(responsesData);

      // Load uploads (implement getUploads endpoint)
      // const uploadsData = await apiService.getProjectUploads(projectId);
      // setUploads(uploadsData);

      console.log(`Loaded project data for ${projectId}:`, {
        responses: responsesData.length,
        uploads: uploads.length
      });
    } catch (error) {
      console.error('Failed to load project data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  // Save project data to backend
  const saveProjectData = useCallback(async () => {
    if (!projectId) return;

    setIsSaving(true);
    try {
      // Save responses
      await apiService.saveQuestionnaireResponses(projectId, responses);
      
      // Save uploads (implement saveUploads endpoint)
      // await apiService.saveProjectUploads(projectId, uploads);

      setLastSaved(new Date().toISOString());
      setIsDirty(false);
      console.log(`Saved project data for ${projectId}:`, {
        responses: responses.length,
        uploads: uploads.length
      });
    } catch (error) {
      console.error('Save failed:', error);
      throw error; // Re-throw to handle in UI
    } finally {
      setIsSaving(false);
    }
  }, [projectId, responses, uploads]);

  // Sync with backend (for real-time updates)
  const syncWithBackend = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const progress = await apiService.getProjectProgress(projectId);
      // Update local state with backend data if needed
      console.log('Synced with backend:', progress);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }, [projectId]);

  // Rest of the context implementation remains the same...
  // (addResponse, removeResponse, addUpload, etc.)

  const contextValue: ProjectContextType = {
    responses,
    uploads,
    lastSaved,
    isDirty,
    isSaving,
    isLoading,
    addResponse,
    removeResponse,
    addUpload,
    removeUpload,
    updateUpload,
    calculateCategoryProgress,
    calculateOverallProgress,
    getCategoryProgresses,
    saveProjectData,
    loadProjectData,
    syncWithBackend,
    clearAllData,
    resetProjectData
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
```

---

## 📝 Questionnaire Data Structure

### **Updated Questionnaire Data Model**
```typescript
// src/data/questionnaireData.ts - Backend Integration
interface QuestionnaireCategory {
  id: string;
  title: string;
  description: string;
  maxPoints: number;
  kpis: QuestionnaireKpi[];
}

interface QuestionnaireKpi {
  id: string;
  title: string;
  description: string;
  maxPoints: number;
  questions: Question[];
  uploads: Upload[];
}

interface Question {
  id: string; // Must be unique across entire questionnaire
  label: string;
  type: 'text' | 'number' | 'yes-no' | 'select' | 'multi-select';
  required: boolean;
  points: number;
  options?: string[]; // For select/multi-select
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface Upload {
  id: string;
  label: string;
  description: string;
  required: boolean;
  acceptedTypes: string[];
  maxSize: number; // in bytes
  maxFiles: number;
}
```

### **Critical Fix: Unique Question IDs**
```typescript
// Ensure all question IDs are unique across the entire questionnaire
const questionnaireData: QuestionnaireCategory[] = [
  {
    id: 'integrative-process',
    title: 'Integrative Process',
    kpis: [
      {
        id: 'ip-credit-1',
        questions: [
          {
            id: 'integrative-energy-modeling-approach', // ✅ Unique ID
            label: 'What energy modeling approach is being used?',
            type: 'select',
            // ...
          }
        ]
      }
    ]
  },
  {
    id: 'energy-atmosphere',
    title: 'Energy and Atmosphere',
    kpis: [
      {
        id: 'ea-credit-1',
        questions: [
          {
            id: 'energy-atmosphere-modeling-approach', // ✅ Different unique ID
            label: 'What energy modeling approach is being used?',
            type: 'select',
            // ...
          }
        ]
      }
    ]
  }
];
```

---

## 🔄 Migration Strategy

### **Phase 1: API Service Layer**
1. Create `src/services/api.ts` with all API methods
2. Add environment variables for API configuration
3. Implement error handling and retry logic

### **Phase 2: Context Integration**
1. Update `ProjectContext` to use API calls instead of localStorage
2. Add loading states and error handling
3. Implement optimistic updates for better UX

### **Phase 3: File Upload Integration**
1. Implement signed URL uploads for file handling
2. Add progress tracking for file uploads
3. Implement file validation and error handling

### **Phase 4: Real-time Sync**
1. Add WebSocket support for real-time updates
2. Implement conflict resolution for concurrent edits
3. Add offline support with sync on reconnect

---

## 🛠️ Implementation Checklist

### **Backend Requirements**
- [ ] JWT authentication with refresh tokens
- [ ] Project CRUD operations
- [ ] Questionnaire response storage
- [ ] File upload with signed URLs
- [ ] Progress calculation endpoints
- [ ] Real-time sync capabilities

### **Frontend Updates**
- [ ] Replace localStorage with API calls
- [ ] Add loading states and error handling
- [ ] Implement optimistic updates
- [ ] Add retry logic for failed requests
- [ ] Update progress calculations to use backend data

### **Testing**
- [ ] Unit tests for API service layer
- [ ] Integration tests for context updates
- [ ] E2E tests for complete user flows
- [ ] Performance testing for large datasets

---

## 📊 Performance Considerations

### **Data Loading Strategy**
```typescript
// Lazy load questionnaire data
const loadCategoryData = async (categoryId: string) => {
  if (!loadedCategories.has(categoryId)) {
    const data = await apiService.getQuestionnaireResponses(projectId, categoryId);
    setLoadedCategories(prev => new Set([...prev, categoryId]));
    return data;
  }
  return responses.filter(r => r.categoryId === categoryId);
};
```

### **Caching Strategy**
```typescript
// Implement response caching
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};
```

---

## 🔧 Environment Configuration

### **Environment Variables**
```bash
# .env
REACT_APP_API_URL=https://api.ecozerocertify.com/v1
REACT_APP_WS_URL=wss://api.ecozerocertify.com/ws
REACT_APP_UPLOAD_URL=https://storage.ecozerocertify.com
REACT_APP_ENVIRONMENT=production
```

### **API Configuration**
```typescript
// src/config/api.ts
export const apiConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  uploadChunkSize: 1024 * 1024, // 1MB
};
```

---

## 📚 Additional Resources

- **[API_ENDPOINTS_REFERENCE.md](./API_ENDPOINTS_REFERENCE.md)** - Complete API reference
- **[MASTER_DOCUMENTATION.md](./MASTER_DOCUMENTATION.md)** - Frontend development guide
- **[Postman Collection](./postman-collection.json)** - API testing collection
- **[OpenAPI Spec](./openapi-spec.yaml)** - API specification

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Status**: 🚀 Ready for Backend Integration

---

*This documentation provides a complete guide for transitioning from mock data to real backend integration while maintaining all existing functionality and user experience.*
