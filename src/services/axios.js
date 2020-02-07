import axios from 'axios';

if (!process.env.REACT_APP_BACKEND_URL) {
  throw new Error('Env vars not setted propperly.');
}

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
