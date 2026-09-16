"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AdminStudent,
  getAdminStudents,
  updateAdminStudent,
  updateAdminStudentStatus,
  UpdateAdminStudentRequest,
} from "@/services/AdminStudentService";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudent[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<AdminStudent | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editForm, setEditForm] =
    useState<UpdateAdminStudentRequest>({
      name: "",
      email: "",
    });

  const [saving, setSaving] = useState(false);
  const [statusUpdating, setStatusUpdating] =
    useState<number | null>(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     LOAD STUDENTS
  ========================================================= */

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminStudents();

      setStudents(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load students."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) => {
      return (
        student.name?.toLowerCase().includes(query) ||
        student.email?.toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  /* =========================================================
     STATS
  ========================================================= */

  const activeCount = students.filter(
    (student) => student.active
  ).length;

  const inactiveCount = students.filter(
    (student) => !student.active
  ).length;

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  function openEdit(student: AdminStudent) {
    setSelectedStudent(student);

    setEditForm({
      name: student.name ?? "",
      email: student.email ?? "",
    });

    setError("");
    setSuccess("");
    setShowEditModal(true);
  }

  /* =========================================================
     EDIT CHANGE
  ========================================================= */

  function handleEditChange(
    field: keyof UpdateAdminStudentRequest,
    value: string
  ) {
    setEditForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =========================================================
     UPDATE STUDENT
  ========================================================= */

  async function handleUpdateStudent(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!selectedStudent) {
      return;
    }

    setError("");
    setSuccess("");

    if (!editForm.name.trim()) {
      setError("Student name is required.");
      return;
    }

    if (!editForm.email.trim()) {
      setError("Email address is required.");
      return;
    }

    try {
      setSaving(true);

      await updateAdminStudent(
        selectedStudent.id,
        {
          name: editForm.name.trim(),
          email: editForm.email.trim().toLowerCase(),
        }
      );

      setShowEditModal(false);
      setSelectedStudent(null);

      setSuccess(
        "Student details updated successfully."
      );

      await loadStudents();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update student."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     ACTIVATE / DEACTIVATE
  ========================================================= */

  async function handleStatusChange(
    student: AdminStudent
  ) {
    const action = student.active
      ? "deactivate"
      : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${student.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setStatusUpdating(student.id);
      setError("");
      setSuccess("");

      await updateAdminStudentStatus(
        student.id,
        !student.active
      );

      setSuccess(
        `${student.name} has been ${
          student.active
            ? "deactivated"
            : "activated"
        }.`
      );

      await loadStudents();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update student status."
      );
    } finally {
      setStatusUpdating(null);
    }
  }

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  function closeEditModal() {
    if (saving) {
      return;
    }

    setShowEditModal(false);
    setSelectedStudent(null);
    setError("");
  }

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
          Students
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage registered HIKOO student accounts.
        </p>
      </div>

      {/* =====================================================
          SUCCESS
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

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && !showEditModal && (
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

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Total Students
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {students.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Registered students
          </p>
        </div>

        {/* Active */}

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

        {/* Inactive */}

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
      </div>

      {/* =====================================================
          STUDENT DIRECTORY
      ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}

        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-950">
                Student Directory
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {filteredStudents.length} student
                {filteredStudents.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

            {/* Search */}

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
                placeholder="Search students..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

              Loading students...
            </div>
          </div>
        ) : filteredStudents.length === 0 ? (
          /* ===================================================
             EMPTY
          ==================================================== */

          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl">
              🎓
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-950">
              {search
                ? "No students found"
                : "No students yet"}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-gray-400">
              {search
                ? "Try a different search term."
                : "No student accounts are available."}
            </p>
          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[750px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Student
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Role
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
                  {filteredStudents.map(
                    (student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                      >
                        {/* Student */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-semibold text-white">
                              {student.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "S"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-gray-950">
                                {student.name}
                              </p>

                              <p className="mt-0.5 truncate text-xs text-gray-400">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role */}

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                            {student.role || "STUDENT"}
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          {student.active ? (
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
                                openEdit(student)
                              }
                              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              disabled={
                                statusUpdating ===
                                student.id
                              }
                              onClick={() =>
                                handleStatusChange(
                                  student
                                )
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                student.active
                                  ? "border border-red-200 text-red-600 hover:bg-red-50"
                                  : "border border-green-200 text-green-700 hover:bg-green-50"
                              }`}
                            >
                              {statusUpdating ===
                              student.id
                                ? "Updating..."
                                : student.active
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
                MOBILE
            ================================================== */}

            <div className="divide-y divide-gray-100 md:hidden">
              {filteredStudents.map(
                (student) => (
                  <div
                    key={student.id}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-semibold text-white">
                          {student.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "S"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-950">
                            {student.name}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-gray-400">
                            {student.email}
                          </p>
                        </div>
                      </div>

                      {student.active ? (
                        <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <p className="text-xs text-gray-400">
                        Role
                      </p>

                      <p className="mt-1 text-sm text-gray-700">
                        {student.role || "STUDENT"}
                      </p>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openEdit(student)
                        }
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Edit Student
                      </button>

                      <button
                        type="button"
                        disabled={
                          statusUpdating ===
                          student.id
                        }
                        onClick={() =>
                          handleStatusChange(
                            student
                          )
                        }
                        className={`rounded-xl border px-4 py-2.5 text-xs font-medium disabled:opacity-50 ${
                          student.active
                            ? "border-red-200 text-red-600 hover:bg-red-50"
                            : "border-green-200 text-green-700 hover:bg-green-50"
                        }`}
                      >
                        {statusUpdating ===
                        student.id
                          ? "..."
                          : student.active
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
        selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              {/* Header */}

              <div className="flex items-start justify-between border-b border-gray-100 p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Student Management
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-950">
                    Edit Student
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Update student account information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                >
                  ×
                </button>
              </div>

              {/* Form */}

              <form
                onSubmit={handleUpdateStudent}
                className="p-6"
              >
                {error && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="space-y-5">
                  {/* Name */}

                  <div>
                    <label
                      htmlFor="admin-student-name"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Full name
                    </label>

                    <input
                      id="admin-student-name"
                      type="text"
                      value={editForm.name}
                      onChange={(event) =>
                        handleEditChange(
                          "name",
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="admin-student-email"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Email address
                    </label>

                    <input
                      id="admin-student-email"
                      type="email"
                      value={editForm.email}
                      onChange={(event) =>
                        handleEditChange(
                          "email",
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>

                  {/* Current status */}

                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Account status
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Manage activation separately.
                        </p>
                      </div>

                      {selectedStudent.active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}

                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={saving}
                    className="h-11 rounded-xl border border-gray-200 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
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