<template>
  <v-app>
    <v-app-bar color="primary">
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title v-if="smAndUp">
        Bienvenido, {{ authStore.user?.name }}
      </v-toolbar-title>
    </v-app-bar>

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

      <v-list-item @click="logout">
        <template v-slot:prepend>
          <v-icon color="red">mdi-logout</v-icon>
        </template>
        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

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
import { useDisplay } from "vuetify";

const drawer = ref(true);
const router = useRouter();
const authStore = useAuthStore();
const { smAndUp } = useDisplay();

const menuItems = computed(() => [
  { text: "Dashboard", to: "/dashboard", icon: "mdi-view-dashboard" },
  { text: "Pacientes", to: "/pacientes", icon: "mdi-account-group" },
  { text: "Citas", to: "/citas", icon: "mdi-calendar-check" },
  { text: "Usuarios", to: "/usuarios", icon: "mdi-account" },
]);

const logout = () => {
  authStore.clearAuthData();
  router.push("/login");
};
</script>
