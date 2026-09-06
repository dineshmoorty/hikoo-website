import { apiRequest } from "@/lib/api";
import {
  SuperAdminDashboardResponse,
  SuperAdminUser,
} from "@/types/superAdmin";

/* =========================================================
   SUPER ADMIN DASHBOARD
========================================================= */

export async function getSuperAdminDashboard(): Promise<SuperAdminDashboardResponse> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminDashboardResponse>(
    "/api/super-admin/dashboard",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/* =========================================================
   USERS
========================================================= */

export async function getSuperAdminUsers(): Promise<SuperAdminUser[]> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser[]>(
    "/api/super-admin/users",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function updateUserStatus(
  id: number,
  active: boolean
): Promise<SuperAdminUser> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser>(
    `/api/super-admin/users/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/* =========================================================
   ADMIN
========================================================= */

export interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
}

export async function createAdmin(
  request: CreateAdminRequest
): Promise<SuperAdminUser> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser>("/api/super-admin/admins", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

// ==========================================
// GET ALL ADMINS
// ==========================================

export async function getAllAdmins(): Promise<SuperAdminUser[]> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser[]>(
    "/api/super-admin/admins",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


// ==========================================
// GET ADMIN
// ==========================================

export async function getAdmin(
  id: number
): Promise<SuperAdminUser> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser>(
    `/api/super-admin/admins/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


// ==========================================
// UPDATE ADMIN
// ==========================================

export interface UpdateAdminRequest {
  name?: string;
  email?: string;
  password?: string;
}

export async function updateAdmin(
  id: number,
  request: UpdateAdminRequest
): Promise<SuperAdminUser> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser>(
    `/api/super-admin/admins/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
}


// ==========================================
// ADMIN STATUS
// ==========================================

export async function updateAdminStatus(
  id: number,
  active: boolean
): Promise<SuperAdminUser> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser>(
    `/api/super-admin/admins/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/* =========================================================
   EMPLOYEE
========================================================= */

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  password: string;
}

export async function createEmployee(
  request: CreateEmployeeRequest
): Promise<SuperAdminUser> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<SuperAdminUser>("/api/employees", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

/* =========================================================
   EMPLOYEE MANAGEMENT
========================================================= */

export interface Employee {
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

/* Get all employees */

export async function getEmployees(): Promise<Employee[]> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<Employee[]>(
    "/api/super-admin/employees",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/* Get single employee */

export async function getEmployee(
  id: number
): Promise<Employee> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<Employee>(
    `/api/super-admin/employees/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/* Update employee */

export interface UpdateEmployeeRequest {
  name?: string;
  email?: string;

  designation?: string;
  specialization?: string;
  department?: string;

  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export async function updateEmployee(
  id: number,
  request: UpdateEmployeeRequest
): Promise<Employee> {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<Employee>(
    `/api/super-admin/employees/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
}

// student

export interface Student {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt?: string;
}

export interface CreateStudentRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateStudentRequest {
  name: string;
  email: string;
}

function getToken() {
  const token = localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error("Authentication required");
  }

  return token;
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  };
}

/**
 * Get all students
 */
export async function getStudents(): Promise<Student[]> {
  return apiRequest<Student[]>("/api/super-admin/students", {
    method: "GET",
    headers: authHeaders(),
  });
}

/**
 * Add student
 */
export async function createStudent(
  data: CreateStudentRequest
): Promise<Student> {
  return apiRequest<Student>("/api/super-admin/students", {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    }),
  });
}

/**
 * Edit student
 */
export async function updateStudent(
  id: number,
  data: UpdateStudentRequest
): Promise<Student> {
  return apiRequest<Student>(`/api/super-admin/students/${id}`, {
    method: "PATCH",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
    }),
  });
}

/**
 * Activate / Deactivate student
 */
export async function updateStudentStatus(
  id: number,
  active: boolean
): Promise<Student> {
  return apiRequest<Student>(
    `/api/super-admin/students/${id}/status?active=${active}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
}