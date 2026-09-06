import { apiRequest } from "@/lib/api";

export type AttendanceStatus = "PRESENT" | "ABSENT";

export interface AttendanceRecord {
  id: number;
  enrollmentId: number;

  studentId: number;
  studentName: string;
  studentEmail: string;

  courseId: number;
  courseName: string;
  courseCode: string | null;

  employeeId: number | null;
  employeeName: string | null;

  attendanceDate: string;
  status: AttendanceStatus;

  remarks: string | null;

  createdAt: string;
  updatedAt: string | null;
}

export interface MarkAttendanceRequest {
  enrollmentId: number;
  attendanceDate: string;
  status: AttendanceStatus;
  remarks?: string;
}

function getToken() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return token;
}

// ============================================================
// MARK ATTENDANCE
// ============================================================

export async function markAttendance(
  request: MarkAttendanceRequest
): Promise<AttendanceRecord> {
  const token = getToken();

  return apiRequest<AttendanceRecord>("/api/attendance", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(request),
  });
}

// ============================================================
// GET ATTENDANCE FOR ONE ENROLLMENT
// ============================================================

export async function getEnrollmentAttendance(
  enrollmentId: number
): Promise<AttendanceRecord[]> {
  const token = getToken();

  return apiRequest<AttendanceRecord[]>(
    `/api/attendance/enrollment/${enrollmentId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// ============================================================
// GET ATTENDANCE FOR ONE ASSIGNED STUDENT
// ============================================================

export async function getStudentAttendance(
  studentId: number
): Promise<AttendanceRecord[]> {
  const token = getToken();

  return apiRequest<AttendanceRecord[]>(
    `/api/attendance/student/${studentId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}