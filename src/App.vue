<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
theme.global.name.value = "light"; // Tema claro por defecto
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
