import { apiRequest } from "@/lib/api";

export interface AdminProfile {
  userId: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  profileCompleted: boolean;
}

export interface UpdateAdminProfileRequest {
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export async function getMyAdminProfile(): Promise<AdminProfile> {
  return apiRequest<AdminProfile>("/api/admin/profile", {
    method: "GET",
  });
}

export async function updateMyAdminProfile(
  request: UpdateAdminProfileRequest
): Promise<AdminProfile> {
  return apiRequest<AdminProfile>("/api/admin/profile", {
    method: "PUT",
    body: JSON.stringify(request),
  });
}
