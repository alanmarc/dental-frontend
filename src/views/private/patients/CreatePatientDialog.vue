<template>
  <v-dialog v-model="isOpen" persistent max-width="900px">
    <v-card color="background">
      <v-form @submit.prevent="handleSubmit">
        <v-card-title class="bg-accent">
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <!-- Nombre -->
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                density="compact"
                label="Nombre*"
                variant="outlined"
                v-model="v$.patient.firstName.$model"
                :error-messages="getErrorMessages(v$.patient.firstName)"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <!-- Apellido -->
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                density="compact"
                label="Apellido*"
                variant="outlined"
                v-model="v$.patient.lastName.$model"
                :error-messages="getErrorMessages(v$.patient.lastName)"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <!-- Correo -->
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                density="compact"
                label="Correo*"
                variant="outlined"
                v-model="v$.patient.email.$model"
                :error-messages="getErrorMessages(v$.patient.email)"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <!-- Cumpleaños -->
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                density="compact"
                label="Cumpleaños"
                variant="outlined"
                v-model="patient.dob"
                type="date"
                hide-details
              ></v-text-field>
            </v-col>

            <!-- Teléfono -->
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                density="compact"
                label="Teléfono*"
                variant="outlined"
                v-model="v$.patient.phone.$model"
                :error-messages="getErrorMessages(v$.patient.phone)"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <!-- Dirección -->
            <v-col cols="12" sm="6" lg="4">
              <v-text-field
                density="compact"
                label="Dirección"
                variant="outlined"
                v-model="patient.address"
                hide-details
              ></v-text-field>
            </v-col>

            <!-- Doctor asignado -->
            <v-col cols="12" sm="6" lg="4">
              <v-select
                density="compact"
                label="Doctor asignado*"
                variant="outlined"
                :items="doctors"
                item-title="name"
                item-value="id"
                v-model="v$.patient.userId.$model"
                :error-messages="getErrorMessages(v$.patient.userId)"
                hide-details="auto"
              ></v-select>
            </v-col>

            <!-- Sucursal -->
            <v-col cols="12" sm="6" lg="4">
              <v-select
                density="compact"
                label="Sucursal*"
                variant="outlined"
                :items="branches"
                item-title="name"
                item-value="id"
                v-model="v$.patient.branchId.$model"
                :error-messages="getErrorMessages(v$.patient.branchId)"
                hide-details="auto"
              ></v-select>
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
            class="bg-accent rounded-lg"
            :loading="isSubmitting"
          >
            <template #prepend>
              <v-icon>mdi-content-save-check</v-icon>
            </template>
            Registrar Paciente
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { email, maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useAddPatient } from "../../../composables/usePatients";

interface NewPatient {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  userId: number | null;
  branchId: number | null;
}

const props = defineProps<{
  modelValue: boolean;
  title: string;
}>();

const emit = defineEmits(["close-dialog", "confirm"]);

// Usar el composable de mutación
const { mutate: addPatient, isLoading: isSubmitting } = useAddPatient();

const isOpen = ref(props.modelValue);
const patient = ref<NewPatient>({
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  phone: "",
  address: "",
  userId: null,
  branchId: null,
});

// Mock data
const doctors = ref([
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
]);
const branches = ref([
  { id: 1, name: "Sucursal Norte" },
  { id: 2, name: "Sucursal Sur" },
]);

// Validations (mantener igual)
const rules = {
  patient: {
    firstName: { required, minLength: minLength(2) },
    lastName: { required, minLength: minLength(2) },
    email: { required, email },
    phone: { required, minLength: minLength(8), maxLength: maxLength(15) },
    userId: { required },
    branchId: { required },
  },
};
const v$ = useVuelidate(rules, { patient });

const getErrorMessages = (field: any) => {
  if (!field.$dirty) return [];
  return field.$errors.map((e: any) => e.$message);
};

const closeDialog = () => {
  v$.value.$reset();
  isOpen.value = false;
  emit("close-dialog");
};

const resetForm = () => {
  patient.value = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    userId: null,
    branchId: null,
  };
};

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  // Ejecutar la mutación
  addPatient(patient.value, {
    onSuccess: () => {
      emit("confirm");
      resetForm();
      closeDialog();
    },
  });
};

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
    if (newVal) resetForm();
  }
);
</script>
