import api from './api';

export const volunteerService = {
  // Get all volunteers with filters
  getVolunteers: async (params = {}) => {
    const response = await api.get('/volunteers', { params });
    return response.data;
  },

  // Get single volunteer by ID
  getVolunteerById: async (id) => {
    const response = await api.get(`/volunteers/${id}`);
    return response.data;
  },

  // Search volunteers
  searchVolunteers: async (query) => {
    const response = await api.get('/volunteers/search', {
      params: { q: query }
    });
    return response.data;
  }
};

export default volunteerService;
