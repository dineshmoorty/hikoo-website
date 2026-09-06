import { apiRequest } from "@/lib/api";

export interface Enrollment {
  id: number;

  studentId: number;
  studentName: string;
  studentEmail: string;

  courseId: number;
  courseName: string;
  courseCode: string | null;

  employeeId: number | null;
  employeeName: string | null;
  employeeEmail: string | null;

  active: boolean;

  enrolledAt: string;
  assignedAt: string | null;
}

export interface CreateEnrollmentRequest {
  courseId: number;
}

export interface AssignEmployeeRequest {
  employeeId: number;
}

function getToken() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return token;
}

// Student → enroll in course
export async function enrollInCourse(
  courseId: number
): Promise<Enrollment> {
  const token = getToken();

  return apiRequest<Enrollment>("/api/enrollments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courseId,
    }),
  });
}

// Student → own enrollments
export async function getMyEnrollments(): Promise<Enrollment[]> {
  const token = getToken();

  return apiRequest<Enrollment[]>("/api/enrollments/my", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Admin / Super Admin → all enrollments
export async function getAllEnrollments(): Promise<Enrollment[]> {
  const token = getToken();

  return apiRequest<Enrollment[]>("/api/enrollments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Admin / Super Admin → assign employee
export async function assignEmployee(
  enrollmentId: number,
  employeeId: number
): Promise<Enrollment> {
  const token = getToken();

  return apiRequest<Enrollment>(
    `/api/enrollments/${enrollmentId}/employee`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
      }),
    }
  );
}

// Employee → assigned students only
export async function getMyAssignedStudents(): Promise<Enrollment[]> {
  const token = getToken();

  return apiRequest<Enrollment[]>("/api/enrollments/my-assigned", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getMyAssignedStudent(
  studentId: number
): Promise<Enrollment> {
  const token = getToken();

  return apiRequest<Enrollment>(
    `/api/enrollments/my-assigned/student/${studentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}