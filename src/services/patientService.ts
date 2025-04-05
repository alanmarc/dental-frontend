import api from "../api";
import type { Patient, PatientFilters } from "../interfaces/patient";

export const fetchPatients = async (
  filters?: PatientFilters
): Promise<Patient[]> => {
  const { data } = await api.get("/patients", {
    params: filters,
    paramsSerializer: { indexes: null },
  });
  return data;
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const { data } = await api.get(`/patients/${id}`);
  return data;
};

export const addPatient = async (patient: Patient): Promise<Patient> => {
  const { data } = await api.post("/patients", patient);
  return data;
};

export const updatePatient = async (
  id: number,
  patient: Partial<Patient>
): Promise<Patient> => {
  const { data } = await api.put(`/patients/${id}`, patient);
  return data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/patients/${id}`);
};
