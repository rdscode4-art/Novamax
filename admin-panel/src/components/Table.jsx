import React from 'react';

export default function Table({ columns, data, loading, emptyMsg = 'No data found' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <style>{`
        .admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .admin-table th {
          padding: 10px 14px; text-align: left;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.5px; color: #64748b;
          background: #f8fafc; border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .admin-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b; vertical-align: middle;
        }
        .admin-table tr:hover td { background: #f8fafc; }
        .admin-table tr:last-child td { border-bottom: none; }
        .table-empty { padding: 48px; text-align: center; color: #94a3b8; font-size: 14px; }
        .table-loading { padding: 48px; text-align: center; }
        .spin { width: 28px; height: 28px; border: 3px solid #e2e8f0; border-top-color: #1a3a6b; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto 8px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length}>
              <div className="table-loading">
                <div className="spin"></div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Loading...</div>
              </div>
            </td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length}>
              <div className="table-empty">📭 {emptyMsg}</div>
            </td></tr>
          ) : (
            data.map((row, i) => (
              <tr key={row._id || i}>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
