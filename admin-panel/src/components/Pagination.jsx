import React from 'react';

export default function Pagination({ page, pages, total, limit, onPage }) {
  if (pages <= 1) return null;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: 13, color: '#64748b' }}>
        Showing {start}–{end} of {total}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        <PgBtn onClick={() => onPage(page - 1)} disabled={page <= 1}>‹ Prev</PgBtn>
        {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
          const p = i + 1;
          return (
            <PgBtn key={p} onClick={() => onPage(p)} active={p === page}>{p}</PgBtn>
          );
        })}
        <PgBtn onClick={() => onPage(page + 1)} disabled={page >= pages}>Next ›</PgBtn>
      </div>
    </div>
  );
}

function PgBtn({ children, onClick, disabled, active }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
      border: '1px solid',
      borderColor: active ? '#1a3a6b' : '#e2e8f0',
      background: active ? '#1a3a6b' : '#fff',
      color: active ? '#fff' : disabled ? '#cbd5e1' : '#374151',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.15s',
    }}>
      {children}
    </button>
  );
}
