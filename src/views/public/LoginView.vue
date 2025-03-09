<template>
  <div>
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Correo electrónico" />
      <input type="password" v-model="password" placeholder="Contraseña" />
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = () => {
  // Lógica de autenticación
  router.push("/dashboard"); // Redirigir al dashboard después del login
};
</script>
