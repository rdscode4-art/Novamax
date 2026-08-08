import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function PortalDashboard() {
  const { portalUser } = useAuth();
  const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  return (
    <div>
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .dashboard-card {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
          border: 1px solid #e2e8f0;
        }
        .card-header { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
        .info-label { color: #64748b; font-weight: 500; }
        .info-value { color: #0f172a; font-weight: 600; text-align: right; }
        .role-badge { display: inline-block; padding: 4px 10px; background: #dbeafe; color: #1d4ed8; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        
        .doc-list { display: flex; flex-direction: column; gap: 16px; }
        .doc-item { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
        .doc-info { display: flex; align-items: center; gap: 12px; }
        .doc-icon { font-size: 24px; }
        .doc-name { font-weight: 600; color: #1e293b; font-size: 14px; }
        .doc-sub { font-size: 12px; color: #64748b; }
        .btn-download { background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.2s; }
        .btn-download:hover { background: #2563eb; }
      `}</style>
      
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>My Dashboard</h1>
        <p style={{ color: '#64748b' }}>Manage your profile and access your official documents.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">Profile Details</div>
          <div className="info-row">
            <span className="info-label">Full Name</span>
            <span className="info-value">{portalUser?.fullName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{portalUser?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Role</span>
            <span className="info-value"><span className="role-badge">{portalUser?.role}</span></span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="info-value" style={{ color: '#16a34a' }}>Approved</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">My Documents</div>
          <div className="doc-list">
            {portalUser?.idCardUrl ? (
              <div className="doc-item">
                <div className="doc-info">
                  <div className="doc-icon">🪪</div>
                  <div>
                    <div className="doc-name">Official ID Card</div>
                    <div className="doc-sub">Issued upon approval</div>
                  </div>
                </div>
                <a href={`${apiBase}${portalUser.idCardUrl}`} target="_blank" rel="noreferrer" className="btn-download">Download</a>
              </div>
            ) : (
              <div className="doc-item" style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: 13, justifyContent: 'center' }}>
                No ID Card uploaded yet.
              </div>
            )}
            
            {portalUser?.joiningLetterUrl ? (
              <div className="doc-item">
                <div className="doc-info">
                  <div className="doc-icon">📄</div>
                  <div>
                    <div className="doc-name">Joining Letter</div>
                    <div className="doc-sub">Welcome document</div>
                  </div>
                </div>
                <a href={`${apiBase}${portalUser.joiningLetterUrl}`} target="_blank" rel="noreferrer" className="btn-download">Download</a>
              </div>
            ) : (
              <div className="doc-item" style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: 13, justifyContent: 'center' }}>
                No Joining Letter uploaded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
