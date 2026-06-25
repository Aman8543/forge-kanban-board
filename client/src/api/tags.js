import api from './axios';

export const fetchTags = () => api.get('/tags').then(r => r.data);
export const createTag = (data) => api.post('/tags', data).then(r => r.data);
export const updateTag = (id, data) => api.patch(`/tags/${id}`, data).then(r => r.data);
export const deleteTag = (id) => api.delete(`/tags/${id}`);
