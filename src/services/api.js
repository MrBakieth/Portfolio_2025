import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? '/.netlify/functions/api'  // Production'da Netlify function path'i
  : 'http://localhost:5000/api'; // Development ortamı

console.log('API URL:', API_URL); // API URL'sini logla

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
    console.log('Making request to:', config.url, 'with data:', config.data);
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (username, password) => {
    try {
      console.log('Attempting login for user:', username);
      const response = await api.post('/auth/login', { username, password });
      console.log('Login successful');
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
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
    try {
      console.log('Sending message:', messageData);
      const response = await api.post('/messages', messageData);
      console.log('Message sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
      throw error;
    }
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
    try {
      console.log('Creating project:', projectData);
      const response = await api.post('/projects', projectData);
      console.log('Project created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error.response?.data || error.message);
      throw error;
    }
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