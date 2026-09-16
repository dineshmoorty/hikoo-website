import { apiRequest } from "@/lib/api";
import type {
  Coupon,
  CouponApplicableTo,
  UpdateCouponRequest,
} from "@/services/CouponService";

export type {
  Coupon,
  CouponApplicableTo,
  UpdateCouponRequest,
};

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

export async function getAdminCoupons(): Promise<Coupon[]> {
  return apiRequest<Coupon[]>("/api/admin/coupons", {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function getAdminCoupon(id: number): Promise<Coupon> {
  return apiRequest<Coupon>(`/api/admin/coupons/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function updateAdminCoupon(
  id: number,
  request: UpdateCouponRequest
): Promise<Coupon> {
  return apiRequest<Coupon>(`/api/admin/coupons/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(request),
  });
}

export async function updateAdminCouponStatus(
  id: number,
  active: boolean
): Promise<Coupon> {
  return apiRequest<Coupon>(
    `/api/admin/coupons/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}