"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock3,
  Lock,
  PlayCircle,
  RotateCcw,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  getCourses,
  Course,
} from "@/services/CourseService";

import {
  getMyEnrollments,
  Enrollment,
} from "@/services/EnrollmentService";

import {
  getCourseModules,
  CourseModule,
} from "@/services/CourseModuleService";

import {
  getCourseLessons,
  CourseLesson,
} from "@/services/CourseLessonService";

import {
  getMyCourseProgress,
  CourseProgress,
} from "@/services/StudentLessonProgressService";


// =========================================================
// DATE FORMAT
// =========================================================

function formatDate(value?: string | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


// =========================================================
// PAGE
// =========================================================

export default function StudentCourseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = Number(params.courseId);

  // =========================================================
  // COURSE STATE
  // =========================================================

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] =
    useState<Enrollment | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================================================
  // COURSE CONTENT STATE
  // =========================================================

  const [modules, setModules] = useState<CourseModule[]>([]);

  const [lessons, setLessons] =
    useState<Record<number, CourseLesson[]>>({});

  const [progress, setProgress] =
    useState<CourseProgress | null>(null);

  const [contentLoading, setContentLoading] =
    useState(true);

  const [contentError, setContentError] =
    useState("");

  const [openModules, setOpenModules] =
    useState<Record<number, boolean>>({});


  // =========================================================
  // LOAD COURSE + ENROLLMENT
  // =========================================================

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true);
        setError("");

        if (!courseId || Number.isNaN(courseId)) {
          throw new Error("Invalid course.");
        }

        const [
          courseData,
          enrollmentData,
        ] = await Promise.all([
          getCourses(),
          getMyEnrollments(),
        ]);

        const foundCourse =
          courseData.find(
            (item) => item.id === courseId
          ) ?? null;

        if (!foundCourse) {
          throw new Error("Course not found.");
        }

        const foundEnrollment =
          enrollmentData.find(
            (item) => item.courseId === courseId
          ) ?? null;

        setCourse(foundCourse);
        setEnrollment(foundEnrollment);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load course details."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);


  // =========================================================
  // STATUS
  // =========================================================

  const status = useMemo(() => {
    if (!course) {
      return "UNKNOWN";
    }

    if (enrollment?.completed === true) {
      return "COMPLETED";
    }

    if (
      enrollment?.active === true &&
      !enrollment.completed
    ) {
      return "CURRENT";
    }

    if (!course.active) {
      return "INACTIVE";
    }

    return "AVAILABLE";
  }, [course, enrollment]);


  // =========================================================
  // LOAD MODULES + LESSONS
  // =========================================================

  useEffect(() => {
    async function loadCourseContent() {
      if (!courseId || Number.isNaN(courseId)) {
        return;
      }

      try {
        setContentLoading(true);
        setContentError("");

        // -----------------------------------------------------
        // LOAD MODULES
        // -----------------------------------------------------

        const moduleData =
          await getCourseModules(courseId);

        const sortedModules =
          [...moduleData].sort(
            (a, b) =>
              a.moduleOrder - b.moduleOrder
          );

        setModules(sortedModules);


        // -----------------------------------------------------
        // LOAD LESSONS FOR EACH MODULE
        // -----------------------------------------------------

        const lessonEntries =
          await Promise.all(
            sortedModules.map(
              async (module) => {
                const data =
                  await getCourseLessons(
                    module.id
                  );

                const sortedLessons =
                  [...data].sort(
                    (a, b) =>
                      a.lessonOrder -
                      b.lessonOrder
                  );

                return [
                  module.id,
                  sortedLessons,
                ] as const;
              }
            )
          );

        setLessons(
          Object.fromEntries(
            lessonEntries
          )
        );


        // -----------------------------------------------------
        // OPEN FIRST MODULE
        // -----------------------------------------------------

        if (sortedModules.length > 0) {
          setOpenModules({
            [sortedModules[0].id]: true,
          });
        }


        // -----------------------------------------------------
        // LOAD STUDENT PROGRESS
        //
        // Progress endpoint belongs to the student's
        // current course.
        // -----------------------------------------------------

        if (
          enrollment?.active === true &&
          !enrollment.completed
        ) {
          try {
            const progressData =
              await getMyCourseProgress();

            if (
              progressData.courseId ===
              courseId
            ) {
              setProgress(progressData);
            } else {
              setProgress(null);
            }
          } catch {
            /*
             * Do not make the whole course page fail
             * if progress is not available yet.
             */
            setProgress(null);
          }
        } else {
          setProgress(null);
        }
      } catch (err) {
        setContentError(
          err instanceof Error
            ? err.message
            : "Unable to load course content."
        );
      } finally {
        setContentLoading(false);
      }
    }

    /*
     * Wait until enrollment has been loaded.
     */
    if (!loading) {
      loadCourseContent();
    }
  }, [
    courseId,
    enrollment,
    loading,
  ]);


  // =========================================================
  // CHECK LESSON COMPLETION
  // =========================================================

  function isLessonCompleted(
    lessonId: number
  ) {
    return (
      progress?.lessons?.some(
        (item) =>
          item.lessonId === lessonId &&
          item.completed === true
      ) ?? false
    );
  }


  // =========================================================
  // TOGGLE MODULE
  // =========================================================

  function toggleModule(
    moduleId: number
  ) {
    setOpenModules((current) => ({
      ...current,
      [moduleId]:
        !current[moduleId],
    }));
  }


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">

        <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />

        <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />

      </div>
    );
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error || !course) {
    return (
      <div className="mx-auto max-w-6xl">

        <button
          type="button"
          onClick={() =>
            router.push(
              "/student/dashboard/courses"
            )
          }
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </button>


        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
            ⚠️
          </div>

          <h2 className="mt-5 text-xl font-bold text-red-800">
            Unable to load course
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error || "Course not found."}
          </p>

        </div>

      </div>
    );
  }


  // =========================================================
  // PROGRESS VALUE
  // =========================================================

  const progressPercentage =
    progress
      ? Number(
          progress.progressPercentage
        )
      : 0;


  // =========================================================
  // TOTAL CONTENT
  // =========================================================

  const totalLoadedLessons =
    Object.values(lessons).reduce(
      (total, moduleLessons) =>
        total + moduleLessons.length,
      0
    );


  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="mx-auto max-w-6xl space-y-8">


      {/* =====================================================
          BACK
      ===================================================== */}

      <button
        type="button"
        onClick={() =>
          router.push(
            "/student/dashboard/courses"
          )
        }
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </button>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-8 text-white sm:px-8 sm:py-10">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

            <div className="max-w-3xl">

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {course.code || "COURSE"}
                </span>


                {course.courseOrder && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    Course {course.courseOrder}
                  </span>
                )}


                {status === "CURRENT" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    <BookOpen className="h-3.5 w-3.5" />
                    Current
                  </span>
                )}


                {status === "COMPLETED" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Completed
                  </span>
                )}


                {status === "AVAILABLE" && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    Available
                  </span>
                )}


                {status === "INACTIVE" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    <Lock className="h-3.5 w-3.5" />
                    Inactive
                  </span>
                )}

              </div>


              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                {course.name}
              </h1>


              <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
                {course.description ||
                  "Learn practical skills through the HIKOO learning program."}
              </p>

            </div>


            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <BookOpen className="h-8 w-8" />
            </div>

          </div>

        </div>


        {/* ===================================================
            COURSE META
        =================================================== */}

        <div className="grid gap-px bg-slate-200 sm:grid-cols-3">

          <div className="bg-white p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-indigo-50 p-2.5">
                <Clock3 className="h-5 w-5 text-indigo-600" />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Duration
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {course.duration || "Flexible"}
                </p>

              </div>

            </div>

          </div>


          <div className="bg-white p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-violet-50 p-2.5">
                <BookOpen className="h-5 w-5 text-violet-600" />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Course Code
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {course.code || "Not assigned"}
                </p>

              </div>

            </div>

          </div>


          <div className="bg-white p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-emerald-50 p-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Course Status
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {status === "CURRENT"
                    ? "In Progress"
                    : status === "COMPLETED"
                    ? "Completed"
                    : course.active
                    ? "Active"
                    : "Inactive"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CURRENT COURSE
      ===================================================== */}

      {status === "CURRENT" && (
        <section className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </span>

                <h2 className="text-lg font-bold text-slate-900">
                  You are currently learning this course
                </h2>

              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Complete every lesson to finish this course
                and unlock the next course.
              </p>

            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold text-indigo-700">
              <BookOpen className="h-4 w-4" />
              In Progress
            </span>

          </div>

        </section>
      )}


      {/* =====================================================
          COMPLETED
      ===================================================== */}

      {status === "COMPLETED" && (
        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </span>

                <h2 className="text-lg font-bold text-slate-900">
                  Course Completed 🎉
                </h2>

              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                You completed this course on{" "}
                <span className="font-semibold text-slate-700">
                  {formatDate(
                    enrollment?.completedAt
                  )}
                </span>
                .
              </p>

            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700">
              <Lock className="h-4 w-4" />
              Cannot Rejoin
            </span>

          </div>

        </section>
      )}


      {/* =====================================================
          PROGRESS
      ===================================================== */}

      {status === "CURRENT" && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-500">
                Your Learning Progress
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                {progress?.completedLessons ?? 0} /{" "}
                {progress?.totalLessons ??
                  totalLoadedLessons}{" "}
                Lessons
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep going — complete every lesson to
                finish your course.
              </p>

            </div>

            <div className="text-left sm:text-right">

              <p className="text-3xl font-black text-indigo-600">
                {progressPercentage.toFixed(0)}%
              </p>

              <p className="text-xs font-semibold text-slate-400">
                Complete
              </p>

            </div>

          </div>


          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-700"
              style={{
                width: `${Math.min(
                  Math.max(
                    progressPercentage,
                    0
                  ),
                  100
                )}%`,
              }}
            />

          </div>


          <div className="mt-3 flex justify-between text-xs text-slate-400">

            <span>
              Course Progress
            </span>

            <span>
              {progress?.completedLessons ?? 0} completed
            </span>

          </div>

        </section>
      )}


      {/* =====================================================
          MENTOR
      ===================================================== */}

      {enrollment?.employeeName && (
        <section>

          <div className="mb-4">

            <h2 className="text-xl font-bold text-slate-900">
              Assigned Mentor
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your mentor assigned for this course.
            </p>

          </div>


          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
                <UserRound className="h-7 w-7 text-indigo-600" />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Course Mentor
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {enrollment.employeeName}
                </h3>

                {enrollment.employeeEmail && (
                  <p className="mt-1 text-sm text-slate-500">
                    {enrollment.employeeEmail}
                  </p>
                )}

              </div>

            </div>


            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">

              <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                <CalendarDays className="h-4 w-4 text-indigo-500" />

                Joined{" "}
                {formatDate(
                  enrollment.enrolledAt
                )}
              </span>


              {enrollment.assignedAt && (
                <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                  <UsersRound className="h-4 w-4 text-violet-500" />

                  Assigned{" "}
                  {formatDate(
                    enrollment.assignedAt
                  )}
                </span>
              )}

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          COURSE CONTENT
      ===================================================== */}

      <section>

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            Course Content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Follow the modules and complete each lesson
            to progress through your course.
          </p>

        </div>


        {/* ===================================================
            CONTENT ERROR
        =================================================== */}

        {contentError && (
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm font-medium text-red-700">
              {contentError}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-red-700 shadow-sm transition hover:bg-red-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry
            </button>

          </div>
        )}


        {/* ===================================================
            CONTENT LOADING
        =================================================== */}

        {contentLoading ? (
          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}

          </div>
        ) : modules.length === 0 ? (

          /* =================================================
             NO MODULES
          ================================================= */

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No modules available
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Learning content has not been added to this
              course yet.
            </p>

          </div>

        ) : (

          /* =================================================
             MODULES
          ================================================= */

          <div className="space-y-4">

            {modules.map((module) => {

              const moduleLessons =
                lessons[module.id] ?? [];

              const moduleCompleted =
                moduleLessons.length > 0 &&
                moduleLessons.every(
                  (lesson) =>
                    isLessonCompleted(
                      lesson.id
                    )
                );

              const moduleCompletedCount =
                moduleLessons.filter(
                  (lesson) =>
                    isLessonCompleted(
                      lesson.id
                    )
                ).length;

              const isOpen =
                openModules[module.id] === true;


              return (
                <div
                  key={module.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >

                  {/* =========================================
                      MODULE HEADER
                  ========================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleModule(
                        module.id
                      )
                    }
                    className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6"
                  >

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-black text-indigo-600">
                      {String(
                        module.moduleOrder
                      ).padStart(2, "0")}
                    </div>


                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-bold text-slate-900">
                          {module.title}
                        </h3>


                        {moduleCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Completed
                          </span>
                        )}

                      </div>


                      {module.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {module.description}
                        </p>
                      )}


                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">

                        <span>
                          {moduleLessons.length}{" "}
                          {moduleLessons.length === 1
                            ? "Lesson"
                            : "Lessons"}
                        </span>


                        {moduleLessons.length > 0 && (
                          <span>
                            {moduleCompletedCount}/
                            {moduleLessons.length}{" "}
                            completed
                          </span>
                        )}

                      </div>

                    </div>


                    <div className="shrink-0">

                      {isOpen ? (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      )}

                    </div>

                  </button>


                  {/* =========================================
                      LESSONS
                  ========================================= */}

                  {isOpen && (
                    <div className="border-t border-slate-100">

                      {moduleLessons.length === 0 ? (

                        <div className="p-6 text-sm text-slate-400">
                          No lessons available.
                        </div>

                      ) : (

                        <div className="divide-y divide-slate-100">

                          {moduleLessons.map(
                            (lesson) => {

                              const completed =
                                isLessonCompleted(
                                  lesson.id
                                );



                              return (
                                <div
                                  key={lesson.id}
                                  role={
                                    status === "CURRENT"
                                      ? "button"
                                      : undefined
                                  }
                                  tabIndex={
                                    status === "CURRENT"
                                      ? 0
                                      : undefined
                                  }
                                  onClick={() => {
                                    if (status === "CURRENT") {
                                      router.push(
                                        `/student/dashboard/courses/${courseId}/lessons/${lesson.id}`
                                      );
                                    }
                                  }}
                                  onKeyDown={(event) => {
                                    if (
                                      status === "CURRENT" &&
                                      (event.key === "Enter" ||
                                        event.key === " ")
                                    ) {
                                      event.preventDefault();

                                      router.push(
                                        `/student/dashboard/courses/${courseId}/lessons/${lesson.id}`
                                      );
                                    }
                                  }}
                                  className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:px-6 ${
                                    status === "CURRENT"
                                      ? "cursor-pointer transition hover:bg-indigo-50/50"
                                      : ""
                                  }`}
                                >

                                  {/* LESSON ICON */}

                                  <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                      completed
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-slate-100 text-slate-400"
                                    }`}
                                  >

                                    {completed ? (
                                      <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                      <Circle className="h-5 w-5" />
                                    )}

                                  </div>


                                  {/* LESSON INFO */}

                                  <div className="min-w-0 flex-1">

                                    <div className="flex items-center gap-2">

                                      <span className="text-xs font-bold text-slate-400">
                                        {String(
                                          lesson.lessonOrder
                                        ).padStart(
                                          2,
                                          "0"
                                        )}
                                      </span>

                                      <h4
                                        className={`font-semibold ${
                                          completed
                                            ? "text-emerald-700"
                                            : "text-slate-800"
                                        }`}
                                      >
                                        {lesson.title}
                                      </h4>

                                    </div>


                                    {lesson.description && (
                                      <p className="mt-1 text-sm text-slate-500">
                                        {lesson.description}
                                      </p>
                                    )}

                                  </div>


                                  {/* ACTION */}

                                  {status === "CURRENT" && (
                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();

                                        router.push(
                                          `/student/dashboard/courses/${courseId}/lessons/${lesson.id}`
                                        );
                                      }}
                                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                                    >
                                      <PlayCircle className="h-4 w-4" />
                                      {completed
                                        ? "Review Lesson"
                                        : "Open Lesson"}
                                    </button>
                                  )}

                                  {completed &&
                                    status !== "CURRENT" && (
                                      <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Completed
                                      </span>
                                    )}

                                  {status !== "CURRENT" &&
                                    !completed &&
                                    status !== "COMPLETED" && (
                                      <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-400">
                                        <Lock className="h-4 w-4" />
                                        Locked
                                      </span>
                                    )}

                                </div>
                              );
                            }
                          )}

                        </div>

                      )}

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}


        {/* ===================================================
            COURSE COMPLETED
        =================================================== */}

        {status === "CURRENT" &&
          progress?.courseCompleted === true && (
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>

              <h3 className="mt-4 text-xl font-black text-emerald-800">
                Course Completed 🎉
              </h3>

              <p className="mt-2 text-sm text-emerald-700">
                You have successfully completed all lessons
                in this course.
              </p>

            </div>
          )}


        {/* ===================================================
            COMPLETED COURSE SUMMARY
        =================================================== */}

        {status === "COMPLETED" && (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Learning Complete
                </p>

                <h3 className="mt-1 text-xl font-black text-emerald-800">
                  100% Course Completed 🎉
                </h3>

                <p className="mt-1 text-sm text-emerald-700">
                  All available lessons have been completed.
                </p>

              </div>


              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>

            </div>

          </div>
        )}

      </section>


      {/* =====================================================
          FOOTER ACTION
      ===================================================== */}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">

        <button
          type="button"
          onClick={() =>
            router.push(
              "/student/dashboard/courses"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </button>


        {status === "COMPLETED" && (
          <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Course Completed
          </div>
        )}


        {status === "CURRENT" && (
          <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700">
            <BookOpen className="h-4 w-4" />
            Course In Progress
          </div>
        )}


        {status === "INACTIVE" && (
          <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-500">
            <Lock className="h-4 w-4" />
            Course Inactive
          </div>
        )}

      </div>

    </div>
  );
}