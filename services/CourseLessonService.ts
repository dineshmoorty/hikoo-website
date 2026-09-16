import { apiRequest } from "@/lib/api";

export interface CourseLesson {
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

export interface CreateCourseLessonRequest {
  moduleId: number;
  title: string;
  description: string;
  lessonOrder: number;
  content: string;
}

function authHeaders() {
  const token = localStorage.getItem("hikoo_token");
  if (!token) throw new Error("Authentication required");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getCourseLessons(
  moduleId: number,
  all = false
): Promise<CourseLesson[]> {
  return apiRequest<CourseLesson[]>(
    `/api/course-lessons/module/${moduleId}${all ? "/all" : ""}`,
    { method: "GET", headers: authHeaders() }
  );
}

export async function getCourseLesson(id: number): Promise<CourseLesson> {
  return apiRequest<CourseLesson>(`/api/course-lessons/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function createCourseLesson(
  request: CreateCourseLessonRequest
): Promise<CourseLesson> {
  return apiRequest<CourseLesson>("/api/course-lessons", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export interface UpdateCourseLessonRequest {
  title: string;
  description: string;
  lessonOrder: number;
  content: string;
}

export async function updateCourseLesson(
  id: number,
  request: UpdateCourseLessonRequest
): Promise<CourseLesson> {
  return apiRequest<CourseLesson>(`/api/course-lessons/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export async function updateCourseLessonStatus(
  id: number,
  active: boolean
): Promise<CourseLesson> {
  return apiRequest<CourseLesson>(
    `/api/course-lessons/${id}/status?active=${active}`,
    { method: "PATCH", headers: authHeaders() }
  );
}
