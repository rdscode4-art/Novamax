import api from './api';

export const contactService = {
  submit: (data) => api.post('/contact', data),

  // Admin
  getAll: (params) => api.get('/admin/contacts', { params }),
  updateStatus: (id, status) => api.patch(`/admin/contacts/${id}`, { status }),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
};
