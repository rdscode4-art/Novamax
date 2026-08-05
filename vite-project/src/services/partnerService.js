import api from './api';

export const partnerService = {
  submit: (data) => api.post('/partner-applications', data),

  // Admin
  getAll: (params) => api.get('/admin/partner-applications', { params }),
  updateStatus: (id, status) => api.patch(`/admin/partner-applications/${id}`, { status }),
  delete: (id) => api.delete(`/admin/partner-applications/${id}`),
};
