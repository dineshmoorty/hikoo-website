"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Loader2,
} from "lucide-react";

import {
  EmployeeCourse,
  EmployeeCourseLesson,
  EmployeeCourseModule,
  getMyEmployeeCourse,
  getMyEmployeeCourseModules,
  getMyEmployeeModuleLessons,
} from "@/services/EmployeeCourseService";

export default function EmployeeCourseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = Number(params.courseId);

  const [course, setCourse] = useState<EmployeeCourse | null>(null);
  const [modules, setModules] = useState<EmployeeCourseModule[]>([]);
  const [lessons, setLessons] = useState<Record<number, EmployeeCourseLesson[]>>(
    {}
  );
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});

  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [loadingModuleId, setLoadingModuleId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [contentError, setContentError] = useState("");

  useEffect(() => {
    async function loadCourse() {
      try {
        if (!courseId || Number.isNaN(courseId)) {
          throw new Error("Invalid course.");
        }

        setLoading(true);
        setError("");

        const [courseData, moduleData] = await Promise.all([
          getMyEmployeeCourse(courseId),
          getMyEmployeeCourseModules(courseId),
        ]);

        setCourse(courseData);
        setModules(moduleData);
      } catch (err) {
        console.error("Failed to load employee course:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load course."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);

  async function toggleModule(moduleId: number) {
    const isOpen = !!openModules[moduleId];

    setOpenModules((current) => ({
      ...current,
      [moduleId]: !isOpen,
    }));

    if (isOpen || lessons[moduleId]) return;

    try {
      setLoadingModuleId(moduleId);
      setContentError("");

      const data = await getMyEmployeeModuleLessons(courseId, moduleId);

      setLessons((current) => ({
        ...current,
        [moduleId]: data,
      }));
    } catch (err) {
      console.error("Failed to load lessons:", err);
      setContentError(
        err instanceof Error ? err.message : "Failed to load lessons."
      );
    } finally {
      setLoadingModuleId(null);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading course...
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => router.push("/employee/dashboard/courses")}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-lg font-semibold text-red-800">
            Unable to open course
          </h1>
          <p className="mt-2 text-sm text-red-600">
            {error || "Course not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <button
        type="button"
        onClick={() => router.push("/employee/dashboard/courses")}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </button>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white">
              <BookOpen className="h-6 w-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-950">
                  {course.name}
                </h1>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  Assigned
                </span>
              </div>

              {course.code && (
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                  {course.code}
                </p>
              )}

              <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-500">
                {course.description || "No course description available."}
              </p>
            </div>
          </div>

          {course.duration && (
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              <Clock3 className="h-4 w-4" />
              {course.duration}
            </div>
          )}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-950">Course Modules</h2>
          <p className="mt-1 text-sm text-gray-500">
            Open a module to view its lessons.
          </p>
        </div>

        {contentError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {contentError}
          </div>
        )}

        {modules.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <FileText className="mx-auto h-8 w-8 text-gray-400" />
            <h3 className="mt-3 font-semibold text-gray-950">
              No modules available
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Modules for this course have not been added yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {modules.map((module, index) => {
              const isOpen = !!openModules[module.id];
              const moduleLessons = lessons[module.id] ?? [];

              return (
                <div
                  key={module.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-700">
                        {module.moduleOrder || index + 1}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-gray-950">
                          {module.title}
                        </h3>
                        {module.description && (
                          <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                            {module.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {loadingModuleId === module.id ? (
                      <Loader2 className="h-5 w-5 shrink-0 animate-spin text-gray-500" />
                    ) : isOpen ? (
                      <ChevronDown className="h-5 w-5 shrink-0 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 shrink-0 text-gray-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50/70 p-4 sm:p-5">
                      {moduleLessons.length === 0 ? (
                        <p className="px-2 py-3 text-sm text-gray-500">
                          No lessons available in this module.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {moduleLessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="rounded-xl border border-gray-200 bg-white p-4"
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600">
                                  {lesson.lessonOrder || lessonIndex + 1}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-sm font-semibold text-gray-950">
                                      {lesson.title}
                                    </h4>

                                    {lesson.active && (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Active
                                      </span>
                                    )}
                                  </div>

                                  {lesson.description && (
                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                      {lesson.description}
                                    </p>
                                  )}

                                  {lesson.content && (
                                    <div className="mt-3 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-700">
                                      {lesson.content}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
