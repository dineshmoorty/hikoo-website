"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getMyAttendance,
  type StudentAttendance,
} from "@/services/StudentAttendanceService";

type CourseAttendance = {
  courseId: number;
  courseName: string;
  courseCode: string | null;
  employeeName: string | null;

  records: StudentAttendance[];

  present: number;
  absent: number;
  total: number;
  percentage: number;
};

export default function StudentAttendancePage() {
  const router = useRouter();

  const [records, setRecords] = useState<StudentAttendance[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCourse, setSelectedCourse] =
    useState<number | "ALL">("ALL");

  // ==========================================================
  // AUTH + LOAD
  // ==========================================================

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "STUDENT") {
      router.replace("/student/login");
      return;
    }

    loadAttendance();
  }, [router]);

  // ==========================================================
  // LOAD
  // ==========================================================

  async function loadAttendance() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyAttendance();

      setRecords(data);
    } catch (err) {
      console.error(
        "Student attendance error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load attendance"
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // COURSE GROUPING
  // ==========================================================

  const courses = useMemo<CourseAttendance[]>(() => {
    const map = new Map<
      number,
      StudentAttendance[]
    >();

    records.forEach((record) => {
      const existing =
        map.get(record.courseId) || [];

      existing.push(record);

      map.set(record.courseId, existing);
    });

    return Array.from(map.entries()).map(
      ([courseId, courseRecords]) => {
        const present =
          courseRecords.filter(
            (item) =>
              item.status === "PRESENT"
          ).length;

        const absent =
          courseRecords.filter(
            (item) =>
              item.status === "ABSENT"
          ).length;

        const total =
          courseRecords.length;

        const percentage =
          total === 0
            ? 0
            : Math.round(
                (present / total) * 100
              );

        const first = courseRecords[0];

        return {
          courseId,
          courseName: first.courseName,
          courseCode: first.courseCode,
          employeeName: first.employeeName,
          records: courseRecords,
          present,
          absent,
          total,
          percentage,
        };
      }
    );
  }, [records]);

  // ==========================================================
  // OVERALL SUMMARY
  // ==========================================================

  const totalPresent = records.filter(
    (item) => item.status === "PRESENT"
  ).length;

  const totalAbsent = records.filter(
    (item) => item.status === "ABSENT"
  ).length;

  const totalRecords = records.length;

  const overallPercentage =
    totalRecords === 0
      ? 0
      : Math.round(
          (totalPresent / totalRecords) * 100
        );

  // ==========================================================
  // FILTERED RECORDS
  // ==========================================================

  const filteredRecords = useMemo(() => {
    if (selectedCourse === "ALL") {
      return records;
    }

    return records.filter(
      (record) =>
        record.courseId === selectedCourse
    );
  }, [records, selectedCourse]);

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  function formatDate(date: string) {
    const parsed = new Date(
      `${date}T00:00:00`
    );

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
        <p className="text-sm text-gray-400">
          Loading attendance...
        </p>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="mx-auto max-w-7xl">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-8">

        <p className="text-sm font-medium text-gray-400">
          Student Workspace
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
          Attendance
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Track your attendance across all enrolled courses.
        </p>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ======================================================
          OVERALL STATS
      ====================================================== */}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          label="Overall Attendance"
          value={`${overallPercentage}%`}
        />

        <StatCard
          label="Present"
          value={totalPresent}
        />

        <StatCard
          label="Absent"
          value={totalAbsent}
        />

        <StatCard
          label="Total Classes"
          value={totalRecords}
        />

      </div>

      {/* ======================================================
          NO ATTENDANCE
      ====================================================== */}

      {records.length === 0 ? (

        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
            ✓
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-950">
            No attendance records
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Attendance records will appear here once your assigned employee starts marking attendance.
          </p>

        </div>

      ) : (

        <>

          {/* ==================================================
              COURSE SUMMARY
          ================================================== */}

          <section className="mb-8">

            <div className="mb-4">

              <h2 className="text-lg font-semibold text-gray-950">
                Course Attendance
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Attendance summary for each enrolled course.
              </p>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {courses.map((course) => (

                <button
                  key={course.courseId}
                  type="button"
                  onClick={() =>
                    setSelectedCourse(
                      course.courseId
                    )
                  }
                  className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
                    selectedCourse ===
                    course.courseId
                      ? "border-gray-950"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <p className="truncate text-base font-semibold text-gray-950">
                        {course.courseName}
                      </p>

                      {course.courseCode && (
                        <p className="mt-1 text-xs text-gray-400">
                          {course.courseCode}
                        </p>
                      )}

                    </div>

                    <div className="shrink-0 text-right">

                      <p className="text-2xl font-semibold text-gray-950">
                        {course.percentage}%
                      </p>

                      <p className="text-xs text-gray-400">
                        attendance
                      </p>

                    </div>

                  </div>

                  {/* Progress */}

                  <div className="mt-5">

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className="h-full rounded-full bg-gray-950 transition-all"
                        style={{
                          width: `${course.percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Counts */}

                  <div className="mt-4 flex items-center gap-5 text-xs">

                    <span className="text-gray-500">
                      Present{" "}
                      <strong className="text-gray-900">
                        {course.present}
                      </strong>
                    </span>

                    <span className="text-gray-500">
                      Absent{" "}
                      <strong className="text-gray-900">
                        {course.absent}
                      </strong>
                    </span>

                    <span className="text-gray-500">
                      Total{" "}
                      <strong className="text-gray-900">
                        {course.total}
                      </strong>
                    </span>

                  </div>

                  {course.employeeName && (
                    <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-400">
                      Assigned employee:{" "}
                      <span className="font-medium text-gray-600">
                        {course.employeeName}
                      </span>
                    </p>
                  )}

                </button>

              ))}

            </div>

          </section>

          {/* ==================================================
              HISTORY
          ================================================== */}

          <section>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <h2 className="text-lg font-semibold text-gray-950">
                  Attendance History
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Daily attendance records.
                </p>

              </div>

              {/* Course filter */}

              <select
                value={selectedCourse}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  setSelectedCourse(
                    value === "ALL"
                      ? "ALL"
                      : Number(value)
                  );
                }}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
              >

                <option value="ALL">
                  All Courses
                </option>

                {courses.map((course) => (
                  <option
                    key={course.courseId}
                    value={course.courseId}
                  >
                    {course.courseName}
                  </option>
                ))}

              </select>

            </div>

            {/* Desktop */}

            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-gray-100 bg-gray-50">

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                        Date
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                        Course
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                        Remarks
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredRecords.map(
                      (record) => (

                        <tr
                          key={record.id}
                          className="border-b border-gray-100 last:border-b-0"
                        >

                          <td className="px-5 py-4 text-sm font-medium text-gray-800">
                            {formatDate(
                              record.attendanceDate
                            )}
                          </td>

                          <td className="px-5 py-4">

                            <p className="text-sm font-medium text-gray-800">
                              {record.courseName}
                            </p>

                            {record.courseCode && (
                              <p className="mt-1 text-xs text-gray-400">
                                {record.courseCode}
                              </p>
                            )}

                          </td>

                          <td className="px-5 py-4">

                            <StatusBadge
                              status={
                                record.status
                              }
                            />

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-500">
                            {record.remarks ||
                              "—"}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* Mobile */}

            <div className="space-y-3 md:hidden">

              {filteredRecords.map(
                (record) => (

                  <div
                    key={record.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-sm font-semibold text-gray-950">
                          {formatDate(
                            record.attendanceDate
                          )}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {record.courseName}
                        </p>

                      </div>

                      <StatusBadge
                        status={
                          record.status
                        }
                      />

                    </div>

                    {record.remarks && (
                      <div className="mt-4 rounded-xl bg-gray-50 px-3 py-2.5">

                        <p className="text-xs text-gray-400">
                          Remarks
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          {record.remarks}
                        </p>

                      </div>
                    )}

                  </div>

                )
              )}

            </div>

            {filteredRecords.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">

                <p className="text-sm text-gray-500">
                  No attendance records for this course.
                </p>

              </div>
            )}

          </section>

        </>

      )}

    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-gray-950">
        {value}
      </p>

    </div>
  );
}

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({
  status,
}: {
  status: "PRESENT" | "ABSENT";
}) {
  if (status === "PRESENT") {
    return (
      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800">
        Present
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-gray-950 px-3 py-1.5 text-xs font-semibold text-white">
      Absent
    </span>
  );
}