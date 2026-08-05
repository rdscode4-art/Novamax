import api from './api';

export const joinService = {
  submit: (formData) => api.post('/join-applications', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // Admin
  getAll: (params) => api.get('/admin/join-applications', { params }),
  updateStatus: (id, status) => api.patch(`/admin/join-applications/${id}`, { status }),
  delete: (id) => api.delete(`/admin/join-applications/${id}`),
};
