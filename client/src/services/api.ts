import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-logout on 401 - let components handle it
    // Only auto-logout if it's the profile/auth endpoint
    if (error.response?.status === 401 && error.config?.url?.includes('/auth/profile')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  getProfile: () =>
    api.get('/auth/profile')
};

// Problems API
export const problemsAPI = {
  getAll: (params?: { difficulty?: string; tags?: string; search?: string }) =>
    api.get('/problems', { params }),
  
  getById: (id: string) =>
    api.get(`/problems/${id}`),
  
  create: (data: any) =>
    api.post('/problems', data),
  
  update: (id: string, data: any) =>
    api.put(`/problems/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/problems/${id}`),
  
  getTestCases: (id: string) =>
    api.get(`/problems/${id}/testcases`)
};

// AI API
export const aiAPI = {
  generateProblem: (problemDescription: string) =>
    api.post('/ai/generate-problem', { problemDescription })
};

// Submissions API
export const submissionsAPI = {
  run: (data: { code: string; language: string; problemId: string }) =>
    api.post('/submissions/run', data),
  
  submit: (data: { code: string; language: string; problemId: string }) =>
    api.post('/submissions/submit', data),
  
  getUserSubmissions: (problemId?: string) =>
    api.get('/submissions', { params: { problemId } }),
  
  getById: (id: string) =>
    api.get(`/submissions/${id}`)
};

export default api;