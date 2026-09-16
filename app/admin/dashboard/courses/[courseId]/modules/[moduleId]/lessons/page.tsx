"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  FileText,
  Pencil,
  Power,
  Search,
  X,
} from "lucide-react";

import {
  AdminCourseLesson,
  getAdminCourseLessons,
  updateAdminCourseLesson,
  updateAdminCourseLessonStatus,
} from "@/services/AdminCourseLessonService";

import {
  AdminCourseModule,
  getAdminCourseModule,
} from "@/services/AdminCourseModuleService";
import { CourseLesson } from "@/services/CourseLessonService";

export default function LessonsPage() {
  const router = useRouter();
  const pathname = usePathname();

  // =========================================================
  // GET COURSE ID + MODULE ID FROM CURRENT URL
  //
  // Example:
  // /super-admin/dashboard/courses/1/modules/2/lessons
  //
  // courseId = 1
  // moduleId = 2
  // =========================================================

  const match = pathname.match(
    /\/courses\/(\d+)\/modules\/(\d+)\/lessons/
  );

  const courseId = match?.[1] ?? "";
  const rawModuleId = match?.[2] ?? "";

  const moduleId = Number.parseInt(rawModuleId, 10);

  const validModuleId =
    Number.isInteger(moduleId) && moduleId > 0;

  // =========================================================
  // STATE
  // =========================================================

  const [module, setModule] = useState<AdminCourseModule | null>(null);

  const [lessons, setLessons] = useState<AdminCourseLesson[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingLesson, setEditingLesson] = useState<AdminCourseLesson | null>(null);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [lessonOrder, setLessonOrder] = useState("1");

  const [content, setContent] = useState("");

  // =========================================================
  // LOAD MODULE + LESSONS
  // =========================================================

  useEffect(() => {
    if (!validModuleId) {
      setError("Invalid module ID.");
      setLoading(false);
      return;
    }

    loadData();
  }, [moduleId, validModuleId]);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "ADMIN") {
        router.replace("/admin/login");
        return;
      }

      const [moduleData, lessonData] = await Promise.all([
        getAdminCourseModule(moduleId),
        getAdminCourseLessons(moduleId),
      ]);

      setModule(moduleData);
      setLessons(lessonData);
    } catch (err) {
      console.error("Failed to load module/lessons:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load lessons."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // FILTER LESSONS
  // =========================================================

  const filteredLessons = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return lessons;
    }

    return lessons.filter((lesson) => {
      return (
        lesson.title.toLowerCase().includes(keyword) ||
        (lesson.description ?? "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [lessons, search]);

  // =========================================================
  // STATS
  // =========================================================

  const totalLessons = lessons.length;

  const activeLessons = lessons.filter(
    (lesson) => lesson.active
  ).length;

  const inactiveLessons = lessons.filter(
    (lesson) => !lesson.active
  ).length;

  // =========================================================
  // RESET FORM
  // =========================================================

  function resetForm() {
    setTitle("");
    setDescription("");
    setContent("");

    setLessonOrder(String(lessons.length + 1));

    setError("");
  }

  function openEditModal(lesson: CourseLesson) {
    setError("");
    setSuccess("");
    setEditingLesson(lesson);
    setTitle(lesson.title);
    setDescription(lesson.description ?? "");
    setLessonOrder(String(lesson.lessonOrder));
    setContent(lesson.content ?? "");
    setShowAddModal(true);
  }

  // =========================================================
  // CLOSE EDIT LESSON
  // =========================================================

  function closeAddModal() {
    if (saving) return;

    setShowAddModal(false);
    setEditingLesson(null);

    setError("");

    resetForm();
  }

  // =========================================================
  // UPDATE LESSON
  // =========================================================

  async function handleSaveLesson(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validModuleId) {
      setError("Invalid module ID.");
      return;
    }

    if (!title.trim()) {
      setError("Lesson title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Lesson content is required.");
      return;
    }

    const order = Number.parseInt(lessonOrder, 10);

    if (!Number.isInteger(order) || order <= 0) {
      setError(
        "Lesson order must be a valid positive number."
      );
      return;
    }

    try {
      setSaving(true);

      if (!editingLesson) {
        setError("Please select a lesson to edit.");
        return;
      }

      const updatedLesson = await updateAdminCourseLesson(
        editingLesson.id,
        {
          title: title.trim(),
          description: description.trim(),
          lessonOrder: order,
          content: content.trim(),
        }
      );

      setLessons((current) =>
        current.map((item) =>
          item.id === editingLesson.id
            ? updatedLesson
            : item
        )
      );

      setSuccess("Lesson updated successfully.");

      setShowAddModal(false);
      setEditingLesson(null);
      resetForm();

      await loadData();
    } catch (err) {
      console.error(
        editingLesson
          ? "Failed to update lesson:"
          : "Failed to create lesson:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : editingLesson
            ? "Failed to update lesson."
            : "Failed to create lesson."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // TOGGLE LESSON STATUS
  // =========================================================

  async function handleToggleStatus(
    lesson: CourseLesson
  ) {
    try {
      setError("");
      setSuccess("");

      await updateAdminCourseLessonStatus(
        lesson.id,
        !lesson.active
      );

      setLessons((current) =>
        current.map((item) =>
          item.id === lesson.id
            ? {
                ...item,
                active: !item.active,
              }
            : item
        )
      );

      setSuccess(
        lesson.active
          ? "Lesson deactivated."
          : "Lesson activated."
      );
    } catch (err) {
      console.error(
        "Failed to update lesson status:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update lesson status."
      );
    }
  }

  // =========================================================
  // BACK TO MODULES
  // =========================================================

  function goBackToModules() {
    router.push(
      `/admin/dashboard/courses/${courseId}/modules`
    );
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

              <p className="text-sm text-slate-500">
                Loading lessons...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // INVALID MODULE
  // =========================================================

  if (!validModuleId) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={goBackToModules}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
          >
            <ArrowLeft size={18} />
            Back to Modules
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-700">
              Invalid module ID.
            </p>

            <p className="mt-1 text-sm text-red-600">
              Module ID received from URL:{" "}
              <span className="font-semibold">
                {rawModuleId || "empty"}
              </span>
            </p>

            <p className="mt-2 text-xs text-red-500">
              Current path: {pathname}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6">
          <button
            onClick={goBackToModules}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft size={18} />
            Back to Modules
          </button>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Module Content
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                {module?.title || "Lessons"}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Course:{" "}
                <span className="font-medium text-slate-700">
                  {module?.courseName ||
                    `Course ${courseId}`}
                </span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Module ID: {moduleId}
              </p>
            </div>


          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              className="shrink-0"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <Check size={18} />
            <span>{success}</span>
          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <StatCard
            icon={<FileText size={20} />}
            label="Total Lessons"
            value={totalLessons}
          />

          <StatCard
            icon={<Check size={20} />}
            label="Active Lessons"
            value={activeLessons}
          />

          <StatCard
            icon={<Power size={20} />}
            label="Inactive Lessons"
            value={inactiveLessons}
          />

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search lessons..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>
        </div>

        {/* =================================================
            LESSON LIST
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Desktop Header */}

          <div className="hidden grid-cols-[80px_1.5fr_2fr_120px_120px_120px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
            <div>Order</div>
            <div>Lesson</div>
            <div>Description</div>
            <div>Status</div>
            <div>Content</div>
            <div>Action</div>
          </div>

          {/* Empty */}

          {filteredLessons.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <FileText
                size={40}
                className="mx-auto mb-4 text-slate-300"
              />

              <h3 className="text-lg font-semibold text-slate-900">
                No lessons found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? "Try a different search."
                  : "Add your first lesson to this module."}
              </p>


            </div>
          ) : (
            <div className="divide-y divide-slate-100">

              {filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="px-5 py-5 transition hover:bg-slate-50"
                >

                  {/* DESKTOP */}

                  <div className="hidden grid-cols-[80px_1.5fr_2fr_120px_120px_120px] items-center gap-4 lg:grid">

                    <div className="text-sm font-bold text-slate-900">
                      {lesson.lessonOrder}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-950">
                        {lesson.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        ID: {lesson.id}
                      </p>
                    </div>

                    <div className="text-sm text-slate-600">
                      {lesson.description ||
                        "No description"}
                    </div>

                    <div>
                      {lesson.active ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div>
                      {lesson.content ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                          <Check size={15} />
                          Added
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">
                          Empty
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(lesson)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleToggleStatus(lesson)
                        }
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                          lesson.active
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        <Power size={15} />

                        {lesson.active
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </div>
                  </div>

                  {/* MOBILE */}

                  <div className="lg:hidden">
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-start gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-700">
                          {lesson.lessonOrder}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-950">
                            {lesson.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Lesson ID: {lesson.id}
                          </p>
                        </div>

                      </div>

                      {lesson.active ? (
                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                          Inactive
                        </span>
                      )}

                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Description
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {lesson.description ||
                          "No description"}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      <div className="text-xs text-slate-500">
                        {lesson.content
                          ? "Content added"
                          : "No content"}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(lesson)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleToggleStatus(lesson)
                          }
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                            lesson.active
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          <Power size={15} />

                          {lesson.active
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* ===================================================
          ADD LESSON MODAL
      =================================================== */}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Module Content
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  Edit Lesson
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Module ID: {moduleId}
                </p>
              </div>

              <button
                onClick={closeAddModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={22} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSaveLesson}
              className="overflow-y-auto"
            >

              <div className="space-y-5 p-6">

                {/* MODAL ERROR */}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* MODULE ID */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Module ID
                  </label>

                  <input
                    type="text"
                    value={moduleId}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 outline-none"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Automatically taken from the URL.
                  </p>
                </div>

                {/* TITLE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Lesson Title{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(
                        event.target.value
                      )
                    }
                    placeholder="Example: Variables Data Types"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    required
                  />
                </div>

                {/* ORDER */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Lesson Order{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={lessonOrder}
                    onChange={(event) =>
                      setLessonOrder(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    required
                  />
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(
                        event.target.value
                      )
                    }
                    placeholder="Short description"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                {/* CONTENT */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Lesson Content{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <textarea
                    value={content}
                    onChange={(event) =>
                      setContent(
                        event.target.value
                      )
                    }
                    placeholder="Enter lesson content..."
                    rows={8}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    required
                  />
                </div>

              </div>

              {/* FOOTER */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Pencil size={17} />
                      Update Lesson
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
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
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-950">
        {value}
      </p>

    </div>
  );
}