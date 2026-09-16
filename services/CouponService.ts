import { apiRequest } from "@/lib/api";

export type CouponApplicableTo = "ALL_COURSES" | "SPECIFIC_COURSE";

export interface Coupon {
  id: number;
  code: string;
  discountPercentage: number;
  applicableTo: CouponApplicableTo;
  courseId: number | null;
  courseName: string | null;
  usageLimit: number | null;
  usedCount: number;
  validFrom: string | null;
  validUntil: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateCouponRequest {
  code: string;
  discountPercentage: number;
  applicableTo: CouponApplicableTo;
  courseId?: number | null;
  usageLimit?: number | null;
  validFrom?: string | null;
  validUntil?: string | null;
}

export interface UpdateCouponRequest {
  code?: string;
  discountPercentage?: number;
  applicableTo?: CouponApplicableTo;
  courseId?: number | null;
  usageLimit?: number | null;
  validFrom?: string | null;
  validUntil?: string | null;
  active?: boolean;
}

function authHeaders() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getCoupons(): Promise<Coupon[]> {
  return apiRequest<Coupon[]>("/api/coupons", {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function getCoupon(id: number): Promise<Coupon> {
  return apiRequest<Coupon>(`/api/coupons/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function createCoupon(
  request: CreateCouponRequest
): Promise<Coupon> {
  return apiRequest<Coupon>("/api/coupons", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export async function updateCoupon(
  id: number,
  request: UpdateCouponRequest
): Promise<Coupon> {
  return apiRequest<Coupon>(`/api/coupons/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export async function updateCouponStatus(
  id: number,
  active: boolean
): Promise<Coupon> {
  return apiRequest<Coupon>(`/api/coupons/${id}/status?active=${active}`, {
    method: "PATCH",
    headers: authHeaders(),
  });
}

export async function deleteCoupon(id: number): Promise<void> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  await apiRequest<void>(`/api/coupons/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
