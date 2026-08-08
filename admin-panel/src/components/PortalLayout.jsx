import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function PortalLayout() {
  const { portalUser, logoutPortal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutPortal();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .portal-header {
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .portal-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }
        .portal-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 20px;
        }
        .portal-user-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .user-greeting { font-size: 14px; color: #475569; font-weight: 500; }
        .logout-btn {
          padding: 8px 16px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px; font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover { background: #e2e8f0; color: #0f172a; }
        .portal-content {
          padding: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
      
      <header className="portal-header">
        <div className="portal-brand">
          <div className="portal-icon">✨</div>
          Novamax Member Portal
        </div>
        <div className="portal-user-info">
          <div className="user-greeting">Welcome, {portalUser?.fullName}</div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="portal-content">
        <Outlet />
      </main>
    </div>
  );
}
