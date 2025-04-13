import api from "../api";
import type {
  Appointment,
  AppointmentFilters,
} from "../interfaces/appointments";

export const fetchAppointments = async (
  filters?: AppointmentFilters
): Promise<Appointment[]> => {
  const { data } = await api.get("/appointments", {
    params: filters,
    paramsSerializer: { indexes: null },
  });
  return data;
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
  const { data } = await api.get(`/appointments/${id}`);
  return data;
};

export const addAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<Appointment> => {
  const { data } = await api.post("/appointments", appointment);
  return data;
};

export const updateAppointment = async (
  id: number,
  appointment: Partial<Appointment>
): Promise<Appointment> => {
  const { data } = await api.put(`/appointments/${id}`, appointment);
  return data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
  await api.delete(`/appointments/${id}`);
};
