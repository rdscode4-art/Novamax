import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import PortalLayout from './components/PortalLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HospitalsPage from './pages/HospitalsPage';
import ContactsPage from './pages/ContactsPage';
import JoinApplicationsPage from './pages/JoinApplicationsPage';
import GalleryPage from './pages/GalleryPage';
import VolunteersPage from './pages/VolunteersPage';
import SettingsPage from './pages/SettingsPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import PartnerApplicationsPage from './pages/PartnerApplicationsPage';
import PortalDashboard from './pages/portal/PortalDashboard';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#f0f4f8' }}>
      <div style={{ textAlign:'center' }}>
        <div className="spinner" style={{ width:40, height:40, border:'4px solid #e2e8f0', borderTopColor:'#1a3a6b', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }}></div>
        <p style={{ color:'#64748b', fontSize:14 }}>Loading...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PortalRoute({ children }) {
  const { isPortalAuthenticated, loading } = useAuth();
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#f0f4f8' }}>
      <div style={{ textAlign:'center' }}>
        <div className="spinner" style={{ width:40, height:40, border:'4px solid #e2e8f0', borderTopColor:'#10b981', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }}></div>
        <p style={{ color:'#64748b', fontSize:14 }}>Loading Portal...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
  return isPortalAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated, isPortalAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;
  if (isPortalAuthenticated) return <Navigate to="/portal" replace />;
  return children;
}

function SuperAdminRoute({ children }) {
  const { isAuthenticated, isSuperAdminMode, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // If authenticated but not super admin mode, redirect to dashboard
  if (!isSuperAdminMode) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontSize: 14 } }} />
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="hospitals" element={<HospitalsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            
            {/* Super Admin Only Routes */}
            <Route path="join-applications" element={<SuperAdminRoute><JoinApplicationsPage /></SuperAdminRoute>} />
            <Route path="partner-applications" element={<SuperAdminRoute><PartnerApplicationsPage /></SuperAdminRoute>} />
            
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="volunteers" element={<VolunteersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
          </Route>
          
          <Route path="/portal" element={<PortalRoute><PortalLayout /></PortalRoute>}>
            <Route index element={<PortalDashboard />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
