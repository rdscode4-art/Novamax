import api from './api';

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/admin/login', { email, password });
    if (res.data.data?.token) {
      localStorage.setItem('admin_token', res.data.data.token);
    }
    return res.data;
  },
  getMe: () => api.get('/admin/me'),
  logout: async () => {
    await api.post('/admin/logout');
    localStorage.removeItem('admin_token');
  },
  changePassword: (data) => api.put('/admin/change-password', data),
};
