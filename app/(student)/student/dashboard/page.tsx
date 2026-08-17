"use client";

const stats = [
  {
    title: "Attendance",
    value: "86%",
    description: "43 of 50 days",
    icon: "✓",
  },
  {
    title: "Fees",
    value: "₹5,000",
    description: "Pending amount",
    icon: "₹",
  },
  {
    title: "Certificate",
    value: "In Progress",
    description: "Complete your program",
    icon: "◇",
  },
];

export default function StudentDashboardPage() {
  return (
    <section className="min-h-full bg-gradient-to-br from-gray-50 via-white to-blue-50/40 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[1600px]">

        {/* Welcome */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm">
              Student Portal
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Welcome back, Dinesh 👋
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Here's an overview of your course, attendance, fees and
              certification progress.
            </p>
          </div>

          {/* Profile status */}
          <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm text-white">
              ✓
            </span>

            <div>
              <p className="text-sm font-semibold text-gray-950">
                Profile Verified
              </p>

              <p className="text-xs text-gray-500">
                Your profile is complete
              </p>
            </div>
          </div>
        </div>

        {/* Current Program */}
        <div className="mt-8 rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Current Program
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-950">
                Full Stack Development
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                6 Months Course
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Active
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                Started: Aug 2026
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Course Progress
              </span>

              <span className="text-sm font-semibold text-gray-950">
                35%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[35%] rounded-full bg-gray-950" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-[1.75rem] border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-base font-semibold text-white">
                  {stat.icon}
                </div>

                <span className="text-xl text-gray-300">↗</span>
              </div>

              <p className="mt-7 text-sm text-gray-500">
                {stat.title}
              </p>

              <div className="mt-1 flex items-end justify-between gap-3">
                <h3 className="text-3xl font-bold tracking-tight text-gray-950">
                  {stat.value}
                </h3>

                <p className="text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Attendance + Quick Actions */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

          {/* Attendance */}
          <div className="rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-950">
                  Attendance
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your current attendance overview.
                </p>
              </div>

              <a
                href="/student/attendance"
                className="text-sm font-semibold text-gray-700 transition hover:text-gray-950"
              >
                View all →
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
              {/* Percentage */}
              <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-[12px] border-gray-100">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-950">
                    86%
                  </p>

                  <p className="text-xs text-gray-400">
                    Attendance
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Present
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-950">
                    43
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Days attended
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Absent
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-950">
                    7
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Days missed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-[2rem] border border-black/[0.06] bg-gray-950 p-6 text-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Quick Actions
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              Manage your learning
            </h3>

            <div className="mt-7 space-y-3">
              <a
                href="/student/course"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium transition hover:bg-white/15"
              >
                <span>View Course</span>
                <span>→</span>
              </a>

              <a
                href="/student/attendance"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium transition hover:bg-white/15"
              >
                <span>Mark Attendance</span>
                <span>→</span>
              </a>

              <a
                href="/student/fees"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium transition hover:bg-white/15"
              >
                <span>View Fees</span>
                <span>→</span>
              </a>

              <a
                href="/student/profile"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium transition hover:bg-white/15"
              >
                <span>Update Profile</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Certificate */}
        <div className="mt-6 rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">
                ◇
              </div>

              <div>
                <h3 className="font-bold text-gray-950">
                  Certificate
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your certificate will be available after completing
                  the program.
                </p>
              </div>
            </div>

            <a
              href="/student/certificate"
              className="rounded-xl border border-black/[0.08] px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-950 hover:text-white"
            >
              View Certificate →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}