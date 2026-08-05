import React from 'react';

const configs = {
  active:    { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  inactive:  { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  pending:   { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  approved:  { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  rejected:  { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  new:       { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  resolved:  { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  closed:    { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
};

export default function StatusBadge({ status }) {
  const cfg = configs[status?.toLowerCase()] || { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' };
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 700, textTransform: 'capitalize',
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
    }}>
      {status || 'unknown'}
    </span>
  );
}
