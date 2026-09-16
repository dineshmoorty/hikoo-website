"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ClipboardList,
  RefreshCw,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";

import {
  getAdminAssignments,
  getAdminEmployees,
  assignEmployeeToStudent,
  AdminAssignment,
  AdminEmployee,
} from "@/services/AdminAssignmentService";

export default function AdminAssignmentsPage() {
  const router = useRouter();

  // =========================================================
  // STATE
  // =========================================================

  const [enrollments, setEnrollments] = useState<AdminAssignment[]>(
    []
  );

  const [employees, setEmployees] = useState<AdminEmployee[]>([]);

  const [loading, setLoading] = useState(true);

  const [assigningId, setAssigningId] = useState<number | null>(
    null
  );

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [selectedEmployees, setSelectedEmployees] = useState<
    Record<number, string>
  >({});

  // =========================================================
  // AUTH + LOAD
  // =========================================================

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "ADMIN") {
      router.replace("/admin/login");
      return;
    }

    loadData();
  }, [router]);

  // =========================================================
  // LOAD DATA
  // =========================================================

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [enrollmentData, employeeData] =
        await Promise.all([
          getAdminAssignments(),
          getAdminEmployees(),
        ]);

      setEnrollments(enrollmentData);
      setEmployees(employeeData);

      console.log(
        "ASSIGNMENT EMPLOYEES:",
        employeeData
      );
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

  // =========================================================
  // ACTIVE EMPLOYEES
  //
  // IMPORTANT:
  // getEmployees() already returns ONLY employees from backend.
  //
  // DO NOT FILTER BY employee.role.
  // Employee interface does not need role.
  // =========================================================

  const activeEmployees = useMemo(() => {
    return employees.filter(
      (employee) => employee.active
    );
  }, [employees]);

  // =========================================================
  // COURSE / DEPARTMENT EMPLOYEE FILTER
  // =========================================================
  // Only employees belonging to the student's course department
  // appear in that enrollment's assignment dropdown.
  function getEmployeesForCourse(courseName: string) {
    const normalize = (value: string | null | undefined) =>
      (value ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    const normalizedCourse = normalize(courseName);

    if (!normalizedCourse) {
      return [];
    }

    return activeEmployees.filter((employee) => {
      const normalizedDepartment = normalize(employee.department);

      if (!normalizedDepartment) {
        return false;
      }

      return (
        normalizedDepartment === normalizedCourse ||
        normalizedDepartment.includes(normalizedCourse) ||
        normalizedCourse.includes(normalizedDepartment)
      );
    });
  }

  // =========================================================
  // COUNTS
  // =========================================================

  const totalEnrollments = enrollments.length;

  const assignedCount = enrollments.filter(
    (item) => item.employeeId !== null
  ).length;

  const pendingCount = enrollments.filter(
    (item) => item.employeeId === null
  ).length;

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredEnrollments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return enrollments;
    }

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

  // =========================================================
  // SELECT EMPLOYEE
  // =========================================================

  function handleEmployeeChange(
    enrollmentId: number,
    employeeUserId: string
  ) {
    setSelectedEmployees((current) => ({
      ...current,
      [enrollmentId]: employeeUserId,
    }));

    setError("");
    setSuccess("");
  }

  // =========================================================
  // ASSIGN / REASSIGN
  // =========================================================

  async function handleAssign(
    enrollment: AdminAssignment
  ) {
    const selectedEmployeeUserId =
      selectedEmployees[enrollment.id];

    if (!selectedEmployeeUserId) {
      setError(
        "Please select an employee first."
      );
      return;
    }

    const employeeUserId = Number(
      selectedEmployeeUserId
    );

    if (!employeeUserId) {
      setError(
        "Invalid employee selected."
      );
      return;
    }

    // IMPORTANT:
    // Find employee using USER ID.
    const selectedEmployee =
      activeEmployees.find(
        (employee) =>
          employee.userId === employeeUserId
      );

    if (!selectedEmployee) {
      setError(
        "Selected employee is not available."
      );
      return;
    }

    const isReassigning =
      enrollment.employeeId !== null;

    const confirmed = window.confirm(
      isReassigning
        ? `Reassign ${enrollment.studentName} - ${enrollment.courseName} to ${selectedEmployee.name}?`
        : `Assign ${enrollment.studentName} - ${enrollment.courseName} to ${selectedEmployee.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setAssigningId(enrollment.id);
      setError("");
      setSuccess("");

      // IMPORTANT:
      // Backend expects User ID.
      const updated = await assignEmployeeToStudent(
        enrollment.id,
        selectedEmployee.userId
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
          isReassigning
            ? "reassigned"
            : "assigned"
        } to ${selectedEmployee.name}.`
      );

      setSelectedEmployees((current) => {
        const next = { ...current };

        delete next[enrollment.id];

        return next;
      });
    } catch (err) {
      console.error(
        "Assignment error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to assign employee"
      );
    } finally {
      setAssigningId(null);
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <RefreshCw
            size={32}
            className="mx-auto animate-spin text-gray-400"
          />

          <p className="mt-4 text-sm text-gray-500">
            Loading assignments...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

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
              Assign enrolled students to employees
              and manage their course ownership.
            </p>

          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>
      </div>

      {/* =====================================================
          ALERTS
      ===================================================== */}

      {error && (
        <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          <span>{error}</span>

          <button
            onClick={() => setError("")}
          >
            <X size={17} />
          </button>

        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

          <Check size={18} />

          <span>{success}</span>

        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={<ClipboardList size={21} />}
          label="Total Enrollments"
          value={totalEnrollments}
          description="All student course enrollments"
        />

        <StatCard
          icon={<Check size={21} />}
          label="Assigned"
          value={assignedCount}
          description="Students assigned to employees"
          positive
        />

        <StatCard
          icon={<RefreshCw size={21} />}
          label="Pending"
          value={pendingCount}
          description="Waiting for employee assignment"
        />

        <StatCard
          icon={<Users size={21} />}
          label="Active Employees"
          value={activeEmployees.length}
          description="Available for assignment"
        />

      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* TOP */}

        <div className="border-b border-gray-100 px-5 py-5 sm:px-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-950">
                Student Assignments
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {filteredEnrollments.length} enrollments shown
              </p>
            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search student, course or employee..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:bg-white"
              />

            </div>

          </div>

        </div>

        {/* =================================================
            NO EMPLOYEES WARNING
        ================================================= */}

        {activeEmployees.length === 0 && (
          <div className="border-b border-yellow-100 bg-yellow-50 px-5 py-4 sm:px-6">

            <div className="flex items-start gap-3">

              <Users
                size={19}
                className="mt-0.5 shrink-0 text-yellow-600"
              />

              <div>
                <p className="text-sm font-semibold text-yellow-800">
                  No active employees available
                </p>

                <p className="mt-1 text-xs leading-5 text-yellow-700">
                  Create or activate an employee
                  before assigning students.
                </p>
              </div>

            </div>

          </div>
        )}

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

              {filteredEnrollments.map(
                (enrollment) => {

                  const selectedEmployeeId =
                    selectedEmployees[
                      enrollment.id
                    ] || "";

                  const courseEmployees =
                    getEmployeesForCourse(
                      enrollment.courseName
                    );

                  const isAssigning =
                    assigningId ===
                    enrollment.id;

                  return (
                    <tr
                      key={enrollment.id}
                      className="transition hover:bg-gray-50/60"
                    >

                      {/* STUDENT */}

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

                      {/* COURSE */}

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

                      {/* EMPLOYEE */}

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

                      {/* STATUS */}

                      <td className="px-6 py-5">

                        {enrollment.employeeId ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">

                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                            Assigned

                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">

                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />

                            Pending

                          </span>
                        )}

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-end gap-2">

                          <select
                            value={
                              selectedEmployeeId
                            }
                            onChange={(event) =>
                              handleEmployeeChange(
                                enrollment.id,
                                event.target.value
                              )
                            }
                            disabled={
                              courseEmployees.length ===
                              0
                            }
                            className="h-10 min-w-[180px] rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
                          >

                            <option value="">
                              Select employee
                            </option>
                            {courseEmployees.length > 0 ? (
                              courseEmployees.map(
                                (employee) => (
                                  <option
                                    key={employee.userId}
                                    value={employee.userId}
                                  >
                                    {employee.name}
                                  </option>
                                )
                              )
                            ) : (
                              <option value="" disabled>
                                No matching employee
                              </option>
                            )}

                          </select>

                            {courseEmployees.length === 0 && (
                              <span className="hidden text-[11px] text-gray-400 2xl:inline">
                                No matching department employee
                              </span>
                            )}

<button
                            onClick={() =>
                              handleAssign(
                                enrollment
                              )
                            }
                            disabled={
                              isAssigning ||
                              !selectedEmployeeId ||
                              courseEmployees.length ===
                                0
                            }
                            className="inline-flex h-10 min-w-[90px] items-center justify-center rounded-xl bg-gray-950 px-4 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
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
                }
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            MOBILE / TABLET
        ================================================= */}

        <div className="xl:hidden">

          {filteredEnrollments.length === 0 ? (
            <EmptyState search={search} />
          ) : (
            <div className="divide-y divide-gray-100">

              {filteredEnrollments.map(
                (enrollment) => {

                  const selectedEmployeeId =
                    selectedEmployees[
                      enrollment.id
                    ] || "";

                  const courseEmployees =
                    getEmployeesForCourse(
                      enrollment.courseName
                    );

                  const isAssigning =
                    assigningId ===
                    enrollment.id;

                  return (
                    <div
                      key={enrollment.id}
                      className="p-5"
                    >

                      {/* STUDENT */}

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
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

                      {/* COURSE */}

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

                      {/* CURRENT EMPLOYEE */}

                      <div className="mt-4">

                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                          Current Employee
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {enrollment.employeeName ||
                            "Not assigned"}
                        </p>

                        {enrollment.employeeEmail && (
                          <p className="mt-1 text-xs text-gray-400">
                            {enrollment.employeeEmail}
                          </p>
                        )}

                      </div>

                      {/* ASSIGN */}

                      <div className="mt-5">

                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                          {enrollment.employeeId
                            ? "Reassign Employee"
                            : "Assign Employee"}
                        </p>

                        <div className="flex gap-2">

                          <select
                            value={
                              selectedEmployeeId
                            }
                            onChange={(event) =>
                              handleEmployeeChange(
                                enrollment.id,
                                event.target.value
                              )
                            }
                            disabled={
                              courseEmployees.length ===
                              0
                            }
                            className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
                          >

                            <option value="">
                              Select employee
                            </option>
                            {courseEmployees.length > 0 ? (
                              courseEmployees.map(
                                (employee) => (
                                  <option
                                    key={employee.userId}
                                    value={employee.userId}
                                  >
                                    {employee.name}
                                  </option>
                                )
                              )
                            ) : (
                              <option value="" disabled>
                                No matching employee
                              </option>
                            )}

                          </select>

                          {courseEmployees.length === 0 && (
                            <span className="self-center text-[11px] text-gray-400">
                              No matching department employee
                            </span>
                          )}

<button
                            onClick={() =>
                              handleAssign(
                                enrollment
                              )
                            }
                            disabled={
                              isAssigning ||
                              !selectedEmployeeId ||
                              courseEmployees.length ===
                                0
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
                }
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  icon,
  label,
  value,
  description,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
          positive
            ? "bg-green-50 text-green-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-gray-950">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-gray-400">
        {description}
      </p>

    </div>
  );
}

// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState({
  search,
}: {
  search: string;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <ClipboardList
          size={28}
          className="text-gray-400"
        />
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
  );
}