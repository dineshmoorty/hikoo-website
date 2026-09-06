"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Course,
  CreateCourseRequest,
  createCourse,
  getCourses,
  updateCourse,
  updateCourseStatus,
} from "@/services/CourseService";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState<CreateCourseRequest>({
    name: "",
    code: "",
    description: "",
    duration: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      setError("");

      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingCourse(null);

    setForm({
      name: "",
      code: "",
      description: "",
      duration: "",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function openEditModal(course: Course) {
    setEditingCourse(course);

    setForm({
      name: course.name,
      code: course.code ?? "",
      description: course.description ?? "",
      duration: course.duration ?? "",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setEditingCourse(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Course name is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingCourse) {
        await updateCourse(editingCourse.id, {
          ...form,
          active: editingCourse.active,
        });

        setSuccess("Course updated successfully");
      } else {
        await createCourse(form);

        setSuccess("Course created successfully");
      }

      await loadCourses();

      setTimeout(() => {
        setShowModal(false);
        setEditingCourse(null);
        setSuccess("");
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(course: Course) {
    try {
      setError("");
      setSuccess("");

      await updateCourseStatus(course.id, !course.active);

      setCourses((current) =>
        current.map((item) =>
          item.id === course.id
            ? { ...item, active: !item.active }
            : item
        )
      );

      setSuccess(
        `${course.name} is now ${
          !course.active ? "active" : "inactive"
        }`
      );

      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update course status"
      );
    }
  }

  const filteredCourses = courses.filter((course) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      course.name.toLowerCase().includes(query) ||
      (course.code ?? "").toLowerCase().includes(query) ||
      (course.description ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              Super Admin
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Courses
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create and manage HIKOO courses.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <span className="mr-2 text-lg">+</span>
            Add Course
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* Search */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
            <p className="mt-3 text-sm text-slate-500">
              Loading courses...
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-4xl">📚</div>

            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              No courses found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "Try a different search."
                : "Create your first HIKOO course."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Add Course
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Course
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Code
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Duration
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredCourses.map((course) => (
                      <tr
                        key={course.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-900">
                            {course.name}
                          </div>

                          {course.description && (
                            <div className="mt-1 max-w-md truncate text-sm text-slate-500">
                              {course.description}
                            </div>
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-700">
                          {course.code || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {course.duration || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              course.active
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {course.active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(course)}
                              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(course)
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                course.active
                                  ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              }`}
                            >
                              {course.active
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
            </div>

            {/* Mobile */}
            <div className="space-y-4 md:hidden">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-semibold text-slate-900">
                        {course.name}
                      </h2>

                      <p className="mt-1 text-xs font-medium text-indigo-600">
                        {course.code || "No code"}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        course.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {course.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {course.description && (
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {course.description}
                    </p>
                  )}

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="text-xs text-slate-400">
                      Duration
                    </div>

                    <div className="mt-1 text-sm font-medium text-slate-700">
                      {course.duration || "—"}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(course)}
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(course)
                      }
                      className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                        course.active
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {course.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingCourse ? "Edit Course" : "Create Course"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingCourse
                    ? "Update course information."
                    : "Add a new course to HIKOO."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  placeholder="Java Full Stack Development"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course Code
                </label>

                <input
                  type="text"
                  value={form.code}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      code: event.target.value,
                    })
                  }
                  placeholder="JAVA-FS"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Duration
                </label>

                <input
                  type="text"
                  value={form.duration}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      duration: event.target.value,
                    })
                  }
                  placeholder="6 Months"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe the course..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingCourse
                    ? "Save Changes"
                    : "Create Course"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}