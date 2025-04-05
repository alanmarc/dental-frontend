import { useMutation, useQuery, useQueryClient } from "vue-query";
import {
  addPatient,
  deletePatient,
  fetchPatients,
} from "../services/patientService";
import type { Patient, PatientFilters } from "../interfaces/patient";

export const usePatients = (filters?: PatientFilters) => {
  return useQuery<Patient[], Error>({
    queryKey: ["patients", filters],
    queryFn: () => fetchPatients(filters),
    keepPreviousData: true,
  });
};

// Agregar un paciente
export const useAddPatient = () => {
  const queryClient = useQueryClient();

  return useMutation<Patient, Error, Patient>({
    mutationFn: addPatient,
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
    },
    onError: (error) => {
      console.error("Error adding patient:", error);
    },
  });
};

// Eliminar un paciente
export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
    },
    onError: (error) => {
      console.error("Error deleting patient:", error);
    },
  });
};

// Obtener un paciente por ID
// export const usePatient = (id: number) => {
//   return useQuery<Patient, Error>({
//     queryKey: ["patient", id],
//     queryFn: () => getPatientById(id),
//     enabled: !!id, // Solo ejecutar si hay un ID
//   });
// };
