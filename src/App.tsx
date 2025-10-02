import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardSelection from './pages/dashboard/DashboardSelection';
import ProjectsDashboardPage from './pages/dashboard/ProjectsDashboardPage';
import NewProjectPage from './pages/projects/NewProjectPage';
import ProjectCreationPage from './pages/projects/ProjectCreationPage';
import ProjectOverviewPage from './pages/projects/ProjectOverviewPage';
import ProjectDashboardPage from './pages/projects/ProjectDashboardPage';
import KPIDetailPage from './pages/projects/KPIDetailPage';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
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
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
