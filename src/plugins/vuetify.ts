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
          primary: "#092A33", // Azul oscuro profundo
          secondary: "#15414D", // Azul marino
          accent: "#5A81FA", // Azul eléctrico / rey
          background: "#F8F9FD", // Blanco con un toque azulado para mejor integración
          highlight: "#B0DAF1", // Azul claro más vibrante
          gray: "#696E82", // → Gris azulado
          success: "#2ECC71", // Verde OK
          error: "#E63946", // Rojo error
          bgError: "#fdeaec",
          warning: "#FFA500", // Naranja para advertencias (opcional)
          info: "#17A2B8", // Azul turquesa para información (opcional)
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
