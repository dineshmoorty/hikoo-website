import { apiRequest } from "@/lib/api";

export interface AdminCourseLesson {
  id: number;
  moduleId: number;
  courseId: number;
  courseName: string;
  moduleTitle: string;
  title: string;
  description: string | null;
  lessonOrder: number;
  content: string | null;
  active: boolean;
}

export interface UpdateAdminCourseLessonRequest {
  title: string;
  description: string;
  lessonOrder: number;
  content: string;
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getAdminCourseLessons(
  moduleId: number
): Promise<AdminCourseLesson[]> {
  return apiRequest<AdminCourseLesson[]>(
    `/api/admin/course-lessons/module/${moduleId}`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}

export async function getAdminCourseLesson(
  id: number
): Promise<AdminCourseLesson> {
  return apiRequest<AdminCourseLesson>(
    `/api/admin/course-lessons/${id}`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}

export async function updateAdminCourseLesson(
  id: number,
  request: UpdateAdminCourseLessonRequest
): Promise<AdminCourseLesson> {
  return apiRequest<AdminCourseLesson>(
    `/api/admin/course-lessons/${id}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({
        title: request.title.trim(),
        description: request.description.trim() || null,
        lessonOrder: request.lessonOrder,
        content: request.content,
      }),
    }
  );
}

export async function updateAdminCourseLessonStatus(
  id: number,
  active: boolean
): Promise<AdminCourseLesson> {
  return apiRequest<AdminCourseLesson>(
    `/api/admin/course-lessons/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}