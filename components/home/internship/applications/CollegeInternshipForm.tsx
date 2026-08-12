"use client";

import { ChangeEvent, FormEvent, useState } from "react";

// =====================================================
// TYPES
// =====================================================

type FormData = {
  name: string;
  email: string;
  phone: string;

  college: string;
  department: string;
  yearOfStudy: string;

  qualification: string;
  graduationYear: string;

  preferredRole: string;
  skills: string;

  internshipDuration: string;

  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",

  college: "",
  department: "",
  yearOfStudy: "",

  qualification: "",
  graduationYear: "",

  preferredRole: "",
  skills: "",

  internshipDuration: "",

  message: "",
};

// =====================================================
// COMPONENT
// =====================================================

export default function CollegeInternshipForm() {
  const [form, setForm] =
    useState<FormData>(initialForm);

  const [resume, setResume] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [showSuccessDialog, setShowSuccessDialog] =
    useState(false);

  const [error, setError] =
    useState("");

  // ===================================================
  // INPUT CHANGE
  // ===================================================

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // ===================================================
  // RESUME CHANGE
  // ===================================================

  function handleResumeChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      setResume(null);
      return;
    }

    // -----------------------------------------------
    // FILE TYPE
    // -----------------------------------------------

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Please upload a PDF, DOC, or DOCX resume."
      );

      event.target.value = "";
      setResume(null);

      return;
    }

    // -----------------------------------------------
    // FILE SIZE
    // -----------------------------------------------

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Resume must be less than 5 MB."
      );

      event.target.value = "";
      setResume(null);

      return;
    }

    setError("");
    setResume(file);
  }

  // ===================================================
  // SUBMIT
  // ===================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    // -----------------------------------------------
    // RESUME CHECK
    // -----------------------------------------------

    if (!resume) {
      setError(
        "Please upload your resume."
      );

      setLoading(false);

      return;
    }

    try {
      // ---------------------------------------------
      // FORM DATA
      // ---------------------------------------------

      const formData =
        new FormData();

      // Internship type
      formData.append(
        "type",
        "college"
      );

      // ---------------------------------------------
      // PERSONAL DETAILS
      // ---------------------------------------------

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "email",
        form.email.trim()
      );

      formData.append(
        "phone",
        form.phone.trim()
      );

      // ---------------------------------------------
      // COLLEGE DETAILS
      // ---------------------------------------------

      formData.append(
        "college",
        form.college.trim()
      );

      formData.append(
        "department",
        form.department.trim()
      );

      formData.append(
        "yearOfStudy",
        form.yearOfStudy
      );

      formData.append(
        "qualification",
        form.qualification
      );

      formData.append(
        "graduationYear",
        form.graduationYear
      );

      // ---------------------------------------------
      // INTERNSHIP DETAILS
      // ---------------------------------------------

      formData.append(
        "preferredRole",
        form.preferredRole
      );

      formData.append(
        "skills",
        form.skills.trim()
      );

      formData.append(
        "internshipDuration",
        form.internshipDuration
      );

      // ---------------------------------------------
      // MESSAGE
      // ---------------------------------------------

      formData.append(
        "message",
        form.message.trim()
      );

      // ---------------------------------------------
      // RESUME
      // ---------------------------------------------

      formData.append(
        "resume",
        resume
      );

      // ---------------------------------------------
      // API REQUEST
      // ---------------------------------------------

      const response =
        await fetch(
          "/api/internship/apply",
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      // ---------------------------------------------
      // ERROR RESPONSE
      // ---------------------------------------------

      if (!response.ok) {
        console.error(
          "College Internship API Error:",
          result
        );

        throw new Error(
          result.error ||
          result.message ||
          "Failed to submit application."
        );
      }

      // ---------------------------------------------
      // SUCCESS
      // ---------------------------------------------

      setSuccess(
        "Your College Internship application has been submitted successfully!"
      );

      setShowSuccessDialog(true);

      setForm(initialForm);
      setResume(null);

      // Reset file input
      const fileInput =
        document.getElementById(
          "college-resume"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      // ---------------------------------------------
      // SCROLL TO SUCCESS
      // ---------------------------------------------

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (submitError) {
      console.error(
        "College Internship submission error:",
        submitError
      );

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while submitting your application."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===================================================
  // UI
  // ===================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-10"
    >
      {/* =================================================
          SUCCESS
      ================================================== */}

      {success && (
        <div
          className="
            rounded-2xl
            border
            border-green-200
            bg-green-50
            p-5
            text-sm
            font-medium
            text-green-700
          "
        >
          {success}
        </div>
      )}

      {/* =================================================
          ERROR
      ================================================== */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-5
            text-sm
            font-medium
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* =================================================
          PERSONAL INFORMATION
      ================================================== */}

      <section>
        <div className="mb-5">
          <h3
            className="
              text-lg
              font-semibold
              tracking-tight
              text-gray-950
            "
          >
            Personal Information
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Tell us a little about yourself.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* NAME */}

          <Field
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          {/* EMAIL */}

          <Field
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          {/* PHONE */}

          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          {/* QUALIFICATION */}

          <SelectField
            label="Qualification"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            required
            options={[
              "B.E / B.Tech",
              "B.Sc",
              "BCA",
              "MCA",
              "M.Sc",
              "M.E / M.Tech",
              "Other",
            ]}
          />
        </div>
      </section>

      {/* =================================================
          COLLEGE INFORMATION
      ================================================== */}

      <section>
        <div className="mb-5">
          <h3
            className="
              text-lg
              font-semibold
              tracking-tight
              text-gray-950
            "
          >
            College Information
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Provide your current academic details.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* COLLEGE */}

          <div className="sm:col-span-2">
            <Field
              label="College / University"
              name="college"
              value={form.college}
              onChange={handleChange}
              placeholder="Enter your college name"
              required
            />
          </div>

          {/* DEPARTMENT */}

          <Field
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            required
          />

          {/* YEAR OF STUDY */}

          <SelectField
            label="Current Year of Study"
            name="yearOfStudy"
            value={form.yearOfStudy}
            onChange={handleChange}
            required
            options={[
              "1st Year",
              "2nd Year",
              "3rd Year",
              "4th Year",
              "Final Year",
              "Completed",
            ]}
          />

          {/* GRADUATION YEAR */}

          <SelectField
            label="Expected Graduation Year"
            name="graduationYear"
            value={form.graduationYear}
            onChange={handleChange}
            required
            options={[
              "2021",
              "2022",
              "2023",
              "2024",
              "2025",
              "2026",
              "2027",
              "2028",
              "2029",
              "2030",
              "Other",
            ]}
          />
        </div>
      </section>

      {/* =================================================
          INTERNSHIP PREFERENCES
      ================================================== */}

      <section>
        <div className="mb-5">
          <h3
            className="
              text-lg
              font-semibold
              tracking-tight
              text-gray-950
            "
          >
            Internship Preferences
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Tell us what you would like to learn and work on.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* ROLE */}

          <SelectField
            label="Preferred Role"
            name="preferredRole"
            value={form.preferredRole}
            onChange={handleChange}
            required
            options={[
              "PHP Full Stack Developer",
              "Java Full Stack Developer",
              "Python Full Stack Developer",
              "Full Stack Developer",
              "Mobile App Developer",
              "Android Developer",
              "iOS Developer",
              "Digital Marketing Executive",
              "UI/UX Designer",
              "Cloud Engineer",
              "AI Engineer",
              "Cyber Security Engineer",
              "Data Scientist",
              "Data Analyst",
              "Software Tester",
              "Game Developer",
              "Other",
            ]}
          />

          {/* DURATION */}

          <SelectField
            label="Preferred Internship Duration"
            name="internshipDuration"
            value={form.internshipDuration}
            onChange={handleChange}
            required
            options={[
              "15 Days",
              "1 Month",
              "3 Months",
              "6 Months",
            ]}
          />

          {/* SKILLS */}

          <div className="sm:col-span-2">
            <TextAreaField
              label="Technical Skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. Java, React, Python, SQL..."
              rows={4}
              required
            />
          </div>
        </div>
      </section>

      {/* =================================================
          RESUME
      ================================================== */}

      <section>
        <div className="mb-5">
          <h3
            className="
              text-lg
              font-semibold
              tracking-tight
              text-gray-950
            "
          >
            Resume
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Upload your latest resume.
          </p>
        </div>

        <label
          htmlFor="college-resume"
          className="
            group
            flex
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-gray-300
            bg-gray-50
            px-6
            py-10
            text-center
            transition-all
            duration-300
            hover:border-gray-500
            hover:bg-gray-100
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white
              text-xl
              shadow-sm
            "
          >
            📄
          </div>

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-gray-900
            "
          >
            {resume
              ? resume.name
              : "Click to upload your resume"}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-gray-500
            "
          >
            PDF, DOC or DOCX · Maximum 5 MB
          </p>

          <input
            id="college-resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="hidden"
          />
        </label>
      </section>

      {/* =================================================
          MESSAGE
      ================================================== */}

      <section>
        <TextAreaField
          label="Why do you want to join this internship?"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your interests, goals, or what you hope to learn..."
          rows={6}
          required
        />
      </section>

      {/* =================================================
          SUBMIT
      ================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-gray-100
          pt-8
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <p
          className="
            text-xs
            leading-5
            text-gray-500
          "
        >
          By submitting this application, you confirm that
          the information provided is accurate.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="
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
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-black
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
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

              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <span>→</span>
            </>
          )}
        </button>
      </div>

      {/* =================================================
          SUCCESS DIALOG
      ================================================== */}

      {showSuccessDialog && (
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
            aria-labelledby="college-success-dialog-title"
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
              id="college-success-dialog-title"
              className="
                mt-5
                text-2xl
                font-bold
                tracking-tight
                text-gray-950
              "
            >
              Application Submitted Successfully
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-gray-500
              "
            >
              Your College Internship application has been
              submitted successfully. Our team will review
              your application and get back to you.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowSuccessDialog(false);
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
    </form>
  );
}

// =====================================================
// FIELD
// =====================================================

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-sm
          font-medium
          text-gray-800
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          text-sm
          text-gray-950
          outline-none
          transition-all
          placeholder:text-gray-400
          focus:border-gray-400
          focus:ring-4
          focus:ring-gray-100
        "
      />
    </div>
  );
}

// =====================================================
// SELECT FIELD
// =====================================================

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-sm
          font-medium
          text-gray-800
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          text-sm
          text-gray-950
          outline-none
          transition-all
          focus:border-gray-400
          focus:ring-4
          focus:ring-gray-100
        "
      >
        <option value="">
          Select an option
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// =====================================================
// TEXT AREA
// =====================================================

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-sm
          font-medium
          text-gray-800
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="
          w-full
          resize-y
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          text-sm
          leading-6
          text-gray-950
          outline-none
          transition-all
          placeholder:text-gray-400
          focus:border-gray-400
          focus:ring-4
          focus:ring-gray-100
        "
      />
    </div>
  );
}