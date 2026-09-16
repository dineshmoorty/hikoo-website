import { apiRequest } from "@/lib/api";

/* =========================================================
   STUDENT
========================================================= */

export interface AdminStudent {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export interface UpdateAdminStudentRequest {
  name: string;
  email: string;
}

/* =========================================================
   AUTH HEADERS
========================================================= */

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

/* =========================================================
   GET ALL STUDENTS
========================================================= */

export async function getAdminStudents(): Promise<
  AdminStudent[]
> {
  return apiRequest<AdminStudent[]>(
    "/api/admin/students",
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}

/* =========================================================
   UPDATE STUDENT
========================================================= */

export async function updateAdminStudent(
  id: number,
  data: UpdateAdminStudentRequest
): Promise<AdminStudent> {
  return apiRequest<AdminStudent>(
    `/api/admin/students/${id}`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
      }),
    }
  );
}

/* =========================================================
   ACTIVATE / DEACTIVATE STUDENT
========================================================= */

export async function updateAdminStudentStatus(
  id: number,
  active: boolean
): Promise<AdminStudent> {
  return apiRequest<AdminStudent>(
    `/api/admin/students/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}