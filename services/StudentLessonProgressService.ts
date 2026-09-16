import { apiRequest } from "@/lib/api";

// =========================================================
// LESSON PROGRESS
// =========================================================

export interface LessonProgress {
  id: number;
  enrollmentId: number;
  lessonId: number;
  lessonTitle: string;
  lessonOrder: number;
  moduleId: number;
  moduleTitle: string;
  courseId: number;
  courseName: string;
  completed: boolean;
  completedAt: string | null;
}

// =========================================================
// COURSE PROGRESS
// =========================================================

export interface CourseProgress {
  enrollmentId: number;
  courseId: number;
  courseName: string;

  totalLessons: number;
  completedLessons: number;

  progressPercentage: number;

  courseCompleted: boolean;

  lessons: LessonProgress[];
}

// =========================================================
// AUTH HEADERS
// =========================================================

function authHeaders() {
  const token =
    localStorage.getItem("hikoo_token");

  if (!token) {
    throw new Error(
      "Authentication required"
    );
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// =========================================================
// COMPLETE LESSON
// =========================================================

export async function completeLesson(
  lessonId: number
): Promise<LessonProgress> {
  if (!lessonId || Number.isNaN(lessonId)) {
    throw new Error(
      "Invalid lesson ID."
    );
  }

  return apiRequest<LessonProgress>(
    "/api/student/progress/lesson/complete",
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        lessonId,
      }),
    }
  );
}

// =========================================================
// GET MY COURSE PROGRESS
// =========================================================

export async function getMyCourseProgress(): Promise<CourseProgress> {
  return apiRequest<CourseProgress>(
    "/api/student/progress/course",
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
}