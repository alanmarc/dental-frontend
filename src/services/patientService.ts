import api from "../api";
import type { Patient } from "../interfaces/patient";

// Obtener todos los pacientes
export const fetchPatients = async (): Promise<Patient[]> => {
  const { data } = await api.get("/patients");
  return data;
};

// Agregar un paciente
export const addPatient = async (
  patient: Omit<Patient, "id" | "createdAt">
) => {
  const { data } = await api.post("/patients", patient);
  return data;
};

// Eliminar un paciente
export const deletePatient = async (id: number) => {
  await api.delete(`/patients/${id}`);
};
