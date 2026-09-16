"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Employee,
  getEmployees,
  updateEmployee,
  updateEmployeeStatus,
  UpdateEmployeeRequest,
} from "@/services/SuperAdminEmployeeService";

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [editForm, setEditForm] =
    useState<UpdateEmployeeRequest>({
      name: "",
      email: "",
      designation: "",
      specialization: "",
      department: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  /* =========================================================
     LOAD EMPLOYEES
  ========================================================= */

  async function loadEmployees() {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load employees."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return employees;
    }

    return employees.filter((employee) => {
      return (
        employee.name?.toLowerCase().includes(query) ||
        employee.email?.toLowerCase().includes(query) ||
        employee.designation
          ?.toLowerCase()
          .includes(query) ||
        employee.specialization
          ?.toLowerCase()
          .includes(query) ||
        employee.department
          ?.toLowerCase()
          .includes(query) ||
        employee.phone
          ?.toLowerCase()
          .includes(query) ||
        employee.city
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [employees, search]);

  /* =========================================================
     OPEN EDIT
  ========================================================= */

  function openEdit(employee: Employee) {
    setSelectedEmployee(employee);

    setEditForm({
      name: employee.name ?? "",
      email: employee.email ?? "",
      designation: employee.designation ?? "",
      specialization: employee.specialization ?? "",
      department: employee.department ?? "",
      phone: employee.phone ?? "",
      address: employee.address ?? "",
      city: employee.city ?? "",
      state: employee.state ?? "",
      pincode: employee.pincode ?? "",
    });

    setError("");
    setSuccess("");
    setShowEditModal(true);
  }

  /* =========================================================
     EDIT CHANGE
  ========================================================= */

  function handleEditChange(
    field: keyof UpdateEmployeeRequest,
    value: string
  ) {
    setEditForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =========================================================
     UPDATE EMPLOYEE
  ========================================================= */

  async function handleUpdateEmployee(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!selectedEmployee) {
      return;
    }

    setSuccess("");
    setError("");

    if (!editForm.name?.trim()) {
      setError("Name is required.");
      return;
    }

    if (!editForm.email?.trim()) {
      setError("Email address is required.");
      return;
    }

    try {
      setSaving(true);

      await updateEmployee(
        selectedEmployee.userId,
        {
          name: editForm.name?.trim(),
          email: editForm.email
            ?.trim()
            .toLowerCase(),
          designation:
            editForm.designation?.trim(),
          specialization:
            editForm.specialization?.trim(),
          department:
            editForm.department?.trim(),
          phone: editForm.phone?.trim(),
          address: editForm.address?.trim(),
          city: editForm.city?.trim(),
          state: editForm.state?.trim(),
          pincode: editForm.pincode?.trim(),
        }
      );

      setShowEditModal(false);
      setSelectedEmployee(null);

      setSuccess(
        "Employee details updated successfully."
      );

      await loadEmployees();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update employee."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     ACTIVATE / DEACTIVATE
  ========================================================= */

  async function handleStatusChange(
    employee: Employee
  ) {
    const action = employee.active
      ? "deactivate"
      : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${employee.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await updateEmployeeStatus(
        employee.userId,
        !employee.active
      );

      setSuccess(
        `${employee.name} has been ${
          employee.active
            ? "deactivated"
            : "activated"
        }.`
      );

      await loadEmployees();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update employee status."
      );
    }
  }

  /* =========================================================
     STATS
  ========================================================= */

  const activeCount = employees.filter(
    (employee) => employee.active
  ).length;

  const inactiveCount = employees.filter(
    (employee) => !employee.active
  ).length;

  const completedCount = employees.filter(
    (employee) => employee.profileCompleted
  ).length;

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">
          Management
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
          Employees
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage HIKOO employee accounts.
        </p>
      </div>

      {/* =====================================================
          ALERTS
      ====================================================== */}

      {success && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span>{success}</span>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="ml-4 text-green-700 hover:text-green-900"
          >
            ×
          </button>
        </div>
      )}

      {error &&
        !showEditModal && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Total
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {employees.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Employees
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Active
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {activeCount}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Active accounts
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Inactive
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {inactiveCount}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Disabled accounts
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Profiles
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {completedCount}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Completed profiles
          </p>
        </div>
      </div>

      {/* =====================================================
          EMPLOYEE DIRECTORY
      ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Search Header */}

        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-950">
                Employee Directory
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {filteredEmployees.length} employee
                {filteredEmployees.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search employees..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            LOADING / EMPTY
        ====================================================== */}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

              Loading employees...
            </div>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl">
              👥
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-950">
              {search
                ? "No employees found"
                : "No employees yet"}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-gray-400">
              {search
                ? "Try a different search term."
                : "No employee accounts are available."}
            </p>
          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Employee
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Designation
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Department
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Profile
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map(
                    (employee) => (
                      <tr
                        key={employee.userId}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                      >
                        {/* Employee */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-semibold text-white">
                              {employee.name
                                ?.charAt(0)
                                ?.toUpperCase() || "E"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-gray-950">
                                {employee.name}
                              </p>

                              <p className="mt-0.5 truncate text-xs text-gray-400">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Designation */}

                        <td className="px-6 py-5">
                          <p className="text-sm text-gray-700">
                            {employee.designation ||
                              "Employee"}
                          </p>

                          {employee.specialization && (
                            <p className="mt-1 text-xs text-gray-400">
                              {
                                employee.specialization
                              }
                            </p>
                          )}
                        </td>

                        {/* Department */}

                        <td className="px-6 py-5">
                          <span className="text-sm text-gray-600">
                            {employee.department ||
                              "—"}
                          </span>
                        </td>

                        {/* Profile */}

                        <td className="px-6 py-5">
                          {employee.profileCompleted ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Complete
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              Incomplete
                            </span>
                          )}
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          {employee.active ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openEdit(employee)
                              }
                              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  employee
                                )
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                                employee.active
                                  ? "border border-red-200 text-red-600 hover:bg-red-50"
                                  : "border border-green-200 text-green-700 hover:bg-green-50"
                              }`}
                            >
                              {employee.active
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE CARDS
            ================================================== */}

            <div className="divide-y divide-gray-100 md:hidden">
              {filteredEmployees.map(
                (employee) => (
                  <div
                    key={employee.userId}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-semibold text-white">
                          {employee.name
                            ?.charAt(0)
                            ?.toUpperCase() || "E"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-950">
                            {employee.name}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-gray-400">
                            {employee.email}
                          </p>
                        </div>
                      </div>

                      {employee.active ? (
                        <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">
                          Designation
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {employee.designation ||
                            "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Department
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {employee.department ||
                            "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Specialization
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {employee.specialization ||
                            "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Profile
                        </p>

                        <p
                          className={`mt-1 text-sm font-medium ${
                            employee.profileCompleted
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
                          {employee.profileCompleted
                            ? "Complete"
                            : "Incomplete"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openEdit(employee)
                        }
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Edit Employee
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(
                            employee
                          )
                        }
                        className={`rounded-xl border px-4 py-2.5 text-xs font-medium ${
                          employee.active
                            ? "border-red-200 text-red-600 hover:bg-red-50"
                            : "border-green-200 text-green-700 hover:bg-green-50"
                        }`}
                      >
                        {employee.active
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* =====================================================
          EDIT MODAL
      ====================================================== */}

      {showEditModal &&
        selectedEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
            <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl">
              {/* Header */}

              <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Employee Management
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-950">
                    Edit Employee
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Update employee account and profile
                    information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedEmployee(null);
                    setError("");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={handleUpdateEmployee}
                className="p-6"
              >
                {error && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* =================================================
                    ACCOUNT
                ================================================== */}

                <div>
                  <h3 className="text-sm font-semibold text-gray-950">
                    Account Information
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Basic employee account details.
                  </p>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="admin-edit-name"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Full name
                    </label>

                    <input
                      id="admin-edit-name"
                      type="text"
                      value={editForm.name ?? ""}
                      onChange={(event) =>
                        handleEditChange(
                          "name",
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-edit-email"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Email address
                    </label>

                    <input
                      id="admin-edit-email"
                      type="email"
                      value={editForm.email ?? ""}
                      onChange={(event) =>
                        handleEditChange(
                          "email",
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>
                </div>

                {/* =================================================
                    PROFESSIONAL
                ================================================== */}

                <div className="mt-8 border-t border-gray-100 pt-7">
                  <h3 className="text-sm font-semibold text-gray-950">
                    Professional Information
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Employee role and specialization.
                  </p>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="admin-edit-designation"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Designation
                    </label>

                    <input
                      id="admin-edit-designation"
                      type="text"
                      value={
                        editForm.designation ?? ""
                      }
                      onChange={(event) =>
                        handleEditChange(
                          "designation",
                          event.target.value
                        )
                      }
                      placeholder="Java Developer"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-edit-specialization"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Specialization
                    </label>

                    <input
                      id="admin-edit-specialization"
                      type="text"
                      value={
                        editForm.specialization ??
                        ""
                      }
                      onChange={(event) =>
                        handleEditChange(
                          "specialization",
                          event.target.value
                        )
                      }
                      placeholder="Spring Boot / Java"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-edit-department"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Department
                    </label>

                    <input
                      id="admin-edit-department"
                      type="text"
                      value={
                        editForm.department ?? ""
                      }
                      onChange={(event) =>
                        handleEditChange(
                          "department",
                          event.target.value
                        )
                      }
                      placeholder="Development"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-edit-phone"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Phone
                    </label>

                    <input
                      id="admin-edit-phone"
                      type="tel"
                      value={editForm.phone ?? ""}
                      onChange={(event) =>
                        handleEditChange(
                          "phone",
                          event.target.value
                        )
                      }
                      placeholder="+91 98765 43210"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>
                </div>

                {/* =================================================
                    ADDRESS
                ================================================== */}

                <div className="mt-8 border-t border-gray-100 pt-7">
                  <h3 className="text-sm font-semibold text-gray-950">
                    Address
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Employee contact and location details.
                  </p>
                </div>

                <div className="mt-5 space-y-5">
                  <div>
                    <label
                      htmlFor="admin-edit-address"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Address
                    </label>

                    <textarea
                      id="admin-edit-address"
                      rows={3}
                      value={editForm.address ?? ""}
                      onChange={(event) =>
                        handleEditChange(
                          "address",
                          event.target.value
                        )
                      }
                      placeholder="Enter complete address"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="admin-edit-city"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        City
                      </label>

                      <input
                        id="admin-edit-city"
                        type="text"
                        value={editForm.city ?? ""}
                        onChange={(event) =>
                          handleEditChange(
                            "city",
                            event.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-edit-state"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        State
                      </label>

                      <input
                        id="admin-edit-state"
                        type="text"
                        value={editForm.state ?? ""}
                        onChange={(event) =>
                          handleEditChange(
                            "state",
                            event.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-edit-pincode"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Pincode
                      </label>

                      <input
                        id="admin-edit-pincode"
                        type="text"
                        value={
                          editForm.pincode ?? ""
                        }
                        onChange={(event) =>
                          handleEditChange(
                            "pincode",
                            event.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    PROFILE STATUS
                ================================================== */}

                <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Profile completion
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Based on all employee profile
                        information.
                      </p>
                    </div>

                    {selectedEmployee.profileCompleted ? (
                      <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                        Complete
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700">
                        Incomplete
                      </span>
                    )}
                  </div>
                </div>

                {/* =================================================
                    ACTIONS
                ================================================== */}

                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedEmployee(null);
                      setError("");
                    }}
                    className="h-11 rounded-xl border border-gray-200 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="h-11 rounded-xl bg-gray-950 px-6 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving changes..."
                      : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}