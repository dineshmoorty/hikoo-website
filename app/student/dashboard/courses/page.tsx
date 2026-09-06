"use client";

import { useEffect, useState } from "react";
import { getCourses, Course } from "@/services/CourseService";
import {
  enrollInCourse,
  getMyEnrollments,
  Enrollment,
} from "@/services/EnrollmentService";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [courseData, enrollmentData] = await Promise.all([
        getCourses(),
        getMyEnrollments(),
      ]);

      setCourses(courseData.filter((course) => course.active));
      setEnrollments(enrollmentData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load courses"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function isEnrolled(courseId: number) {
    return enrollments.some(
      (enrollment) =>
        enrollment.courseId === courseId &&
        enrollment.active
    );
  }

  function getEnrollment(courseId: number) {
    return enrollments.find(
      (enrollment) =>
        enrollment.courseId === courseId &&
        enrollment.active
    );
  }

  async function handleJoin(courseId: number) {
    try {
      setJoiningId(courseId);
      setError("");
      setSuccess("");

      await enrollInCourse(courseId);

      setSuccess("Course joined successfully! 🎉");

      await loadData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to join course"
      );
    } finally {
      setJoiningId(null);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
          <p className="mt-4 text-sm text-slate-500">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Student Portal
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Courses
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Explore available courses and join the program you want to learn.
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {/* My enrollments */}
      {enrollments.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              My Courses
            </h2>

            <p className="text-sm text-slate-500">
              Courses you have already joined.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">
                      {enrollment.courseCode || "Course"}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {enrollment.courseName}
                    </h3>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Enrolled
                  </span>
                </div>

                <div className="mt-5 border-t border-indigo-100 pt-4">
                  {enrollment.employeeName ? (
                    <div>
                      <p className="text-xs text-slate-500">
                        Assigned Mentor
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {enrollment.employeeName}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-amber-700">
                      Employee assignment pending
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Available courses */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Available Courses
          </h2>

          <p className="text-sm text-slate-500">
            Choose a course to begin your learning journey.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="font-medium text-slate-700">
              No active courses available
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please check again later.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const enrolled = isEnrolled(course.id);
              const enrollment = getEnrollment(course.id);

              return (
                <div
                  key={course.id}
                  className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {course.code || "COURSE"}
                    </span>

                    {enrolled && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Joined
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {course.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                    {course.description ||
                      "Learn practical skills through the HIKOO learning program."}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {course.duration || "Flexible"}
                      </p>
                    </div>

                    {enrollment?.employeeName && (
                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          Mentor
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {enrollment.employeeName}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    {enrolled ? (
                      <button
                        disabled
                        className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500"
                      >
                        Already Joined
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoin(course.id)}
                        disabled={joiningId === course.id}
                        className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {joiningId === course.id
                          ? "Joining..."
                          : "Join Course"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}