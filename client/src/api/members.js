import api from './axios';

export const fetchMembers = (cardId) => api.get(`/cards/${cardId}/members`).then(r => r.data);
export const attachMember = (cardId, userId) =>
  api.post(`/cards/${cardId}/members`, { user_id: userId }).then(r => r.data);
export const detachMember = (cardId, userId) =>
  api.delete(`/cards/${cardId}/members/${userId}`).then(r => r.data);
