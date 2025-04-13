import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import type { App } from "vue";

// Configuración global del calendario
const calendarConfig = {
  locales: {
    es: {
      firstDayOfWeek: 1, // Lunes como primer día
      masks: {
        title: "MMMM YYYY", // Formato del título
        weekdays: "W", // Formato días de semana
        navMonths: "MMM", // Formato navegación
        input: ["L", "YYYY-MM-DD"], // Formatos de entrada
        dayPopover: "WWW, MMM D, YYYY", // Formato tooltip
      },
    },
  },
  theme: {
    light: {
      backgrounds: {
        default: "#B0DAF1",
        inverse: "1976D2",
      },
      colors: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
      },
    },
  },
};

export const installCalendar = (app: App) => {
  app.use(setupCalendar, calendarConfig);
  app.component("VCalendar", Calendar);
  app.component("VDatePicker", DatePicker);
};
