"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getMyAssignedStudents,
  type Enrollment,
} from "@/services/EnrollmentService";

import {
  getEnrollmentAttendance,
  markAttendance,
  type AttendanceRecord,
  type AttendanceStatus,
} from "@/services/EmployeeAttendanceService";

type StudentAttendanceRow = {
  enrollment: Enrollment;
  attendance: AttendanceRecord | null;
  status: AttendanceStatus | "UNMARKED";
  remarks: string;
};

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export default function EmployeeAttendancePage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(getToday());

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [statusMap, setStatusMap] = useState<
    Record<number, AttendanceStatus | "UNMARKED">
  >({});

  const [remarksMap, setRemarksMap] = useState<
    Record<number, string>
  >({});

  // ==========================================================
  // AUTH + LOAD
  // ==========================================================

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "EMPLOYEE") {
      router.replace("/employee/login");
      return;
    }

    loadData();
  }, [router, selectedDate]);

  // ==========================================================
  // LOAD ASSIGNED STUDENTS + ATTENDANCE
  // ==========================================================

  async function loadData() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // -------------------------------------------------------
      // IMPORTANT:
      // Only assigned enrollments are loaded.
      // -------------------------------------------------------

      const assignedEnrollments =
        await getMyAssignedStudents();

      setEnrollments(assignedEnrollments);

      // -------------------------------------------------------
      // Load attendance for each enrollment.
      // -------------------------------------------------------

      const attendanceResults =
        await Promise.all(
          assignedEnrollments.map((enrollment) =>
            getEnrollmentAttendance(enrollment.id)
          )
        );

      const allAttendance =
        attendanceResults.flat();

      setAttendance(allAttendance);

      // -------------------------------------------------------
      // Build today's status map
      // -------------------------------------------------------

      const newStatusMap: Record<
        number,
        AttendanceStatus | "UNMARKED"
      > = {};

      const newRemarksMap: Record<number, string> = {};

      assignedEnrollments.forEach((enrollment) => {
        const record = allAttendance.find(
          (item) =>
            item.enrollmentId === enrollment.id &&
            item.attendanceDate === selectedDate
        );

        if (!record) {
          newStatusMap[enrollment.id] = "UNMARKED";
          newRemarksMap[enrollment.id] = "";
          return;
        }

        newStatusMap[enrollment.id] = record.status;

        newRemarksMap[enrollment.id] =
          record.remarks || "";
      });

      setStatusMap(newStatusMap);
      setRemarksMap(newRemarksMap);
    } catch (err) {
      console.error("Attendance load error:", err);

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
  // STATUS
  // ==========================================================

  function setStudentStatus(
    enrollmentId: number,
    status: AttendanceStatus
  ) {
    setStatusMap((previous) => ({
      ...previous,
      [enrollmentId]: status,
    }));

    setSuccess("");
  }

  // ==========================================================
  // REMARKS
  // ==========================================================

  function setStudentRemarks(
    enrollmentId: number,
    remarks: string
  ) {
    setRemarksMap((previous) => ({
      ...previous,
      [enrollmentId]: remarks,
    }));

    setSuccess("");
  }

  // ==========================================================
  // SAVE ATTENDANCE
  // ==========================================================

  async function saveAttendance() {
    try {
      setSaving(true);

      setError("");
      setSuccess("");

      const studentsToSave = enrollments.filter(
        (enrollment) =>
          statusMap[enrollment.id] === "PRESENT" ||
          statusMap[enrollment.id] === "ABSENT"
      );

      if (studentsToSave.length === 0) {
        setError("Please mark at least one student.");
        return;
      }

      // ------------------------------------------------------
      // Check whether attendance already exists.
      // ------------------------------------------------------

      const alreadyMarked = studentsToSave.filter(
        (enrollment) =>
          attendance.some(
            (record) =>
              record.enrollmentId === enrollment.id &&
              record.attendanceDate === selectedDate
          )
      );

      if (alreadyMarked.length > 0) {
        setError(
          "Attendance is already marked for one or more selected students on this date."
        );

        return;
      }

      // ------------------------------------------------------
      // Save each enrollment attendance
      // ------------------------------------------------------

      await Promise.all(
        studentsToSave.map((enrollment) => {
          const status = statusMap[enrollment.id];

          if (
            status !== "PRESENT" &&
            status !== "ABSENT"
          ) {
            return Promise.resolve();
          }

          return markAttendance({
            enrollmentId: enrollment.id,
            attendanceDate: selectedDate,
            status,
            remarks:
              remarksMap[enrollment.id] || "",
          });
        })
      );

      setSuccess(
        "Attendance saved successfully."
      );

      await loadData();
    } catch (err) {
      console.error("Attendance save error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save attendance"
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================================
  // MARK ALL
  // ==========================================================

  function markAll(
    status: AttendanceStatus
  ) {
    const updated: Record<
      number,
      AttendanceStatus | "UNMARKED"
    > = {};

    enrollments.forEach((enrollment) => {
      updated[enrollment.id] = status;
    });

    setStatusMap(updated);

    setSuccess("");
  }

  // ==========================================================
  // ROWS
  // ==========================================================

  const rows: StudentAttendanceRow[] =
    useMemo(() => {
      return enrollments.map((enrollment) => {
        const record =
          attendance.find(
            (item) =>
              item.enrollmentId === enrollment.id &&
              item.attendanceDate === selectedDate
          ) || null;

        return {
          enrollment,
          attendance: record,
          status:
            statusMap[enrollment.id] ||
            "UNMARKED",
          remarks:
            remarksMap[enrollment.id] || "",
        };
      });
    }, [
      enrollments,
      attendance,
      statusMap,
      remarksMap,
      selectedDate,
    ]);

  // ==========================================================
  // COUNTS
  // ==========================================================

  const presentCount = rows.filter(
    (row) => row.status === "PRESENT"
  ).length;

  const absentCount = rows.filter(
    (row) => row.status === "ABSENT"
  ).length;

  const unmarkedCount = rows.filter(
    (row) => row.status === "UNMARKED"
  ).length;

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
        <div className="text-sm text-gray-400">
          Loading attendance...
        </div>
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
          Employee Workspace
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
              Attendance
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View and manage attendance for your assigned students.
            </p>

          </div>

          {enrollments.length > 0 && (
            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={() =>
                  markAll("PRESENT")
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Mark All Present
              </button>

              <button
                type="button"
                onClick={() =>
                  markAll("ABSENT")
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Mark All Absent
              </button>

            </div>
          )}

        </div>

      </div>

      {/* ======================================================
          DATE + SUMMARY
      ====================================================== */}

      <div className="mb-6 grid gap-4 lg:grid-cols-[auto_1fr]">

        {/* Date */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
            Attendance Date
          </p>

          <input
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(
                event.target.value
              )
            }
            className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
          />

        </div>

        {/* Summary */}

        <div className="grid grid-cols-3 gap-3">

          <SummaryCard
            label="Present"
            value={presentCount}
          />

          <SummaryCard
            label="Absent"
            value={absentCount}
          />

          <SummaryCard
            label="Unmarked"
            value={unmarkedCount}
          />

        </div>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ======================================================
          SUCCESS
      ====================================================== */}

      {success && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* ======================================================
          EMPTY
      ====================================================== */}

      {enrollments.length === 0 ? (

        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
            ♙
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-950">
            No assigned students
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            There are no students assigned to you for attendance management.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/employee/dashboard/students"
              )
            }
            className="mt-5 rounded-xl bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            View Students
          </button>

        </div>

      ) : (

        <>

          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead>

                  <tr className="border-b border-gray-100 bg-gray-50">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Student
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Course
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Remarks
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {rows.map((row) => (

                    <tr
                      key={row.enrollment.id}
                      className="border-b border-gray-100 last:border-b-0"
                    >

                      {/* Student */}

                      <td className="px-5 py-4">

                        <div>

                          <p className="text-sm font-semibold text-gray-900">
                            {row.enrollment.studentName}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {row.enrollment.studentEmail}
                          </p>

                        </div>

                      </td>

                      {/* Course */}

                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-gray-700">
                          {row.enrollment.courseName}
                        </p>

                        {row.enrollment.courseCode && (
                          <p className="mt-1 text-xs text-gray-400">
                            {row.enrollment.courseCode}
                          </p>
                        )}

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            type="button"
                            disabled={
                              row.attendance !== null
                            }
                            onClick={() =>
                              setStudentStatus(
                                row.enrollment.id,
                                "PRESENT"
                              )
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                              row.status === "PRESENT"
                                ? "bg-gray-950 text-white"
                                : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                            } ${
                              row.attendance
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                          >
                            Present
                          </button>

                          <button
                            type="button"
                            disabled={
                              row.attendance !== null
                            }
                            onClick={() =>
                              setStudentStatus(
                                row.enrollment.id,
                                "ABSENT"
                              )
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                              row.status === "ABSENT"
                                ? "bg-gray-950 text-white"
                                : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                            } ${
                              row.attendance
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                          >
                            Absent
                          </button>

                        </div>

                      </td>

                      {/* Remarks */}

                      <td className="px-5 py-4">

                        <input
                          type="text"
                          value={row.remarks}
                          disabled={
                            row.attendance !== null
                          }
                          onChange={(event) =>
                            setStudentRemarks(
                              row.enrollment.id,
                              event.target.value
                            )
                          }
                          placeholder="Optional"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                        />

                      </td>

                      {/* View */}

                      <td className="px-5 py-4 text-center">

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/employee/dashboard/students/${row.enrollment.studentId}`
                            )
                          }
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
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

          {/* ==================================================
              MOBILE
          ================================================== */}

          <div className="space-y-4 lg:hidden">

            {rows.map((row) => (

              <div
                key={row.enrollment.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >

                {/* Student */}

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-gray-950">
                      {row.enrollment.studentName}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-400">
                      {row.enrollment.studentEmail}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/employee/dashboard/students/${row.enrollment.studentId}`
                      )
                    }
                    className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600"
                  >
                    View
                  </button>

                </div>

                {/* Course */}

                <div className="mt-4 rounded-xl bg-gray-50 p-4">

                  <p className="text-xs font-medium text-gray-400">
                    Course
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {row.enrollment.courseName}
                  </p>

                  {row.enrollment.courseCode && (
                    <p className="mt-1 text-xs text-gray-400">
                      {row.enrollment.courseCode}
                    </p>
                  )}

                </div>

                {/* Status */}

                <div className="mt-4">

                  <p className="mb-2 text-xs font-medium text-gray-400">
                    Attendance Status
                  </p>

                  <div className="grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      disabled={
                        row.attendance !== null
                      }
                      onClick={() =>
                        setStudentStatus(
                          row.enrollment.id,
                          "PRESENT"
                        )
                      }
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        row.status === "PRESENT"
                          ? "bg-gray-950 text-white"
                          : "border border-gray-200 bg-white text-gray-600"
                      } ${
                        row.attendance
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      Present
                    </button>

                    <button
                      type="button"
                      disabled={
                        row.attendance !== null
                      }
                      onClick={() =>
                        setStudentStatus(
                          row.enrollment.id,
                          "ABSENT"
                        )
                      }
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        row.status === "ABSENT"
                          ? "bg-gray-950 text-white"
                          : "border border-gray-200 bg-white text-gray-600"
                      } ${
                        row.attendance
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      Absent
                    </button>

                  </div>

                </div>

                {/* Remarks */}

                <div className="mt-4">

                  <label className="text-xs font-medium text-gray-400">
                    Remarks
                  </label>

                  <input
                    type="text"
                    value={row.remarks}
                    disabled={
                      row.attendance !== null
                    }
                    onChange={(event) =>
                      setStudentRemarks(
                        row.enrollment.id,
                        event.target.value
                      )
                    }
                    placeholder="Optional remarks"
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  />

                </div>

                {/* Already marked */}

                {row.attendance && (
                  <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500">
                    Attendance already marked for this date.
                  </div>
                )}

              </div>

            ))}

          </div>

          {/* ==================================================
              SAVE
          ================================================== */}

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-900">
                Attendance for {selectedDate}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {presentCount} present ·{" "}
                {absentCount} absent ·{" "}
                {unmarkedCount} unmarked
              </p>

            </div>

            <button
              type="button"
              onClick={saveAttendance}
              disabled={
                saving ||
                unmarkedCount === enrollments.length
              }
              className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Attendance"}
            </button>

          </div>

        </>

      )}

    </div>
  );
}

// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-gray-950">
        {value}
      </p>

    </div>
  );
}