<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <v-app>
    <!-- Botón para cambiar el tema -->
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
import HelloWorld from "./components/HelloWorld.vue";
// Usar el tema de Vuetify
const theme = useTheme();

// Función para cambiar entre tema claro y oscuro
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
