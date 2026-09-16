"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMyEmployeeCourses,
  EmployeeCourse,
} from "@/services/EmployeeCourseService";

export default function EmployeeDashboardPage() {
  const router = useRouter();

  const [name, setName] = useState("Employee");
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [studentsCount, setStudentsCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [courses, setCourses] = useState<EmployeeCourse[]>([]);
  const [internshipsCount, setInternshipsCount] = useState(0);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");
    const storedName = localStorage.getItem("hikoo_name");

    if (!token || role !== "EMPLOYEE") {
      router.replace("/employee/login");
      return;
    }

    if (storedName) {
      setName(storedName);
    }

    setCheckingAuth(false);

    async function loadDashboard() {
      try {
        setDashboardLoading(true);
        setDashboardError("");

        const courseData = await getMyEmployeeCourses();
        setCourses(courseData);

        // These two counts are loaded independently so one unavailable
        // feature does not break the rest of the dashboard.
        const headers = { Authorization: `Bearer ${token}` };

        const [studentsResult, attendanceResult, internshipsResult] =
          await Promise.allSettled([
            fetch("/api/employee/students", {
              method: "GET",
              headers,
            }),
            fetch("/api/attendance/employee/today", {
              method: "GET",
              headers,
            }),
            fetch("/api/employee/internships", {
              method: "GET",
              headers,
            }),
          ]);

        if (
          studentsResult.status === "fulfilled" &&
          studentsResult.value.ok
        ) {
          const data = await studentsResult.value.json();
          setStudentsCount(Array.isArray(data) ? data.length : 0);
        }

        if (
          attendanceResult.status === "fulfilled" &&
          attendanceResult.value.ok
        ) {
          const data = await attendanceResult.value.json();
          if (Array.isArray(data)) {
            setAttendanceCount(data.length);
          } else if (typeof data?.count === "number") {
            setAttendanceCount(data.count);
          }
        }

        if (
          internshipsResult.status === "fulfilled" &&
          internshipsResult.value.ok
        ) {
          const data = await internshipsResult.value.json();
          setInternshipsCount(Array.isArray(data) ? data.length : 0);
        }
      } catch (error) {
        console.error("Failed to load employee dashboard:", error);
        setDashboardError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data."
        );
      } finally {
        setDashboardLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
          Welcome, {name} 👋
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here&apos;s an overview of your HIKOO workspace.
        </p>
      </div>

      {dashboardError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {dashboardError}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Students",
            value: dashboardLoading ? "…" : String(studentsCount),
            description: "Students assigned",
          },
          {
            title: "Attendance",
            value: dashboardLoading ? "…" : String(attendanceCount),
            description: "Today&apos;s attendance",
          },
          {
            title: "Courses",
            value: dashboardLoading ? "…" : String(courses.length),
            description: "Active courses",
          },
          {
            title: "Internships",
            value: dashboardLoading ? "…" : String(internshipsCount),
            description: "Active internships",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-400">
              {card.title}
            </p>

            <p className="mt-3 text-3xl font-semibold text-gray-950">
              {card.value}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Workspace */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          Workspace
        </p>

        <h2 className="mt-2 text-xl font-semibold text-gray-950">
          Employee workspace
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Manage students, attendance, courses, internships and
          certificates from your employee workspace.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Students",
              description: "Manage assigned students",
              href: "/employee/dashboard/students",
            },
            {
              title: "Attendance",
              description: "View and manage attendance",
              href: "/employee/dashboard/attendance",
            },
            {
              title: "Courses",
              description: "View your assigned courses",
              href: "/employee/dashboard/courses",
            },
            {
              title: "Internships",
              description: "Manage internship activities",
              href: "/employee/dashboard/internships",
            },
            {
              title: "Certificates",
              description: "Manage certificates",
              href: "/employee/dashboard/certificates",
            },
            {
              title: "Profile",
              description: "View your employee profile",
              href: "/employee/dashboard/profile",
            },
          ].map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => router.push(item.href)}
              className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-left transition hover:border-gray-200 hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-gray-900">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {item.description}
              </p>
            </button>
          ))}
        </div>

        {courses.length > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-950">
                  Assigned Courses
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Quick access to your assigned learning content.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/employee/dashboard/courses")}
                className="text-xs font-semibold text-gray-700 hover:text-gray-950"
              >
                View all
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() =>
                    router.push(
                      `/employee/dashboard/courses/${course.id}`
                    )
                  }
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left transition hover:border-gray-200 hover:bg-white hover:shadow-sm"
                >
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {course.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {course.code || "Assigned course"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}