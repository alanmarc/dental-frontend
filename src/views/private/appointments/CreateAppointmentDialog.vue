<template>
  <v-dialog v-model="dialogModel" persistent max-width="900px">
    <v-card color="background">
      <v-form @submit.prevent="handleSubmitForm">
        <v-card-title class="bg-accent">
          <span class="text-h5">Nueva Cita </span>
        </v-card-title>
        <v-card-text class="my-5">
          <v-row>
            <v-col cols="12" sm="6" lg="4">
              <v-select
                :model-value="values.patientId"
                @update:modelValue="(val) => updateField('patientId', val)"
                :items="[{ name: 'Tilin Marcso', id: 1 }]"
                :error-messages="errors.patientId"
                density="compact"
                label="Paciente*"
                variant="outlined"
                item-title="name"
                item-value="id"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select
                :model-value="values.userId"
                @update:modelValue="(val) => updateField('userId', val)"
                :error-messages="errors.userId"
                density="compact"
                :items="[{ name: 'Piquis M.', id: 1 }]"
                label="Medico"
                variant="outlined"
                item-title="name"
                item-value="id"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                :model-value="values.dateTime"
                @update:modelValue="(val) => updateField('dateTime', val)"
                :error-messages="errors.dateTime"
                density="compact"
                label="Fecha"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                :model-value="values.duration"
                @update:modelValue="(val) => updateField('duration', val)"
                :error-messages="errors.duration"
                density="compact"
                label="Duracion"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select
                :model-value="values.status"
                @update:modelValue="(val) => updateField('status', val)"
                :error-messages="errors.status"
                density="compact"
                variant="outlined"
                item-title="name"
                item-value="id"
                hide-details="auto"
                :items="['scheduled', 'completed', 'cancelled']"
                label="Estatus"
              />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                :model-value="values.reason"
                @update:modelValue="(val) => updateField('reason', val)"
                :error-messages="errors.reason"
                density="compact"
                label="Motivo de coonsulta"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                :model-value="values.notes"
                @update:modelValue="(val) => updateField('notes', val)"
                density="compact"
                label="Notas"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                :model-value="values.branchId"
                @update:modelValue="(val) => updateField('branchId', val)"
                :error-messages="errors.branchId"
                density="compact"
                label="Sucursal"
                variant="outlined"
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            prepend-icon="mdi-cancel"
            class="bg-error rounded-lg"
            @click="closeDialog"
          >
            Cancelar
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            :loading="isSubmitting"
            :disabled="!meta.valid || isSubmitting"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useForm } from "vee-validate";

import { appointmentSchema } from "../../../validations/appointmentSchema";
import { useAddAppointment } from "../../../composables/useAppointments";

import type { AppointmentFormValues } from "../../../interfaces/appointments";
import { Alert } from "../../../helpers/alertHelper";
import { handleApiError } from "../../../helpers/apiErrorHandler";

const props = defineProps<{
  modelValue: boolean;
  date: string;
}>();

const dialogModel = computed(() => props.modelValue);
const { mutateAsync: createAppointment } = useAddAppointment();
const emit = defineEmits(["close-dialog", "save"]);
const closeDialog = () => {
  emit("close-dialog");
};

const initialFormValues: AppointmentFormValues = {
  patientId: null,
  userId: null,
  dateTime: props.date,
  duration: 30,
  status: "scheduled",
  reason: "",
  notes: "",
  branchId: null,
};

const {
  values,
  errors,
  handleSubmit,
  meta,
  isSubmitting,
  setFieldValue,
  resetForm,
} = useForm<AppointmentFormValues>({
  validationSchema: appointmentSchema,
  initialValues: initialFormValues,
});

const updateField = (field: keyof AppointmentFormValues, value: any) => {
  setFieldValue(field, value);
};

const handleSubmitForm = handleSubmit(
  async (formValues: AppointmentFormValues) => {
    try {
      await createAppointment(formValues);
      resetForm();
      closeDialog();
      Alert.success("Cita registrada", "La cita se guardo correctamente");
    } catch (error) {
      handleApiError(error, "Error al registrar la cita");
    }
  }
);

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      resetForm({
        values: {
          ...initialFormValues,
          dateTime: props.date,
        },
      });
    }
  }
);
</script>
