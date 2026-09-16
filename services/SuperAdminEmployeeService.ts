import { apiRequest } from "@/lib/api";

export interface Employee {
  id: number | null;
  userId: number;
  name: string;
  email: string;
  designation: string | null;
  specialization: string | null;
  department: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  profileCompleted: boolean;
  active: boolean;
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateEmployeeRequest {
  name?: string;
  email?: string;
  designation?: string;
  specialization?: string;
  department?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export async function getEmployees(): Promise<Employee[]> {
  return apiRequest<Employee[]>("/api/employees", {
    method: "GET",
  });
}

export async function getEmployee(id: number): Promise<Employee> {
  return apiRequest<Employee>(`/api/employees/${id}`, {
    method: "GET",
  });
}

export async function createEmployee(
  data: CreateEmployeeRequest
): Promise<Employee> {
  return apiRequest<Employee>("/api/employees", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEmployee(
  id: number,
  data: UpdateEmployeeRequest
): Promise<Employee> {
  return apiRequest<Employee>(`/api/employees/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function updateEmployeeStatus(
  id: number,
  active: boolean
): Promise<Employee> {
  return apiRequest<Employee>(
    `/api/employees/${id}/status?active=${active}`,
    {
      method: "PATCH",
    }
  );
}