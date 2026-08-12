"use client";

import { FormEvent, useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    if (field === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    if (field === "message") {
      value = value.slice(0, 500);
    }

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors: Partial<
      Record<keyof FormData, string>
    > = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      nextErrors.email =
        "Please enter a valid email address.";
    }

    if (
      form.phone.trim() &&
      !/^\d{10}$/.test(form.phone)
    ) {
      nextErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject =
        "Please enter a subject.";
    }

    if (!form.message.trim()) {
      nextErrors.message =
        "Please enter your message.";
    } else if (form.message.trim().length > 500) {
      nextErrors.message =
        "Message must be 500 characters or less.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitted(false);
    setApplicationId("");

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Something went wrong while submitting your enquiry."
        );
      }

      setApplicationId(
        result.applicationId || ""
      );
      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error(
        "CONTACT FORM SUBMISSION ERROR:",
        error
      );

      setErrors({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while submitting your enquiry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gray-50/60 px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-full">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left Content */}

          <div className="max-w-md">
            <span
              className="
                inline-flex
                rounded-full
                border
                border-black/[0.06]
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-600
                shadow-sm
              "
            >
              Send an Enquiry
            </span>

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
              "
            >
              Tell us what
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-700
                  to-violet-600
                  bg-clip-text
                  text-transparent
                "
              >
                you&apos;re looking for.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600">
              Have a project, business enquiry, internship
              question, or career opportunity in mind? Send us a
              message and our team can get back to you.
            </p>

            <div className="mt-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-semibold text-gray-950">
                Prefer to talk directly?
              </p>

              <a
                href="tel:+917598639009"
                className="
                  mt-3
                  inline-flex
                  text-sm
                  font-medium
                  text-gray-600
                  transition-colors
                  hover:text-blue-700
                "
              >
                +91 75986 39009
              </a>

              <a
                href="mailto:hikootechnology@gmail.com"
                className="
                  mt-1
                  block
                  text-sm
                  font-medium
                  text-gray-600
                  transition-colors
                  hover:text-blue-700
                "
              >
                hikootechnology@gmail.com
              </a>
            </div>
          </div>

          {/* Form */}

          <div
            className="
              rounded-[2rem]
              border
              border-black/[0.06]
              bg-white
              p-6
              shadow-[0_12px_40px_rgba(0,0,0,0.05)]
              sm:p-8
            "
          >
            {submitted && (
              <div
                className="
                  mb-6
                  rounded-2xl
                  border
                  border-green-200
                  bg-green-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-green-700
                "
              >
                Your enquiry has been submitted successfully.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {/* Name + Email */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-800"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Your name"
                    className={`
                      mt-2
                      w-full
                      rounded-2xl
                      border
                      bg-gray-50/60
                      px-4
                      py-3.5
                      text-sm
                      text-gray-900
                      outline-none
                      transition-all
                      placeholder:text-gray-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      ${
                        errors.name
                          ? "border-red-300 focus:border-red-400"
                          : "border-black/[0.07] focus:border-blue-400"
                      }
                    `}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-800"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className={`
                      mt-2
                      w-full
                      rounded-2xl
                      border
                      bg-gray-50/60
                      px-4
                      py-3.5
                      text-sm
                      text-gray-900
                      outline-none
                      transition-all
                      placeholder:text-gray-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      ${
                        errors.email
                          ? "border-red-300 focus:border-red-400"
                          : "border-black/[0.07] focus:border-blue-400"
                      }
                    `}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone + Subject */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-800"
                  >
                    Phone
                    <span className="ml-1 text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className={`
                      mt-2
                      w-full
                      rounded-2xl
                      border
                      bg-gray-50/60
                      px-4
                      py-3.5
                      text-sm
                      text-gray-900
                      outline-none
                      transition-all
                      placeholder:text-gray-400
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-500/10
                      ${
                        errors.phone
                          ? "border-red-300"
                          : "border-black/[0.07]"
                      }
                    `}
                  />

                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-800"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(event) =>
                      updateField(
                        "subject",
                        event.target.value
                      )
                    }
                    placeholder="How can we help?"
                    className={`
                      mt-2
                      w-full
                      rounded-2xl
                      border
                      bg-gray-50/60
                      px-4
                      py-3.5
                      text-sm
                      text-gray-900
                      outline-none
                      transition-all
                      placeholder:text-gray-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      ${
                        errors.subject
                          ? "border-red-300 focus:border-red-400"
                          : "border-black/[0.07] focus:border-blue-400"
                      }
                    `}
                  />

                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-800"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(event) =>
                    updateField(
                      "message",
                      event.target.value
                    )
                  }
                  placeholder="Tell us a little about your enquiry..."
                  maxLength={500}
                  className={`
                    mt-2
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    bg-gray-50/60
                    px-4
                    py-3.5
                    text-sm
                    leading-6
                    text-gray-900
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    ${
                      errors.message
                        ? "border-red-300 focus:border-red-400"
                        : "border-black/[0.07] focus:border-blue-400"
                    }
                  `}
                />

                <div className="mt-1.5 flex justify-end">
                  <span
                    className={`text-xs ${
                      form.message.length >= 450
                        ? "text-amber-600"
                        : "text-gray-400"
                    }`}
                  >
                    {form.message.length}/500
                  </span>
                </div>

                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-gray-950
                  px-6
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
                  sm:w-auto
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            {submitted && (
              <div
                className="
                  fixed
                  inset-0
                  z-[9999]
                  flex
                  items-center
                  justify-center
                  bg-black/50
                  px-4
                  backdrop-blur-sm
                "
              >
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="contact-success-dialog-title"
                  className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-black/[0.06]
                    bg-white
                    p-8
                    text-center
                    shadow-2xl
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                      text-3xl
                      font-bold
                      text-green-600
                    "
                  >
                    ✓
                  </div>

                  <h2
                    id="contact-success-dialog-title"
                    className="
                      mt-5
                      text-2xl
                      font-bold
                      tracking-tight
                      text-gray-950
                    "
                  >
                    Enquiry Submitted Successfully
                  </h2>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    Thank you for contacting HIKOO.
                    Our team will review your enquiry
                    and get back to you.
                  </p>

                  {applicationId && (
                    <div
                      className="
                        mt-5
                        rounded-2xl
                        bg-gray-50
                        px-4
                        py-4
                      "
                    >
                      <p
                        className="
                          text-xs
                          font-medium
                          uppercase
                          tracking-wider
                          text-gray-400
                        "
                      >
                        Enquiry ID
                      </p>

                      <p
                        className="
                          mt-1
                          text-base
                          font-bold
                          tracking-wide
                          text-gray-950
                        "
                      >
                        {applicationId}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Please keep this ID for your reference.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setApplicationId("");
                    }}
                    className="
                      mt-7
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-950
                      px-6
                      py-3.5
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-black
                    "
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}