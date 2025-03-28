import { defineStore } from "pinia";
import type { AuthState, User } from "../interfaces/session";
import api from "../api";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role || "",
    userPermissions: (state) => state.user?.permissions || [],
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const { data } = await api.post("/login", { email, password });

        this.setAuthData({
          token: data.data.headers.authorization,
          user: {
            id: 122,
            name: "Alan Marcos",
            email: "admin@example.com",
            role: "super_admin",
            permissions: ["view_patients"],
          },
        });

        return data;
      } catch (error) {
        this.clearAuthData();
        throw error;
      }
    },

    setAuthData(payload: { token: string; user: User }) {
      this.token = payload.token;
      this.user = payload.user;

      // Persistir en localStorage
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));

      // El interceptor de axios se encargará del header
    },

    clearAuthData() {
      this.token = null;
      this.user = null;

      // Limpiar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // El interceptor de axios manejará las peticiones sin token
    },

    loadSession() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        // No necesitamos configurar Axios aquí, el interceptor lo maneja
      }
    },

    async refreshToken() {
      try {
        const { data } = await api.post("/auth/refresh");
        this.token = data.token;
        localStorage.setItem("token", data.token);
        return data.token;
      } catch (error) {
        this.clearAuthData();
        throw error;
      }
    },
  },
});
