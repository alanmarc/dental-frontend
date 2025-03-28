<template>
  <MainLayout v-if="authStore.isAuthenticated" />
  <!-- Layout simple para usuarios no autenticados -->
  <v-app v-else>
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "./stores/authStore";
import MainLayout from "./components/layout/MainLayout.vue";

const authStore = useAuthStore();
</script>
