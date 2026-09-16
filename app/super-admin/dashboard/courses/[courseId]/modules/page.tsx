"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Plus,
  Power,
  Search,
  X,
  Pencil,
} from "lucide-react";

import {
  CourseModule,
  createCourseModule,
  getCourseModules,
  updateCourseModule,
  updateCourseModuleStatus,
} from "@/services/CourseModuleService";

import { Course, getCourses } from "@/services/CourseService";

export default function ModulesPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = Number(params.courseId);

  // =========================================================
  // STATE
  // =========================================================

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingModule, setEditingModule] =
    useState<CourseModule | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moduleOrder, setModuleOrder] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [statusId, setStatusId] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // LOAD DATA
  // =========================================================

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "SUPER_ADMIN") {
        router.replace("/super-admin/login");
        return;
      }

      const [courses, moduleData] = await Promise.all([
        getCourses(),
        getCourseModules(courseId, true),
      ]);

      setCourse(
        courses.find(
          (item) => item.id === courseId
        ) ?? null
      );

      setModules(
        [...moduleData].sort(
          (a, b) => a.moduleOrder - b.moduleOrder
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load modules."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    if (!courseId || Number.isNaN(courseId)) {
      return;
    }

    loadData();
  }, [courseId]);

  // =========================================================
  // SEARCH
  // =========================================================

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) {
      return modules;
    }

    return modules.filter((module) =>
      `${module.title} ${module.description ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [modules, search]);

  // =========================================================
  // CREATE MODAL
  // =========================================================

  function openCreate() {
    setEditingModule(null);

    setTitle("");
    setDescription("");
    setModuleOrder(modules.length + 1);

    setError("");
    setSuccess("");

    setShowModal(true);
  }

  // =========================================================
  // EDIT MODAL
  // =========================================================

  function openEdit(module: CourseModule) {
    setEditingModule(module);

    setTitle(module.title);
    setDescription(module.description ?? "");
    setModuleOrder(module.moduleOrder);

    setError("");
    setSuccess("");

    setShowModal(true);
  }

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  function closeModal() {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingModule(null);

    setTitle("");
    setDescription("");
    setModuleOrder(1);

    setError("");
  }

  // =========================================================
  // SUBMIT CREATE / UPDATE
  // =========================================================

  async function submit(e: FormEvent) {
    e.preventDefault();

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!title.trim()) {
      setError("Module title is required.");
      return;
    }

    if (moduleOrder < 1) {
      setError("Module order must be at least 1.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // =====================================================
      // EDIT
      // =====================================================

      if (editingModule) {
        await updateCourseModule(
          editingModule.id,
          {
            title: title.trim(),
            description: description.trim(),
            moduleOrder: Number(moduleOrder),
          }
        );

        setShowModal(false);
        setEditingModule(null);

        setSuccess(
          "Module updated successfully."
        );

        await loadData();

        return;
      }

      // =====================================================
      // CREATE
      // =====================================================

      await createCourseModule({
        courseId,
        title: title.trim(),
        description: description.trim(),
        moduleOrder: Number(moduleOrder),
      });

      setShowModal(false);

      setSuccess(
        "Module created successfully."
      );

      await loadData();

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : editingModule
            ? "Unable to update module."
            : "Unable to create module."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // ACTIVATE / DEACTIVATE
  // =========================================================

  async function toggle(module: CourseModule) {
    try {
      setStatusId(module.id);

      setError("");
      setSuccess("");

      await updateCourseModuleStatus(
        module.id,
        !module.active
      );

      setSuccess(
        module.active
          ? "Module deactivated."
          : "Module activated."
      );

      await loadData();

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update module."
      );
    } finally {
      setStatusId(null);
    }
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="mx-auto max-w-7xl">

      {/* =====================================================
          BACK
      ===================================================== */}

      <button
        type="button"
        onClick={() =>
          router.push(
            "/super-admin/dashboard/courses"
          )
        }
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />

        Back to Courses
      </button>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

        <div>
          <p className="text-sm font-medium text-gray-400">
            Course Content
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-gray-950">
            Modules
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {course
              ? `${course.courseOrder}. ${course.name}`
              : "Manage course modules."}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />

          Add Module
        </button>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">

        <Stat
          label="Total Modules"
          value={modules.length}
        />

        <Stat
          label="Active"
          value={
            modules.filter(
              (module) => module.active
            ).length
          }
        />

        <Stat
          label="Inactive"
          value={
            modules.filter(
              (module) => !module.active
            ).length
          }
        />

      </div>

      {/* =====================================================
          ALERTS
      ===================================================== */}

      {error && !showModal && (
        <Alert
          text={error}
          danger
        />
      )}

      {success && !showModal && (
        <Alert
          text={success}
        />
      )}

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

        <div className="relative max-w-xl">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search modules..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-200"
          />

        </div>

      </div>

      {/* =====================================================
          MODULE LIST
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* LOADING */}

        {loading ? (

          <div className="p-16 text-center">

            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

            <p className="mt-4 text-sm text-gray-500">
              Loading modules...
            </p>

          </div>

        ) : filtered.length === 0 ? (

          /* EMPTY */

          <div className="p-16 text-center">

            <BookOpen className="mx-auto h-8 w-8 text-gray-300" />

            <p className="mt-3 font-semibold text-gray-900">
              No modules found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Try another search."
                : "Create the first module for this course."}
            </p>

          </div>

        ) : (

          /* MODULES */

          <div className="divide-y divide-gray-100">

            {filtered.map((module) => (

              <div
                key={module.id}
                className="p-5 transition hover:bg-gray-50/50 sm:p-6"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* =================================================
                      MODULE INFORMATION
                  ================================================= */}

                  <div className="flex min-w-0 gap-4">

                    {/* ORDER */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-bold text-white">
                      {module.moduleOrder}
                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-lg font-semibold text-gray-950">
                          {module.title}
                        </h2>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            module.active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {module.active
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </div>

                      {module.description && (
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                          {module.description}
                        </p>
                      )}

                    </div>

                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <div className="flex flex-wrap gap-2">

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        openEdit(module)
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4" />

                      Edit
                    </button>

                    {/* MANAGE LESSONS */}

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/super-admin/dashboard/courses/${courseId}/modules/${module.id}/lessons`
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      Manage Lessons

                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* ACTIVATE / DEACTIVATE */}

                    <button
                      type="button"
                      onClick={() =>
                        toggle(module)
                      }
                      disabled={
                        statusId === module.id
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Power className="h-4 w-4" />

                      {statusId === module.id
                        ? "Saving..."
                        : module.active
                          ? "Deactivate"
                          : "Activate"}
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="flex items-center justify-between border-b border-gray-100 p-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Course Content
                </p>

                <h2 className="mt-1 text-xl font-semibold text-gray-950">
                  {editingModule
                    ? "Edit Module"
                    : "Add Module"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingModule
                    ? "Update module information."
                    : "Add a new module to this course."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 transition hover:bg-gray-100 disabled:opacity-50"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={submit}
              className="space-y-5 p-6"
            >

              {/* ERROR */}

              {error && (
                <Alert
                  text={error}
                  danger
                />
              )}

              {/* MODULE TITLE */}

              <Field
                label="Module Title"
                required
              >

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Introduction to Java"
                  disabled={saving}
                  className={inputClass}
                />

              </Field>

              {/* MODULE ORDER */}

              <Field
                label="Module Order"
                required
              >

                <input
                  type="number"
                  min="1"
                  value={moduleOrder}
                  onChange={(e) =>
                    setModuleOrder(
                      Number(e.target.value)
                    )
                  }
                  disabled={saving}
                  className={inputClass}
                />

              </Field>

              {/* DESCRIPTION */}

              <Field label="Description">

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="Module overview..."
                  className={`${inputClass} resize-none`}
                />

              </Field>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <Check className="h-4 w-4" />

                  {saving
                    ? editingModule
                      ? "Saving..."
                      : "Creating..."
                    : editingModule
                      ? "Save Changes"
                      : "Create Module"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

// =============================================================
// STAT COMPONENT
// =============================================================

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-semibold text-gray-950">
        {value}
      </p>

    </div>
  );
}

// =============================================================
// ALERT COMPONENT
// =============================================================

function Alert({
  text,
  danger = false,
}: {
  text: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
        danger
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {text}
    </div>
  );
}

// =============================================================
// INPUT CLASS
// =============================================================

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:bg-gray-50 disabled:text-gray-500";

// =============================================================
// FIELD COMPONENT
// =============================================================

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

        {label}

        {required && (
          <span className="text-red-500">
            {" "}*
          </span>
        )}

      </span>

      {children}

    </label>
  );
}