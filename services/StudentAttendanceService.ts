import { apiRequest } from "@/lib/api";

export type AttendanceStatus = "PRESENT" | "ABSENT";

export interface StudentAttendance {
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

// ============================================================
// GET MY ATTENDANCE
// ============================================================

export async function getMyAttendance(): Promise<StudentAttendance[]> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<StudentAttendance[]>(
    "/api/attendance/my",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}