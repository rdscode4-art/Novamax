import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/',                  icon: '📊', label: 'Dashboard',        end: true },
  { to: '/hospitals',         icon: '🏥', label: 'Hospitals' },
  { to: '/contacts',          icon: '📬', label: 'Contact Messages' },
  { to: '/join-applications', icon: '📋', label: 'Join Applications' },
  { to: '/gallery',           icon: '🖼️', label: 'Gallery' },
  { to: '/volunteers',        icon: '👥', label: 'NGO Volunteers' },
  { to: '/projects',          icon: '🚀', label: 'Upcoming Projects' },
  { to: '/certificates',      icon: '📜', label: 'Certificates' },
  { to: '/partner-applications', icon: '🤝', label: 'Partner Applications' },
  { to: '/settings',          icon: '⚙️', label: 'Settings' },
];

export default function Layout() {
  const { admin, logout, isSuperAdminMode, unlockSuperAdmin, lockSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unlockModal, setUnlockModal] = useState(false);
  const [unlockPass, setUnlockPass] = useState('');
  const [unlocking, setUnlocking] = useState(false);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!unlockPass) return toast.error('Enter password');
    setUnlocking(true);
    const success = await unlockSuperAdmin(unlockPass);
    if (success) {
      toast.success('Super Admin Mode Unlocked!');
      setUnlockModal(false);
      setUnlockPass('');
    } else {
      toast.error('Incorrect password');
    }
    setUnlocking(false);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          background: ${isSuperAdminMode ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)' : 'var(--primary-dark)'};
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 100;
          transition: background 0.4s ease, transform 0.3s ease;
          overflow-y: auto;
          border-right: ${isSuperAdminMode ? '1px solid #312e81' : 'none'};
        }
        .sidebar__logo {
          padding: 20px 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .sidebar__logo-text {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .sidebar__logo-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-top: 2px;
        }
        .sidebar__nav {
          padding: 12px 0;
          flex: 1;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          color: rgba(255,255,255,0.65);
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.15s;
          border-left: 3px solid transparent;
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .nav-link.active {
          color: ${isSuperAdminMode ? '#fde68a' : '#fff'};
          background: ${isSuperAdminMode ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.1)'};
          border-left-color: ${isSuperAdminMode ? '#f59e0b' : 'var(--accent)'};
        }
        .nav-link__icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
        .sidebar__footer {
          padding: 16px 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .sidebar__admin {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .sidebar__avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: ${isSuperAdminMode ? 'linear-gradient(135deg, #fbbf24, #d97706)' : 'var(--accent)'};
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--primary-dark);
          flex-shrink: 0;
        }
        .sidebar__admin-name { font-size: 13px; font-weight: 600; color: #fff; }
        .sidebar__admin-role { font-size: 11px; color: rgba(255,255,255,0.4); }
        .logout-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 8px 12px;
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 6px;
          color: #fca5a5;
          font-size: 13px; font-weight: 500;
          transition: all 0.15s;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.25); color: #fff; }

        .main-content {
          flex: 1;
          margin-left: var(--sidebar-width);
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .topbar {
          height: var(--header-height);
          background: ${isSuperAdminMode ? '#0f172a' : '#fff'};
          border-bottom: 1px solid ${isSuperAdminMode ? '#1e1b4b' : 'var(--border)'};
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0; z-index: 50;
          box-shadow: ${isSuperAdminMode ? '0 4px 20px rgba(0,0,0,0.2)' : 'var(--shadow)'};
          transition: background 0.4s ease, border 0.4s ease;
        }
        .topbar__title { font-size: 18px; font-weight: 700; color: ${isSuperAdminMode ? '#fde68a' : 'var(--primary)'}; }
        .topbar__right { display: flex; align-items: center; gap: 12px; }
        .topbar__badge {
          padding: 4px 12px;
          background: #f0fdf4;
          color: #16a34a;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid #bbf7d0;
        }
        .hamburger {
          display: none;
          width: 36px; height: 36px;
          border-radius: 6px;
          background: var(--bg);
          align-items: center; justify-content: center;
          font-size: 18px;
        }
        .page-content {
          flex: 1;
          padding: 24px;
          background: ${isSuperAdminMode ? '#f8fafc' : 'var(--bg)'};
          transition: background 0.4s ease;
        }
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 99;
        }
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar-overlay.open { display: block; }
          .main-content { margin-left: 0; }
          .hamburger { display: flex; }
          .page-content { padding: 16px; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar__logo">
          <div className="sidebar__logo-text">{isSuperAdminMode ? '👑 Super Admin' : '⚕️ Novamax'}</div>
          <div className="sidebar__logo-sub">{isSuperAdminMode ? 'Premium Control Panel' : 'Admin Panel'}</div>
        </div>

        <nav className="sidebar__nav">
          {navItems
            .filter(item => {
              if (isSuperAdminMode) {
                // In Super Admin Mode: only show Dashboard, Join, Partner, Contact
                return ['/', '/join-applications', '/partner-applications', '/contacts'].includes(item.to);
              } else {
                // In Admin Mode: show everything EXCEPT Join, Partner
                return !['/join-applications', '/partner-applications'].includes(item.to);
              }
            })
            .map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-link__icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__admin">
            <div className="sidebar__avatar">
              {admin?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <div className="sidebar__admin-name">{admin?.name || 'Admin'}</div>
              <div className="sidebar__admin-role">{admin?.role || 'superadmin'}</div>
            </div>
          </div>
          {isSuperAdminMode && (
            <button className="logout-btn" onClick={lockSuperAdmin} style={{ marginBottom: 8, background: 'rgba(251,191,36,0.15)', borderColor: 'rgba(251,191,36,0.3)', color: '#fbbf24' }}>
              🔒 Lock Super Admin
            </button>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
            <span className="topbar__title">Novamax Foundation</span>
          </div>
          <div className="topbar__right">
            {admin?.role === 'superadmin' && !isSuperAdminMode && (
              <button 
                onClick={() => setUnlockModal(true)}
                style={{ padding: '6px 12px', background: 'linear-gradient(135deg, #111827, #374151)', color: '#fbbf24', border: '1px solid #fbbf24', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                🔒 Unlock Super Admin
              </button>
            )}
            <span className="topbar__badge">● Live</span>
            <span style={{ fontSize: 13, color: isSuperAdminMode ? '#9ca3af' : 'var(--text-secondary)' }}>
              {admin?.name || 'Admin'}
            </span>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Unlock Modal */}
      {unlockModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: '#1e1b4b', padding: 32, borderRadius: 16, width: '100%', maxWidth: 400, border: '1px solid #312e81', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>👑</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fde68a', margin: '0 0 8px' }}>Super Admin Access</h2>
              <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>Enter your master password to unlock premium controls.</p>
            </div>
            
            <form onSubmit={handleUnlock}>
              <div style={{ marginBottom: 20 }}>
                <input 
                  type="password" 
                  value={unlockPass}
                  onChange={e => setUnlockPass(e.target.value)}
                  placeholder="Master Password"
                  style={{ width: '100%', padding: '12px 16px', background: '#0f172a', border: '1px solid #312e81', borderRadius: 8, color: '#f3f4f6', outline: 'none', fontSize: 14 }}
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={() => { setUnlockModal(false); setUnlockPass(''); }} style={{ flex: 1, padding: 12, background: 'transparent', color: '#9ca3af', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={unlocking} style={{ flex: 2, padding: 12, background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: unlocking ? 0.7 : 1 }}>
                  {unlocking ? 'Verifying...' : 'Unlock Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
