import { apiRequest } from "@/lib/api";

export type AttendanceStatus = "PRESENT" | "ABSENT";

export interface AdminAttendanceRecord {
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

export interface UpdateAdminAttendanceRequest {
  attendanceDate: string;
  status: AttendanceStatus;
  remarks?: string | null;
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

export async function getAdminAttendance(): Promise<
  AdminAttendanceRecord[]
> {
  return apiRequest<AdminAttendanceRecord[]>(
    "/api/admin/attendance",
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}

export async function updateAdminAttendance(
  id: number,
  request: UpdateAdminAttendanceRequest
): Promise<AdminAttendanceRecord> {
  return apiRequest<AdminAttendanceRecord>(
    `/api/admin/attendance/${id}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({
        attendanceDate: request.attendanceDate,
        status: request.status,
        remarks:
          request.remarks?.trim() || null,
      }),
    }
  );
}

export async function updateAdminAttendanceStatus(
  id: number,
  active: boolean
): Promise<AdminAttendanceRecord> {
  return apiRequest<AdminAttendanceRecord>(
    `/api/admin/attendance/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}