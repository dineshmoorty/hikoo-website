"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight, BookOpen, CheckCircle2, Eye, EyeOff,
  LockKeyhole, Mail, Sparkles,
} from "lucide-react";
import { loginUser } from "@/services/AuthService";

export default function StudentLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: trimmedEmail,
        password,
      });

      if (response.role !== "STUDENT") {
        setError("This login is only for student accounts.");
        return;
      }

      localStorage.setItem("hikoo_token", response.token);
      localStorage.setItem("hikoo_role", response.role);
      localStorage.setItem("hikoo_name", response.name);
      localStorage.setItem("hikoo_email", response.email);
      localStorage.setItem(
        "hikoo_profile_completed",
        String(response.profileCompleted)
      );

      if (response.profileCompleted) {
        router.replace("/student/dashboard");
      } else {
        router.replace("/student/profile");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
            <Link href="/student/login" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-black text-slate-950">H</div>
              <div>
                <p className="font-bold tracking-tight text-white">HIKOO</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Student Portal</p>
              </div>
            </Link>
            <div className="max-w-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">Learn. Build. Grow.</h1>
              <p className="mt-5 text-base leading-7 text-slate-400">
                Welcome to your HIKOO student portal. Manage your courses,
                attendance, certificates and learning journey from one place.
              </p>
              <div className="mt-8 space-y-4">
                <Feature text="Access your enrolled courses" />
                <Feature text="Track attendance and progress" />
                <Feature text="View certificates and opportunities" />
              </div>
            </div>
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} HIKOO. All rights reserved.</p>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link href="/student/login" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-black text-white">H</div>
                <div>
                  <p className="font-bold text-slate-950">HIKOO</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Student Portal</p>
                </div>
              </Link>
            </div>

            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">Welcome back</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Login to continue your HIKOO learning journey.</p>
            </div>

            {registered === "true" && (
              <div className="mb-5 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Thanks for registering! 🎉</p>
                  <p className="mt-1 text-xs leading-5 text-green-700">Your student account has been created successfully. Please login to continue.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">Email Address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" autoComplete="email"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-800">Password</label>
                  <button type="button" className="text-xs font-semibold text-slate-500 hover:text-slate-950">Forgot password?</button>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input id="password" type={showPassword ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Logging in...
                  </>
                ) : (
                  <>Login to Student Portal <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>

            <div className="mt-7 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link href="/student/register" className="font-semibold text-slate-950 hover:underline">Create account</Link>
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
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
