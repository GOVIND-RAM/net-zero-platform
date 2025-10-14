import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/authentication/LoginPage';
import SignupPage from './components/authentication/SignupPage';
import ForgotPasswordPage from './components/authentication/ForgotPasswordPage';
import DashboardSelection from './components/dashboard/DashboardSelection';
import ProjectsDashboardPage from './components/dashboard/ProjectsDashboardPage';
import MyProjectsPage from './components/dashboard/MyProjectsPage';
import NewProjectPage from './components/projects/NewProjectPage';
import ProjectCreationPage from './components/projects/ProjectCreationPage';
import ProjectDashboardPage from './components/projects/ProjectDashboardPage';
import KPIDetailPage from './components/projects/KPIDetailPage';
import BuildingTypeSelection from './components/projects/BuildingTypeSelection';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import ChatbotWidget from './components/chatbot/ChatbotWidget';

// Gemini API key - MUST be set in .env file
const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY;

// Main App Content Component (needs to be inside AuthProvider to use useAuth)
const AppContent: React.FC = () => {
  const { authState } = useAuth();

  // Clear chatbot history when user logs out
  React.useEffect(() => {
    if (!authState.isAuthenticated) {
      localStorage.removeItem('infaira_chat_history');
    }
  }, [authState.isAuthenticated]);

  return (
    <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Protected Customer Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardSelection />
                </ProtectedRoute>
              }
            />
            
            {/* My Projects Route */}
            <Route
              path="/dashboard/myprojects"
              element={
                <ProtectedRoute>
                  <MyProjectsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Project Management Routes */}
            <Route
              path="/dashboard/projects/:certificationType"
              element={
                <ProtectedRoute>
                  <ProjectsDashboardPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/projects/new/:certificationType"
              element={
                <ProtectedRoute>
                  <NewProjectPage />
                </ProtectedRoute>
              }
            />
            
            {/* Building Type Selection */}
            <Route
              path="/project/select-type"
              element={
                <ProtectedRoute>
                  <BuildingTypeSelection />
                </ProtectedRoute>
              }
            />
            
            {/* Project Creation Flow */}
            <Route
              path="/project/create"
              element={
                <ProtectedRoute>
                  <ProjectCreationPage />
                </ProtectedRoute>
              }
            />
            
            {/* Project Dashboard and KPI Routes */}
            <Route
              path="/project/dashboard"
              element={
                <ProtectedRoute>
                  <ProjectDashboardPage />
                </ProtectedRoute>
              }
            />
            
            
            <Route
              path="/project/kpi/:categoryId"
              element={
                <ProtectedRoute>
                  <KPIDetailPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/certification/questionnaire"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-slate-900 mb-4">
                        Questionnaire Page
                      </h1>
                      <p className="text-slate-600">
                        This page will be implemented in the next phase.
                      </p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute adminOnly>
                  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-white mb-4">
                        Admin Dashboard
                      </h1>
                      <p className="text-slate-300">
                        This page will be implemented in the next phase.
                      </p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            
            {/* 404 Route */}
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-gradient-to-br from-primary-forest via-primary-forest/90 to-neutral-charcoal flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                    <p className="text-neutral-cream/80 text-xl mb-8">Page not found</p>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="btn-primary"
                    >
                      Go Home
                    </button>
                  </div>
                </div>
              }
            />
          </Routes>

          {/* Infaira AI Chatbot - Only visible to logged-in users */}
          {authState.isAuthenticated && <ChatbotWidget apiKey={geminiApiKey} />}
        </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
