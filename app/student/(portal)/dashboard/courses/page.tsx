"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lock,
  RefreshCw,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  getCourses,
  Course,
} from "@/services/CourseService";

import {
  enrollInCourse,
  getMyEnrollments,
  Enrollment,
} from "@/services/EnrollmentService";

type Filter = "ALL" | "ACTIVE" | "INACTIVE";

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

export default function StudentCoursesPage() {
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [joiningId, setJoiningId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");

  // Join Course modal
  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);
  const [startDate, setStartDate] = useState("");

  // =========================================================
  // LOAD DATA
  // =========================================================

  async function loadData(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [courseData, enrollmentData] = await Promise.all([
        getCourses(),
        getMyEnrollments(),
      ]);

      setCourses(courseData);
      setEnrollments(enrollmentData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load courses. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // =========================================================
  // ENROLLMENT HELPERS
  // =========================================================

  function getEnrollment(courseId: number) {
    return enrollments.find(
      (enrollment) => enrollment.courseId === courseId
    );
  }

  const activeEnrollment = enrollments.find(
    (enrollment) =>
      enrollment.active === true &&
      enrollment.completed !== true
  );

  const completedEnrollments = enrollments.filter(
    (enrollment) => enrollment.completed === true
  );

  const hasActiveCourse = Boolean(activeEnrollment);

  // =========================================================
  // JOIN COURSE
  // =========================================================

  async function handleJoin(
    courseId: number,
    selectedStartDate: string
  ) {
    const existingEnrollment = getEnrollment(courseId);

    // ---------------------------------------------------------
    // RULE 1
    // Student can have only ONE active course
    // ---------------------------------------------------------

    if (hasActiveCourse) {
      setError(
        "You already have an active course. Complete it before joining another course."
      );
      setSuccess("");
      return;
    }

    // ---------------------------------------------------------
    // RULE 2
    // Same course can NEVER be joined again after completion
    // ---------------------------------------------------------

    if (existingEnrollment?.completed === true) {
      setError(
        "You have already completed this course. You cannot join the same course again."
      );
      setSuccess("");
      return;
    }

    // ---------------------------------------------------------
    // RULE 3
    // Prevent duplicate active enrollment
    // ---------------------------------------------------------

    if (
      existingEnrollment?.active === true &&
      !existingEnrollment.completed
    ) {
      setError("You are already enrolled in this course.");
      setSuccess("");
      return;
    }

    // ---------------------------------------------------------
    // FIND COURSE
    // ---------------------------------------------------------

    const course = courses.find(
      (item) => item.id === courseId
    );

    if (!course) {
      setError("Course not found.");
      setSuccess("");
      return;
    }

    // ---------------------------------------------------------
    // RULE 4
    // Inactive course cannot be joined
    // ---------------------------------------------------------

    if (!course.active) {
      setError(
        "This course is currently inactive and cannot be joined."
      );
      setSuccess("");
      return;
    }

    try {
      setJoiningId(courseId);

      setError("");
      setSuccess("");

      await enrollInCourse({
        courseId,
        startDate: selectedStartDate,
      });

      setSuccess(
        "Course joined successfully! 🎉"
      );

      await loadData(true);
      setSelectedCourse(null);
      setStartDate("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to join course. Please try again."
      );
    } finally {
      setJoiningId(null);
    }
  }

  // =========================================================
  // JOIN COURSE MODAL
  // =========================================================

  function openJoinModal(course: Course) {
    setError("");
    setSuccess("");
    setSelectedCourse(course);
    setStartDate("");
  }

  function closeJoinModal() {
    if (joiningId !== null) return;

    setSelectedCourse(null);
    setStartDate("");
  }

  function submitJoin() {
    if (!selectedCourse) return;

    if (!startDate) {
      setError("Please select a start date.");
      return;
    }

    const today = new Date();
    const selected = new Date(`${startDate}T00:00:00`);

    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      setError("Start date cannot be in the past.");
      return;
    }

    handleJoin(selectedCourse.id, startDate);
  }

  // =========================================================
  // FILTER
  // =========================================================

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses
      .filter((course) => {
        if (filter === "ACTIVE") {
          return course.active;
        }

        if (filter === "INACTIVE") {
          return !course.active;
        }

        return true;
      })
      .filter((course) => {
        if (!query) return true;

        return (
          course.name?.toLowerCase().includes(query) ||
          course.code?.toLowerCase().includes(query) ||
          course.description
            ?.toLowerCase()
            .includes(query)
        );
      });
  }, [courses, search, filter]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="animate-pulse">
          <div className="h-4 w-28 rounded bg-slate-200" />

          <div className="mt-3 h-9 w-56 rounded bg-slate-200" />

          <div className="mt-3 h-4 w-96 max-w-full rounded bg-slate-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white"
            />
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-3xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Student Portal
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              My Courses
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Learn one course at a time. Complete your
              current course to unlock the next course.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                refreshing ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>
        </div>
      </section>

      {/* =====================================================
          ALERTS
      ===================================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5">⚠️</span>

          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

          <p>{success}</p>
        </div>
      )}

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <section className="grid gap-4 sm:grid-cols-3">

        {/* Current Course */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Current Course
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {activeEnrollment ? 1 : 0}
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-3">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Completed Courses */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Completed Courses
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {completedEnrollments.length}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Assigned Mentor */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Assigned Mentor
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {activeEnrollment?.employeeName ? 1 : 0}
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-3">
              <UsersRound className="h-6 w-6 text-violet-600" />
            </div>
          </div>
        </div>

      </section>

      {/* =====================================================
          CURRENT COURSE
      ===================================================== */}

      {activeEnrollment && (
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Current Course
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete this course before choosing another course.
            </p>
          </div>

          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/40 p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {activeEnrollment.courseCode || "COURSE"}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {activeEnrollment.courseName}
                </h3>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">

                  <span className="inline-flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-indigo-500" />

                    {activeEnrollment.employeeName ||
                      "Mentor assignment pending"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-indigo-500" />

                    {formatDate(activeEnrollment.enrolledAt)}
                  </span>

                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />

                In Progress
              </span>

            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Clock3 className="h-4 w-4" />

              Continue learning to complete this course.
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          COMPLETED COURSES
      ===================================================== */}

      {completedEnrollments.length > 0 && (
        <section>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Completed Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your completed HIKOO courses. Completed courses
              cannot be joined again.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {completedEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      {enrollment.courseCode || "COURSE"}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      {enrollment.courseName}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />

                    Completed
                  </span>

                </div>

                <div className="mt-5 text-sm text-slate-500">
                  Completed on{" "}

                  <span className="font-semibold text-slate-700">
                    {formatDate(enrollment.completedAt)}
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-100 bg-white/70 px-4 py-3 text-sm font-medium text-emerald-700">
                  🔒 This course cannot be joined again.
                </div>

              </div>
            ))}

          </div>
        </section>
      )}

      {/* =====================================================
          AVAILABLE COURSES
      ===================================================== */}

      <section>

        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Available Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {hasActiveCourse
                ? "Complete your current course to unlock another course."
                : "Choose one course to begin your HIKOO learning journey."}
            </p>
          </div>

          {/* Search */}

          <div className="relative w-full lg:w-80">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />

          </div>

        </div>

        {/* Filters */}

        <div className="mb-5 flex flex-wrap gap-2">

          {(
            [
              ["ALL", "All Courses"],
              ["ACTIVE", "Active"],
              ["INACTIVE", "Inactive"],
            ] as const
          ).map(([value, label]) => (

            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === value
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* No Courses */}

        {filteredCourses.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <BookOpen className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-5 font-semibold text-slate-800">
              No courses found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {search
                ? "Try another search term."
                : "There are no courses matching the selected filter."}
            </p>

          </div>

        ) : (

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredCourses.map((course) => {

              const enrollment = getEnrollment(course.id);

              const isCurrent =
                enrollment?.active === true &&
                enrollment?.completed !== true;

              const isCompleted =
                enrollment?.completed === true;

              const isPreviouslyJoined =
                Boolean(enrollment);

              const blockedByActiveCourse =
                hasActiveCourse &&
                !isCurrent &&
                !isCompleted;

              const canJoin =
                course.active &&
                !isCurrent &&
                !isCompleted &&
                !blockedByActiveCourse &&
                !isPreviouslyJoined;

              return (

                <article
                  key={course.id}
                  className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition ${
                    isCurrent
                      ? "border-indigo-200 shadow-md"
                      : isCompleted
                      ? "border-emerald-200"
                      : blockedByActiveCourse
                      ? "border-slate-200"
                      : "border-slate-200 hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
                >

                  {/* =================================================
                      TOP
                  ================================================= */}

                  <div className="flex items-start justify-between gap-3">

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {course.code || "COURSE"}
                    </span>

                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                        <BookOpen className="h-3.5 w-3.5" />

                        Current
                      </span>
                    )}

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />

                        Completed
                      </span>
                    )}

                    {!isCurrent &&
                      !isCompleted &&
                      course.active &&
                      !blockedByActiveCourse && (
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                          Available
                        </span>
                      )}

                    {blockedByActiveCourse && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                        <Lock className="h-3.5 w-3.5" />

                        Locked
                      </span>
                    )}

                    {!course.active && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                        Inactive
                      </span>
                    )}

                  </div>

                  {/* =================================================
                      NAME
                  ================================================= */}

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {course.name}
                  </h3>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                    {course.description ||
                      "Learn practical skills through the HIKOO learning program."}
                  </p>

                  {/* =================================================
                      DETAILS
                  ================================================= */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {course.duration || "Flexible"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Status
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {course.active ? "Active" : "Inactive"}
                      </p>
                    </div>

                  </div>

                  {/* =================================================
                      MENTOR
                  ================================================= */}

                  {enrollment?.employeeName && (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                        <UserRound className="h-4 w-4 text-indigo-600" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs text-slate-400">
                          Assigned Mentor
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {enrollment.employeeName}
                        </p>

                      </div>

                    </div>
                  )}

                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <div className="mt-auto space-y-3 pt-6">

                    {/* VIEW COURSE */}

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/student/dashboard/courses/${course.id}`
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      View Course
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    {/* INACTIVE */}

                    {!course.active ? (

                      <button
                        type="button"
                        disabled
                        className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                      >
                        Course Inactive
                      </button>

                    ) : isCurrent ? (

                      <button
                        type="button"
                        disabled
                        className="w-full rounded-2xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700"
                      >
                        ✓ Current Course
                      </button>

                    ) : isCompleted ? (

                      <button
                        type="button"
                        disabled
                        className="w-full rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
                      >
                        ✓ Completed — Cannot Rejoin
                      </button>

                    ) : isPreviouslyJoined ? (

                      <button
                        type="button"
                        disabled
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500"
                      >
                        <Lock className="h-4 w-4" />

                        Already Joined
                      </button>

                    ) : blockedByActiveCourse ? (

                      <button
                        type="button"
                        disabled
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500"
                      >
                        <Lock className="h-4 w-4" />

                        Complete current course first
                      </button>

                    ) : canJoin ? (

                      <button
                        type="button"
                        onClick={() => openJoinModal(course)}
                        disabled={joiningId === course.id}
                        className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {joiningId === course.id
                          ? "Joining..."
                          : "Join Course"}
                      </button>

                    ) : (

                      <button
                        type="button"
                        disabled
                        className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                      >
                        Not Available
                      </button>

                    )}

                  </div>

                </article>

              );
            })}

          </div>

        )}

      </section>


      {/* =====================================================
          JOIN COURSE MODAL
      ===================================================== */}

      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-course-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeJoinModal();
            }
          }}
        >
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Join Course
                </p>

                <h2
                  id="join-course-title"
                  className="mt-1 text-xl font-bold text-slate-900"
                >
                  {selectedCourse.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Select your course start date. The end date will be
                  calculated automatically by HIKOO based on the course
                  duration.
                </p>
              </div>

              <button
                type="button"
                onClick={closeJoinModal}
                disabled={joiningId !== null}
                aria-label="Close"
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <label
                htmlFor="course-start-date"
                className="text-sm font-semibold text-slate-700"
              >
                Start Date <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-2">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-500" />

                <input
                  id="course-start-date"
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                    setError("");
                  }}
                  disabled={joiningId !== null}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Choose today or a future date.
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500">
                  Course Duration
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  {selectedCourse.duration || "Not specified"}
                </span>
              </div>

              <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-400">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  End date will be calculated automatically by the
                  backend after enrollment.
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeJoinModal}
                disabled={joiningId !== null}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submitJoin}
                disabled={joiningId !== null || !startDate}
                className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {joiningId === selectedCourse.id
                  ? "Joining..."
                  : "Confirm & Join"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}