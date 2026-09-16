"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import StatCard from "@/components/super-admin/StatCard";
import { getSuperAdminDashboard } from "@/services/SuperAdminService";
import { SuperAdminDashboardResponse } from "@/types/superAdmin";

export default function SuperAdminDashboardPage() {
  const router = useRouter();

  const [dashboard, setDashboard] =
    useState<SuperAdminDashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "SUPER_ADMIN") {
        router.replace("/super-admin/login");
        return;
      }

      try {
        const data = await getSuperAdminDashboard();
        setDashboard(data);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  const activePercentage = useMemo(() => {
    if (!dashboard || dashboard.totalUsers <= 0) return 0;

    return Math.round(
      (dashboard.activeUsers / dashboard.totalUsers) * 100
    );
  }, [dashboard]);

  const inactivePercentage = useMemo(() => {
    if (!dashboard || dashboard.totalUsers <= 0) return 0;

    return Math.round(
      (dashboard.inactiveUsers / dashboard.totalUsers) * 100
    );
  }, [dashboard]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-4 text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600">
            {error || "Unable to load dashboard"}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-gray-950 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px]">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Platform Overview
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Good morning, Super Admin 👋
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Manage your HIKOO platform, users, students, employees and
              courses from one place.
            </p>
          </div>

          {/* <button
            onClick={() => router.push("/super-admin/dashboard/students")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
          >
            <span className="text-lg leading-none">+</span>
            Add Student
          </button> */}
        </div>
      </div>

      {/* =====================================================
          PRIMARY STATS
      ===================================================== */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Users"
          value={dashboard.totalUsers}
          description="All registered users"
          icon="♙"
        />

        <StatCard
          title="Students"
          value={dashboard.totalStudents}
          description="Registered students"
          icon="🎓"
        />

        <StatCard
          title="Admins"
          value={dashboard.totalAdmins}
          description="Platform administrators"
          icon="◈"
        />

        <StatCard
          title="Employees"
          value={dashboard.totalEmployees}
          description="Platform staff"
          icon="◆"
        />

      </div>

      {/* =====================================================
          SECONDARY STATS
      ===================================================== */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Active Users"
          value={dashboard.activeUsers}
          description="Currently active accounts"
          icon="●"
        />

        <StatCard
          title="Inactive Users"
          value={dashboard.inactiveUsers}
          description="Deactivated accounts"
          icon="○"
        />

        <StatCard
          title="Super Admins"
          value={dashboard.totalSuperAdmins}
          description="Platform owners"
          icon="♛"
        />

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">

        {/* -------------------------------------------------
            ACCOUNT HEALTH
        ------------------------------------------------- */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-950">
                Account Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current status of all HIKOO platform accounts.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Live
            </span>
          </div>

          <div className="mt-8 space-y-7">

            {/* Active */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Active accounts
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {activePercentage}% of total users
                  </p>
                </div>

                <span className="text-lg font-bold text-gray-950">
                  {dashboard.activeUsers}
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gray-950 transition-all duration-500"
                  style={{
                    width: `${activePercentage}%`,
                  }}
                />
              </div>
            </div>

            {/* Inactive */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Inactive accounts
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {inactivePercentage}% of total users
                  </p>
                </div>

                <span className="text-lg font-bold text-gray-950">
                  {dashboard.inactiveUsers}
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gray-400 transition-all duration-500"
                  style={{
                    width: `${inactivePercentage}%`,
                  }}
                />
              </div>
            </div>

          </div>

          {/* Role breakdown */}
          <div className="mt-8 grid gap-3 border-t border-gray-100 pt-6 sm:grid-cols-3">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-400">
                Students
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-950">
                {dashboard.totalStudents}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-400">
                Employees
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-950">
                {dashboard.totalEmployees}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-400">
                Admins
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-950">
                {dashboard.totalAdmins}
              </p>
            </div>

          </div>
        </div>

        {/* -------------------------------------------------
            QUICK ACTIONS
        ------------------------------------------------- */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-lg font-semibold text-gray-950">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Common administration tasks.
            </p>
          </div>

          <div className="mt-6 space-y-3">

            {/* Students */}
            <button
              onClick={() =>
                router.push("/super-admin/dashboard/students")
              }
              className="group flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-300 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-lg text-white">
                🎓
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Manage Students
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Add and manage students
                </p>
              </div>

              <span className="text-gray-400 transition group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Employees */}
            <button
              onClick={() =>
                router.push("/super-admin/dashboard/employees")
              }
              className="group flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-300 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                👨‍💼
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Manage Employees
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  View platform employees
                </p>
              </div>

              <span className="text-gray-400 transition group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Courses */}
            <button
              onClick={() =>
                router.push("/super-admin/dashboard/courses")
              }
              className="group flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-300 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                🏫
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Manage Courses
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  View and manage courses
                </p>
              </div>

              <span className="text-gray-400 transition group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Users */}
            <button
              onClick={() =>
                router.push("/super-admin/dashboard/users")
              }
              className="group flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-300 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                👥
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Manage Users
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  View all platform users
                </p>
              </div>

              <span className="text-gray-400 transition group-hover:translate-x-1">
                →
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* =====================================================
          PLATFORM SUMMARY
      ===================================================== */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-950 p-6 text-white shadow-sm">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              HIKOO Platform
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Everything is under control.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
              Use the management sections to control students, employees,
              courses, users and platform access.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-5">

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <p className="text-2xl font-bold">
                {dashboard.totalStudents}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Students
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <p className="text-2xl font-bold">
                {dashboard.totalEmployees}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Employees
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <p className="text-2xl font-bold">
                {dashboard.totalAdmins}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Admins
              </p>
            </div>

          </div>
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

    </div>
  );
}