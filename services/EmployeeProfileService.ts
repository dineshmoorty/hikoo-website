import { apiRequest } from "@/lib/api";

export interface EmployeeProfile {
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
}

export interface UpdateEmployeeProfileRequest {
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

function getToken() {
  const token = localStorage.getItem("hikoo_token");
  if (!token) throw new Error("Authentication required");
  return token;
}

export async function getMyEmployeeProfile(): Promise<EmployeeProfile> {
  const token = getToken();

  return apiRequest<EmployeeProfile>("/api/employee/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateMyEmployeeProfile(
  request: UpdateEmployeeProfileRequest
): Promise<EmployeeProfile> {
  const token = getToken();

  return apiRequest<EmployeeProfile>("/api/employee/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}
