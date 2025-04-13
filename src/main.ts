import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "./stores/authStore";
import { VueQueryPlugin } from "vue-query";
import { installCalendar } from "./plugins/calendar";
import "v-calendar/dist/style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueQueryPlugin);
installCalendar(app);
const authStore = useAuthStore();
authStore.loadSession();

app.mount("#app");
