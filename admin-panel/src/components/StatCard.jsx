import React from 'react';

export default function StatCard({ icon, label, value, color = '#1a3a6b', bg = '#eff6ff', trend }) {
  const isDark = color === '#fff' || color === 'white';
  return (
    <div className="stat-card" style={{
      background: '#fff',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
    }}>
      <style>{`
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);
          border-color: transparent;
        }
        .stat-card:hover::before {
          opacity: 1;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .stat-icon-wrap {
          transition: transform 0.3s;
        }
        .stat-card:hover .stat-icon-wrap {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
      
      {/* Background Accent */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, background: bg, borderRadius: '50%', filter: 'blur(30px)', opacity: 0.6, pointerEvents: 'none' }}></div>

      <div className="stat-icon-wrap" style={{
        width: 60, height: 60, borderRadius: '16px',
        background: bg, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 28, flexShrink: 0,
        boxShadow: `inset 0 -3px 0 0 rgba(0,0,0,0.05)`,
        zIndex: 1,
      }}>
        {icon}
      </div>
      
      <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 6, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1, fontFamily: '"Poppins", sans-serif' }}>{value}</div>
        {trend && (
          <div style={{ fontSize: 12, color: '#10b981', marginTop: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ background: '#d1fae5', padding: '2px 6px', borderRadius: 4 }}>↑ {trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
