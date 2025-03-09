import { defineStore } from "pinia";
import type { AuthState } from "../interfaces/session";
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

        this.token = data.data.headers.authorization;
        this.user = {
          id: 1,
          name: email,
          role: "admin",
          permissions: ["ver-clientes"],
        };

        // Guardar en localStorage
        localStorage.setItem("token", this.token!);
        localStorage.setItem("user", JSON.stringify(this.user));

        // Configurar token en Axios para futuras peticiones
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      } catch (error) {
        console.error("Error en login:", error);
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;

      // Eliminar de localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Eliminar token de Axios
      delete api.defaults.headers.common["Authorization"];
    },

    loadSession() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);

        // Configurar el token en Axios al recargar la página
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },
  },
});
