import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';

const TABS = [
  { id: 'doctor', label: '👨‍⚕️ Doctors', title: 'Doctor' },
  { id: 'hospital', label: '🏥 Hospitals', title: 'Hospital' },
  { id: 'pathology', label: '🔬 Pathology', title: 'Pathology Lab' },
  { id: 'diagnostics', label: '🩺 Diagnostics', title: 'Diagnostic Center' },
];

export default function PartnerApplicationsPage() {
  const [activeTab, setActiveTab] = useState('doctor');
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewItem, setViewItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 10, applicantType: activeTab };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterStatus) params.status = filterStatus;
      
      const res = await api.get('/admin/partner-applications', { params });
      setData(res.data.data || []);
      setPagination(res.data.pagination || { total: 0, page: 1, pages: 1, limit: 10 });
    } catch { toast.error('Failed to load partner applications'); }
    finally { setLoading(false); }
  }, [debouncedSearch, filterStatus, activeTab]);

  useEffect(() => { fetchData(1); }, [fetchData]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/partner-applications/${id}`, { status });
      toast.success('Status updated');
      fetchData(pagination.page);
      if (viewItem?._id === id) setViewItem(p => ({ ...p, status }));
    } catch { toast.error('Update failed'); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/partner-applications/${id}`);
      toast.success('Deleted');
      setDeleteConfirm(null);
      setViewItem(null);
      fetchData(pagination.page);
    } catch { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'name', label: 'Name / Establishment', render: (v) => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'registrationNumber', label: 'Reg No.', render: (v) => v || '—' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    { key: 'createdAt', label: 'Applied On', render: (v) => new Date(v).toLocaleDateString('en-IN') },
    { key: '_id', label: 'Actions', render: (_, row) => (
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => setViewItem(row)} style={btnStyle('#eff6ff', '#2563eb', '#bfdbfe')}>View</button>
        <button onClick={() => setDeleteConfirm(row._id)} style={btnStyle('#fef2f2', '#dc2626', '#fecaca')}>Delete</button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader title="🤝 Partner Applications" subtitle={`${pagination.total} total ${activeTab} applications`} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, borderBottom: '2px solid #e2e8f0', overflowX: 'auto', paddingBottom: 4 }}>
        {TABS.map(tab => (
          <button 
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setPagination({ ...pagination, page: 1 }); }}
            style={{ ...tabStyle, ...(activeTab === tab.id ? activeTabStyle : {}) }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search by name or email..." style={inputStyle} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={inputStyle}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Table columns={columns} data={data} loading={loading} emptyMsg={`No ${activeTab} partnership requests found`} />
        <Pagination {...pagination} onPage={fetchData} />
      </div>

      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={`${TABS.find(t => t.id === viewItem?.applicantType)?.title || 'Partner'} Application`} size="lg">
        {viewItem && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <InfoRow label="Name / Establishment" value={viewItem.name} />
              <InfoRow label="Phone" value={viewItem.phone} />
              <InfoRow label="Email" value={viewItem.email} />
              <InfoRow label="Registration Number (Doctor/Hospital)" value={viewItem.registrationNumber} />
              <InfoRow label="Experience / Est. Year" value={viewItem.experience} />
              <InfoRow label="Status"><StatusBadge status={viewItem.status} /></InfoRow>
              <InfoRow label="Complete Address" value={viewItem.address} col="1 / -1" />
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
              <span style={{ fontSize: 12, color: '#64748b', alignSelf: 'center' }}>Update status:</span>
              {['pending', 'approved', 'rejected'].map(s => (
                <button key={s} onClick={() => updateStatus(viewItem._id, s)} style={{ padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: viewItem.status === s ? '#1a3a6b' : '#f1f5f9', color: viewItem.status === s ? '#fff' : '#374151', border: '1px solid', borderColor: viewItem.status === s ? '#1a3a6b' : '#e2e8f0', cursor: 'pointer' }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
        <p style={{ fontSize: 14, color: '#374151', marginBottom: 20 }}>Delete this application? Cannot be undone.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

const tabStyle = { padding: '10px 20px', background: 'transparent', border: 'none', borderBottom: '3px solid transparent', fontSize: 14, fontWeight: 600, color: '#64748b', cursor: 'pointer', marginBottom: '-2px', whiteSpace: 'nowrap' };
const activeTabStyle = { color: '#1a3a6b', borderBottomColor: '#1a3a6b' };
const inputStyle = { padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff', minWidth: 160 };
const btnStyle = (bg, color, border) => ({ padding: '4px 10px', background: bg, color, border: `1px solid ${border}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' });
function InfoRow({ label, value, children, col }) {
  return (
    <div style={{ gridColumn: col, background: '#f8fafc', padding: '10px 14px', borderRadius: 8, border: '1px solid #f1f5f9' }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 3 }}>{label}</label>
      {children || <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{value || '—'}</span>}
    </div>
  );
}
