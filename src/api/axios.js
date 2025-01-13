import axios from 'axios';

const axiosBE = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Load base URL from .env
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosBE;
