// axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Utilisez le chemin du proxy dans le frontend
});

export default instance;
