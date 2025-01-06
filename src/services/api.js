import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? '/.netlify/functions/api'  // Production'da Netlify function path'i
  : 'http://localhost:5000/api'; // Development ortamı

console.log('API URL:', API_URL); // API URL'sini logla

// Axios instance with timeout and retry configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
  timeoutErrorMessage: 'Request timed out. Please try again.',
});

// Retry configuration
const MAX_RETRIES = 3;
const isRetryableError = (error) => {
  return axios.isAxiosError(error) && (
    !error.response ||
    error.response.status >= 500 ||
    error.response.status === 429 ||
    error.code === 'ECONNABORTED'
  );
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, 'with data:', config.data);
    console.log('Request headers:', config.headers);
    
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  async (error) => {
    const { config } = error;
    
    // Skip retry for specific error responses
    if (error.response?.status === 401 || error.response?.status === 403) {
      return Promise.reject(error);
    }
    
    config.retryCount = config.retryCount || 0;
    
    if (isRetryableError(error) && config.retryCount < MAX_RETRIES) {
      config.retryCount += 1;
      
      // Exponential backoff
      const backoff = Math.min(1000 * (2 ** config.retryCount), 10000);
      await new Promise(resolve => setTimeout(resolve, backoff));
      
      console.log(`Retrying request (${config.retryCount}/${MAX_RETRIES})`);
      return api(config);
    }
    
    console.error('Response error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      retryCount: config.retryCount
    });
    
    return Promise.reject(error);
  }
);

// Message services
export const messageService = {
  sendMessage: async (messageData) => {
    try {
      console.log('Sending message:', messageData);
      const response = await api.post('/messages', messageData);
      console.log('Message sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
        headers: error.response?.headers
      });
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
    try {
      console.log('Creating project:', projectData);
      const response = await api.post('/projects', projectData);
      console.log('Project created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
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
    try {
      console.log('Attempting login for user:', username);
      const response = await api.post('/auth/login', { username, password });
      console.log('Login successful');
      return response.data;
    } catch (error) {
      console.error('Login error:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
}; 