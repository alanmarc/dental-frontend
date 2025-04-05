import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "./stores/authStore";
import { VueQueryPlugin } from "vue-query";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueQueryPlugin);
const authStore = useAuthStore();
authStore.loadSession();

app.mount("#app");
