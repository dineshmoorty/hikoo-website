"use client";

import { FormEvent, useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  department: string;
  yearOfStudy: string;
  graduationYear: string;
  skills: string;
  preferredRole: string;
  internshipDuration: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  college: "",
  degree: "",
  department: "",
  yearOfStudy: "",
  graduationYear: "",
  skills: "",
  preferredRole: "",
  internshipDuration: "",
  message: "",
};

export default function CollegeInternshipForm() {
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
      nextErrors.name = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      nextErrors.email =
        "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    }

    if (!form.college.trim()) {
      nextErrors.college =
        "Please enter your college name.";
    }

    if (!form.degree.trim()) {
      nextErrors.degree =
        "Please enter your degree / course.";
    }

    if (!form.department.trim()) {
      nextErrors.department =
        "Please enter your department.";
    }

    if (!form.yearOfStudy) {
      nextErrors.yearOfStudy =
        "Please select your current year.";
    }

    if (!form.graduationYear.trim()) {
      nextErrors.graduationYear =
        "Please enter your expected graduation year.";
    }

    if (!form.skills.trim()) {
      nextErrors.skills =
        "Please enter your skills.";
    }

    if (!form.preferredRole) {
      nextErrors.preferredRole =
        "Please select your preferred area.";
    }

    if (!form.internshipDuration) {
      nextErrors.internshipDuration =
        "Please select your preferred duration.";
    }

    if (!form.message.trim()) {
      nextErrors.message =
        "Please tell us a little about yourself.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) return;

    /*
      Backend / email integration
      will be connected later.
    */

    setSubmitted(true);
    setForm(initialForm);
  };

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
    focus:border-violet-400
    focus:bg-white
    focus:ring-4
    focus:ring-violet-500/10
    ${
      errors[field]
        ? "border-red-300"
        : "border-black/[0.07]"
    }
  `;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 space-y-6"
    >
      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

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
          Your College Internship application has been
          submitted successfully.
        </div>
      )}

      {/* =====================================================
          PERSONAL INFORMATION
      ====================================================== */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Personal Information
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {/* Full Name */}

          <div>
            <label
              htmlFor="college-name"
              className="text-sm font-medium text-gray-800"
            >
              Full Name
            </label>

            <input
              id="college-name"
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
              htmlFor="college-email"
              className="text-sm font-medium text-gray-800"
            >
              Email Address
            </label>

            <input
              id="college-email"
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
              htmlFor="college-phone"
              className="text-sm font-medium text-gray-800"
            >
              Phone Number
            </label>

            <input
              id="college-phone"
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
        </div>
      </div>

      {/* =====================================================
          COLLEGE DETAILS
      ====================================================== */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          College Details
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {/* College */}

          <div className="sm:col-span-2">
            <label
              htmlFor="college"
              className="text-sm font-medium text-gray-800"
            >
              College / University
            </label>

            <input
              id="college"
              type="text"
              value={form.college}
              onChange={(event) =>
                updateField(
                  "college",
                  event.target.value
                )
              }
              placeholder="Your college / university name"
              className={inputClass("college")}
            />

            {errors.college && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.college}
              </p>
            )}
          </div>

          {/* Degree */}

          <div>
            <label
              htmlFor="degree"
              className="text-sm font-medium text-gray-800"
            >
              Degree / Course
            </label>

            <input
              id="degree"
              type="text"
              value={form.degree}
              onChange={(event) =>
                updateField(
                  "degree",
                  event.target.value
                )
              }
              placeholder="e.g. B.E. Computer Science"
              className={inputClass("degree")}
            />

            {errors.degree && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.degree}
              </p>
            )}
          </div>

          {/* Department */}

          <div>
            <label
              htmlFor="department"
              className="text-sm font-medium text-gray-800"
            >
              Department
            </label>

            <input
              id="department"
              type="text"
              value={form.department}
              onChange={(event) =>
                updateField(
                  "department",
                  event.target.value
                )
              }
              placeholder="e.g. Computer Science"
              className={inputClass("department")}
            />

            {errors.department && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.department}
              </p>
            )}
          </div>

          {/* Year of Study */}

          <div>
            <label
              htmlFor="year-of-study"
              className="text-sm font-medium text-gray-800"
            >
              Current Year
            </label>

            <select
              id="year-of-study"
              value={form.yearOfStudy}
              onChange={(event) =>
                updateField(
                  "yearOfStudy",
                  event.target.value
                )
              }
              className={inputClass("yearOfStudy")}
            >
              <option value="">
                Select current year
              </option>

              <option value="1st Year">
                1st Year
              </option>

              <option value="2nd Year">
                2nd Year
              </option>

              <option value="3rd Year">
                3rd Year
              </option>

              <option value="4th Year">
                4th Year
              </option>

              <option value="Final Year">
                Final Year
              </option>
            </select>

            {errors.yearOfStudy && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.yearOfStudy}
              </p>
            )}
          </div>

          {/* Graduation */}

          <div>
            <label
              htmlFor="college-graduation"
              className="text-sm font-medium text-gray-800"
            >
              Expected Graduation Year
            </label>

            <input
              id="college-graduation"
              type="number"
              min="2024"
              max="2100"
              value={form.graduationYear}
              onChange={(event) =>
                updateField(
                  "graduationYear",
                  event.target.value
                )
              }
              placeholder="e.g. 2027"
              className={inputClass("graduationYear")}
            />

            {errors.graduationYear && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.graduationYear}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          INTERNSHIP PREFERENCE
      ====================================================== */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Internship Preference
        </p>

        <div className="mt-4 space-y-5">
          {/* Preferred Role */}

          <div>
            <label
              htmlFor="college-role"
              className="text-sm font-medium text-gray-800"
            >
              Preferred Technology / Area
            </label>

            <select
              id="college-role"
              value={form.preferredRole}
              onChange={(event) =>
                updateField(
                  "preferredRole",
                  event.target.value
                )
              }
              className={inputClass("preferredRole")}
            >
              <option value="">
                Select your preferred area
              </option>

              <option value="PHP Full Stack">
                PHP Full Stack
              </option>

              <option value="Java Full Stack">
                Java Full Stack
              </option>

              <option value="Python Full Stack">
                Python Full Stack
              </option>

              <option value="Full Stack">
                Full Stack
              </option>

              <option value="Mobile App Development">
                Mobile App Development
              </option>

              <option value="Android Development">
                Android Development
              </option>

              <option value="iOS Development">
                iOS Development
              </option>

              <option value="Digital Marketing">
                Digital Marketing
              </option>

              <option value="UI/UX Design">
                UI/UX Design
              </option>

              <option value="Cloud Services">
                Cloud Services
              </option>

              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>

              <option value="Cyber Security">
                Cyber Security
              </option>

              <option value="Data Science">
                Data Science
              </option>

              <option value="Data Analytics">
                Data Analytics
              </option>

              <option value="Software Testing">
                Software Testing
              </option>

              <option value="Game Development">
                Game Development
              </option>
            </select>

            {errors.preferredRole && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.preferredRole}
              </p>
            )}
          </div>

          {/* Duration */}

          <div>
            <label
              htmlFor="college-duration"
              className="text-sm font-medium text-gray-800"
            >
              Preferred Internship Duration
            </label>

            <select
              id="college-duration"
              value={form.internshipDuration}
              onChange={(event) =>
                updateField(
                  "internshipDuration",
                  event.target.value
                )
              }
              className={inputClass(
                "internshipDuration"
              )}
            >
              <option value="">
                Select duration
              </option>
              
              <option value="15 Days">
                15 Days
              </option>

              <option value="1 Month">
                1 Month
              </option>

              <option value="3 Months">
                3 Months
              </option>

              <option value="3+ Months">
                3+ Months
              </option>
            </select>

            {errors.internshipDuration && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.internshipDuration}
              </p>
            )}
          </div>

          {/* Skills */}

          <div>
            <label
              htmlFor="college-skills"
              className="text-sm font-medium text-gray-800"
            >
              Skills / Technologies
            </label>

            <textarea
              id="college-skills"
              rows={4}
              value={form.skills}
              onChange={(event) =>
                updateField(
                  "skills",
                  event.target.value
                )
              }
              placeholder="e.g. JavaScript, React, Java, Python, Git..."
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
              htmlFor="college-message"
              className="text-sm font-medium text-gray-800"
            >
              About You
            </label>

            <textarea
              id="college-message"
              rows={5}
              value={form.message}
              onChange={(event) =>
                updateField(
                  "message",
                  event.target.value
                )
              }
              placeholder="Tell us about your interests, goals, and what you would like to learn during the internship..."
              className={inputClass("message")}
            />

            {errors.message && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          SUBMIT
      ====================================================== */}

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
          Please make sure the information provided is accurate
          before submitting your application.
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