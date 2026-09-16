"use client";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  Enrollment,
  getMyEnrollments,
} from "@/services/EnrollmentService";

export default function StudentDashboardPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [studentName, setStudentName] = useState("Student");

  // ============================================================
  // LOAD STUDENT DATA
  // ============================================================

  useEffect(() => {
    const name = localStorage.getItem("hikoo_name");

    if (name) {
      setStudentName(name);
    }

    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyEnrollments();

      setEnrollments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // DASHBOARD COUNTS
  // ============================================================

  const totalCourses = enrollments.length;

  const activeCourses = useMemo(
    () =>
      enrollments.filter(
        (enrollment) => enrollment.active
      ).length,
    [enrollments]
  );

  const assignedCourses = useMemo(
    () =>
      enrollments.filter(
        (enrollment) =>
          enrollment.employeeId !== null
      ).length,
    [enrollments]
  );

  const pendingAssignments = useMemo(
    () =>
      enrollments.filter(
        (enrollment) =>
          enrollment.active &&
          enrollment.employeeId === null
      ).length,
    [enrollments]
  );

  // ============================================================
  // DATE FORMAT
  // ============================================================

  function formatDate(value: string | null) {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-8">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
              Student Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Welcome back, {studentName} 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Keep track of your courses and learning journey
              from one place.
            </p>
          </div>

          <Link
            href="/student/profile"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            My Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ======================================================
          STAT CARDS
      ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={loading ? "—" : totalCourses}
          description="Courses enrolled"
          icon={BookOpen}
        />

        <StatCard
          title="Active Courses"
          value={loading ? "—" : activeCourses}
          description="Currently active"
          icon={CheckCircle2}
        />

        <StatCard
          title="Assigned Trainer"
          value={loading ? "—" : assignedCourses}
          description="Courses with trainer"
          icon={UsersRound}
        />

        <StatCard
          title="Pending Assignment"
          value={loading ? "—" : pendingAssignments}
          description="Waiting for trainer"
          icon={Clock3}
        />
      </section>

      {/* ======================================================
          MY COURSES
      ====================================================== */}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              My Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your enrolled learning programs
            </p>
          </div>

          <Link
            href="/student/dashboard/courses"
            className="hidden items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 lg:grid-cols-2">
            <CourseSkeleton />
            <CourseSkeleton />
          </div>
        )}

        {/* Empty */}
        {!loading && enrollments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <BookOpen className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No courses yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You haven't enrolled in any courses yet.
              Once you enroll, your courses will appear here.
            </p>

            <Link
              href="/student/dashboard/courses"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Courses */}
        {!loading && enrollments.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-2">
            {enrollments.slice(0, 6).map((enrollment) => (
              <CourseCard
                key={enrollment.id}
                enrollment={enrollment}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}

        {/* Mobile view all */}
        {!loading && enrollments.length > 0 && (
          <div className="mt-4 sm:hidden">
            <Link
              href="/student/dashboard/courses"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
            >
              View all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* ======================================================
          QUICK ACCESS
      ====================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-950">
            Quick Access
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Jump directly to your student activities
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickLink
            href="/student/dashboard/courses"
            icon={BookOpen}
            title="My Courses"
            description="View your courses"
          />

          <QuickLink
            href="/student/dashboard/attendance"
            icon={CalendarDays}
            title="Attendance"
            description="Check attendance"
          />

          <QuickLink
            href="/student/dashboard/internships"
            icon={GraduationCap}
            title="Internships"
            description="Explore internships"
          />

          <QuickLink
            href="/student/dashboard/jobs"
            icon={UsersRound}
            title="Jobs"
            description="View opportunities"
          />
        </div>
      </section>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

// ============================================================
// COURSE CARD
// ============================================================

function CourseCard({
  enrollment,
  formatDate,
}: {
  enrollment: Enrollment;
  formatDate: (value: string | null) => string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
            <BookOpen className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-slate-950">
              {enrollment.courseName}
            </h3>

            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              {enrollment.courseCode || "Course"}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            enrollment.active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {enrollment.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Trainer
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-700">
            {enrollment.employeeName || "Not assigned"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400">
            Enrolled
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-700">
            {formatDate(enrollment.enrolledAt)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          {enrollment.assignedAt ? (
            <p className="text-xs text-slate-400">
              Trainer assigned{" "}
              {formatDate(enrollment.assignedAt)}
            </p>
          ) : (
            <p className="text-xs text-amber-600">
              Trainer not assigned yet
            </p>
          )}
        </div>

        <Link
          href="/student/dashboard/courses"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
        >
          View
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// QUICK LINK
// ============================================================

function QuickLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <ArrowRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600" />
      </div>
    </Link>
  );
}

// ============================================================
// SKELETON
// ============================================================

function CourseSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-xl bg-slate-200" />

        <div className="flex-1">
          <div className="h-4 w-2/3 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
        </div>
      </div>

      <div className="mt-6 h-px bg-slate-100" />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="h-3 w-16 rounded bg-slate-100" />
          <div className="mt-2 h-4 w-24 rounded bg-slate-200" />
        </div>

        <div>
          <div className="h-3 w-16 rounded bg-slate-100" />
          <div className="mt-2 h-4 w-24 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}