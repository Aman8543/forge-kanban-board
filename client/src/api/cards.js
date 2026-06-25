import api from './axios';

export const createCard = (listId, data) => api.post(`/lists/${listId}/cards`, data).then(r => r.data);
export const updateCard = (id, data) => api.patch(`/cards/${id}`, data).then(r => r.data);
export const deleteCard = (id) => api.delete(`/cards/${id}`);
export const moveCard = (id, listId, position) =>
  api.post(`/cards/${id}/move`, { list_id: listId, position }).then(r => r.data);
