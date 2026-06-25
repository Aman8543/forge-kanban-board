import api from './axios';

export const createCard = (listId, data) => api.post(`/lists/${listId}/cards`, data).then(r => r.data);
export const updateCard = (id, data) => api.patch(`/cards/${id}`, data).then(r => r.data);
export const deleteCard = (id) => api.delete(`/cards/${id}`);
export const moveCard = (id, listId, position) =>
  api.post(`/cards/${id}/move`, { list_id: listId, position }).then(r => r.data);
export const syncTags = (cardId, tagIds) =>
  api.post(`/cards/${cardId}/sync-tags`, { tag_ids: tagIds }).then(r => r.data);
export const syncMembers = (cardId, userIds) =>
  api.post(`/cards/${cardId}/sync-members`, { user_ids: userIds }).then(r => r.data);
