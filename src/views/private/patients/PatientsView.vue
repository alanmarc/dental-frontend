<template>
  <h1>Pacientes</h1>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../../api";

const isMounted = ref(false);

onMounted(async () => {
  try {
    isMounted.value = false;
    const response = await api.get("/patients");
    console.log(response);
    isMounted.value = true;
  } catch (error) {
    console.log(error);
  } finally {
  }
});
</script>
