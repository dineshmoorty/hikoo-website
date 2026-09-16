import { apiRequest } from "@/lib/api";

export interface StudentProfile {
  id: number;
  userId: number;
  name: string;
  email: string;

  phone: string | null;
  institutionName: string | null;
  registerNumber: string | null;
  program: string | null;

  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;

  profileCompleted: boolean;
  active: boolean;
}

export interface UpdateStudentProfileRequest {
  phone: string;
  institutionName: string;
  registerNumber: string;
  program: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export async function getMyStudentProfile(): Promise<StudentProfile> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<StudentProfile>("/api/student/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateMyStudentProfile(
  request: UpdateStudentProfileRequest
): Promise<StudentProfile> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<StudentProfile>("/api/student/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}