import { apiRequest } from "@/lib/api";

export interface EmployeeCourse {
  id: number;
  courseOrder: number;
  name: string;
  code: string | null;
  description: string | null;
  duration: string | null;
  baseFee: number;
  gstPercentage: number;
  totalFee?: number | null;
  active: boolean;
}

export interface EmployeeCourseModule {
  id: number;
  courseId: number;
  courseName: string | null;
  title: string;
  description: string | null;
  moduleOrder: number;
  active: boolean;
}

export interface EmployeeCourseLesson {
  id: number;
  moduleId: number;
  courseId: number;
  courseName: string | null;
  moduleTitle: string | null;
  title: string;
  description: string | null;
  lessonOrder: number;
  content: string | null;
  active: boolean;
}

function authHeaders() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getMyEmployeeCourses(): Promise<EmployeeCourse[]> {
  return apiRequest<EmployeeCourse[]>("/api/employee/courses", {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function getMyEmployeeCourse(
  courseId: number
): Promise<EmployeeCourse> {
  return apiRequest<EmployeeCourse>(`/api/employee/courses/${courseId}`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function getMyEmployeeCourseModules(
  courseId: number
): Promise<EmployeeCourseModule[]> {
  return apiRequest<EmployeeCourseModule[]>(
    `/api/employee/courses/${courseId}/modules`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}

export async function getMyEmployeeModuleLessons(
  courseId: number,
  moduleId: number
): Promise<EmployeeCourseLesson[]> {
  return apiRequest<EmployeeCourseLesson[]>(
    `/api/employee/courses/${courseId}/modules/${moduleId}/lessons`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}
