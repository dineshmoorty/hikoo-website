"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import JobInternshipForm from "@/components/home/internship/applications/JobInternshipForm"
import CollegeInternshipForm from "@/components/home/internship/applications/CollegeInternshipForm";

export default function InternshipApplyContent() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const isCollege = type === "college";
  const isJob = type === "job";

  // =====================================================
  // INVALID / MISSING TYPE
  // =====================================================

  if (!isCollege && !isJob) {
    return (
      <main className="min-h-screen bg-white px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">

          <span
            className="
              inline-flex
              rounded-full
              border
              border-black/[0.06]
              bg-gray-50
              px-4
              py-2
              text-sm
              font-medium
              text-gray-600
            "
          >
            Internship Application
          </span>

          <h1
            className="
              mt-6
              text-4xl
              font-bold
              tracking-tight
              text-gray-950
            "
          >
            Choose an internship
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              text-base
              leading-7
              text-gray-600
            "
          >
            Please select either the Job Internship or College
            Internship application to continue.
          </p>

          <Link
            href="/internship"
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-gray-950
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-black
            "
          >
            Back to Internship

            <span>→</span>
          </Link>

        </div>
      </main>
    );
  }

  // =====================================================
  // APPLICATION PAGE
  // =====================================================

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-white
        px-6
        pb-20
        pt-32
        sm:pt-36
        lg:px-8
      "
    >

      {/* =================================================
          BACKGROUND GLOW
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-20
          h-80
          w-80
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          bottom-20
          h-80
          w-80
          rounded-full
          bg-violet-100/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-6xl">

        {/* =================================================
            BACK TO INTERNSHIP
        ================================================== */}

        <Link
          href="/internship"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-500
            transition-colors
            hover:text-gray-950
          "
        >
          <span>←</span>

          Back to Internship
        </Link>

        {/* =================================================
            HEADING
        ================================================== */}

        <div className="mt-8 max-w-3xl">

          <span
            className="
              inline-flex
              rounded-full
              border
              border-black/[0.06]
              bg-gray-50
              px-4
              py-2
              text-sm
              font-medium
              text-gray-600
            "
          >
            {isCollege
              ? "College Internship"
              : "Job Internship"}
          </span>

          <h1
            className="
              mt-6
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-950
              sm:text-5xl
            "
          >
            {isCollege
              ? "College Internship Application"
              : "Job Internship Application"}
          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-gray-600
            "
          >
            {isCollege
              ? "Start your application for the HIKOO College Internship program."
              : "Start your application for the HIKOO Job Internship program."}
          </p>

        </div>

        {/* =================================================
            INTERNSHIP PATH
        ================================================== */}

        <div
          className="
            mt-10
            rounded-3xl
            border
            border-black/[0.06]
            bg-gradient-to-br
            from-gray-50
            via-white
            to-blue-50/40
            p-6
            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            sm:p-8
          "
        >

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            Your Path
          </p>

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            {isCollege ? (
              <>
                <PathStep text="Assessment" />

                <Arrow />

                <PathStep text="15 Days Internship" />

                <Arrow />

                <PathStep text="3 Months Internship" />


                <Arrow />

                <PathStep text="6 Months Internship" />

              </>
            ) : (
              <>
                <PathStep text="Assesment" />

                <Arrow />
    
                  
                <PathStep text="3 Months Internship" />

                <Arrow />

                <PathStep text="3 Months Probation" />

                <Arrow />

                <PathStep text="Employee" />
              </>
            )}

          </div>
        </div>

        {/* =================================================
            APPLICATION FORM
        ================================================== */}

        <div
          className="
            mt-8
            rounded-[2rem]
            border
            border-black/[0.06]
            bg-white
            p-6
            shadow-[0_12px_40px_rgba(0,0,0,0.05)]
            sm:p-8
          "
        >

          <div>
            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-gray-950
              "
            >
              Application Details
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              "
            >
              Fill in your details to apply for this internship
              program.
            </p>
          </div>

          {/* =================================================
              JOB INTERNSHIP
          ================================================== */}

          {isJob && <JobInternshipForm />}

          {/* =================================================
              COLLEGE INTERNSHIP
          ================================================== */}

          {isCollege && <CollegeInternshipForm />}

        </div>
      </div>
    </main>
  );
}

// =====================================================
// PATH STEP
// =====================================================

function PathStep({
  text,
}: {
  text: string;
}) {
  return (
    <div
      className="
        rounded-full
        border
        border-black/[0.06]
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-gray-700
        shadow-sm
      "
    >
      {text}
    </div>
  );
}

// =====================================================
// ARROW
// =====================================================

function Arrow() {
  return (
    <span className="text-gray-300">
      →
    </span>
  );
}