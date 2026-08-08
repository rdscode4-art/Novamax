import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin_user')); } catch { return null; }
  });
  const [portalUser, setPortalUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('portal_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    const portalToken = localStorage.getItem('portal_token');
    
    const promises = [];
    
    if (adminToken) {
      promises.push(
        api.get('/admin/me')
          .then(res => setAdmin(res.data.data))
          .catch(() => { localStorage.removeItem('admin_token'); localStorage.removeItem('admin_user'); setAdmin(null); })
      );
    }
    
    if (portalToken) {
      promises.push(
        api.get('/portal/me')
          .then(res => setPortalUser(res.data.data))
          .catch(() => { localStorage.removeItem('portal_token'); localStorage.removeItem('portal_user'); setPortalUser(null); })
      );
    }
    
    Promise.all(promises).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/admin/login', { email, password });
    const { token, admin: adminData } = res.data.data;
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(adminData));
    setAdmin(adminData);
    return adminData;
  };
  
  const loginPortal = async (email, password) => {
    const res = await api.post('/portal/login', { email, password });
    const { token, user } = res.data.data;
    localStorage.setItem('portal_token', token);
    localStorage.setItem('portal_user', JSON.stringify(user));
    setPortalUser(user);
    return user;
  };

  const [isSuperAdminMode, setIsSuperAdminMode] = useState(() => {
    return localStorage.getItem('superadmin_mode') === 'true';
  });

  const unlockSuperAdmin = async (password) => {
    const res = await api.post('/admin/verify-superadmin', { password });
    if (res.data.success) {
      localStorage.setItem('superadmin_mode', 'true');
      setIsSuperAdminMode(true);
      return true;
    }
    return false;
  };

  const lockSuperAdmin = () => {
    localStorage.removeItem('superadmin_mode');
    setIsSuperAdminMode(false);
  };

  const logout = async () => {
    try { await api.post('/admin/logout'); } catch {}
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('superadmin_mode');
    setAdmin(null);
    setIsSuperAdminMode(false);
  };
  
  const logoutPortal = async () => {
    try { await api.post('/portal/logout'); } catch {}
    localStorage.removeItem('portal_token');
    localStorage.removeItem('portal_user');
    setPortalUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      admin, login, logout, 
      portalUser, loginPortal, logoutPortal,
      loading, 
      isAuthenticated: !!admin,
      isPortalAuthenticated: !!portalUser,
      isSuperAdminMode, unlockSuperAdmin, lockSuperAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
