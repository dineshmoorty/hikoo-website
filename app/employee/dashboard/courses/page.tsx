"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Search,
  UsersRound,
} from "lucide-react";

import {
  EmployeeCourse,
  getMyEmployeeCourses,
} from "@/services/EmployeeCourseService";

export default function EmployeeCoursesPage() {
  const router = useRouter();

  const [courses, setCourses] = useState<EmployeeCourse[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError("");

        const data = await getMyEmployeeCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load employee courses:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load assigned courses."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return courses;

    return courses.filter((course) => {
      return (
        course.name.toLowerCase().includes(keyword) ||
        (course.code ?? "").toLowerCase().includes(keyword) ||
        (course.description ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [courses, search]);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Learning</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
            My Courses
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View the courses assigned to you and manage your learning content.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
          <BookOpen className="h-4 w-4" />
          <span>{courses.length} assigned</span>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-56 animate-pulse rounded-2xl border border-gray-200 bg-white"
            />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <BookOpen className="h-5 w-5 text-gray-500" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-950">
            {courses.length === 0
              ? "No courses assigned"
              : "No matching courses"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {courses.length === 0
              ? "Courses assigned to you by the Admin or Super Admin will appear here."
              : "Try a different course name or code."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() =>
                router.push(`/employee/dashboard/courses/${course.id}`)
              }
              className="group text-left"
            >
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                    Assigned
                  </span>
                </div>

                <div className="mt-5">
                  <h2 className="line-clamp-2 text-lg font-semibold text-gray-950">
                    {course.name}
                  </h2>

                  {course.code && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      {course.code}
                    </p>
                  )}

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                    {course.description || "No course description available."}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {course.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    )}

                    <span className="flex items-center gap-1.5">
                      <UsersRound className="h-3.5 w-3.5" />
                      Employee
                    </span>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-950" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
