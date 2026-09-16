import { apiRequest } from "@/lib/api";

export interface AdminCourse {
  id: number;
  courseOrder: number;
  name: string;
  code: string | null;
  description: string | null;
  duration: string | null;
  baseFee: number;
  gstPercentage: number;
  totalFee: number;
  active: boolean;
}

export interface UpdateAdminCourseRequest {
  name: string;
  code: string;
  description: string;
  duration: string;
  baseFee: number;
  gstPercentage: number;
}

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

export async function getAdminCourses(): Promise<AdminCourse[]> {
  return apiRequest<AdminCourse[]>("/api/admin/courses", {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function getAdminCourse(
  id: number
): Promise<AdminCourse> {
  return apiRequest<AdminCourse>(`/api/admin/courses/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function updateAdminCourse(
  id: number,
  data: UpdateAdminCourseRequest
): Promise<AdminCourse> {
  return apiRequest<AdminCourse>(`/api/admin/courses/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({
      name: data.name.trim(),
      code: data.code.trim().toUpperCase() || null,
      description: data.description.trim() || null,
      duration: data.duration.trim() || null,
      baseFee: data.baseFee,
      gstPercentage: data.gstPercentage,
    }),
  });
}

export async function updateAdminCourseStatus(
  id: number,
  active: boolean
): Promise<AdminCourse> {
  return apiRequest<AdminCourse>(
    `/api/admin/courses/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}