import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7136/api',
});

export default api;
