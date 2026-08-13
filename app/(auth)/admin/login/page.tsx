"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    // =====================================================
    // DUMMY ADMIN CREDENTIALS
    // =====================================================

    const ADMIN_EMAIL = "admin@hikoo.com";
    const ADMIN_PASSWORD = "admin123";

    // Small delay for login animation
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    if (
      trimmedEmail === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      const adminUser = {
        name: "HIKOO Administrator",
        email: ADMIN_EMAIL,
        role: "Administrator",
      };

      sessionStorage.setItem(
        "hikoo_admin",
        JSON.stringify(adminUser)
      );

      window.location.href = "/admin/dashboard";

      return;
    }

    setIsSubmitting(false);
    setError("Invalid admin email or password.");
  };

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-gray-50
        px-6
        py-16
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-blue-100/50
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-violet-100/40
          blur-3xl
        "
      />

      {/* =====================================================
          LOGIN CONTAINER
      ====================================================== */}

      <div className="relative w-full max-w-md">
        {/* Login Card */}

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
          {/* =================================================
              BRAND
          ================================================== */}

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
                bg-gray-950
                text-lg
                font-bold
                text-white
                shadow-lg
              "
            >
              H
            </div>

            <h1
              className="
                mt-6
                text-3xl
                font-bold
                tracking-tight
                text-gray-950
              "
            >
              Admin Login
            </h1>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              "
            >
              Sign in to access the HIKOO administration
              panel.
            </p>
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-800
                "
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="admin@hikoo.com"
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
                  focus:border-gray-950
                  focus:bg-white
                  focus:ring-4
                  focus:ring-gray-950/5
                "
              />
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-800
                "
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
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
                  focus:border-gray-950
                  focus:bg-white
                  focus:ring-4
                  focus:ring-gray-950/5
                "
              />
            </div>

            {/* Error */}

            {error && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600
                "
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Remember */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
              "
            >
              <input
                type="checkbox"
                className="
                  h-4
                  w-4
                  rounded
                  border-gray-300
                  accent-gray-950
                "
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
                disabled:hover:translate-y-0
              "
            >
              {isSubmitting ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  Signing in...
                </>
              ) : (
                <>
                  Sign In

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        <p
          className="
            mt-6
            text-center
            text-xs
            text-gray-400
          "
        >
          HIKOO Administration · Secure Access
        </p>
      </div>
    </main>
  );
}