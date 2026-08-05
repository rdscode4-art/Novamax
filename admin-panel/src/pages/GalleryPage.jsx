import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';

const CATEGORIES = ['Medical Camps', 'Free Medicine Distribution', 'Hospital Activities', 'Health Awareness', 'NGO Events', 'Doctor Meet', 'Other'];
const EMPTY = { title: '', category: 'Other', description: '', status: 'active', featured: false };

export default function GalleryPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 12 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterCat, setFilterCat] = useState('');

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (filterCat) params.category = filterCat;
      const res = await api.get('/gallery', { params });
      setData(res.data.data || []);
      setPagination(res.data.pagination || { total: 0, page: 1, pages: 1, limit: 12 });
    } catch { toast.error('Failed to load gallery'); }
    finally { setLoading(false); }
  }, [filterCat]);

  useEffect(() => { fetchData(1); }, [fetchData]);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setImageFile(null); setModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ title: item.title, category: item.category, description: item.description || '', status: item.status, featured: item.featured }); setImageFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editItem && !imageFile) { toast.error('Image is required'); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);

      if (editItem) {
        await api.put(`/admin/gallery/${editItem._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Updated');
      } else {
        await api.post('/admin/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Gallery item added');
      }
      setModal(false);
      fetchData(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/gallery/${id}`);
      toast.success('Deleted');
      setDeleteConfirm(null);
      fetchData(pagination.page);
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <PageHeader
        title="🖼️ Gallery"
        subtitle={`${pagination.total} total items`}
        action={<button onClick={openAdd} style={{ padding: '9px 18px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>+ Add Item</button>}
      />

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={inputStyle}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>📭 No gallery items. Add some!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {data.map(item => {
            const imgSrc = item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`;
            return (
              <div key={item._id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={imgSrc} alt={item.title} style={{ width: '100%', height: 150, objectFit: 'cover', display: 'block' }} />
                  {item.featured && <span style={{ position: 'absolute', top: 8, left: 8, background: '#f59e0b', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>⭐ Featured</span>}
                  <span style={{ position: 'absolute', top: 8, right: 8 }}><StatusBadge status={item.status} /></span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>{item.category}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => openEdit(item)} style={{ flex: 1, padding: '5px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setDeleteConfirm(item._id)} style={{ flex: 1, padding: '5px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 16, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Pagination {...pagination} onPage={fetchData} />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Gallery Item' : 'Add Gallery Item'}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 14 }}>
            <FormField label="Title *"><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inputStyle} required /></FormField>
            <FormField label="Category">
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={inputStyle}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Description"><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ ...inputStyle, height: 80, resize: 'vertical' }} /></FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
            </div>
            <FormField label={editItem ? 'Replace Image (optional)' : 'Image *'}>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ fontSize: 13 }} />
              {editItem?.image && !imageFile && <img src={editItem.image.startsWith('http') ? editItem.image : `http://localhost:5000${editItem.image}`} alt="" style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 6, marginTop: 8 }} />}
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button type="button" onClick={() => setModal(false)} style={{ padding: '9px 20px', background: '#f1f5f9', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 20px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>{saving ? 'Saving...' : editItem ? 'Update' : 'Add Item'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
        <p style={{ fontSize: 14, color: '#374151', marginBottom: 20 }}>Delete this gallery item?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 7, fontSize: 13, fontWeight: 600 }}>Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700 }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' };
function FormField({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}
