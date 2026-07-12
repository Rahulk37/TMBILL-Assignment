import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  console.log("BASE URL:", config.baseURL);
  console.log("URL:", config.url);
  return config;
});

export default api;