import { apiRequest } from "@/lib/api";

export interface Course {
  id: number;
  name: string;
  code: string | null;
  description: string | null;
  duration: string | null;
  active: boolean;
}

export interface CreateCourseRequest {
  name: string;
  code: string;
  description: string;
  duration: string;
}

export interface UpdateCourseRequest {
  name: string;
  code: string;
  description: string;
  duration: string;
  active?: boolean;
}

export async function getCourses(): Promise<Course[]> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<Course[]>("/api/courses", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createCourse(
  request: CreateCourseRequest
): Promise<Course> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<Course>("/api/courses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function updateCourse(
  id: number,
  request: UpdateCourseRequest
): Promise<Course> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<Course>(`/api/courses/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function updateCourseStatus(
  id: number,
  active: boolean
): Promise<Course> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<Course>(`/api/courses/${id}/status`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ active }),
  });
}