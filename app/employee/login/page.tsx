"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/AuthService";

export default function EmployeeLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      if (response.role !== "EMPLOYEE") {
        setError(
          "This login is only available for HIKOO employees."
        );
        return;
      }

      localStorage.setItem("hikoo_token", response.token);
      localStorage.setItem("hikoo_role", response.role);
      localStorage.setItem("hikoo_name", response.name);
      localStorage.setItem("hikoo_email", response.email);

      router.replace("/employee/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT BRAND */}

        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-950">
                H
              </div>

              <div>
                <p className="text-xl font-bold text-white">
                  HIKOO
                </p>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  Employee Portal
                </p>
              </div>

            </div>

            <div className="max-w-xl">

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                HIKOO Workspace
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Your work.
                <br />
                Your workspace.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Access your assigned students, courses,
                attendance and daily learning operations
                from your HIKOO employee workspace.
              </p>

              <div className="mt-10 space-y-3">

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    👨‍🎓
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Assigned Students
                    </p>

                    <p className="text-xs text-slate-500">
                      View and manage your students
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    📅
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Attendance
                    </p>

                    <p className="text-xs text-slate-500">
                      Track student attendance
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    📚
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Learning
                    </p>

                    <p className="text-xs text-slate-500">
                      Manage assigned courses
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} HIKOO Technology
            </p>

          </div>
        </section>

        {/* LOGIN */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}

            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                H
              </div>

              <div>
                <p className="text-lg font-bold text-slate-950">
                  HIKOO
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Employee Portal
                </p>
              </div>

            </div>

            {/* TITLE */}

            <div className="mb-8">

              <p className="mb-3 text-sm font-semibold text-indigo-600">
                Employee access
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to access your HIKOO workspace.
              </p>

            </div>

            {/* CARD */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="employee@hikoo.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white disabled:opacity-60"
                  />

                </div>

                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-16 text-sm outline-none transition focus:border-slate-400 focus:bg-white disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>

                {/* ERROR */}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                    {error}
                  </div>
                )}

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>

              </form>

              {/* SECURITY */}

              <div className="mt-6 border-t border-slate-100 pt-5">

                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm">
                    🔒
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      Secure employee access
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Your account permissions are controlled
                      by HIKOO administrators.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              HIKOO Employee Portal
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}