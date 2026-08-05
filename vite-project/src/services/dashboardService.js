import api from './api';

export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  }
};

export default dashboardService;
