import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const LEVELS = ['National Level', 'State Level', 'District Level', 'City Level', 'Block Level'];
const EMPTY = { name: '', designation: '', level: 'National Level', location: '', contact: '', phone: '', status: 'active', featured: false, sortOrder: 0 };

export default function VolunteersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState('');
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterLevel) params.level = filterLevel;
      // Use admin route to get all (including inactive)
      const res = await api.get('/volunteers', { params });
      setData(res.data.data || []);
    } catch { toast.error('Failed to load volunteers'); }
    finally { setLoading(false); }
  }, [filterLevel]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setImageFile(null); setModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ name: item.name, designation: item.designation, level: item.level, location: item.location, contact: item.contact || '', phone: item.phone || '', status: item.status, featured: item.featured, sortOrder: item.sortOrder || 0 }); setImageFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);

      if (editItem) {
        await api.put(`/admin/volunteers/${editItem._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Volunteer updated');
      } else {
        await api.post('/admin/volunteers', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Volunteer added');
      }
      setModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/volunteers/${id}`);
      toast.success('Deleted');
      setDeleteConfirm(null);
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'image', label: 'Photo', render: (v) => v ? <img src={v.startsWith('http') ? v : `http://localhost:5000${v}`} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} /> : <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div> },
    { key: 'name', label: 'Name', render: (v) => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: 'designation', label: 'Designation' },
    { key: 'level', label: 'Level', render: (v) => <span style={{ fontSize: 11, padding: '2px 8px', background: '#f5f3ff', color: '#7c3aed', borderRadius: 20, fontWeight: 600 }}>{v}</span> },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    { key: '_id', label: 'Actions', render: (_, row) => (
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => openEdit(row)} style={btnStyle('#eff6ff', '#2563eb', '#bfdbfe')}>Edit</button>
        <button onClick={() => setDeleteConfirm(row._id)} style={btnStyle('#fef2f2', '#dc2626', '#fecaca')}>Delete</button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader
        title="👥 NGO Volunteers"
        subtitle={`${data.length} volunteers`}
        action={<button onClick={openAdd} style={{ padding: '9px 18px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>+ Add Volunteer</button>}
      />

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} style={inputStyle}>
          <option value="">All Levels</option>
          {LEVELS.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Table columns={columns} data={data} loading={loading} emptyMsg="No volunteers found" />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Volunteer' : 'Add Volunteer'} size="md">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormField label="Full Name *"><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="Designation *"><input value={form.designation} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="Level *">
              <select value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value }))} style={inputStyle}>
                {LEVELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </FormField>
            <FormField label="Location *"><input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="Email Contact"><input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} style={inputStyle} /></FormField>
            <FormField label="Phone"><input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={inputStyle} /></FormField>
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
            <FormField label="Photo" col="1 / -1">
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ fontSize: 13 }} />
              {editItem?.image && !imageFile && <img src={editItem.image.startsWith('http') ? editItem.image : `http://localhost:5000${editItem.image}`} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '50%', marginTop: 8, border: '2px solid #e2e8f0' }} />}
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button type="button" onClick={() => setModal(false)} style={{ padding: '9px 20px', background: '#f1f5f9', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 20px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>{saving ? 'Saving...' : editItem ? 'Update' : 'Add Volunteer'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
        <p style={{ fontSize: 14, color: '#374151', marginBottom: 20 }}>Delete this volunteer?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 7, fontSize: 13, fontWeight: 600 }}>Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700 }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' };
const btnStyle = (bg, color, border) => ({ padding: '4px 10px', background: bg, color, border: `1px solid ${border}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' });
function FormField({ label, children, col }) {
  return (
    <div style={{ gridColumn: col }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}
