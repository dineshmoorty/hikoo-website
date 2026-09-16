"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Edit3,
  IndianRupee,
  Power,
  Search,
  X,
} from "lucide-react";
import {
  AdminCourse,
  UpdateAdminCourseRequest,
  getAdminCourses,
  updateAdminCourse,
  updateAdminCourseStatus,
} from "@/services/AdminCourseService";

const emptyForm: UpdateAdminCourseRequest = {
  name: "",
  code: "",
  description: "",
  duration: "",
  baseFee: 0,
  gstPercentage: 0,
};

export default function CoursesPage() {
  const router = useRouter();

  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [form, setForm] = useState<UpdateAdminCourseRequest>(emptyForm);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusId, setStatusId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadCourses() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "ADMIN") {
        router.replace("/admin/login");
        return;
      }

      const data = await getAdminCourses();

      setCourses(
        [...data].sort(
          (a, b) => a.courseOrder - b.courseOrder
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load courses."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return courses;

    return courses.filter((course) =>
      [
        course.name,
        course.code ?? "",
        course.description ?? "",
        course.duration ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [courses, search]);

  function openEdit(course: AdminCourse) {
    setEditingCourse(course);

    setForm({
      name: course.name,
      code: course.code ?? "",
      description: course.description ?? "",
      duration: course.duration ?? "",
      baseFee: Number(course.baseFee ?? 0),
      gstPercentage: Number(course.gstPercentage ?? 0),
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function closeModal() {
    if (saving) return;

    setShowModal(false);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Course name is required.");
      return;
    }

    if (form.baseFee < 0) {
      setError("Base fee cannot be negative.");
      return;
    }

    if (
      form.gstPercentage < 0 ||
      form.gstPercentage > 100
    ) {
      setError("GST must be between 0% and 100%.");
      return;
    }

    try {
      setSaving(true);

      if (!editingCourse) {
        setError("Please select a course to edit.");
        return;
      }

      await updateAdminCourse(editingCourse.id, {
        name: form.name.trim(),
        code: form.code.trim(),
        description: form.description.trim(),
        duration: form.duration.trim(),
        baseFee: Number(form.baseFee),
        gstPercentage: Number(form.gstPercentage),
      });

      setSuccess("Course updated successfully.");

      setShowModal(false);
      setForm(emptyForm);
      setEditingCourse(null);

      await loadCourses();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save course."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(course: AdminCourse) {
    try {
      setStatusId(course.id);
      setError("");
      setSuccess("");

      await updateAdminCourseStatus(
        course.id,
        !course.active
      );

      setSuccess(
        course.active
          ? `${course.name} deactivated.`
          : `${course.name} activated.`
      );

      await loadCourses();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update course status."
      );
    } finally {
      setStatusId(null);
    }
  }

  const activeCount = courses.filter(
    (course) => course.active
  ).length;

  const inactiveCount =
    courses.length - activeCount;

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-gray-400">
            Management
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
            Courses
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage the courses available across HIKOO.
          </p>
        </div>


      </div>

      {/* STATS */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Courses
          </p>

          <p className="mt-2 text-3xl font-semibold text-gray-950">
            {courses.length}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <p className="text-sm text-emerald-700">
            Active
          </p>

          <p className="mt-2 text-3xl font-semibold text-emerald-900">
            {activeCount}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-500">
            Inactive
          </p>

          <p className="mt-2 text-3xl font-semibold text-gray-700">
            {inactiveCount}
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && !showModal && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && !showModal && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search courses..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>

      {/* COURSE LIST */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

              <p className="mt-3 text-sm text-gray-500">
                Loading courses...
              </p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="rounded-2xl bg-gray-100 p-4">
              <BookOpen className="h-7 w-7 text-gray-500" />
            </div>

            <h3 className="mt-4 font-semibold text-gray-950">
              No courses found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Try another search."
                : "No courses are available."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredCourses.map((course) => {
              const fee = Number(
                course.baseFee ?? 0
              );

              const gst = Number(
                course.gstPercentage ?? 0
              );

              // Backend-calculated total fee
              const total = Number(
                course.totalFee ?? 0
              );

              return (
                <div
                  key={course.id}
                  className="p-5 transition hover:bg-gray-50/70 sm:p-6"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    {/* COURSE INFO */}
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-bold text-white">
                        {course.courseOrder}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="truncate text-lg font-semibold text-gray-950">
                            {course.name}
                          </h2>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              course.active
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {course.active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-gray-500">
                          {course.code ||
                            "No course code"}
                        </p>

                        {course.description && (
                          <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-gray-500">
                            {course.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                          {/* DURATION */}
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-4 w-4" />

                            {course.duration ||
                              "Duration not set"}
                          </span>

                          {/* BASE FEE */}
                          <span className="inline-flex items-center gap-1.5">
                            <IndianRupee className="h-4 w-4" />

                            ₹
                            {fee.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          {/* GST */}
                          <span>
                            GST {gst}%
                          </span>

                          {/* BACKEND TOTAL */}
                          <span className="font-medium text-gray-700">
                            Total ₹
                            {total.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-2 xl:justify-end">
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/dashboard/courses/${course.id}/modules`
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-white"
                      >
                        Manage Modules

                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          openEdit(course)
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-white"
                      >
                        <Edit3 className="h-4 w-4" />

                        Edit
                      </button>

                      <button
                        onClick={() =>
                          toggleStatus(course)
                        }
                        disabled={
                          statusId === course.id
                        }
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${
                          course.active
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gray-950 text-white hover:bg-gray-800"
                        }`}
                      >
                        <Power className="h-4 w-4" />

                        {statusId === course.id
                          ? "Saving..."
                          : course.active
                            ? "Deactivate"
                            : "Activate"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Course Management
                </p>

                <h2 className="mt-1 text-xl font-semibold text-gray-950">
                  Edit Course
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* NAME + CODE */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Course Name"
                  required
                >
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Java FullStack Development"
                    className={inputClass}
                  />
                </Field>

                <Field label="Course Code">
                  <input
                    value={form.code}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        code: e.target.value,
                      })
                    }
                    placeholder="JAVA-FS"
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* DESCRIPTION */}
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  placeholder="Describe the course..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* DURATION + FEES */}
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Duration">
                  <input
                    value={form.duration}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duration:
                          e.target.value,
                      })
                    }
                    placeholder="6 Months"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Base Fee (₹)"
                  required
                >
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.baseFee}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        baseFee: Number(
                          e.target.value
                        ),
                      })
                    }
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="GST (%)"
                  required
                >
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={form.gstPercentage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gstPercentage:
                          Number(
                            e.target.value
                          ),
                      })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* FEE PREVIEW */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Base Fee
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹
                    {Number(
                      form.baseFee || 0
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-2 flex justify-between">
                  <span className="text-gray-500">
                    GST
                  </span>

                  <span className="font-medium text-gray-900">
                    {Number(
                      form.gstPercentage || 0
                    )}
                    %
                  </span>
                </div>

                <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                  <span className="font-semibold text-gray-900">
                    Estimated Total
                  </span>

                  <span className="font-semibold text-gray-950">
                    ₹
                    {(
                      Number(
                        form.baseFee || 0
                      ) +
                      Number(
                        form.baseFee || 0
                      ) *
                        (Number(
                          form.gstPercentage ||
                            0
                        ) /
                          100)
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </div>

              {/* FORM BUTTONS */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />

                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}{" "}
        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}