<template>
  <div class="d-flex justify-center align-center" style="min-height: 100vh">
    <v-card
      class="d-flex flex-column flex-sm-row bg-highlight ma-3 pa-5"
      style="width: 90vw"
    >
      <v-img
        class="align-end text-white w-100 w-sm-50"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      >
        <v-card-title>
          <span class="text-h6 text-sm-h4 text-wrap">
            Dedícate a la salud de tus pacientes, nosotros nos ocupamos del
            resto
          </span>
        </v-card-title>
      </v-img>
      <v-card-text class="d-flex flex-column pa-sm-10 px-0 w-40">
        <span class="text-h4 text-sm-h3 text-center">Ingresa</span>
        <span class="text-center pa-2">Recibe informacion a tu correo</span>
        <v-form
          fast-fail
          @submit.prevent="login"
          class="d-flex flex-column ga-5 my-10"
        >
          <v-text-field
            color="primary"
            class="bg-background"
            v-model="email"
            label="correo"
            variant="outlined"
            hide-details
          ></v-text-field>
          <v-text-field
            color="primary"
            class="bg-background"
            v-model="password"
            label="Contraseña"
            variant="outlined"
            hide-details
          ></v-text-field>
          <v-btn
            size="large"
            color="secondary"
            class="mt-5"
            type="submit"
            rounded="lg"
            block
          >
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import router from "../../router";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const loading = ref(false);

const login = async () => {
  loading.value = true;
  try {
    console.log("vista");
    await authStore.login(email.value, password.value);
    console.log("Inicio de sesión exitoso");
    router.push("/dashboard");
  } catch (error) {
    console.error("Error al iniciar sesión", error);
  } finally {
    loading.value = false;
  }
};
</script>
