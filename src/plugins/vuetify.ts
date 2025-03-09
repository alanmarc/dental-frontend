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
    defaultTheme: "light", // Tema claro por defecto
    themes: {
      light: {
        colors: {
          primary: "#1976D2", // Azul
          secondary: "#424242", // Gris
          background: "#FFFFFF", // Fondo claro
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#2196F3", // Azul claro
          secondary: "#616161", // Gris oscuro
          background: "#121212", // Fondo oscuro
        },
      },
    },
  },
});
