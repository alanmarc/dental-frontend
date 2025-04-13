<template>
  <v-container class="pa-0 d-flex flex-column h-100">
    <!-- Header -->
    <v-container class="d-flex justify-space-between align-center py-2 px-0">
      <h1 class="text-h5">Citas</h1>
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
          @click="exportAppointments"
        />
      </div>
    </v-container>

    <!-- Contenido principal -->
    <v-container class="d-flex flex-grow-1 pa-0 overflow-hidden">
      <!-- Sección izquierda - Cards -->
      <v-container class="pa-0">
        <div>
          <v-btn color="transparent" text="Programadas" />
          <v-btn color="transparent" text="Completadas" />
          <v-btn color="transparent" text="Cancelado" />
          <v-btn color="transparent" text="Perdida" />
          <v-btn color="transparent" text="Todas" />
        </div>
        <div v-if="!isLoading">
          Array de citas en cards
          {{ appointments }}
        </div>
        <ProgressComponent v-else />
      </v-container>
      <!-- Sección derecha - Calendario -->
      <v-container
        class="d-flex flex-column pa-0"
        style="width: 500px; min-width: 300px"
      >
        <VDatePicker
          ref="calendar"
          v-model="selectedDate"
          :attributes="attrs"
          :min-date="new Date()"
          expanded
          class="elevation-3 rounded-lg"
          @click:date="handleDateClick"
        />
      </v-container>
    </v-container>

    <!-- Diálogo para crear cita -->

    <CreateAppointmentDialog
      v-model="showDialog"
      :date="selectedDate"
      @save="handleSaveAppointment"
      @close-dialog="showDialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAppointments } from "../../../composables/useAppointments";
import CreateAppointmentDialog from "./CreateAppointmentDialog.vue";
import ProgressComponent from "../../../components/layout/ProgressComponent.vue";

// const filters = ref({ status: "scheduled" });
const { data: appointments, isLoading } = useAppointments();

// Estado
const showDialog = ref(false);
const selectedDate = ref(new Date().toISOString());

const exportAppointments = () => {};

const handleDateClick = () => {};

const attrs = ref([
  {
    key: "today",
    highlight: true,
    dates: new Date(),
  },
]);

const handleSaveAppointment = (formData: any) => {
  console.log("Cita guardada:", formData);
  showDialog.value = false; // Opcional: cerrar desde el padre
};

watch(showDialog, (nuevoValor, viejoValor) => {
  console.log("Valor anterior:", viejoValor);
  console.log("Nuevo valor:", nuevoValor);
});
</script>

<style>
.v-calendar {
  height: 100%;
}

.appointment-dot {
  width: 10px;
  height: 10px;
}

/* Responsive - Móvil */
@media (max-width: 780px) {
  .v-container.flex-grow-1 {
    flex-direction: column !important;
  }

  .v-container.flex-grow-1 > .v-container:last-child {
    width: 100% !important;
    height: 500px;
    margin-top: 1rem;
  }

  .v-container.flex-grow-1 > .v-container:first-child {
    padding-right: 0 !important;
  }
}
</style>
