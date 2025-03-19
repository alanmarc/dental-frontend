<template>
  <v-app>
    <!-- Barra de navegación superior -->
    <v-app-bar color="primary">
      <!-- Botón para mostrar/ocultar el menú lateral -->
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title>Bienvenido, {{ authStore.user?.name }}</v-toolbar-title>
    </v-app-bar>

    <!-- Menú lateral -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          :to="item.to"
          link
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list-item @click="logout">
        <template v-slot:prepend>
          <v-icon color="red">mdi-logout</v-icon>
        </template>
        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <!-- Contenido principal -->
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
import { useAuthStore } from "./stores/authStore";

// Estado del menú lateral
const drawer = ref(true);
const router = useRouter();
const authStore = useAuthStore();

// Opciones del menú lateral
const menuItems = computed(() => [
  { text: "Dashboard", to: "/dashboard", icon: "mdi-view-dashboard" },
  { text: "Pacientes", to: "/pacientes", icon: "mdi-account-group" },
  { text: "Citas", to: "/citas", icon: "mdi-calendar-check" },
  { text: "Usuarios", to: "/usuarios", icon: "mdi-account" },
]);

// Función para cerrar sesión
const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<!-- <template>
  <v-app>
    <v-btn @click="toggleTheme" color="primary">
      {{ theme.global.current.value.dark ? "Tema Claro" : "Tema Oscuro" }}
    </v-btn>

    <v-card
      class="ma-4"
      :color="
        theme.global.current.value.dark ? 'grey darken-3' : 'grey lighten-3'
      "
    >
      <v-card-title>
        <v-icon icon="mdi-home" />
        Título de la Tarjeta
      </v-card-title>
      <v-card-text>
        Este es un ejemplo de cómo usar Vuetify con temas personalizados.
      </v-card-text>
    </v-card>
  </v-app>
</template>
<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script> -->
