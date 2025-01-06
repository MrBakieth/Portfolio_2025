import axios from 'axios';

// Development'da loglama için yardımcı fonksiyon
const log = (message, data) => {
  if (import.meta.env.DEV) {
    console.log(message, data);
  }
};

// Production ve development için API URL'lerini ayarla
const API_URL = import.meta.env.MODE === 'production'
  ? 'https://hfurkanyaman.netlify.app/.netlify/functions/api'  // Production URL - full path
  : 'http://localhost:5000/api'; // Development URL

log('Current environment:', import.meta.env.MODE);
log('API URL:', API_URL);

// Axios instance configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 saniye timeout  
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    log('Making request to:', config.url);
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('Request error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }

    if (error.response?.status === 400) {
      return Promise.reject(new Error(error.response.data.message));
    }
    
    if (!error.response) {
      return Promise.reject(new Error('Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'));
    }
    
    return Promise.reject(new Error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'));
  }
);

// Message services
export const messageService = {
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/messages', messageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMessages: async () => {
    const response = await api.get('/messages');
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
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  getProjects: async () => {
    const response = await api.get('/projects');
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