<template>
  <v-card :color="color" class="my-5">
    <div class="d-flex flex-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5">
          <span class="text-wrap">{{ appointment?.reason }} </span>
          <span>Médico: {{ appointment?.userId }} </span>
        </v-card-title>
        <v-card-subtitle class="text-wrap">
          <span>{{ appointment?.dateTime }} </span>
          -
          <span>Duracion: {{ appointment?.duration }}</span>

          <div>
            <span>Paciente: {{ appointment?.patientId }}</span>
          </div>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn
            class="ms-2"
            size="small"
            text="Ver cita"
            variant="outlined"
          ></v-btn>
        </v-card-actions>
      </div>

      <v-avatar class="ma-3" rounded="0" size="125">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { computed, type PropType } from "vue";
import type { Appointment } from "../../interfaces/appointments";

const props = defineProps({
  appointment: {
    type: Object as PropType<Appointment>,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});

const color = computed(() => (props.color ? props.color : "accent"));
</script>
