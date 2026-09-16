import { apiRequest } from "@/lib/api";

export interface AdminAssignment {
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
  completed: boolean;

  enrolledAt: string | null;
  assignedAt: string | null;
  completedAt: string | null;

  startDate: string | null;
  endDate: string | null;

  status: string;

  basePrice?: number | null;
  discountAmount?: number | null;
  gstAmount?: number | null;
  finalPrice?: number | null;

  couponId?: number | null;
  couponCode?: string | null;
}

export interface AdminEmployee {
  id: number | null;
  userId: number;

  name: string;
  email: string;

  designation: string | null;
  specialization: string | null;
  department: string | null;

  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;

  profileCompleted: boolean;
  active: boolean;
}

function getToken() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return token;
}

/* =========================================================
   GET ALL ENROLLMENTS
   Same enrollment API used by Super Admin
========================================================= */

export async function getAdminAssignments(): Promise<AdminAssignment[]> {
  const token = getToken();

  return apiRequest<AdminAssignment[]>(
    "/api/enrollments",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/* =========================================================
   GET ALL EMPLOYEES
   IMPORTANT:
   Admin must NOT call /api/super-admin/employees.
========================================================= */

export async function getAdminEmployees(): Promise<AdminEmployee[]> {
  const token = getToken();

  return apiRequest<AdminEmployee[]>(
    "/api/employees",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/* =========================================================
   ASSIGN / REASSIGN EMPLOYEE
   Same enrollment API used by Super Admin
========================================================= */

export async function assignEmployeeToStudent(
  enrollmentId: number,
  employeeId: number
): Promise<AdminAssignment> {
  const token = getToken();

  return apiRequest<AdminAssignment>(
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
