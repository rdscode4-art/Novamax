import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';

const EMPTY = { serialNumber: '', title: '', description: '', icon: '💊', footerText: '', color: '#1a3a6b', status: 'active', featured: false, sortOrder: 0 };

const ICON_OPTIONS = ['💊', '🧘‍♀️', '🤖', '🩺', '🚐', '📋', '🏥', '🤱', '🏠', '💉', '🔬', '🧬', '❤️', '🌍', '📱', '🎯'];
const COLOR_OPTIONS = [
  { label: 'Navy Blue', value: '#1a3a6b' },
  { label: 'Green', value: '#057a55' },
  { label: 'Orange', value: '#ea580c' },
  { label: 'Purple', value: '#7c3aed' },
  { label: 'Teal', value: '#0891b2' },
  { label: 'Amber', value: '#d97706' },
  { label: 'Red', value: '#e11d48' },
  { label: 'Forest Green', value: '#2f7a35' },
  { label: 'Sky Blue', value: '#0ea5e9' },
];

export default function ProjectsPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 20 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (filterStatus) params.status = filterStatus;
      const res = await api.get('/admin/projects', { params });
      setData(res.data.data || []);
      setPagination(res.data.pagination || { total: 0, page: 1, pages: 1, limit: 20 });
    } catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  }, [filterStatus]);

  useEffect(() => { fetchData(1); }, [fetchData]);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setModal(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      serialNumber: item.serialNumber,
      title: item.title,
      description: item.description,
      icon: item.icon,
      footerText: item.footerText,
      color: item.color,
      status: item.status,
      featured: item.featured,
      sortOrder: item.sortOrder || 0,
    });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await api.put(`/admin/projects/${editItem._id}`, form);
        toast.success('Project updated');
      } else {
        await api.post('/admin/projects', form);
        toast.success('Project created');
      }
      setModal(false);
      fetchData(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/projects/${id}`);
      toast.success('Project deleted');
      setDeleteConfirm(null);
      fetchData(pagination.page);
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <PageHeader
        title="🚀 Upcoming Projects"
        subtitle={`${pagination.total} total projects`}
        action={<button onClick={openAdd} style={{ padding: '9px 18px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>+ Add Project</button>}
      />

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={inputStyle}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>📭 No projects found. Add some!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {data.map(item => (
            <div key={item._id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', position: 'relative' }}>
              {/* Color top bar */}
              <div style={{ height: 5, background: item.color }} />
              
              {/* Badge & Status */}
              <div style={{ position: 'absolute', top: 10, right: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
                {item.featured && <span style={{ background: '#f59e0b', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>⭐ Featured</span>}
                <StatusBadge status={item.status} />
              </div>

              <div style={{ padding: '18px 16px 14px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {/* Icon circle */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `${item.color}15`, border: `2px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: item.color, padding: '1px 7px', borderRadius: 6 }}>{item.serialNumber}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, margin: '4px 0 8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                  <div style={{ fontSize: 11, color: item.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>✓</span> {item.footerText}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 6, borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => openEdit(item)} style={{ flex: 1, padding: '6px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✏️ Edit</button>
                <button onClick={() => setDeleteConfirm(item._id)} style={{ flex: 1, padding: '6px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 16, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Pagination {...pagination} onPage={fetchData} />
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Project' : 'Add New Project'}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 14 }}>
              <FormField label="Serial No *">
                <input value={form.serialNumber} onChange={e => setForm(p => ({ ...p, serialNumber: e.target.value }))} style={inputStyle} placeholder="01" required />
              </FormField>
              <FormField label="Title *">
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inputStyle} placeholder="Project Title" required />
              </FormField>
            </div>
            
            <FormField label="Description *">
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ ...inputStyle, height: 70, resize: 'vertical' }} placeholder="Brief description..." required />
            </FormField>

            <FormField label="Footer Text *">
              <input value={form.footerText} onChange={e => setForm(p => ({ ...p, footerText: e.target.value }))} style={inputStyle} placeholder="e.g. Affordable Medicines • Better Health" required />
            </FormField>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormField label="Icon">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ICON_OPTIONS.map(ic => (
                    <button
                      key={ic} type="button"
                      onClick={() => setForm(p => ({ ...p, icon: ic }))}
                      style={{
                        width: 36, height: 36, fontSize: 18,
                        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: form.icon === ic ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                        background: form.icon === ic ? '#eff6ff' : '#f8fafc',
                        cursor: 'pointer',
                      }}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField label="Theme Color">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c.value} type="button"
                      onClick={() => setForm(p => ({ ...p, color: c.value }))}
                      title={c.label}
                      style={{
                        width: 32, height: 32,
                        borderRadius: '50%', background: c.value,
                        border: form.color === c.value ? '3px solid #1e293b' : '2px solid #e2e8f0',
                        cursor: 'pointer', boxShadow: form.color === c.value ? '0 0 0 2px #fff, 0 0 0 4px ' + c.value : 'none',
                      }}
                    />
                  ))}
                </div>
                <input type="text" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} style={{ ...inputStyle, marginTop: 8, fontFamily: 'monospace', fontSize: 12 }} placeholder="#hex" />
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
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
              <FormField label="Sort Order">
                <input type="number" value={form.sortOrder} onChange={e => setForm(p => ({ ...p, sortOrder: Number(e.target.value) }))} style={inputStyle} min="0" />
              </FormField>
            </div>

            {/* Preview */}
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Preview</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `${form.color}15`, border: `2px solid ${form.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>
                  {form.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: form.color, padding: '1px 6px', borderRadius: 5 }}>{form.serialNumber || '01'}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: form.color }}>{form.title || 'Project Title'}</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0 0' }}>{form.description || 'Description...'}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button type="button" onClick={() => setModal(false)} style={{ padding: '9px 20px', background: '#f1f5f9', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 20px', background: '#1a3a6b', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{saving ? 'Saving...' : editItem ? 'Update' : 'Add Project'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
        <p style={{ fontSize: 14, color: '#374151', marginBottom: 20 }}>Are you sure you want to delete this project?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
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
