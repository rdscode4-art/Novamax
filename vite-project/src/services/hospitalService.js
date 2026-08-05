import api from './api';

export const hospitalService = {
  getAll: (params) => api.get('/hospitals', { params }),
  getFilters: () => api.get('/hospitals/filters'),
  getById: (id) => api.get(`/hospitals/${id}`),

  // Admin
  create: (formData) => api.post('/hospitals', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/hospitals/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/hospitals/${id}`),
};
