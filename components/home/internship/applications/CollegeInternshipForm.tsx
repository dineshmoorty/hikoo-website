// "use client";

// import { FormEvent, useState } from "react";

// type FormData = {
//   name: string;
//   email: string;
//   phone: string;
//   college: string;
//   degree: string;
//   department: string;
//   yearOfStudy: string;
//   graduationYear: string;
//   skills: string;
//   preferredRole: string;
//   internshipDuration: string;
//   message: string;
// };

// const initialForm: FormData = {
//   name: "",
//   email: "",
//   phone: "",
//   college: "",
//   degree: "",
//   department: "",
//   yearOfStudy: "",
//   graduationYear: "",
//   skills: "",
//   preferredRole: "",
//   internshipDuration: "",
//   message: "",
// };

// export default function CollegeInternshipForm() {
//   const [form, setForm] = useState<FormData>(initialForm);

//   const [errors, setErrors] = useState<
//     Partial<Record<keyof FormData, string>>
//   >({});

//   const [submitted, setSubmitted] = useState(false);

//   const updateField = (
//     field: keyof FormData,
//     value: string
//   ) => {
//     setForm((previous) => ({
//       ...previous,
//       [field]: value,
//     }));

//     setErrors((previous) => ({
//       ...previous,
//       [field]: "",
//     }));

//     setSubmitted(false);
//   };

//   const validate = () => {
//     const nextErrors: Partial<
//       Record<keyof FormData, string>
//     > = {};

//     if (!form.name.trim()) {
//       nextErrors.name = "Please enter your full name.";
//     }

//     if (!form.email.trim()) {
//       nextErrors.email = "Please enter your email.";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
//     ) {
//       nextErrors.email =
//         "Please enter a valid email address.";
//     }

//     if (!form.phone.trim()) {
//       nextErrors.phone = "Please enter your phone number.";
//     }

//     if (!form.college.trim()) {
//       nextErrors.college =
//         "Please enter your college name.";
//     }

//     if (!form.degree.trim()) {
//       nextErrors.degree =
//         "Please enter your degree / course.";
//     }

//     if (!form.department.trim()) {
//       nextErrors.department =
//         "Please enter your department.";
//     }

//     if (!form.yearOfStudy) {
//       nextErrors.yearOfStudy =
//         "Please select your current year.";
//     }

//     if (!form.graduationYear.trim()) {
//       nextErrors.graduationYear =
//         "Please enter your expected graduation year.";
//     }

//     if (!form.skills.trim()) {
//       nextErrors.skills =
//         "Please enter your skills.";
//     }

//     if (!form.preferredRole) {
//       nextErrors.preferredRole =
//         "Please select your preferred area.";
//     }

//     if (!form.internshipDuration) {
//       nextErrors.internshipDuration =
//         "Please select your preferred duration.";
//     }

//     if (!form.message.trim()) {
//       nextErrors.message =
//         "Please tell us a little about yourself.";
//     }

//     setErrors(nextErrors);

//     return Object.keys(nextErrors).length === 0;
//   };

//   const handleSubmit = (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     if (!validate()) return;

//     /*
//       Backend / email integration
//       will be connected later.
//     */

//     setSubmitted(true);
//     setForm(initialForm);
//   };

//   const inputClass = (
//     field: keyof FormData
//   ) => `
//     mt-2
//     w-full
//     rounded-2xl
//     border
//     bg-gray-50/60
//     px-4
//     py-3.5
//     text-sm
//     text-gray-900
//     outline-none
//     transition-all
//     placeholder:text-gray-400
//     focus:border-violet-400
//     focus:bg-white
//     focus:ring-4
//     focus:ring-violet-500/10
//     ${
//       errors[field]
//         ? "border-red-300"
//         : "border-black/[0.07]"
//     }
//   `;

//   return (
//     <form
//       onSubmit={handleSubmit}
//       noValidate
//       className="mt-8 space-y-6"
//     >
//       {/* =====================================================
//           SUCCESS MESSAGE
//       ====================================================== */}

//       {submitted && (
//         <div
//           className="
//             rounded-2xl
//             border
//             border-green-200
//             bg-green-50
//             px-4
//             py-3
//             text-sm
//             font-medium
//             text-green-700
//           "
//         >
//           Your College Internship application has been
//           submitted successfully.
//         </div>
//       )}

//       {/* =====================================================
//           PERSONAL INFORMATION
//       ====================================================== */}

//       <div>
//         <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//           Personal Information
//         </p>

//         <div className="mt-4 grid gap-5 sm:grid-cols-2">
//           {/* Full Name */}

//           <div>
//             <label
//               htmlFor="college-name"
//               className="text-sm font-medium text-gray-800"
//             >
//               Full Name
//             </label>

//             <input
//               id="college-name"
//               type="text"
//               value={form.name}
//               onChange={(event) =>
//                 updateField(
//                   "name",
//                   event.target.value
//                 )
//               }
//               placeholder="Your full name"
//               className={inputClass("name")}
//             />

//             {errors.name && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.name}
//               </p>
//             )}
//           </div>

//           {/* Email */}

//           <div>
//             <label
//               htmlFor="college-email"
//               className="text-sm font-medium text-gray-800"
//             >
//               Email Address
//             </label>

//             <input
//               id="college-email"
//               type="email"
//               value={form.email}
//               onChange={(event) =>
//                 updateField(
//                   "email",
//                   event.target.value
//                 )
//               }
//               placeholder="you@example.com"
//               className={inputClass("email")}
//             />

//             {errors.email && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Phone */}

//           <div>
//             <label
//               htmlFor="college-phone"
//               className="text-sm font-medium text-gray-800"
//             >
//               Phone Number
//             </label>

//             <input
//               id="college-phone"
//               type="tel"
//               value={form.phone}
//               onChange={(event) =>
//                 updateField(
//                   "phone",
//                   event.target.value
//                 )
//               }
//               placeholder="+91 XXXXX XXXXX"
//               className={inputClass("phone")}
//             />

//             {errors.phone && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.phone}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           COLLEGE DETAILS
//       ====================================================== */}

//       <div>
//         <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//           College Details
//         </p>

//         <div className="mt-4 grid gap-5 sm:grid-cols-2">
//           {/* College */}

//           <div className="sm:col-span-2">
//             <label
//               htmlFor="college"
//               className="text-sm font-medium text-gray-800"
//             >
//               College / University
//             </label>

//             <input
//               id="college"
//               type="text"
//               value={form.college}
//               onChange={(event) =>
//                 updateField(
//                   "college",
//                   event.target.value
//                 )
//               }
//               placeholder="Your college / university name"
//               className={inputClass("college")}
//             />

//             {errors.college && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.college}
//               </p>
//             )}
//           </div>

//           {/* Degree */}

//           <div>
//             <label
//               htmlFor="degree"
//               className="text-sm font-medium text-gray-800"
//             >
//               Degree / Course
//             </label>

//             <input
//               id="degree"
//               type="text"
//               value={form.degree}
//               onChange={(event) =>
//                 updateField(
//                   "degree",
//                   event.target.value
//                 )
//               }
//               placeholder="e.g. B.E. Computer Science"
//               className={inputClass("degree")}
//             />

//             {errors.degree && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.degree}
//               </p>
//             )}
//           </div>

//           {/* Department */}

//           <div>
//             <label
//               htmlFor="department"
//               className="text-sm font-medium text-gray-800"
//             >
//               Department
//             </label>

//             <input
//               id="department"
//               type="text"
//               value={form.department}
//               onChange={(event) =>
//                 updateField(
//                   "department",
//                   event.target.value
//                 )
//               }
//               placeholder="e.g. Computer Science"
//               className={inputClass("department")}
//             />

//             {errors.department && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.department}
//               </p>
//             )}
//           </div>

//           {/* Year of Study */}

//           <div>
//             <label
//               htmlFor="year-of-study"
//               className="text-sm font-medium text-gray-800"
//             >
//               Current Year
//             </label>

//             <select
//               id="year-of-study"
//               value={form.yearOfStudy}
//               onChange={(event) =>
//                 updateField(
//                   "yearOfStudy",
//                   event.target.value
//                 )
//               }
//               className={inputClass("yearOfStudy")}
//             >
//               <option value="">
//                 Select current year
//               </option>

//               <option value="1st Year">
//                 1st Year
//               </option>

//               <option value="2nd Year">
//                 2nd Year
//               </option>

//               <option value="3rd Year">
//                 3rd Year
//               </option>

//               <option value="4th Year">
//                 4th Year
//               </option>

//               <option value="Final Year">
//                 Final Year
//               </option>
//             </select>

//             {errors.yearOfStudy && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.yearOfStudy}
//               </p>
//             )}
//           </div>

//           {/* Graduation */}

//           <div>
//             <label
//               htmlFor="college-graduation"
//               className="text-sm font-medium text-gray-800"
//             >
//               Expected Graduation Year
//             </label>

//             <input
//               id="college-graduation"
//               type="number"
//               min="2024"
//               max="2100"
//               value={form.graduationYear}
//               onChange={(event) =>
//                 updateField(
//                   "graduationYear",
//                   event.target.value
//                 )
//               }
//               placeholder="e.g. 2027"
//               className={inputClass("graduationYear")}
//             />

//             {errors.graduationYear && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.graduationYear}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           INTERNSHIP PREFERENCE
//       ====================================================== */}

//       <div>
//         <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//           Internship Preference
//         </p>

//         <div className="mt-4 space-y-5">
//           {/* Preferred Role */}

//           <div>
//             <label
//               htmlFor="college-role"
//               className="text-sm font-medium text-gray-800"
//             >
//               Preferred Technology / Area
//             </label>

//             <select
//               id="college-role"
//               value={form.preferredRole}
//               onChange={(event) =>
//                 updateField(
//                   "preferredRole",
//                   event.target.value
//                 )
//               }
//               className={inputClass("preferredRole")}
//             >
//               <option value="">
//                 Select your preferred area
//               </option>

//               <option value="PHP Full Stack">
//                 PHP Full Stack
//               </option>

//               <option value="Java Full Stack">
//                 Java Full Stack
//               </option>

//               <option value="Python Full Stack">
//                 Python Full Stack
//               </option>

//               <option value="Full Stack">
//                 Full Stack
//               </option>

//               <option value="Mobile App Development">
//                 Mobile App Development
//               </option>

//               <option value="Android Development">
//                 Android Development
//               </option>

//               <option value="iOS Development">
//                 iOS Development
//               </option>

//               <option value="Digital Marketing">
//                 Digital Marketing
//               </option>

//               <option value="UI/UX Design">
//                 UI/UX Design
//               </option>

//               <option value="Cloud Services">
//                 Cloud Services
//               </option>

//               <option value="Artificial Intelligence">
//                 Artificial Intelligence
//               </option>

//               <option value="Cyber Security">
//                 Cyber Security
//               </option>

//               <option value="Data Science">
//                 Data Science
//               </option>

//               <option value="Data Analytics">
//                 Data Analytics
//               </option>

//               <option value="Software Testing">
//                 Software Testing
//               </option>

//               <option value="Game Development">
//                 Game Development
//               </option>
//             </select>

//             {errors.preferredRole && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.preferredRole}
//               </p>
//             )}
//           </div>

//           {/* Duration */}

//           <div>
//             <label
//               htmlFor="college-duration"
//               className="text-sm font-medium text-gray-800"
//             >
//               Preferred Internship Duration
//             </label>

//             <select
//               id="college-duration"
//               value={form.internshipDuration}
//               onChange={(event) =>
//                 updateField(
//                   "internshipDuration",
//                   event.target.value
//                 )
//               }
//               className={inputClass(
//                 "internshipDuration"
//               )}
//             >
//               <option value="">
//                 Select duration
//               </option>
              
//               <option value="15 Days">
//                 15 Days
//               </option>

//               <option value="1 Month">
//                 1 Month
//               </option>

//               <option value="3 Months">
//                 3 Months
//               </option>

//               <option value="3+ Months">
//                 3+ Months
//               </option>
//             </select>

//             {errors.internshipDuration && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.internshipDuration}
//               </p>
//             )}
//           </div>

//           {/* Skills */}

//           <div>
//             <label
//               htmlFor="college-skills"
//               className="text-sm font-medium text-gray-800"
//             >
//               Skills / Technologies
//             </label>

//             <textarea
//               id="college-skills"
//               rows={4}
//               value={form.skills}
//               onChange={(event) =>
//                 updateField(
//                   "skills",
//                   event.target.value
//                 )
//               }
//               placeholder="e.g. JavaScript, React, Java, Python, Git..."
//               className={inputClass("skills")}
//             />

//             {errors.skills && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.skills}
//               </p>
//             )}
//           </div>

//           {/* Message */}

//           <div>
//             <label
//               htmlFor="college-message"
//               className="text-sm font-medium text-gray-800"
//             >
//               About You
//             </label>

//             <textarea
//               id="college-message"
//               rows={5}
//               value={form.message}
//               onChange={(event) =>
//                 updateField(
//                   "message",
//                   event.target.value
//                 )
//               }
//               placeholder="Tell us about your interests, goals, and what you would like to learn during the internship..."
//               className={inputClass("message")}
//             />

//             {errors.message && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SUBMIT
//       ====================================================== */}

//       <div
//         className="
//           flex
//           flex-col
//           gap-3
//           border-t
//           border-black/[0.06]
//           pt-6
//           sm:flex-row
//           sm:items-center
//           sm:justify-between
//         "
//       >
//         <p className="text-xs leading-5 text-gray-400">
//           Please make sure the information provided is accurate
//           before submitting your application.
//         </p>

//         <button
//           type="submit"
//           className="
//             group
//             inline-flex
//             shrink-0
//             items-center
//             justify-center
//             gap-2
//             rounded-full
//             bg-gray-950
//             px-7
//             py-3.5
//             text-sm
//             font-semibold
//             text-white
//             shadow-lg
//             shadow-gray-950/10
//             transition-all
//             duration-300
//             hover:-translate-y-0.5
//             hover:bg-black
//             hover:shadow-xl
//           "
//         >
//           Submit Application

//           <span
//             className="
//               transition-transform
//               duration-300
//               group-hover:translate-x-1
//             "
//           >
//             →
//           </span>
//         </button>
//       </div>
//     </form>
//   );
// }

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
              "React.js Developer",
              "Next.js Developer",
              "Java Developer",
              "Python Developer",
              "iOS Developer",
              "Full Stack Developer",
              "UI/UX Designer",
              "Data Analyst",
              "Digital Marketing",
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
              "1 Month",
              "2 Months",
              "3 Months",
              "4 Months",
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