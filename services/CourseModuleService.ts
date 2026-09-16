import { apiRequest } from "@/lib/api";

export interface CourseModule {
  id: number;
  courseId: number;
  courseName: string;
  title: string;
  description: string | null;
  moduleOrder: number;
  active: boolean;
}

export interface CreateCourseModuleRequest {
  courseId: number;
  title: string;
  description: string;
  moduleOrder: number;
}

function authHeaders() {
  const token = localStorage.getItem("hikoo_token");
  if (!token) throw new Error("Authentication required");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getCourseModules(
  courseId: number,
  all = false
): Promise<CourseModule[]> {
  return apiRequest<CourseModule[]>(
    `/api/course-modules/course/${courseId}${all ? "/all" : ""}`,
    { method: "GET", headers: authHeaders() }
  );
}

export async function getCourseModule(id: number): Promise<CourseModule> {
  return apiRequest<CourseModule>(`/api/course-modules/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function createCourseModule(
  request: CreateCourseModuleRequest
): Promise<CourseModule> {
  return apiRequest<CourseModule>("/api/course-modules", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export interface UpdateCourseModuleRequest {
  title: string;
  description: string;
  moduleOrder: number;
}

export async function updateCourseModule(
  id: number,
  request: UpdateCourseModuleRequest
): Promise<CourseModule> {
  return apiRequest<CourseModule>(
    `/api/course-modules/${id}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(request),
    }
  );
}

export async function updateCourseModuleStatus(
  id: number,
  active: boolean
): Promise<CourseModule> {
  return apiRequest<CourseModule>(
    `/api/course-modules/${id}/status?active=${active}`,
    { method: "PATCH", headers: authHeaders() }
  );
}
