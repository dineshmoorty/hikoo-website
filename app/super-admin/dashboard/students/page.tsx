"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createStudent,
  getStudents,
  Student,
  updateStudent,
  updateStudentStatus,
} from "@/services/SuperAdminService";

type ModalMode = "add" | "edit" | null;

export default function SuperAdminStudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalMode>(null);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "SUPER_ADMIN") {
      router.replace("/super-admin/login");
      return;
    }

    loadStudents();
  }, [router]);

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const data = await getStudents();

      setStudents(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load students"
      );
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setError("");
    setSuccess("");

    setForm({
      name: "",
      email: "",
      password: "",
    });

    setSelectedStudent(null);
    setModal("add");
  }

  function openEditModal(student: Student) {
    setError("");
    setSuccess("");

    setSelectedStudent(student);

    setForm({
      name: student.name,
      email: student.email,
      password: "",
    });

    setModal("edit");
  }

  function closeModal() {
    if (saving) return;

    setModal(null);
    setSelectedStudent(null);

    setForm({
      name: "",
      email: "",
      password: "",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      setError("Student name is required");
      return;
    }

    if (!email) {
      setError("Student email is required");
      return;
    }

    if (modal === "add") {
      if (!form.password) {
        setError("Password is required");
        return;
      }

      if (form.password.length < 8) {
        setError("Password must contain at least 8 characters");
        return;
      }
    }

    try {
      setSaving(true);

      if (modal === "add") {
        await createStudent({
          name,
          email,
          password: form.password,
        });

        setSuccess("Student added successfully.");
      }

      if (modal === "edit" && selectedStudent) {
        await updateStudent(selectedStudent.id, {
          name,
          email,
        });

        setSuccess("Student updated successfully.");
      }

      closeModal();
      await loadStudents();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save student"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(student: Student) {
    const action = student.active ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${student.name}?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await updateStudentStatus(student.id, !student.active);

      setStudents((current) =>
        current.map((item) =>
          item.id === student.id
            ? { ...item, active: !student.active }
            : item
        )
      );

      setSuccess(
        `${student.name} has been ${
          student.active ? "deactivated" : "activated"
        }.`
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update student status"
      );
    }
  }

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students;

    return students.filter((student) => {
      return (
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.active
  ).length;

  const inactiveStudents = students.filter(
    (student) => !student.active
  ).length;

  return (
    <div className="mx-auto w-full max-w-[1500px]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <div className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Student Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Students
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              View, add and manage students registered on the HIKOO
              platform.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
          >
            <span className="text-lg leading-none">+</span>
            Add Student
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

      {error && !modal && (
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
      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {totalStudents}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
              🎓
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            All registered students
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {activeStudents}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-lg">
              ●
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Currently active accounts
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Inactive
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {inactiveStudents}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg">
              ○
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Deactivated accounts
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
                Student Directory
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {filteredStudents.length}{" "}
                {filteredStudents.length === 1
                  ? "student"
                  : "students"}{" "}
                shown
              </p>
            </div>

            <div className="relative w-full md:max-w-sm">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by name or email..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
              />
            </div>

          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

              <p className="mt-4 text-sm text-gray-500">
                Loading students...
              </p>
            </div>
          </div>
        ) : filteredStudents.length === 0 ? (
          /* Empty */
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
              🎓
            </div>

            <h3 className="mt-5 text-base font-semibold text-gray-950">
              {search
                ? "No students found"
                : "No students yet"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              {search
                ? "Try changing your search term."
                : "Add your first student to start building the student directory."}
            </p>

            {!search && (
              <button
                onClick={openAddModal}
                className="mt-5 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                + Add Student
              </button>
            )}

          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================= */}
            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Joined
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-gray-50/70"
                    >

                      {/* Student */}
                      <td className="px-6 py-4">
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

                            <p className="mt-0.5 text-xs text-gray-400">
                              Student #{student.id}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">
                          {student.email}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {student.active ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">
                          {student.createdAt
                            ? new Date(
                                student.createdAt
                              ).toLocaleDateString()
                            : "—"}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">

                          <button
                            onClick={() =>
                              openEditModal(student)
                            }
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(student)
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                              student.active
                                ? "border border-red-200 text-red-600 hover:bg-red-50"
                                : "border border-green-200 text-green-700 hover:bg-green-50"
                            }`}
                          >
                            {student.active
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE / TABLET CARDS
            ================================================= */}
            <div className="divide-y divide-gray-100 lg:hidden">

              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-5"
                >

                  <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                      {student.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-gray-950">
                          {student.name}
                        </h3>

                        {student.active ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                            Inactive
                          </span>
                        )}
                      </div>

                      <p className="mt-1 break-all text-sm text-gray-500">
                        {student.email}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Student #{student.id}
                        {student.createdAt
                          ? ` • Joined ${new Date(
                              student.createdAt
                            ).toLocaleDateString()}`
                          : ""}
                      </p>

                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">

                    <button
                      onClick={() =>
                        openEditModal(student)
                      }
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(student)
                      }
                      className={`flex-1 rounded-lg px-3 py-2.5 text-xs font-semibold ${
                        student.active
                          ? "border border-red-200 text-red-600 hover:bg-red-50"
                          : "border border-green-200 text-green-700 hover:bg-green-50"
                      }`}
                    >
                      {student.active
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-gray-950">
                  {modal === "add"
                    ? "Add New Student"
                    : "Edit Student"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {modal === "add"
                    ? "Create an offline or platform student account."
                    : "Update the student's basic information."}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
              >
                ✕
              </button>

            </div>

            {/* Modal Error */}
            {error && (
              <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Student Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Enter student name"
                  autoComplete="name"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="student@example.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                />
              </div>

              {/* Password - only Add */}
              {modal === "add" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    The student can use this password to log in.
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 border-t border-gray-100 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : modal === "add"
                    ? "Add Student"
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