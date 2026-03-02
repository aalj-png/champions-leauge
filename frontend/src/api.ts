import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

export const teamsService = {
  getAll: () => api.get('/teams'),
  getById: (id: number) => api.get(`/teams/${id}`),
  create: (data: any) => api.post('/teams', data),
  update: (id: number, data: any) => api.put(`/teams/${id}`, data),
  delete: (id: number) => api.delete(`/teams/${id}`),
};

export const playersService = {
  getAll: () => api.get('/players'),
  getByTeam: (teamId: number) => api.get(`/players/team/${teamId}`),
  getById: (id: number) => api.get(`/players/${id}`),
  create: (data: any) => api.post('/players', data),
  update: (id: number, data: any) => api.put(`/players/${id}`, data),
  delete: (id: number) => api.delete(`/players/${id}`),
};

export const matchesService = {
  getAll: () => api.get('/matches'),
  getByPhase: (phaseId: number) => api.get(`/matches/phase/${phaseId}`),
  getById: (id: number) => api.get(`/matches/${id}`),
  create: (data: any) => api.post('/matches', data),
  update: (id: number, data: any) => api.put(`/matches/${id}`, data),
  delete: (id: number) => api.delete(`/matches/${id}`),
};

export const classementService = {
  getByPhase: (phaseId: number) => api.get(`/classement/phase/${phaseId}`),
  getAll: () => api.get('/classement'),
};

export const phasesService = {
  getAll: () => api.get('/phases'),
  getById: (id: number) => api.get(`/phases/${id}`),
  create: (data: any) => api.post('/phases', data),
  update: (id: number, data: any) => api.put(`/phases/${id}`, data),
  delete: (id: number) => api.delete(`/phases/${id}`),
};
