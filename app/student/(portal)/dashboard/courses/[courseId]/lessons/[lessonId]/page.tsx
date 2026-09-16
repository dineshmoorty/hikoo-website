"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
} from "lucide-react";

import {
  CourseLesson,
  getCourseLesson,
} from "@/services/CourseLessonService";

import {
  completeLesson,
  getMyCourseProgress,
  CourseProgress,
} from "@/services/StudentLessonProgressService";


// =========================================================
// PAGE
// =========================================================

export default function StudentLessonPage() {

  const params = useParams();

  const router = useRouter();


  // ========================================================
  // URL PARAMS
  // ========================================================

  const courseId = Number(
    params.courseId
  );

  const lessonId = Number(
    params.lessonId
  );


  // ========================================================
  // STATE
  // ========================================================

  const [lesson, setLesson] =
    useState<CourseLesson | null>(null);

  const [progress, setProgress] =
    useState<CourseProgress | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [completing, setCompleting] =
    useState(false);

  const [completedLocally, setCompletedLocally] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ========================================================
  // LOAD LESSON + PROGRESS
  // ========================================================

  async function loadData() {

    try {

      setLoading(true);

      setError("");

      setSuccess("");


      // ----------------------------------------------------
      // VALIDATE COURSE ID
      // ----------------------------------------------------

      if (
        !courseId ||
        Number.isNaN(courseId)
      ) {

        throw new Error(
          "Invalid course ID."
        );

      }


      // ----------------------------------------------------
      // VALIDATE LESSON ID
      // ----------------------------------------------------

      if (
        !lessonId ||
        Number.isNaN(lessonId)
      ) {

        throw new Error(
          "Invalid lesson ID."
        );

      }


      // ----------------------------------------------------
      // LOAD LESSON
      // ----------------------------------------------------

      const lessonData =
        await getCourseLesson(
          lessonId
        );


      // ----------------------------------------------------
      // SECURITY CHECK
      // ----------------------------------------------------

      if (
        Number(lessonData.courseId) !==
        courseId
      ) {

        throw new Error(
          "This lesson does not belong to this course."
        );

      }


      // ----------------------------------------------------
      // ACTIVE CHECK
      // ----------------------------------------------------

      if (
        lessonData.active !== true
      ) {

        throw new Error(
          "This lesson is currently unavailable."
        );

      }


      setLesson(
        lessonData
      );


      // ----------------------------------------------------
      // LOAD PROGRESS
      //
      // Progress may not exist for a newly enrolled course.
      // So don't make lesson loading fail if progress returns
      // an error.
      // ----------------------------------------------------

      try {

        const progressData =
          await getMyCourseProgress();


        if (
          Number(progressData.courseId) ===
          courseId
        ) {

          setProgress(
            progressData
          );


          // ----------------------------------------------
          // CHECK CURRENT LESSON
          // ----------------------------------------------

          const currentLesson =
            progressData.lessons?.find(
              (item) =>
                Number(item.lessonId) ===
                lessonId
            );


          if (
            currentLesson?.completed === true
          ) {

            setCompletedLocally(
              true
            );

          }

        }

      } catch (progressError) {

        console.log(
          "Progress not available yet:",
          progressError
        );

        setProgress(null);

      }

    } catch (err) {

      console.error(
        "Lesson loading error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load lesson."
      );

    } finally {

      setLoading(false);

    }

  }


  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {

    loadData();

  }, [
    courseId,
    lessonId,
  ]);


  // ========================================================
  // LESSON COMPLETED?
  // ========================================================

  const isCompleted =
    useMemo(() => {

      if (
        completedLocally
      ) {

        return true;

      }


      if (!progress) {

        return false;

      }


      return (
        progress.lessons?.some(
          (item) =>
            Number(item.lessonId) ===
              lessonId &&
            item.completed === true
        ) ?? false
      );

    }, [
      progress,
      lessonId,
      completedLocally,
    ]);


  // ========================================================
  // COURSE COMPLETED?
  // ========================================================

  const courseCompleted =
    progress?.courseCompleted === true;


  // ========================================================
  // CURRENT PROGRESS
  // ========================================================

  const progressPercentage =
    courseCompleted
      ? 100
      : progress
      ? Number(
          progress.progressPercentage
        )
      : 0;


  // ========================================================
  // COMPLETE LESSON
  // ========================================================

  async function handleComplete() {

    if (!lesson) {

      return;

    }


    if (completing) {

      return;

    }


    if (isCompleted) {

      return;

    }


    if (courseCompleted) {

      return;

    }


    try {

      setCompleting(
        true
      );

      setError("");

      setSuccess("");


      // ----------------------------------------------------
      // API
      // ----------------------------------------------------

      await completeLesson(
        lesson.id
      );


      // ----------------------------------------------------
      // IMMEDIATELY MARK CURRENT LESSON COMPLETE
      // ----------------------------------------------------

      setCompletedLocally(
        true
      );


      setSuccess(
        "Lesson completed successfully! 🎉"
      );


      // ----------------------------------------------------
      // REFRESH PROGRESS
      // ----------------------------------------------------

      try {

        const refreshedProgress =
          await getMyCourseProgress();


        if (
          Number(
            refreshedProgress.courseId
          ) === courseId
        ) {

          setProgress(
            refreshedProgress
          );

        }

      } catch (progressError) {

        /*
         * IMPORTANT:
         *
         * If this was the FINAL lesson,
         * backend may already have changed the
         * enrollment status to COMPLETED.
         *
         * Therefore /progress/course may no longer
         * return an active-course response.
         *
         * We still keep the current lesson completed
         * locally instead of showing an error.
         */

        console.log(
          "Progress refresh skipped:",
          progressError
        );

      }

    } catch (err) {

      console.error(
        "Complete lesson error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete lesson."
      );

    } finally {

      setCompleting(
        false
      );

    }

  }


  // ========================================================
  // GO BACK TO COURSE
  // ========================================================

  function goBackToCourse() {

    router.push(
      `/student/dashboard/courses/${courseId}`
    );

  }


  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {

    return (

      <div className="mx-auto max-w-5xl space-y-6">

        <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

        <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />

        <div className="h-[550px] animate-pulse rounded-3xl bg-slate-200" />

      </div>

    );

  }


  // ========================================================
  // ERROR
  // ========================================================

  if (
    error ||
    !lesson
  ) {

    return (

      <div className="mx-auto max-w-5xl">

        <button
          type="button"
          onClick={
            goBackToCourse
          }
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
        >

          <ArrowLeft
            className="h-4 w-4"
          />

          Back to Course

        </button>


        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-2xl">

            ⚠️

          </div>


          <h2 className="mt-5 text-xl font-bold text-red-800">

            Unable to load lesson

          </h2>


          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-red-600">

            {error ||
              "Lesson not found."}

          </p>


          <button
            type="button"
            onClick={
              loadData
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >

            <RotateCcw
              className="h-4 w-4"
            />

            Try Again

          </button>

        </div>

      </div>

    );

  }


  // ========================================================
  // MAIN UI
  // ========================================================

  return (

    <div className="mx-auto max-w-5xl space-y-6">


      {/* ====================================================
          BACK
      ==================================================== */}

      <button
        type="button"
        onClick={
          goBackToCourse
        }
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
      >

        <ArrowLeft
          className="h-4 w-4"
        />

        Back to Course

      </button>


      {/* ====================================================
          PROGRESS CARD
      ==================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

              <BookOpen
                className="h-5 w-5"
              />

            </div>


            <div>

              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">

                Course Progress

              </p>


              <p className="mt-1 text-sm font-semibold text-slate-900">

                {progress
                  ? `${progress.completedLessons} / ${progress.totalLessons} lessons completed`
                  : isCompleted
                  ? "Lesson completed"
                  : "Start learning"}

              </p>

            </div>

          </div>


          <div className="text-left sm:text-right">

            <p className="text-2xl font-bold text-indigo-600">

              {Math.round(
                progressPercentage
              )}%

            </p>

          </div>

        </div>


        {/* PROGRESS BAR */}

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  0,
                  progressPercentage
                )
              )}%`,
            }}
          />

        </div>

      </section>


      {/* ====================================================
          LESSON
      ==================================================== */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


        {/* ==================================================
            LESSON HEADER
        ================================================== */}

        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-8 text-white sm:px-10 sm:py-10">

          <div className="flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">

              Lesson {lesson.lessonOrder}

            </span>


            {isCompleted && (

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">

                <CheckCircle2
                  className="h-3.5 w-3.5"
                />

                Completed

              </span>

            )}

          </div>


          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">

            {lesson.title}

          </h1>


          <p className="mt-3 text-sm text-indigo-100 sm:text-base">

            {lesson.courseName}

            {" • "}

            {lesson.moduleTitle}

          </p>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="px-6 py-8 sm:px-10 sm:py-10">


          {/* DESCRIPTION */}

          {lesson.description && (

            <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">

              <p className="text-sm font-bold text-indigo-900">

                About this lesson

              </p>


              <p className="mt-2 text-sm leading-7 text-indigo-800">

                {lesson.description}

              </p>

            </div>

          )}


          {/* CONTENT */}

          <div>

            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">

              <BookOpen
                className="h-5 w-5 text-indigo-600"
              />

              Lesson Content

            </h2>


            {lesson.content ? (

              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">

                <div className="whitespace-pre-wrap text-[15px] leading-8 text-slate-700">

                  {lesson.content}

                </div>

              </article>

            ) : (

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">

                <p className="text-sm text-slate-400">

                  No lesson content available.

                </p>

              </div>

            )}

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">

              <p className="text-sm font-semibold text-red-700">

                {error}

              </p>

            </div>

          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">

                <Check
                  className="h-5 w-5"
                />

              </div>


              <div>

                <p className="text-sm font-bold text-green-800">

                  Lesson Completed

                </p>


                <p className="mt-0.5 text-xs text-green-700">

                  {success}

                </p>

              </div>

            </div>

          )}


          {/* =================================================
              ACTION
          ================================================= */}

          <div className="mt-10 border-t border-slate-100 pt-8">


            {courseCompleted ? (

              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">

                  <CheckCircle2
                    className="h-7 w-7"
                  />

                </div>


                <h2 className="mt-4 text-xl font-bold text-green-800">

                  Course Completed! 🎉

                </h2>


                <p className="mt-2 text-sm text-green-700">

                  You have successfully completed this course.

                </p>


                <button
                  type="button"
                  onClick={
                    goBackToCourse
                  }
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >

                  Back to Course

                  <ArrowRight
                    className="h-4 w-4"
                  />

                </button>

              </div>

            ) : isCompleted ? (

              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      className="h-7 w-7 shrink-0 text-green-600"
                    />

                    <div>

                      <p className="text-sm font-bold text-green-800">

                        Lesson completed

                      </p>


                      <p className="mt-1 text-xs text-green-700">

                        Great job! Continue learning.

                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={
                      goBackToCourse
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >

                    Continue

                    <ArrowRight
                      className="h-4 w-4"
                    />

                  </button>

                </div>

              </div>

            ) : (

              <button
                type="button"
                onClick={
                  handleComplete
                }
                disabled={
                  completing
                }
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gray-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {completing ? (

                  <>

                    <Loader2
                      className="h-5 w-5 animate-spin"
                    />

                    Completing Lesson...

                  </>

                ) : (

                  <>

                    <Check
                      className="h-5 w-5"
                    />

                    Mark Lesson as Complete

                  </>

                )}

              </button>

            )}

          </div>

        </div>

      </section>


      {/* ====================================================
          NAVIGATION
      ==================================================== */}

      <div className="flex items-center justify-between gap-4 pb-8">


        {/* COURSE */}

        <button
          type="button"
          onClick={
            goBackToCourse
          }
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >

          <ChevronLeft
            className="h-4 w-4"
          />

          Course

        </button>


        {/* NEXT */}

        <button
          type="button"
          onClick={
            goBackToCourse
          }
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >

          Back to Lessons

          <ChevronRight
            className="h-4 w-4"
          />

        </button>

      </div>

    </div>

  );
}