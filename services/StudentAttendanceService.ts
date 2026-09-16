import { apiRequest } from "@/lib/api";

export type AttendanceStatus = "PRESENT" | "ABSENT";

export interface StudentAttendanceRecord {
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

function getToken() {
  const token = localStorage.getItem("hikoo_token");
  if (!token) throw new Error("Authentication required");
  return token;
}

export async function getMyAttendance(): Promise<StudentAttendanceRecord[]> {
  const token = getToken();

  return apiRequest<StudentAttendanceRecord[]>("/api/attendance/my", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
