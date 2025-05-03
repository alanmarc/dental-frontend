import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Obtiene el token directamente
  if (token) {
    config.headers.Authorization = `${token}`; // Lo añade automáticamente
  }
  return config;
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Evitar redirección si es la ruta de login
    if (
      originalRequest.url.includes("/login") &&
      error.response?.status === 401
    ) {
      return Promise.reject(error);
    }

    // Redirección normal para otros casos de 401
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.clearAuthData();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
