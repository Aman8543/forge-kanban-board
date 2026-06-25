import api from './axios';

export const fetchBoards = () => api.get('/boards').then(r => r.data);
export const fetchBoard = (id) => api.get(`/boards/${id}`).then(r => r.data);
export const createBoard = (data) => api.post('/boards', data).then(r => r.data);
export const updateBoard = (id, data) => api.patch(`/boards/${id}`, data).then(r => r.data);
export const deleteBoard = (id) => api.delete(`/boards/${id}`);
