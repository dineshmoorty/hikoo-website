"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Enrollment,
  getMyAssignedStudents,
} from "@/services/EnrollmentService";

type EmployeeStudent = {
  enrollmentId: number;
  userId: number;
  name: string;
  email: string;
  course: string | null;
  courseCode: string | null;
  active: boolean;
  enrolledAt: string;
  assignedAt: string | null;
};

export default function EmployeeStudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<EmployeeStudent[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "EMPLOYEE") {
      router.replace("/employee/login");
      return;
    }

    loadStudents();
  }, [router]);

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const data: Enrollment[] = await getMyAssignedStudents();

      const mappedStudents: EmployeeStudent[] = data.map((item) => ({
        enrollmentId: item.id,
        userId: item.studentId,
        name: item.studentName,
        email: item.studentEmail,
        course: item.courseName,
        courseCode: item.courseCode,
        active: item.active,
        enrolledAt: item.enrolledAt,
        assignedAt: item.assignedAt,
      }));

      setStudents(mappedStudents);
    } catch (err) {
      console.error("Failed to load assigned students:", err);
      setError("Unable to load assigned students.");
    } finally {
      setLoading(false);
    }
  }

  const filteredStudents = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return students;
    }

    return students.filter((student) =>
      [
        student.name,
        student.email,
        student.course,
        student.courseCode,
      ]
        .filter(Boolean)
        .some((field) =>
          field!.toLowerCase().includes(value)
        )
    );
  }, [students, search]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400">
          Workspace
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
              Students
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View and manage students assigned to you.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-400">
              Assigned Students
            </p>

            <p className="mt-1 text-xl font-semibold text-gray-950">
              {students.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 sm:max-w-md"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>{error}</span>

          <button
            type="button"
            onClick={loadStudents}
            className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-4 text-sm text-gray-400">
            Loading assigned students...
          </p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
            ♙
          </div>

          <h2 className="mt-4 text-base font-semibold text-gray-900">
            No students found
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {search
              ? "Try a different search."
              : "No students have been assigned to you yet."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Course
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Assigned
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.enrollmentId}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Student */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                            {student.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {student.name}
                            </p>

                            <p className="truncate text-xs text-gray-400">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-gray-700">
                          {student.course || "Not assigned"}
                        </p>

                        {student.courseCode && (
                          <p className="mt-1 text-xs text-gray-400">
                            {student.courseCode}
                          </p>
                        )}
                      </td>

                      {/* Assigned */}
                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-700">
                          {formatDate(student.assignedAt)}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            student.active
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {student.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/employee/dashboard/students/${student.userId}`
                            )
                          }
                          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4 md:hidden">
            {filteredStudents.map((student) => (
              <div
                key={student.enrollmentId}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                      {student.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {student.name}
                      </p>

                      <p className="truncate text-xs text-gray-400">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      student.active
                        ? "bg-gray-100 text-gray-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {student.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {/* Course */}
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Course
                    </p>

                    <p className="mt-1 text-xs font-medium text-gray-800">
                      {student.course || "Not assigned"}
                    </p>

                    {student.courseCode && (
                      <p className="mt-1 text-[10px] text-gray-400">
                        {student.courseCode}
                      </p>
                    )}
                  </div>

                  {/* Assigned */}
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Assigned
                    </p>

                    <p className="mt-1 text-xs font-medium text-gray-800">
                      {formatDate(student.assignedAt)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/employee/dashboard/students/${student.userId}`
                    )
                  }
                  className="mt-4 w-full rounded-xl bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  View Student
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}