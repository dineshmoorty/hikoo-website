import { apiRequest } from "@/lib/api";

export interface EmployeeStudent {
  id: number | null;
  userId: number;
  name: string;
  email: string;
  phone: string | null;
  course: string | null;
  program: string | null;
  internshipDuration: string | null;
  courseDuration: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  profileCompleted: boolean;
  active: boolean;
}

function getToken() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return token;
}

export async function getEmployeeStudents(): Promise<EmployeeStudent[]> {
  const token = getToken();

  return apiRequest<EmployeeStudent[]>("/api/employee/students", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getEmployeeStudent(
  id: number
): Promise<EmployeeStudent> {
  const token = getToken();

  return apiRequest<EmployeeStudent>(`/api/employee/students/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export interface UpdateStudentRequest {
  phone: string;
  course: string;
  program: string;
  internshipDuration: string;
  courseDuration: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profileCompleted: boolean;
}

export async function updateEmployeeStudent(
  id: number,
  request: UpdateStudentRequest
): Promise<EmployeeStudent> {
  const token = getToken();

  return apiRequest<EmployeeStudent>(
    `/api/employee/students/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
}