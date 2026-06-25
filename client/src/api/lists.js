import api from './axios';

export const createList = (boardId, data) => api.post(`/boards/${boardId}/lists`, data).then(r => r.data);
export const updateList = (id, data) => api.patch(`/lists/${id}`, data).then(r => r.data);
export const deleteList = (id) => api.delete(`/lists/${id}`);
