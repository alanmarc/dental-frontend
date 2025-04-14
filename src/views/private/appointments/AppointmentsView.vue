<template>
  <v-container class="pa-0 d-flex flex-column h-100">
    <v-container class="d-flex justify-space-between align-center py-5 px-0">
      <h1 class="text-h4 font-weight-bold">Citas</h1>
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

    <v-container
      class="d-flex flex-sm-row flex-column pa-0 ga-5 overflow-hidden"
    >
      <v-container class="pa-0">
        <div class="d-flex flex-wrap ga-2">
          <v-btn
            class="text-gray"
            text="Programadas"
            :class="{
              'btn-appoinment-type':
                typeAppointmentList === AppointmentStatus.SCHEDULED,
            }"
            @click="typeAppointmentList = AppointmentStatus.SCHEDULED"
          />
          <v-btn
            class="text-gray"
            text="Completadas"
            :class="{
              'btn-appoinment-type':
                typeAppointmentList === AppointmentStatus.COMPLETED,
            }"
            @click="typeAppointmentList = AppointmentStatus.COMPLETED"
          />
          <v-btn
            class="text-gray"
            text="Cancelado"
            :class="{
              'btn-appoinment-type':
                typeAppointmentList === AppointmentStatus.CANCELLED,
            }"
            @click="typeAppointmentList = AppointmentStatus.CANCELLED"
          />
          <v-btn
            class="text-gray"
            text="Perdida"
            :class="{
              'btn-appoinment-type':
                typeAppointmentList === AppointmentStatus.MISSED,
            }"
            @click="typeAppointmentList = AppointmentStatus.MISSED"
          />
          <v-btn
            class="text-gray"
            text="Todas"
            :class="{
              'btn-appoinment-type':
                typeAppointmentList === AppointmentStatus.ALL,
            }"
            @click="typeAppointmentList = AppointmentStatus.ALL"
          />
        </div>
        <div v-if="!isLoading">
          Array de citas en cards
          <template v-for="(item, index) in appointments.data">
            <div>
              <AppointmentCardComponent :appointment="item" color="info" />
            </div>
          </template>
        </div>
        <ProgressComponent v-else />
      </v-container>
      <!-- Sección derecha - Calendario -->
      <v-container
        class="d-flex flex-column pa-0"
        style="max-width: 500px; min-width: 300px"
      >
        <VDatePicker
          ref="calendar"
          v-model="selectedDate"
          :attributes="attrs"
          :min-date="new Date()"
          expanded
          class="elevation-3 rounded-lg"
          @update:model-value="handleDateClick"
        />
        <div class="my-5">
          <span class="text-h6 font-weight-bold">Cita en curso:</span>
          <AppointmentCardComponent :appointment="appointments?.data[0]" />
        </div>
        <div class="my-5">
          <span class="text-h6 font-weight-bold">Siguientes:</span>
          <AppointmentCardComponent :appointment="appointments?.data[0]" />
          <AppointmentCardComponent :appointment="appointments?.data[0]" />
        </div>
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
import { ref } from "vue";
import { useAppointments } from "../../../composables/useAppointments";
import CreateAppointmentDialog from "./CreateAppointmentDialog.vue";
import ProgressComponent from "../../../components/layout/ProgressComponent.vue";
import AppointmentCardComponent from "../../../components/appointments/AppointmentCardComponent.vue";
import { AppointmentStatus } from "../../../enums/appointmentStatusEnum";

const { data: appointments, isLoading } = useAppointments();

const showDialog = ref(false);
const selectedDate = ref(new Date().toISOString());
const typeAppointmentList = ref(AppointmentStatus.SCHEDULED);

const exportAppointments = () => {};

const handleDateClick = (date: Date | string) => {
  selectedDate.value = new Date(date).toISOString();
  showDialog.value = true;
};

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
</script>

<style scoped>
.btn-appoinment-type {
  background-color: rgb(var(--v-theme-accent)) !important;
  color: #fff !important;
  position: relative;
}
</style>
