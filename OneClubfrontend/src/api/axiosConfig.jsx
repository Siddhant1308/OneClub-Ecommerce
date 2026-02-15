import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const url = config.url || "";

  // ❌ DO NOT attach token for auth APIs
  if (
    url.startsWith("/auth/login") ||
    url.startsWith("/auth/register")
  ) {
    return config;
  }

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;