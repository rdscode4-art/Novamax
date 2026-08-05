import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import api from '../services/api';

// Sample data for charts to make it look attractive
const growthData = [
  { name: 'Jan', visitors: 1200, joins: 400 },
  { name: 'Feb', visitors: 1900, joins: 600 },
  { name: 'Mar', visitors: 1500, joins: 500 },
  { name: 'Apr', visitors: 2200, joins: 800 },
  { name: 'May', visitors: 2800, joins: 1000 },
  { name: 'Jun', visitors: 3500, joins: 1200 },
  { name: 'Jul', visitors: 4200, joins: 1500 },
];

const categoryData = [
  { name: 'Hospitals', value: 12 },
  { name: 'Volunteers', value: 35 },
  { name: 'Partners', value: 8 },
  { name: 'Projects', value: 9 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const s = stats?.stats || {};

  const cards = [
    { icon: '🏥', label: 'Total Hospitals',       value: s.totalHospitals ?? 0,     color: '#1a3a6b', bg: '#eff6ff', link: '/hospitals' },
    { icon: '🚀', label: 'Upcoming Projects',     value: s.totalProjects ?? 0,      color: '#ea580c', bg: '#fff7ed', link: '/projects' },
    { icon: '📜', label: 'Certificates',          value: s.totalCertificates ?? 0,  color: '#d97706', bg: '#fef3c7', link: '/certificates' },
    { icon: '🤝', label: 'Partner Applications',  value: s.totalPartnerApps ?? 0,   color: '#0891b2', bg: '#ecfeff', link: '/partner-applications' },
    { icon: '📋', label: 'Join Applications',     value: s.totalJoinApps ?? 0,      color: '#059669', bg: '#ecfdf5', link: '/join-applications' },
    { icon: '🖼️', label: 'Gallery Items',         value: s.totalGallery ?? 0,       color: '#2563eb', bg: '#eff6ff', link: '/gallery' },
    { icon: '📬', label: 'Contact Messages',      value: s.totalContacts ?? 0,      color: '#7c3aed', bg: '#f5f3ff', link: '/contacts' },
    { icon: '⏳', label: 'Pending Partners',      value: s.pendingPartnerApps ?? 0, color: '#dc2626', bg: '#fef2f2', link: '/partner-applications' },
  ];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 50, height: 50, border: '4px solid #f1f5f9', borderTopColor: '#1a3a6b', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}></div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>Preparing your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Track your foundation's growth, activities, and recent applications."
      />

      {/* Top Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
        {cards.map(card => (
          <div key={card.label} onClick={() => navigate(card.link)} style={{ cursor: 'pointer' }}>
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }} className="dash-charts-grid">
        
        {/* Main Area Chart */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', margin: '0 0 4px' }}>Audience & Growth</h3>
              <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Monthly visitors and application trends</p>
            </div>
            <select style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, fontWeight: 600, color: '#334155', outline: 'none' }}>
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={growthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a3a6b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1a3a6b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorJoins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 600, fontSize: 13 }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#1a3a6b" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="joins" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorJoins)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Bar Chart */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', margin: '0 0 4px' }}>Registrations</h3>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Breakdown by category</p>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Lists */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="dash-lists-grid">
        
        {/* Recent Contacts */}
        <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ background: '#e0e7ff', width: 36, height: 36, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📬</span>
              Recent Messages
            </h3>
            <button onClick={() => navigate('/contacts')} style={{ fontSize: 13, color: '#4f46e5', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 8, transition: 'all 0.2s' }} onMouseOver={e => {e.target.style.background = '#e0e7ff'; e.target.style.transform = 'translateX(2px)'}} onMouseOut={e => {e.target.style.background = 'none'; e.target.style.transform = 'none'}}>View All &rarr;</button>
          </div>
          {(stats?.recentContacts || []).length === 0 ? (
            <div style={{ padding: '60px 40px', textAlign: 'center', color: '#94a3b8', fontSize: 15, fontWeight: 500 }}>No messages yet</div>
          ) : (
            (stats?.recentContacts || []).map((c, i) => (
              <div key={c._id} style={{ padding: '20px 28px', borderBottom: i === (stats.recentContacts.length - 1) ? 'none' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, transition: 'background 0.25s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#334155', marginBottom: 6 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.4 }}>{c.subject || 'No subject'}</div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))
          )}
        </div>

        {/* Recent Join Applications */}
        <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ background: '#dcfce7', width: 36, height: 36, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📋</span>
              Recent Join Apps
            </h3>
            <button onClick={() => navigate('/join-applications')} style={{ fontSize: 13, color: '#16a34a', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 8, transition: 'all 0.2s' }} onMouseOver={e => {e.target.style.background = '#dcfce7'; e.target.style.transform = 'translateX(2px)'}} onMouseOut={e => {e.target.style.background = 'none'; e.target.style.transform = 'none'}}>View All &rarr;</button>
          </div>
          {(stats?.recentApplications || []).length === 0 ? (
            <div style={{ padding: '60px 40px', textAlign: 'center', color: '#94a3b8', fontSize: 15, fontWeight: 500 }}>No applications yet</div>
          ) : (
            (stats?.recentApplications || []).map((a, i) => (
              <div key={a._id} style={{ padding: '20px 28px', borderBottom: i === (stats.recentApplications.length - 1) ? 'none' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, transition: 'background 0.25s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#334155', marginBottom: 6 }}>{a.name}</div>
                  <div style={{ fontSize: 13, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#f1f5f9', borderRadius: 14, fontWeight: 600 }}>
                    <span style={{ fontSize: 12 }}>📞</span> {a.phone}
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @media(max-width: 1024px) {
          .dash-charts-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width: 768px) {
          .dash-lists-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
