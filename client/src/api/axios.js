import axios from 'axios';

const api = axios.create({ baseURL: "https://forge-kanban-board-production.up.railway.app/api" });

export default api;
