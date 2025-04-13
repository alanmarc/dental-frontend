// validationSchema.ts
import { number, object, string } from "yup";

export const appointmentSchema = object({
  patientId: number()
    .required("El paciente es requerido")
    .typeError("Debe ser un número"),
  userId: number().nullable().required(),
  dateTime: string().required("La fecha y hora son requeridas"),
  duration: number()
    .required("La duración es requerida")
    .min(15, "Mínimo 15 minutos")
    .max(240, "Máximo 240 minutos (4 horas)"),
  status: string()
    .required("El estado es requerido")
    .oneOf(["scheduled", "completed", "canceled", "missed"], "Estado inválido"),
  reason: string().optional(),
  notes: string().max(500, "Máximo 500 caracteres").optional(),
  branchId: number().nullable().optional(),
});
