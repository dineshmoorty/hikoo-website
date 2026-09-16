import { apiRequest } from "@/lib/api";

export interface AdminCourseModule {
  id: number;
  courseId: number;
  courseName: string;
  title: string;
  description: string | null;
  moduleOrder: number;
  active: boolean;
}

export interface UpdateAdminCourseModuleRequest {
  title: string;
  description: string;
  moduleOrder: number;
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

export async function getAdminCourseModules(
  courseId: number
): Promise<AdminCourseModule[]> {
  return apiRequest<AdminCourseModule[]>(
    `/api/admin/course-modules/course/${courseId}`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}

export async function getAdminCourseModule(
  id: number
): Promise<AdminCourseModule> {
  return apiRequest<AdminCourseModule>(
    `/api/admin/course-modules/${id}`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}

export async function updateAdminCourseModule(
  id: number,
  request: UpdateAdminCourseModuleRequest
): Promise<AdminCourseModule> {
  return apiRequest<AdminCourseModule>(
    `/api/admin/course-modules/${id}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({
        title: request.title.trim(),
        description: request.description.trim() || null,
        moduleOrder: request.moduleOrder,
      }),
    }
  );
}

export async function updateAdminCourseModuleStatus(
  id: number,
  active: boolean
): Promise<AdminCourseModule> {
  return apiRequest<AdminCourseModule>(
    `/api/admin/course-modules/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}
