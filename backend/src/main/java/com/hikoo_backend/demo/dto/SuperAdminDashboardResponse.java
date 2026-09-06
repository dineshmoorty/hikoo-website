package com.hikoo_backend.demo.dto;

public record SuperAdminDashboardResponse(
        long totalUsers,
        long totalStudents,
        long totalAdmins,
        long totalEmployees,
        long totalSuperAdmins,
        long activeUsers,
        long inactiveUsers
) {
}