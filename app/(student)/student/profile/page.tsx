"use client";

import { useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type VerificationStatus = "Verified" | "Pending" | "Not Verified";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  studentId: string;
  course: string;
  enrollmentDate: string;
  company: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

/* =========================================================
   INITIAL DATA
========================================================= */

const initialProfile: ProfileData = {
  firstName: "Dinesh",
  lastName: "Kumar",
  email: "dinesh@example.com",
  phone: "+91 98765 43210",
  dateOfBirth: "15 August 2002",
  gender: "Male",
  studentId: "HIKOO-STU-00124",
  course: "Full Stack Web Development",
  enrollmentDate: "01 August 2026",
  company: "HIKOO Technologies",
  address: "12, Main Road",
  city: "Madurai",
  state: "Tamil Nadu",
  pincode: "625001",
};

/* =========================================================
   ICONS
========================================================= */

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.5 3.2-5.5 7-5.5s6.3 2 7 5.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M7 4h3l1.5 4-2 1.5a13 13 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 19.5 4.5 13.5 4.5 6a2 2 0 0 1 2.5-2Z" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.5V16c2.5 2 7.5 2 10 0v-4.5" />
      <path d="M21 9v6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.3 2.3 4.7-5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 18v2Z" />
      <path d="m14 7 3 3" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 20h16" />
    </svg>
  );
}

/* =========================================================
   VERIFICATION BADGE
========================================================= */

function VerificationBadge({
  status,
}: {
  status: VerificationStatus;
}) {
  if (status === "Verified") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
        <CheckIcon />
        Verified
      </span>
    );
  }

  if (status === "Pending") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Not Verified
    </span>
  );
}

/* =========================================================
   PROFILE PAGE
========================================================= */

export default function StudentProfilePage() {
  const [profile, setProfile] =
    useState<ProfileData>(initialProfile);

  const [isEditing, setIsEditing] = useState(false);

  const [saved, setSaved] = useState(false);

  const updateField = (
    field: keyof ProfileData,
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="p-5 sm:p-7 lg:p-10">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">
            Student Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Manage your personal information and complete your
            profile verification.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="
              flex w-fit items-center gap-2
              rounded-xl bg-gray-950
              px-4 py-3
              text-sm font-semibold text-white
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-black
              hover:shadow-lg
            "
          >
            <EditIcon />
            Edit Profile
          </button>
        )}
      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {saved && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white">
            <CheckIcon />
          </div>

          <div>
            <p className="text-sm font-semibold text-green-900">
              Profile updated successfully
            </p>

            <p className="mt-0.5 text-xs text-green-700">
              Your profile information has been saved.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          PROFILE OVERVIEW
      ===================================================== */}

      <section className="mb-8 overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
        <div className="bg-gray-950 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white text-2xl font-bold text-gray-950 shadow-lg">
              {profile.firstName.charAt(0)}
              {profile.lastName.charAt(0)}
            </div>

            <div className="text-white">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold sm:text-2xl">
                  {profile.firstName} {profile.lastName}
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1.5 text-[11px] font-semibold text-green-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Verified Student
                </span>
              </div>

              <p className="mt-2 text-sm text-white/50">
                Student ID: {profile.studentId}
              </p>

              <p className="mt-1 text-xs text-white/35">
                {profile.course}
              </p>
            </div>
          </div>
        </div>

        {/* Quick details */}
        <div className="grid sm:grid-cols-3">
          <div className="border-b border-black/[0.06] p-5 sm:border-r sm:border-b-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Enrollment
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-950">
              {profile.enrollmentDate}
            </p>
          </div>

          <div className="border-b border-black/[0.06] p-5 sm:border-r sm:border-b-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Organization
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-950">
              {profile.company}
            </p>
          </div>

          <div className="p-5">
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Program
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-950">
              Full Stack Development
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFILE VERIFICATION
      ===================================================== */}

      <section className="mb-8">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-950">
            Profile Verification
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Keep your information verified to access all student
            services.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Identity */}
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <ShieldIcon />
              </div>

              <VerificationBadge status="Verified" />
            </div>

            <h3 className="mt-5 font-semibold text-gray-950">
              Identity Verification
            </h3>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Your identity information has been verified by the
              organization.
            </p>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <MailIcon />
              </div>

              <VerificationBadge status="Verified" />
            </div>

            <h3 className="mt-5 font-semibold text-gray-950">
              Email Verification
            </h3>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Your registered email address is verified.
            </p>
          </div>

          {/* Phone */}
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <PhoneIcon />
              </div>

              <VerificationBadge status="Verified" />
            </div>

            <h3 className="mt-5 font-semibold text-gray-950">
              Phone Verification
            </h3>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Your registered mobile number is verified.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <section className="mb-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-950">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your basic personal information.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* First Name */}
          <ProfileField
            label="First Name"
            value={profile.firstName}
            editing={isEditing}
            onChange={(value) =>
              updateField("firstName", value)
            }
          />

          {/* Last Name */}
          <ProfileField
            label="Last Name"
            value={profile.lastName}
            editing={isEditing}
            onChange={(value) =>
              updateField("lastName", value)
            }
          />

          {/* Email */}
          <ProfileField
            label="Email Address"
            value={profile.email}
            editing={isEditing}
            type="email"
            icon={<MailIcon />}
            onChange={(value) => updateField("email", value)}
          />

          {/* Phone */}
          <ProfileField
            label="Phone Number"
            value={profile.phone}
            editing={isEditing}
            icon={<PhoneIcon />}
            onChange={(value) => updateField("phone", value)}
          />

          {/* DOB */}
          <ProfileField
            label="Date of Birth"
            value={profile.dateOfBirth}
            editing={isEditing}
            onChange={(value) =>
              updateField("dateOfBirth", value)
            }
          />

          {/* Gender */}
          <ProfileField
            label="Gender"
            value={profile.gender}
            editing={isEditing}
            onChange={(value) => updateField("gender", value)}
          />
        </div>
      </section>

      {/* =====================================================
          STUDENT INFORMATION
      ===================================================== */}

      <section className="mb-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
            <GraduationIcon />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-950">
              Student Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your enrollment and program details.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <InfoBox
            label="Student ID"
            value={profile.studentId}
          />

          <InfoBox
            label="Current Course"
            value={profile.course}
          />

          <InfoBox
            label="Enrollment Date"
            value={profile.enrollmentDate}
          />

          <InfoBox
            label="Organization"
            value={profile.company}
          />

          <InfoBox
            label="Program Type"
            value="Course"
          />

          <InfoBox
            label="Duration"
            value="6 Months"
          />
        </div>
      </section>

      {/* =====================================================
          ADDRESS
      ===================================================== */}

      <section className="mb-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
            <LocationIcon />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-950">
              Address
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your registered residential address.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <ProfileField
              label="Address"
              value={profile.address}
              editing={isEditing}
              onChange={(value) =>
                updateField("address", value)
              }
            />
          </div>

          <ProfileField
            label="City"
            value={profile.city}
            editing={isEditing}
            onChange={(value) => updateField("city", value)}
          />

          <ProfileField
            label="State"
            value={profile.state}
            editing={isEditing}
            onChange={(value) => updateField("state", value)}
          />

          <ProfileField
            label="Pincode"
            value={profile.pincode}
            editing={isEditing}
            onChange={(value) =>
              updateField("pincode", value)
            }
          />
        </div>
      </section>

      {/* =====================================================
          DOCUMENT VERIFICATION
      ===================================================== */}

      <section className="mb-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-950">
            Document Verification
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload the required documents for profile
            verification.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* ID Proof */}
          <DocumentCard
            title="Government ID Proof"
            description="Aadhaar / Driving Licence / Passport"
            status="Verified"
          />

          {/* Education */}
          <DocumentCard
            title="Education Certificate"
            description="Latest educational qualification"
            status="Pending"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-black/[0.10] bg-gray-50 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-500 shadow-sm">
            <UploadIcon />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-950">
            Upload a document
          </h3>

          <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-gray-400">
            Upload PDF, JPG or PNG files. Maximum file size
            allowed will be configured by the administrator.
          </p>

          <button
            type="button"
            className="mt-4 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-950"
          >
            Choose File
          </button>
        </div>
      </section>

      {/* =====================================================
          EDIT ACTIONS
      ===================================================== */}

      {isEditing && (
        <div className="sticky bottom-4 z-20 rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              Make sure your information is correct before
              saving.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setProfile(initialProfile);
                  setIsEditing(false);
                }}
                className="flex-1 rounded-xl border border-black/[0.08] px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:flex-none"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black sm:flex-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({
  label,
  value,
  editing,
  type = "text",
  icon,
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  type?: string;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-gray-500">
        {label}
      </label>

      {editing ? (
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            type={type}
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            className={`
              w-full rounded-xl border
              border-black/[0.08]
              bg-white px-4 py-3
              text-sm text-gray-950
              outline-none
              transition
              focus:border-gray-950
              focus:ring-2
              focus:ring-gray-950/10
              ${icon ? "pl-11" : ""}
            `}
          />
        </div>
      ) : (
        <div className="flex min-h-[46px] items-center rounded-xl bg-gray-50 px-4 py-3">
          {icon && (
            <span className="mr-3 text-gray-400">
              {icon}
            </span>
          )}

          <span className="text-sm font-medium text-gray-700">
            {value}
          </span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DOCUMENT CARD
========================================================= */

function DocumentCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: VerificationStatus;
}) {
  return (
    <div className="rounded-2xl border border-black/[0.06] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5"
            >
              <path d="M6 3h8l4 4v14H6z" />
              <path d="M14 3v5h5" />
              <path d="M9 13h6M9 17h4" />
            </svg>
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-950">
              {title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              {description}
            </p>
          </div>
        </div>

        <VerificationBadge status={status} />
      </div>

      {status === "Verified" && (
        <div className="mt-4 border-t border-black/[0.06] pt-4">
          <p className="text-xs text-gray-400">
            Document verified successfully.
          </p>
        </div>
      )}

      {status === "Pending" && (
        <button
          type="button"
          className="mt-4 w-full rounded-xl border border-black/[0.08] px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
        >
          Upload Document
        </button>
      )}
    </div>
  );
}