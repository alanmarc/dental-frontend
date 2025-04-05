<template>
  <section class="w-100">
    <div class="d-flex justify-space-between ga-2">
      <h1>Pacientes</h1>
      <div class="d-flex ga-2">
        <v-btn
          prepend-icon="mdi-plus-thick"
          color="secondary"
          size="small"
          text="Crear"
          class="rounded-lg"
          @click="showDialog = true"
        />
        <v-btn
          prepend-icon="mdi-application-export"
          size="small"
          color="info"
          text="Exportar"
          class="rounded-lg"
        />
      </div>
    </div>
    <v-card class="d-flex flex-column my-7 pa-5">
      <v-row class="gap-2">
        <v-col cols="12" sm="6" md="4" lg="3" class="d-flex align-center">
          <v-autocomplete
            density="compact"
            label="Buscar paciente"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="d-flex align-center">
          <v-select
            density="compact"
            label="Sucursal"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="d-flex align-center">
          <v-text-field
            density="compact"
            label="Correo"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex align-start justify-end ga-2"
        >
          <v-btn
            class="rounded-lg"
            prepend-icon="mdi-magnify"
            color="primary"
            text="Buscar"
          />
          <v-btn
            class="rounded-lg"
            prepend-icon="mdi-dots-horizontal"
            color="primary"
            text="Más"
          />
        </v-col>
      </v-row>
    </v-card>
  </section>
  <section>
    <v-data-table-server
      v-if="patients && patients.data"
      class="custom-table rounded-lg"
      :headers="headers"
      :items="patients.data"
      :items-length="patients.meta.pagination.total"
      :loading="!isMounted"
    ></v-data-table-server>
  </section>
  <CreatePatientDialog
    v-model="showDialog"
    title="Agregar Paciente"
    @confirm="savePatient"
    @close-dialog="showDialog = false"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { HeaderTable } from "../../../interfaces/headerTable";
import CreatePatientDialog from "./CreatePatientDialog.vue";
import { usePatients } from "../../../composables/usePatients";

const { data: patients, error } = usePatients();
const isMounted = ref(false);
const showDialog = ref(false);

const savePatient = () => {
  console.log("Guardando paciente:");
};

const headers: HeaderTable[] = [
  { title: "Id", key: "id", sortable: false, align: "center" },
  { title: "Nombre", key: "firstName", sortable: false, align: "center" },
  { title: "Email", key: "email", sortable: false, align: "center" },
  { title: "Télefono", key: "phone", sortable: false, align: "center" },
  { title: "Sucursal", key: "branchId", sortable: false, align: "center" },
  { title: "Acciones", key: "action", sortable: false, align: "center" },
];

onMounted(async () => {
  try {
    isMounted.value = false;
    console.log(patients.data);
    console.log(error);
    isMounted.value = true;
  } catch (error) {
    console.log(error);
  } finally {
  }
});
</script>
<style scoped>
/* 🎨 Color de la cabecera */
:deep(.v-data-table thead) {
  background-color: rgb(var(--v-theme-primary)) !important; /* Azul oscuro */
}

/* 🎨 Color del texto en la cabecera */
:deep(.v-data-table thead th) {
  color: white !important;
}
</style>
