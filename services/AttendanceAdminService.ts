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

  active: boolean;
}

export interface CreateAttendanceRequest {
  enrollmentId: number;
  attendanceDate: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface UpdateAttendanceRequest {
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

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
}

// Existing create API.
// Employee: today + assigned students.
// Admin/Super Admin: any date + no assignment restriction.
export async function markAttendance(
  request: CreateAttendanceRequest
): Promise<AttendanceRecord> {
  return apiRequest<AttendanceRecord>("/api/attendance", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

// Admin / Super Admin management list.
export async function getAllAttendance(): Promise<AttendanceRecord[]> {
  return apiRequest<AttendanceRecord[]>("/api/attendance/admin", {
    method: "GET",
    headers: authHeaders(),
  });
}

// Admin / Super Admin edit.
export async function updateAttendance(
  id: number,
  request: UpdateAttendanceRequest
): Promise<AttendanceRecord> {
  return apiRequest<AttendanceRecord>(`/api/attendance/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

// Admin / Super Admin active / inactive.
export async function updateAttendanceStatus(
  id: number,
  active: boolean
): Promise<AttendanceRecord> {
  return apiRequest<AttendanceRecord>(
    `/api/attendance/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}
