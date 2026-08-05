import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';

const CATEGORIES = ['Hospital', 'Doctor Clinic', 'Medical Store', 'Diagnosis Center', 'X-Ray / Ultrasound'];
const EMPTY = { name: '', category: 'Hospital', location: '', state: '', address: '', discount: '', facilities: '', phone: '', email: '', status: 'active', featured: false };

export default function HospitalsPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (filterCat) params.category = filterCat;
      if (filterStatus) params.status = filterStatus;
      const res = await api.get('/hospitals', { params });
      setData(res.data.data || []);
      setPagination(res.data.pagination || { total: 0, page: 1, pages: 1, limit: 10 });
    } catch { toast.error('Failed to load hospitals'); }
    finally { setLoading(false); }
  }, [search, filterCat, filterStatus]);

  useEffect(() => { fetchData(1); }, [fetchData]);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setImageFile(null); setModal(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ ...item, facilities: Array.isArray(item.facilities) ? item.facilities.join(', ') : '' });
    setImageFile(null);
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'facilities') {
          const arr = v.split(',').map(s => s.trim()).filter(Boolean);
          arr.forEach(f => fd.append('facilities', f));
        } else {
          fd.append(k, v);
        }
      });
      if (imageFile) fd.append('image', imageFile);

      if (editItem) {
        await api.put(`/hospitals/${editItem._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Hospital updated');
      } else {
        await api.post('/hospitals', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Hospital added');
      }
      setModal(false);
      fetchData(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/hospitals/${id}`);
      toast.success('Deleted');
      setDeleteConfirm(null);
      fetchData(pagination.page);
    } catch { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'image', label: 'Image', render: (v) => v ? <img src={v.startsWith('http') ? v : `http://localhost:5000${v}`} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6 }} /> : <div style={{ width: 48, height: 36, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏥</div> },
    { key: 'name', label: 'Name', render: (v) => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: 'category', label: 'Category', render: (v) => <span style={{ fontSize: 11, padding: '2px 8px', background: '#eff6ff', color: '#2563eb', borderRadius: 20, fontWeight: 600 }}>{v}</span> },
    { key: 'location', label: 'Location' },
    { key: 'discount', label: 'Discount' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    { key: '_id', label: 'Actions', render: (_, row) => (
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => openEdit(row)} style={{ padding: '4px 10px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>Edit</button>
        <button onClick={() => setDeleteConfirm(row._id)} style={{ padding: '4px 10px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>Delete</button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader
        title="🏥 Hospitals"
        subtitle={`${pagination.total} total hospitals`}
        action={<button onClick={openAdd} style={{ padding: '9px 18px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>+ Add Hospital</button>}
      />

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search hospitals..." style={inputStyle} />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={inputStyle}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={inputStyle}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Table columns={columns} data={data} loading={loading} emptyMsg="No hospitals found" />
        <Pagination {...pagination} onPage={fetchData} />
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Hospital' : 'Add Hospital'} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormField label="Hospital Name *" required><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="Category *">
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={inputStyle}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Location *"><input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="State *"><input value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="Address *" col="1 / -1"><input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="Discount"><input value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))} style={inputStyle} placeholder="e.g. Upto 40% Off" /></FormField>
            <FormField label="Phone"><input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={inputStyle} /></FormField>
            <FormField label="Facilities (comma separated)" col="1 / -1"><input value={form.facilities} onChange={e => setForm(p => ({ ...p, facilities: e.target.value }))} style={inputStyle} placeholder="ICU, Emergency 24/7, Operation Theater" /></FormField>
            <FormField label="Status">
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={inputStyle}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </FormField>
            <FormField label="Featured">
              <select value={form.featured ? 'yes' : 'no'} onChange={e => setForm(p => ({ ...p, featured: e.target.value === 'yes' }))} style={inputStyle}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </FormField>
            <FormField label="Hospital Image" col="1 / -1">
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ fontSize: 13 }} />
              {editItem?.image && !imageFile && <img src={editItem.image.startsWith('http') ? editItem.image : `http://localhost:5000${editItem.image}`} alt="" style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 6, marginTop: 8 }} />}
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button type="button" onClick={() => setModal(false)} style={{ padding: '9px 20px', background: '#f1f5f9', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#374151' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 20px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>{saving ? 'Saving...' : editItem ? 'Update' : 'Add Hospital'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
        <p style={{ fontSize: 14, color: '#374151', marginBottom: 20 }}>Are you sure you want to delete this hospital? This cannot be undone.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 7, fontSize: 13, fontWeight: 600 }}>Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700 }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' };
function FormField({ label, children, col }) {
  return (
    <div style={{ gridColumn: col }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}
