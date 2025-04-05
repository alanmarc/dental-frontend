export interface Patient {
  id?: number;
  userId?: number;
  branchId?: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  note?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatientFilters extends Record<string, unknown> {
  page?: string;
  search?: string;
  branchId?: number;
}
