"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Enrollment,
  getMyAssignedStudent,
} from "@/services/EnrollmentService";

export default function EmployeeStudentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const studentId = Number(params.id);

  const [student, setStudent] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentId || Number.isNaN(studentId)) {
      setError("Invalid student ID");
      setLoading(false);
      return;
    }

    loadStudent();
  }, [studentId]);

  async function loadStudent() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyAssignedStudent(studentId);

      setStudent(data);
    } catch (err) {
      console.error("Failed to load student:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load student details"
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date: string | null) {
    if (!date) return "—";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                router.push("/employee/dashboard/students")
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 transition hover:bg-slate-50"
            >
              ←
            </button>

            <div>
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                Student Details
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Assigned student information
              </p>
            </div>

          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            E
          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* ===================================================
            LOADING
        =================================================== */}
        {loading && (
          <div className="space-y-6">

            <div className="h-48 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200" />

            <div className="grid gap-6 lg:grid-cols-2">

              <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200" />

              <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200" />

            </div>

          </div>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}
        {!loading && error && (
          <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">

            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                !
              </div>

              <div>

                <h2 className="font-bold text-red-900">
                  Unable to load student
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  <button
                    onClick={loadStudent}
                    className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Try Again
                  </button>

                  <button
                    onClick={() =>
                      router.push("/employee/dashboard/students")
                    }
                    className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Back to Students
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ===================================================
            STUDENT
        =================================================== */}
        {!loading && !error && student && (
          <div className="space-y-6">

            {/* =================================================
                PROFILE CARD
            ================================================= */}
            <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

              <div className="p-6 sm:p-8">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                  {/* Avatar */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-slate-900 text-2xl font-bold text-white shadow-lg">
                    {student.studentName
                      ?.charAt(0)
                      ?.toUpperCase() || "S"}
                  </div>

                  {/* Student info */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                          {student.studentName}
                        </h2>

                        <p className="mt-1 break-all text-sm text-slate-500">
                          {student.studentEmail}
                        </p>

                      </div>

                      <span
                        className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                          student.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {student.active ? "● Active" : "● Inactive"}
                      </span>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                        Student ID #{student.studentId}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        Enrollment #{student.id}
                      </span>

                      {student.courseCode && (
                        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                          {student.courseCode}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                TWO COLUMN INFORMATION
            ================================================= */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* =================================================
                  COURSE
              ================================================= */}
              <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                    📚
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Course Information
                    </h3>

                    <p className="text-sm text-slate-500">
                      Current course
                    </p>
                  </div>

                </div>

                <div className="space-y-5">

                  <InfoRow
                    label="Course Name"
                    value={student.courseName}
                  />

                  <InfoRow
                    label="Course Code"
                    value={student.courseCode || "—"}
                  />

                  <InfoRow
                    label="Status"
                    value={
                      student.active
                        ? "Active"
                        : "Inactive"
                    }
                  />

                </div>

              </section>

              {/* =================================================
                  ENROLLMENT
              ================================================= */}
              <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Enrollment Information
                    </h3>

                    <p className="text-sm text-slate-500">
                      Enrollment timeline
                    </p>
                  </div>

                </div>

                <div className="space-y-5">

                  <InfoRow
                    label="Enrollment ID"
                    value={`#${student.id}`}
                  />

                  <InfoRow
                    label="Enrolled On"
                    value={formatDate(student.enrolledAt)}
                  />

                  <InfoRow
                    label="Assigned On"
                    value={formatDate(student.assignedAt)}
                  />

                </div>

              </section>

            </div>

            {/* =================================================
                ASSIGNED MENTOR
            ================================================= */}
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-xl">
                  👨‍🏫
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Assignment
                  </h3>

                  <p className="text-sm text-slate-500">
                    Employee assignment information
                  </p>
                </div>

              </div>

              {student.employeeId ? (

                <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 font-bold text-purple-700">
                      {student.employeeName
                        ?.charAt(0)
                        ?.toUpperCase() || "E"}
                    </div>

                    <div className="min-w-0">

                      <p className="font-bold text-slate-900">
                        {student.employeeName}
                      </p>

                      <p className="mt-1 break-all text-sm text-slate-500">
                        {student.employeeEmail}
                      </p>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

                  <p className="font-semibold text-amber-800">
                    Assignment Pending
                  </p>

                  <p className="mt-1 text-sm text-amber-700">
                    No employee has been assigned to this enrollment.
                  </p>

                </div>

              )}

            </section>

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="text-lg font-bold">
                    Student Management
                  </h3>

                  <p className="mt-1 max-w-xl text-sm text-slate-300">
                    Manage attendance and track this student's
                    learning progress.
                  </p>

                </div>

                <button
                  onClick={() =>
                    router.push(
                      "/employee/dashboard/attendance"
                    )
                  }
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  Manage Attendance →
                </button>

              </div>

            </section>

          </div>
        )}

      </main>

    </div>
  );
}

// =============================================================
// INFO ROW
// =============================================================

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="break-words text-sm font-semibold text-slate-900 sm:text-right">
        {value}
      </span>

    </div>
  );
}