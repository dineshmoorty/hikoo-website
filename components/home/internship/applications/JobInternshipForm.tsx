"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  graduationYear: string;
  experience: string;
  skills: string;
  preferredRole: string;
  resume: File | null;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  qualification: "",
  graduationYear: "",
  experience: "",
  skills: "",
  preferredRole: "",
  resume: null,
  message: "",
};

export default function JobInternshipForm() {
  const [form, setForm] = useState<FormData>(
    initialForm
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const [submitted, setSubmitted] = useState(false);

  // =====================================================
  // UPDATE TEXT / SELECT / TEXTAREA FIELDS
  // =====================================================

  const updateField = (
    field: Exclude<keyof FormData, "resume">,
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

  // =====================================================
  // RESUME CHANGE
  // =====================================================

  const handleResumeChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    setForm((previous) => ({
      ...previous,
      resume: file,
    }));

    setErrors((previous) => ({
      ...previous,
      resume: "",
    }));

    setSubmitted(false);
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const nextErrors: Partial<
      Record<keyof FormData, string>
    > = {};

    // Name

    if (!form.name.trim()) {
      nextErrors.name =
        "Please enter your full name.";
    }

    // Email

    if (!form.email.trim()) {
      nextErrors.email =
        "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      nextErrors.email =
        "Please enter a valid email address.";
    }

    // Phone

    if (!form.phone.trim()) {
      nextErrors.phone =
        "Please enter your phone number.";
    } else if (
      !/^[0-9+\-\s()]{7,20}$/.test(
        form.phone
      )
    ) {
      nextErrors.phone =
        "Please enter a valid phone number.";
    }

    // Qualification

    if (!form.qualification.trim()) {
      nextErrors.qualification =
        "Please enter your qualification.";
    }

    // Graduation Year

    if (!form.graduationYear.trim()) {
      nextErrors.graduationYear =
        "Please enter your graduation year.";
    }

    // Skills

    if (!form.skills.trim()) {
      nextErrors.skills =
        "Please enter your skills.";
    }

    // Preferred Role

    if (!form.preferredRole.trim()) {
      nextErrors.preferredRole =
        "Please select your preferred role.";
    }

    // Resume

    if (!form.resume) {
      nextErrors.resume =
        "Please upload your resume.";
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      const maxSize =
        5 * 1024 * 1024;

      if (
        !allowedTypes.includes(
          form.resume.type
        )
      ) {
        nextErrors.resume =
          "Please upload a PDF, DOC, or DOCX file.";
      }

      if (form.resume.size > maxSize) {
        nextErrors.resume =
          "Resume size must be less than 5 MB.";
      }
    }

    // Message

    if (!form.message.trim()) {
      nextErrors.message =
        "Please tell us a little about yourself.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    /*
      Backend / email integration
      will be connected later.
    */

    setSubmitted(true);

    setForm(initialForm);

    // Reset file input manually
    const fileInput =
      document.getElementById(
        "job-resume"
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const inputClass = (
    field: keyof FormData
  ) => `
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
    focus:border-blue-400
    focus:bg-white
    focus:ring-4
    focus:ring-blue-500/10
    ${
      errors[field]
        ? "border-red-300"
        : "border-black/[0.07]"
    }
  `;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 space-y-6"
    >
      {/* =================================================
          SUCCESS
      ================================================== */}

      {submitted && (
        <div
          className="
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
          Your Job Internship application has been
          submitted successfully.
        </div>
      )}

      {/* =================================================
          PERSONAL INFORMATION
      ================================================== */}

      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-gray-400
          "
        >
          Personal Information
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">

          {/* Name */}

          <div>
            <label
              htmlFor="job-name"
              className="text-sm font-medium text-gray-800"
            >
              Full Name
            </label>

            <input
              id="job-name"
              type="text"
              value={form.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
              placeholder="Your full name"
              className={inputClass("name")}
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label
              htmlFor="job-email"
              className="text-sm font-medium text-gray-800"
            >
              Email Address
            </label>

            <input
              id="job-email"
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
              placeholder="you@example.com"
              className={inputClass("email")}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <label
              htmlFor="job-phone"
              className="text-sm font-medium text-gray-800"
            >
              Phone Number
            </label>

            <input
              id="job-phone"
              type="tel"
              value={form.phone}
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value
                )
              }
              placeholder="+91 XXXXX XXXXX"
              className={inputClass("phone")}
            />

            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Experience */}

          <div>
            <label
              htmlFor="job-experience"
              className="text-sm font-medium text-gray-800"
            >
              Experience
            </label>

            <select
              id="job-experience"
              value={form.experience}
              onChange={(event) =>
                updateField(
                  "experience",
                  event.target.value
                )
              }
              className={inputClass(
                "experience"
              )}
            >
              <option value="">
                Select experience
              </option>

              <option value="Fresher">
                Fresher
              </option>

              <option value="Less than 1 year">
                Less than 1 year
              </option>

              <option value="1-2 years">
                1–2 years
              </option>

              <option value="2+ years">
                2+ years
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* =================================================
          EDUCATION
      ================================================== */}

      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-gray-400
          "
        >
          Education
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">

          {/* Qualification */}

          <div>
            <label
              htmlFor="job-qualification"
              className="text-sm font-medium text-gray-800"
            >
              Highest Qualification
            </label>

            <input
              id="job-qualification"
              type="text"
              value={form.qualification}
              onChange={(event) =>
                updateField(
                  "qualification",
                  event.target.value
                )
              }
              placeholder="e.g. B.E. Computer Science"
              className={inputClass(
                "qualification"
              )}
            />

            {errors.qualification && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.qualification}
              </p>
            )}
          </div>

          {/* Graduation Year */}

          <div>
            <label
              htmlFor="job-graduation"
              className="text-sm font-medium text-gray-800"
            >
              Graduation Year
            </label>

            <input
              id="job-graduation"
              type="number"
              min="2000"
              max="2100"
              value={form.graduationYear}
              onChange={(event) =>
                updateField(
                  "graduationYear",
                  event.target.value
                )
              }
              placeholder="e.g. 2026"
              className={inputClass(
                "graduationYear"
              )}
            />

            {errors.graduationYear && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.graduationYear}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =================================================
          PROFESSIONAL INFORMATION
      ================================================== */}

      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-gray-400
          "
        >
          Professional Information
        </p>

        <div className="mt-4 space-y-5">

          {/* Preferred Role */}

          <div>
            <label
              htmlFor="job-role"
              className="text-sm font-medium text-gray-800"
            >
              Preferred Role
            </label>

            <select
              id="job-role"
              value={form.preferredRole}
              onChange={(event) =>
                updateField(
                  "preferredRole",
                  event.target.value
                )
              }
              className={inputClass(
                "preferredRole"
              )}
            >
              <option value="">
                Select a role
              </option>

              <option value="React.js Developer">
                React.js Developer
              </option>

              <option value="Java Developer">
                Java Developer
              </option>

              <option value="Python Developer">
                Python Developer
              </option>

              <option value="iOS Developer">
                iOS Developer
              </option>

              <option value="Full Stack Developer">
                Full Stack Developer
              </option>

              <option value="UI/UX Designer">
                UI/UX Designer
              </option>

              <option value="Data Analyst">
                Data Analyst
              </option>

              <option value="BDE">
                Business Development Executive
              </option>
            </select>

            {errors.preferredRole && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.preferredRole}
              </p>
            )}
          </div>

          {/* =================================================
              RESUME
          ================================================== */}

          <div>
            <label
              htmlFor="job-resume"
              className="text-sm font-medium text-gray-800"
            >
              Resume
            </label>

            <div
              className="
                mt-2
                rounded-2xl
                border
                border-dashed
                border-black/[0.12]
                bg-gray-50/60
                p-5
                transition-all
                focus-within:border-blue-400
                focus-within:bg-white
              "
            >
              <input
                id="job-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="
                  block
                  w-full
                  cursor-pointer
                  text-sm
                  text-gray-600

                  file:mr-4
                  file:rounded-full
                  file:border-0
                  file:bg-gray-950
                  file:px-4
                  file:py-2
                  file:text-xs
                  file:font-semibold
                  file:text-white

                  file:transition-all
                  file:hover:bg-black
                "
              />

              <p className="mt-3 text-xs text-gray-400">
                PDF, DOC or DOCX · Maximum 5 MB
              </p>

              {/* Selected File */}

              {form.resume && (
                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    border
                    border-black/[0.05]
                    bg-white
                    px-4
                    py-3
                  "
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {form.resume.name}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      {(
                        form.resume.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    Selected
                  </span>
                </div>
              )}
            </div>

            {errors.resume && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.resume}
              </p>
            )}
          </div>

          {/* Skills */}

          <div>
            <label
              htmlFor="job-skills"
              className="text-sm font-medium text-gray-800"
            >
              Skills / Technologies
            </label>

            <textarea
              id="job-skills"
              rows={4}
              value={form.skills}
              onChange={(event) =>
                updateField(
                  "skills",
                  event.target.value
                )
              }
              placeholder="e.g. React, JavaScript, Next.js, Git..."
              className={inputClass("skills")}
            />

            {errors.skills && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.skills}
              </p>
            )}
          </div>

          {/* Message */}

          <div>
            <label
              htmlFor="job-message"
              className="text-sm font-medium text-gray-800"
            >
              Tell Us About Yourself
            </label>

            <textarea
              id="job-message"
              rows={5}
              value={form.message}
              onChange={(event) =>
                updateField(
                  "message",
                  event.target.value
                )
              }
              placeholder="Tell us about your goals, interests, and why you want to join HIKOO..."
              className={inputClass(
                "message"
              )}
            />

            {errors.message && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =================================================
          SUBMIT
      ================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-black/[0.06]
          pt-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <p className="text-xs leading-5 text-gray-400">
          Please make sure the information provided is
          accurate before submitting.
        </p>

        <button
          type="submit"
          className="
            group
            inline-flex
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-full
            bg-gray-950
            px-7
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
          "
        >
          Submit Application

          <span
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </button>
      </div>
    </form>
  );
}