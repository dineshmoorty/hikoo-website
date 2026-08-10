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

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
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

    if (form.phone.trim() && !/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
      nextErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject =
        "Please enter a subject.";
    }

    if (!form.message.trim()) {
      nextErrors.message =
        "Please enter your message.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    /*
      Backend / email API will be connected here later.
    */

    setSubmitted(true);
    setForm(initialForm);
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

                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}

              <button
                type="submit"
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
                "
              >
                Send Enquiry

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}