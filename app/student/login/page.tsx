"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) return;

    setIsSubmitting(true);

    // Authentication will be connected later.
    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-6 py-16">

      {/* Background */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-violet-100/40 blur-3xl" />

      {/* Card */}

      <div className="relative w-full max-w-md">

        <div
          className="
            rounded-[2rem]
            border
            border-black/[0.06]
            bg-white
            p-7
            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
            sm:p-9
          "
        >

          {/* Logo */}

          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-violet-600
                text-lg
                font-bold
                text-white
                shadow-lg
              "
            >
              H
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-950">
              Student Login
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to access your HIKOO student account.
            </p>

          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@example.com"
                required
                autoComplete="email"
                className="
                  w-full
                  rounded-xl
                  border
                  border-black/[0.08]
                  bg-gray-50/50
                  px-4
                  py-3.5
                  text-sm
                  text-gray-950
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-600
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-600/5
                "
              />

            </div>

            {/* Password */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="
                    text-xs
                    font-medium
                    text-gray-500
                    transition
                    hover:text-gray-950
                  "
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-black/[0.08]
                  bg-gray-50/50
                  px-4
                  py-3.5
                  text-sm
                  text-gray-950
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-600
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-600/5
                "
              />

            </div>

            {/* Remember */}

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-blue-600"
              />

              <span className="text-sm text-gray-600">
                Remember me
              </span>

            </label>

            {/* Submit */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gray-950
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-gray-950/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-black
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {isSubmitting ? "Signing in..." : "Sign In"}

              {!isSubmitting && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}

            </button>

          </form>

          {/* Register */}

          <div className="mt-7 border-t border-black/[0.06] pt-6 text-center">

            <p className="text-sm text-gray-500">
              Don't have an account?
            </p>

            <Link
              href="/student/register"
              className="
                mt-2
                inline-flex
                font-semibold
                text-gray-950
                transition
                hover:text-blue-600
              "
            >
              Create Student Account →
            </Link>

          </div>

        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          HIKOO Student Portal
        </p>

      </div>

    </main>
  );
}