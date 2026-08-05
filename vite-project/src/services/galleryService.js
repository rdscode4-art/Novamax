import api from './api';

export const galleryService = {
  // Public - used in GallerySection
  getGallery: async (params = {}) => {
    const response = await api.get('/gallery', { params });
    return response.data;
  },

  getAll: (params) => api.get('/gallery', { params }),

  // Admin
  create: (formData) => api.post('/admin/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/admin/gallery/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/admin/gallery/${id}`),
};

export default galleryService;
