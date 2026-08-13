"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function StudentRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    // Registration will be connected to the database later.
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-6 py-12">

      {/* Background */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-violet-100/40 blur-3xl" />

      {/* Card */}

      <div className="relative w-full max-w-lg">

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

          {/* Header */}

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
              Create Student Account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Register to access the HIKOO student portal.
            </p>

          </div>

          {/* Error */}

          {error && (
            <div
              className="
                mt-6
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* Form */}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Name */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                required
                autoComplete="name"
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

            {/* Phone */}

            <div>

              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="10 digit mobile number"
                required
                maxLength={10}
                autoComplete="tel"
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

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
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

            {/* Confirm Password */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Re-enter your password"
                required
                autoComplete="new-password"
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

              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}

              {!isSubmitting && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}

            </button>

          </form>

          {/* Login */}

          <div className="mt-7 border-t border-black/[0.06] pt-6 text-center">

            <p className="text-sm text-gray-500">
              Already have an account?
            </p>

            <Link
              href="/student/login"
              className="
                mt-2
                inline-flex
                font-semibold
                text-gray-950
                transition
                hover:text-blue-600
              "
            >
              Sign in to your account →
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