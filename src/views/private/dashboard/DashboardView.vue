<template>
  <h1>Dashboard</h1>
  <v-btn color="primary" text="Salir" @click="logout()" />
</template>
<script setup lang="ts">
import router from "../../../router";
import { useAuthStore } from "../../../stores/authStore";

const authStore = useAuthStore();

function logout(): void {
  authStore.clearAuthData();
  router.push("/login");
}
</script>
