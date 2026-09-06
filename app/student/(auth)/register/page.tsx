"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import { registerStudent } from "@/services/AuthService";

export default function StudentRegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       * We intentionally DO NOT save token here.
       *
       * Registration = account creation only.
       * Student must login separately.
       */
      await registerStudent({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      /*
       * Registration successful.
       * Redirect to login with success message.
       */
      router.replace("/student/login?registered=true");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT BRAND SECTION */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link href="/student/login" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-black text-slate-950">
                H
              </div>

              <div>
                <p className="font-bold tracking-tight text-white">
                  HIKOO
                </p>

                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Student Portal
                </p>
              </div>
            </Link>

            {/* Content */}
            <div className="max-w-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">
                Start your learning journey.
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-400">
                Create your HIKOO student account and get access to
                courses, attendance, certificates and more.
              </p>

              <div className="mt-8 space-y-4">
                <Feature text="Explore professional courses" />
                <Feature text="Track your learning progress" />
                <Feature text="Manage attendance and certificates" />
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} HIKOO. All rights reserved.
            </p>
          </div>
        </section>

        {/* RIGHT REGISTER */}
        <section className="flex min-h-screen items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/student/login" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-black text-white">
                  H
                </div>

                <div>
                  <p className="font-bold text-slate-950">HIKOO</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Student Portal
                  </p>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950">
                <BookOpen className="h-5 w-5 text-white" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Register as a student to access the HIKOO learning
                portal.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Student Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/student/login"
                  className="font-semibold text-slate-950 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />

      <p className="text-sm text-slate-300">
        {text}
      </p>
    </div>
  );
}