import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { admin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ name: admin?.name || '', email: admin?.email || '' });
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Profile update via PUT /admin/me
      await api.put('/admin/me', profile);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setSaving(true);
    try {
      await api.put('/admin/change-password', {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });
      toast.success('Password changed successfully');
      setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    } finally { setSaving(false); }
  };

  const tabs = [
    { key: 'profile', label: '👤 Profile' },
    { key: 'password', label: '🔒 Change Password' },
    { key: 'info', label: 'ℹ️ System Info' },
  ];

  return (
    <div>
      <PageHeader title="⚙️ Settings" subtitle="Manage your admin account and preferences" />

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Sidebar Tabs */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                display: 'block', width: '100%', padding: '12px 16px', textAlign: 'left',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: activeTab === tab.key ? '#eff6ff' : '#fff',
                color: activeTab === tab.key ? '#1a3a6b' : '#374151',
                borderLeft: `3px solid ${activeTab === tab.key ? '#1a3a6b' : 'transparent'}`,
                borderBottom: '1px solid #f1f5f9',
              }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '24px' }}>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a3a6b', marginBottom: 20 }}>Profile Information</h3>

                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: 16, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #1a3a6b, #2451a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#fff' }}>
                    {admin?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>{admin?.name}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{admin?.email}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, textTransform: 'capitalize' }}>Role: {admin?.role}</div>
                  </div>
                </div>

                <form onSubmit={handleProfileSave}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} style={inputStyle} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} style={inputStyle} required />
                    </div>
                  </div>
                  <button type="submit" disabled={saving} style={{ marginTop: 20, padding: '10px 24px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a3a6b', marginBottom: 20 }}>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
                    <div>
                      <label style={labelStyle}>Current Password</label>
                      <input type="password" value={password.currentPassword} onChange={e => setPassword(p => ({ ...p, currentPassword: e.target.value }))} style={inputStyle} required placeholder="Enter current password" />
                    </div>
                    <div>
                      <label style={labelStyle}>New Password</label>
                      <input type="password" value={password.newPassword} onChange={e => setPassword(p => ({ ...p, newPassword: e.target.value }))} style={inputStyle} required placeholder="Min 6 characters" />
                    </div>
                    <div>
                      <label style={labelStyle}>Confirm New Password</label>
                      <input type="password" value={password.confirmPassword} onChange={e => setPassword(p => ({ ...p, confirmPassword: e.target.value }))} style={inputStyle} required placeholder="Repeat new password" />
                    </div>
                  </div>
                  <button type="submit" disabled={saving} style={{ marginTop: 20, padding: '10px 24px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                    {saving ? 'Updating...' : 'Change Password'}
                  </button>
                </form>
              </div>
            )}

            {/* System Info Tab */}
            {activeTab === 'info' && (
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a3a6b', marginBottom: 20 }}>System Information</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {[
                    { label: 'Application', value: 'Novamax Foundation Admin' },
                    { label: 'Version', value: '1.0.0' },
                    { label: 'Backend API', value: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' },
                    { label: 'Frontend URL', value: 'http://localhost:5173' },
                    { label: 'Admin Panel', value: 'http://localhost:3000' },
                    { label: 'Database', value: 'MongoDB Atlas' },
                    { label: 'Stack', value: 'React + Node.js + Express + MongoDB' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', padding: '12px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <span style={{ width: 160, fontSize: 13, fontWeight: 600, color: '#374151', flexShrink: 0 }}>{item.label}</span>
                      <span style={{ fontSize: 13, color: '#64748b' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' };
const labelStyle = { fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 };
