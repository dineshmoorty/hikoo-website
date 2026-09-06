import { apiRequest } from "@/lib/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  name: string;
  email: string;
}

/**
 * Login user
 */
export async function loginUser(
  request: LoginRequest
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: request.email.trim().toLowerCase(),
      password: request.password,
    }),
  });
}

/**
 * Register student
 *
 * Registration DOES NOT automatically login the student.
 */
export async function registerStudent(
  request: RegisterRequest
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: request.name.trim(),
      email: request.email.trim().toLowerCase(),
      password: request.password,
    }),
  });
}