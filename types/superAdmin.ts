export interface SuperAdminDashboardResponse {
  totalUsers: number;
  totalStudents: number;
  totalAdmins: number;
  totalEmployees: number;
  totalSuperAdmins: number;
  activeUsers: number;
  inactiveUsers: number;
}

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "EMPLOYEE"
  | "STUDENT";

export interface SuperAdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}