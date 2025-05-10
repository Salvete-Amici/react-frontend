import axios from "axios";

// create axios instance with custom configuration where all requests to cummunicate with backend go through this instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`
});

export default api;