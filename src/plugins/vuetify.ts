import "vuetify/styles/main.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#092A33", //Azul Oscuro
          secondary: "#15414D", //Zul marino
          background: "#f6fdfc", //blanco
          highlight: "#D3E2E6", //Azul claro fondo
          success: "#2ECC71", //Verde OK
          error: "#E63946", //Rojo error
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#74C1C6", // Azul claro brillante para resaltar
          secondary: "#2C5E69", // Azul petróleo para profundidad
          background: "#0A1E23", // Azul oscuro-negruzco de fondo
          success: "#23D18B", // Verde vibrante para confirmar
          error: "#F25F5C", // Rojo menos brillante, más suave
          warning: "#E2A03F", // Amarillo quemado para advertencias
        },
      },
    },
  },
});
