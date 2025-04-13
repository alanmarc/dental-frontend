import { useMutation, useQuery, useQueryClient } from "vue-query";
import {
  addAppointment,
  deleteAppointment,
  fetchAppointments,
  getAppointmentById,
  updateAppointment,
} from "../services/appointmentService";
import type {
  Appointment,
  AppointmentFilters,
} from "../interfaces/appointments";

// Obtener lista de citas
export const useAppointments = (filters?: AppointmentFilters) => {
  return useQuery<Appointment[], Error>({
    queryKey: ["appointments", filters],
    queryFn: () => fetchAppointments(filters),
    keepPreviousData: true,
  });
};

// Agregar una cita
export const useAddAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<Appointment, Error, Omit<Appointment, "id">>({
    mutationFn: addAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      console.error("Error adding appointment:", error);
    },
  });
};

// Actualizar una cita
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Appointment,
    Error,
    { id: number; data: Partial<Appointment> }
  >({
    mutationFn: ({ id, data }) => updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      console.error("Error updating appointment:", error);
    },
  });
};

// Eliminar una cita
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      console.error("Error deleting appointment:", error);
    },
  });
};

// Obtener una cita por ID
export const useAppointment = (id: number) => {
  return useQuery<Appointment, Error>({
    queryKey: ["appointment", id],
    queryFn: () => getAppointmentById(id),
    enabled: !!id, // Solo ejecutar si hay un ID
  });
};
