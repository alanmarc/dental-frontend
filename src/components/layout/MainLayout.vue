<template>
  <v-app>
    <!-- Barra de navegación superior -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Bienvenido, {{ authStore.user?.name }}</v-app-bar-title>
    </v-app-bar>

    <!-- Menú lateral -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">Menú</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          :to="item.to"
          link
        >
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <v-btn block color="red" dark @click="logout">
        <v-icon left>mdi-logout</v-icon> Cerrar sesión
      </v-btn>
    </v-navigation-drawer>

    <!-- Contenido dinámico de la aplicación -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

// Estado del drawer (menú lateral)
const drawer = ref(true);
const router = useRouter();
const authStore = useAuthStore();

// Items del menú
const menuItems = computed(() => [
  { text: "Dashboard", to: "/dashboard", icon: "mdi-view-dashboard" },
  { text: "Pacientes", to: "/pacientes", icon: "mdi-account-group" },
  { text: "Citas", to: "/citas", icon: "mdi-calendar-check" },
  { text: "Usuarios", to: "/usuarios", icon: "mdi-account" },
]);

// Cerrar sesión
const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
