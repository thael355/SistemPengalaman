import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function login(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function getDashboardStats() {
  const { data } = await api.get('/dashboard/stats');
  return data;
}

export async function getExperts(params) {
  const { data } = await api.get('/experts', { params });
  return data;
}

export async function getExpertDetail(id) {
  const { data } = await api.get(`/experts/${id}`);
  return data;
}

export async function getExperiences(params) {
  const { data } = await api.get('/experiences', { params });
  return data;
}

export async function uploadExperience(formData) {
  const { data } = await api.post('/experiences', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export default api;
