import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';

const EMPTY = { icon: '🏆', badge: 'Government', title: '', desc: '', color: '#1a3a6b', bg: 'rgba(26,58,107,0.07)', sortOrder: 0 };

export default function CertificatesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/certificates');
      setData(res.data.data || []);
    } catch { toast.error('Failed to load certificates'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setFile(null); setModal(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      icon: item.icon || '🏆',
      badge: item.badge || '',
      title: item.title || '',
      desc: item.desc || '',
      color: item.color || '#1a3a6b',
      bg: item.bg || 'rgba(26,58,107,0.07)',
      sortOrder: item.sortOrder || 0,
    });
    setFile(null);
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('file', file);

      if (editItem) {
        await api.put(`/admin/certificates/${editItem._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Certificate updated');
      } else {
        await api.post('/admin/certificates', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Certificate created');
      }
      setModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/certificates/${id}`);
      toast.success('Certificate deleted');
      setDeleteConfirm(null);
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <PageHeader
        title="📜 Trust & Certifications"
        subtitle="Manage government registrations, ISO, and tax exemption certificates"
        action={<button onClick={openAdd} style={primaryBtn}>+ Add Certificate</button>}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>📭 No certificates found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {data.map(item => (
            <div key={item._id} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0', position: 'relative' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 16 }}>
                {item.icon}
              </div>
              <div style={{ display: 'inline-block', padding: '4px 10px', background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 700, borderRadius: 20, marginBottom: 12 }}>
                {item.badge}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', margin: '0 0 8px' }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>{item.desc}</p>
              
              {item.fileUrl && (
                <a href={`http://localhost:5000${item.fileUrl}`} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#2563eb', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
                  📄 View File Attached
                </a>
              )}

              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <button onClick={() => openEdit(item)} style={{ flex: 1, padding: '6px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                <button onClick={() => setDeleteConfirm(item._id)} style={{ flex: 1, padding: '6px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Certificate' : 'Add New Certificate'} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormField label="Title *">
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inputStyle} placeholder="MCA Registered" required />
            </FormField>
            
            <FormField label="Badge Text *">
              <input value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} style={inputStyle} placeholder="Government" required />
            </FormField>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Description *">
                <textarea value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} style={{ ...inputStyle, height: 60 }} placeholder="Officially registered under..." required />
              </FormField>
            </div>
            
            <FormField label="Icon Emoji *">
              <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} style={inputStyle} placeholder="🏛️" required />
            </FormField>
            
            <FormField label="Sort Order">
              <input type="number" value={form.sortOrder} onChange={e => setForm(p => ({ ...p, sortOrder: Number(e.target.value) }))} style={inputStyle} min="0" />
            </FormField>
            
            <FormField label="Icon Background Color">
              <input type="text" value={form.bg} onChange={e => setForm(p => ({ ...p, bg: e.target.value }))} style={inputStyle} placeholder="rgba(26,58,107,0.07)" />
            </FormField>
            
            <FormField label="Card Accent Color">
              <input type="text" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} style={inputStyle} placeholder="#1a3a6b" />
            </FormField>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Attach Certificate File (PDF / Image)">
                <input type="file" accept="image/*,.pdf" onChange={e => setFile(e.target.files[0])} style={{ fontSize: 13 }} />
              </FormField>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button type="button" onClick={() => setModal(false)} style={{ padding: '9px 20px', background: '#f1f5f9', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 20px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{saving ? 'Saving...' : editItem ? 'Update' : 'Add Certificate'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
        <p style={{ fontSize: 14, color: '#374151', marginBottom: 20 }}>Are you sure you want to delete this certificate?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' };
const primaryBtn = { padding: '9px 18px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none' };
function FormField({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}
