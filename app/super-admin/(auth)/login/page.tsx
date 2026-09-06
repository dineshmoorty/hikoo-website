"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/AuthService";

export default function SuperAdminLoginPage() {
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

      if (response.role !== "SUPER_ADMIN") {
        setError(
          "This login is only available for Super Administrators."
        );
        return;
      }

      localStorage.setItem("hikoo_token", response.token);
      localStorage.setItem("hikoo_role", response.role);
      localStorage.setItem("hikoo_name", response.name);
      localStorage.setItem("hikoo_email", response.email);

      router.replace("/super-admin/dashboard");
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

        {/* LEFT */}

        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

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
                  Super Admin
                </p>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                Platform Administration
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Everything under
                <br />
                your control.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Manage HIKOO administrators, employees,
                students, courses and platform operations
                from one central workspace.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xl">👑</p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    Platform
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Full control
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xl">👥</p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    Users
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Manage accounts
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xl">📊</p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    Overview
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Platform insights
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} HIKOO Technology
            </p>
          </div>
        </section>

        {/* RIGHT */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* Mobile logo */}

            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                H
              </div>

              <div>
                <p className="text-lg font-bold text-slate-950">
                  HIKOO
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Super Admin
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold text-indigo-600">
                Super Administrator
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to manage your HIKOO platform.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

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
                    placeholder="superadmin@hikoo.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white disabled:opacity-60"
                  />
                </div>

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
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-16 text-sm outline-none transition focus:border-slate-400 focus:bg-white disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

              </form>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-center text-xs text-slate-400">
                  🔒 Authorized Super Administrator access only
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              HIKOO Administration Portal
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}