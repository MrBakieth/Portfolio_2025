import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? '/api'  // Production'da Netlify proxy kullanacak
  : 'http://localhost:5000/api'; // Development ortamı

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Message services
export const messageService = {
  getMessages: async () => {
    const response = await api.get('/messages');
    return response.data;
  },
  sendMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.put(`/messages/${id}/read`);
    return response.data;
  },
  deleteMessage: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
};

// Project services
export const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/projects/${id}/status`, { status });
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
}; 