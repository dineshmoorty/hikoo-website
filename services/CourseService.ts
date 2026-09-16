import { apiRequest } from "@/lib/api";

export interface Course {
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

export interface CreateCourseRequest {
  name: string;
  code: string;
  description: string;
  duration: string;
  baseFee: number;
  gstPercentage: number;
}

export interface UpdateCourseRequest {
  name: string;
  code: string;
  description: string;
  duration: string;
  baseFee: number;
  gstPercentage: number;
  active?: boolean;
}

function authHeaders() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getCourses(): Promise<Course[]> {
  return apiRequest<Course[]>("/api/courses", {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function createCourse(
  request: CreateCourseRequest
): Promise<Course> {
  return apiRequest<Course>("/api/courses", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export async function updateCourse(
  id: number,
  request: UpdateCourseRequest
): Promise<Course> {
  return apiRequest<Course>(`/api/courses/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export async function updateCourseStatus(
  id: number,
  active: boolean
): Promise<Course> {
  return apiRequest<Course>(`/api/courses/${id}/status`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ active }),
  });
}