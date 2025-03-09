import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
