"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAllEnrollments,
  assignEmployee,
  Enrollment,
} from "@/services/EnrollmentService";

import {
  getEmployees,
  Employee,
} from "@/services/SuperAdminService";

export default function SuperAdminAssignmentsPage() {
  const router = useRouter();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "SUPER_ADMIN") {
      router.replace("/super-admin/login");
      return;
    }

    loadData();
  }, [router]);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [enrollmentData, employeeData] = await Promise.all([
        getAllEnrollments(),
        getEmployees(),
      ]);

      setEnrollments(enrollmentData);
      setEmployees(employeeData);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load assignment data"
      );
    } finally {
      setLoading(false);
    }
  }

  const activeEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.active &&
        employee.role === "EMPLOYEE"
    );
  }, [employees]);

  const totalAssignments = enrollments.length;

  const assignedCount = enrollments.filter(
    (item) => item.employeeId !== null
  ).length;

  const pendingCount = enrollments.filter(
    (item) => item.employeeId === null
  ).length;

  const filteredEnrollments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return enrollments;

    return enrollments.filter((item) => {
      return (
        item.studentName
          .toLowerCase()
          .includes(query) ||
        item.studentEmail
          .toLowerCase()
          .includes(query) ||
        item.courseName
          .toLowerCase()
          .includes(query) ||
        (item.courseCode || "")
          .toLowerCase()
          .includes(query) ||
        (item.employeeName || "")
          .toLowerCase()
          .includes(query) ||
        (item.employeeEmail || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [enrollments, search]);

  function handleEmployeeChange(
    enrollmentId: number,
    employeeId: string
  ) {
    setSelectedEmployees((current) => ({
      ...current,
      [enrollmentId]: employeeId,
    }));
  }

  async function handleAssign(enrollment: Enrollment) {
    const selectedEmployeeId =
      selectedEmployees[enrollment.id];

    if (!selectedEmployeeId) {
      setError("Please select an employee first.");
      return;
    }

    const employeeId = Number(selectedEmployeeId);

    if (!employeeId) {
      setError("Invalid employee selected.");
      return;
    }

    const selectedEmployee = activeEmployees.find(
      (employee) => employee.id === employeeId
    );

    if (!selectedEmployee) {
      setError("Selected employee is not available.");
      return;
    }

    const isReassigning =
      enrollment.employeeId !== null;

    const confirmed = window.confirm(
      isReassigning
        ? `Reassign ${enrollment.studentName} - ${enrollment.courseName} to ${selectedEmployee.name}?`
        : `Assign ${enrollment.studentName} - ${enrollment.courseName} to ${selectedEmployee.name}?`
    );

    if (!confirmed) return;

    try {
      setAssigningId(enrollment.id);
      setError("");
      setSuccess("");

      const updated = await assignEmployee(
        enrollment.id,
        employeeId
      );

      setEnrollments((current) =>
        current.map((item) =>
          item.id === enrollment.id
            ? updated
            : item
        )
      );

      setSuccess(
        `${enrollment.studentName} has been ${
          isReassigning ? "reassigned" : "assigned"
        } to ${selectedEmployee.name}.`
      );

      setSelectedEmployees((current) => {
        const updatedSelection = { ...current };
        delete updatedSelection[enrollment.id];
        return updatedSelection;
      });
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to assign employee"
      );
    } finally {
      setAssigningId(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1500px]">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Student Assignment
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Assignments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Assign enrolled students to employees and manage
              their course ownership.
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={loading ? "animate-spin" : ""}>
              ↻
            </span>

            Refresh
          </button>

        </div>
      </div>

      {/* =====================================================
          ALERTS
      ===================================================== */}
      {success && (
        <div className="mb-5 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span>{success}</span>

          <button
            onClick={() => setSuccess("")}
            className="ml-4 text-green-600 hover:text-green-800"
          >
            ✕
          </button>
        </div>
      )}

      {error && (
        <div className="mb-5 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>

          <button
            onClick={() => setError("")}
            className="ml-4 text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Enrollments
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {totalAssignments}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
              📋
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-400">
            All student course enrollments
          </p>
        </div>

        {/* Assigned */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Assigned
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {assignedCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-lg">
              ✓
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-400">
            Students assigned to employees
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {pendingCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-lg">
              ⏳
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-400">
            Waiting for employee assignment
          </p>
        </div>

        {/* Employees */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Employees
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {activeEmployees.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg">
              👨‍💼
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-400">
            Available for assignment
          </p>
        </div>

      </div>

      {/* =====================================================
          DIRECTORY
      ===================================================== */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Toolbar */}
        <div className="border-b border-gray-100 p-5">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-base font-semibold text-gray-950">
                Student Assignments
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {filteredEnrollments.length}{" "}
                {filteredEnrollments.length === 1
                  ? "enrollment"
                  : "enrollments"}{" "}
                shown
              </p>
            </div>

            <div className="relative w-full md:max-w-md">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search student, course or employee..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
              />
            </div>

          </div>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}
        {loading ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

              <p className="mt-4 text-sm text-gray-500">
                Loading assignments...
              </p>

            </div>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          /* =================================================
              EMPTY
          ================================================= */
          <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
              📋
            </div>

            <h3 className="mt-5 text-base font-semibold text-gray-950">
              {search
                ? "No assignments found"
                : "No enrollments yet"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              {search
                ? "Try searching with another student, course or employee name."
                : "Student enrollments will appear here when students join courses."}
            </p>

          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================= */}
            <div className="hidden overflow-x-auto xl:block">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Course
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Employee
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

                  {filteredEnrollments.map((enrollment) => {

                    const selectedEmployeeId =
                      selectedEmployees[
                        enrollment.id
                      ] || "";

                    const isAssigning =
                      assigningId === enrollment.id;

                    return (
                      <tr
                        key={enrollment.id}
                        className="transition hover:bg-gray-50/70"
                      >

                        {/* Student */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                              {enrollment.studentName
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-gray-900">
                                {enrollment.studentName}
                              </p>

                              <p className="mt-0.5 truncate text-xs text-gray-400">
                                {enrollment.studentEmail}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Course */}
                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-gray-900">
                            {enrollment.courseName}
                          </p>

                          {enrollment.courseCode && (
                            <p className="mt-1 text-xs text-gray-400">
                              {enrollment.courseCode}
                            </p>
                          )}

                        </td>

                        {/* Employee */}
                        <td className="px-6 py-5">

                          {enrollment.employeeId ? (
                            <div>

                              <p className="text-sm font-medium text-gray-900">
                                {enrollment.employeeName}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {enrollment.employeeEmail}
                              </p>

                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Not assigned
                            </span>
                          )}

                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">

                          {enrollment.employeeId ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Assigned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                              Pending
                            </span>
                          )}

                        </td>

                        {/* Action */}
                        <td className="px-6 py-5">

                          <div className="flex items-center justify-end gap-2">

                            <select
                              value={selectedEmployeeId}
                              onChange={(event) =>
                                handleEmployeeChange(
                                  enrollment.id,
                                  event.target.value
                                )
                              }
                              className="h-10 min-w-[180px] rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-gray-400"
                            >
                              <option value="">
                                {enrollment.employeeId
                                  ? "Select employee"
                                  : "Assign employee"}
                              </option>

                              {activeEmployees.map(
                                (employee) => (
                                  <option
                                    key={employee.id}
                                    value={employee.id}
                                  >
                                    {employee.name}
                                  </option>
                                )
                              )}
                            </select>

                            <button
                              onClick={() =>
                                handleAssign(
                                  enrollment
                                )
                              }
                              disabled={
                                isAssigning ||
                                !selectedEmployeeId
                              }
                              className="rounded-lg bg-gray-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {isAssigning
                                ? "Saving..."
                                : enrollment.employeeId
                                ? "Reassign"
                                : "Assign"}
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

            {/* =================================================
                MOBILE / TABLET CARDS
            ================================================= */}
            <div className="divide-y divide-gray-100 xl:hidden">

              {filteredEnrollments.map((enrollment) => {

                const selectedEmployeeId =
                  selectedEmployees[
                    enrollment.id
                  ] || "";

                const isAssigning =
                  assigningId === enrollment.id;

                return (
                  <div
                    key={enrollment.id}
                    className="p-5"
                  >

                    {/* Student */}
                    <div className="flex items-start gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                        {enrollment.studentName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-sm font-semibold text-gray-950">
                            {enrollment.studentName}
                          </h3>

                          {enrollment.employeeId ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Assigned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1 text-[11px] font-semibold text-yellow-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                              Pending
                            </span>
                          )}

                        </div>

                        <p className="mt-1 break-all text-sm text-gray-500">
                          {enrollment.studentEmail}
                        </p>

                      </div>

                    </div>

                    {/* Course */}
                    <div className="mt-5 rounded-xl bg-gray-50 p-4">

                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Course
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {enrollment.courseName}
                      </p>

                      {enrollment.courseCode && (
                        <p className="mt-1 text-xs text-gray-400">
                          {enrollment.courseCode}
                        </p>
                      )}

                    </div>

                    {/* Current employee */}
                    <div className="mt-4">

                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Current Employee
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {enrollment.employeeName ||
                          "Not assigned"}
                      </p>

                    </div>

                    {/* Assignment */}
                    <div className="mt-4">

                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                        {enrollment.employeeId
                          ? "Reassign Employee"
                          : "Assign Employee"}
                      </p>

                      <div className="flex gap-2">

                        <select
                          value={selectedEmployeeId}
                          onChange={(event) =>
                            handleEmployeeChange(
                              enrollment.id,
                              event.target.value
                            )
                          }
                          className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
                        >
                          <option value="">
                            Select employee
                          </option>

                          {activeEmployees.map(
                            (employee) => (
                              <option
                                key={employee.id}
                                value={employee.id}
                              >
                                {employee.name}
                              </option>
                            )
                          )}
                        </select>

                        <button
                          onClick={() =>
                            handleAssign(
                              enrollment
                            )
                          }
                          disabled={
                            isAssigning ||
                            !selectedEmployeeId
                          }
                          className="rounded-xl bg-gray-950 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {isAssigning
                            ? "..."
                            : enrollment.employeeId
                            ? "Reassign"
                            : "Assign"}
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          </>
        )}

      </div>

    </div>
  );
}