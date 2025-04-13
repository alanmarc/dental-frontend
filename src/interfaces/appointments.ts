// interfaces/appointments.ts
export interface AppointmentBase {
  patientId: number | null;
  userId: number | null;
  dateTime: string;
  duration: number;
  status: "scheduled" | "completed" | "cancelled";
  reason?: string;
  notes?: string;
  branchId?: number | null;
}

export interface Appointment extends AppointmentBase {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type AppointmentFormValues = AppointmentBase;

export interface AppointmentFilters extends Record<string, unknown> {
  page?: string;
  search?: string;
  branchId?: number;
}
