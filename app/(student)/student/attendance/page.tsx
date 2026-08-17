"use client";

import { useState } from "react";

type AttendanceStatus = "Present" | "Absent" | "Late";

interface AttendanceRecord {
  date: string;
  day: string;
  checkIn: string;
  method: "Office Location" | "QR Code" | "-";
  status: AttendanceStatus;
}

const attendanceRecords: AttendanceRecord[] = [
  {
    date: "17 Aug 2026",
    day: "Monday",
    checkIn: "09:42 AM",
    method: "Office Location",
    status: "Present",
  },
  {
    date: "14 Aug 2026",
    day: "Friday",
    checkIn: "09:51 AM",
    method: "QR Code",
    status: "Present",
  },
  {
    date: "13 Aug 2026",
    day: "Thursday",
    checkIn: "09:38 AM",
    method: "Office Location",
    status: "Present",
  },
  {
    date: "12 Aug 2026",
    day: "Wednesday",
    checkIn: "10:14 AM",
    method: "QR Code",
    status: "Late",
  },
  {
    date: "11 Aug 2026",
    day: "Tuesday",
    checkIn: "-",
    method: "-",
    status: "Absent",
  },
  {
    date: "10 Aug 2026",
    day: "Monday",
    checkIn: "09:45 AM",
    method: "Office Location",
    status: "Present",
  },
];

/* =========================================================
   LOCATION ICON
========================================================= */

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* =========================================================
   QR ICON
========================================================= */

function QRIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
    >
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M15 14h2v2h-2z" />
      <path d="M19 14h1v4h-4v2h-2" />
      <path d="M19 19h2v1h-2z" />
    </svg>
  );
}

/* =========================================================
   CHECK ICON
========================================================= */

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

/* =========================================================
   CLOCK ICON
========================================================= */

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* =========================================================
   CALENDAR ICON
========================================================= */

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3.5 10h17" />
    </svg>
  );
}

/* =========================================================
   ATTENDANCE PAGE
========================================================= */

export default function StudentAttendancePage() {
  const [verificationMethod, setVerificationMethod] = useState<
    "location" | "qr" | null
  >(null);

  const [isVerifying, setIsVerifying] = useState(false);

  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleLocationVerification = () => {
    setVerificationMethod("location");
    setIsVerifying(true);
    setVerificationStatus("idle");

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationStatus("success");
    }, 1800);
  };

  const handleQRVerification = () => {
    setVerificationMethod("qr");
    setIsVerifying(true);
    setVerificationStatus("idle");

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationStatus("success");
    }, 1800);
  };

  return (
    <div className="p-5 sm:p-7 lg:p-10">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400">
          Student Portal
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          Attendance
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Verify your presence through the office location or scan
          the official QR code to mark your attendance.
        </p>
      </div>

      {/* =====================================================
          ATTENDANCE SUMMARY
      ===================================================== */}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Overall */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Overall
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
              <CheckIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            92%
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Attendance percentage
          </p>
        </div>

        {/* Present */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Present
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            23
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Days attended
          </p>
        </div>

        {/* Absent */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Absent
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <span className="text-sm font-bold">×</span>
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            2
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Days absent
          </p>
        </div>

        {/* Working Days */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Working Days
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CalendarIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            25
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Total working days
          </p>
        </div>
      </div>

      {/* =====================================================
          MARK ATTENDANCE
      ===================================================== */}

      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-950">
            Mark Attendance
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose one verification method to mark today's
            attendance.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* =================================================
              LOCATION VERIFICATION
          ================================================= */}

          <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white">
                <LocationIcon />
              </div>

              <div>
                <h3 className="font-bold text-gray-950">
                  Office Location
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Verify that you are physically present at the
                  office.
                </p>
              </div>
            </div>

            {/* Location status */}
            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    verificationMethod === "location" &&
                    isVerifying
                      ? "animate-pulse bg-yellow-500"
                      : verificationMethod === "location" &&
                        verificationStatus === "success"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />

                <span className="text-sm font-medium text-gray-700">
                  {verificationMethod === "location" &&
                  isVerifying
                    ? "Checking your location..."
                    : verificationMethod === "location" &&
                      verificationStatus === "success"
                    ? "Office location verified"
                    : "Location verification required"}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isVerifying}
              onClick={handleLocationVerification}
              className="
                mt-5 flex w-full items-center
                justify-center gap-2 rounded-xl
                bg-gray-950 px-5 py-3.5
                text-sm font-semibold text-white
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-black
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <LocationIcon />

              {isVerifying &&
              verificationMethod === "location"
                ? "Verifying..."
                : "Verify Location"}
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Location access is required for verification.
            </p>
          </div>

          {/* =================================================
              QR VERIFICATION
          ================================================= */}

          <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-950">
                <QRIcon />
              </div>

              <div>
                <h3 className="font-bold text-gray-950">
                  Scan QR Code
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Scan the official office QR code to verify
                  your attendance.
                </p>
              </div>
            </div>

            {/* QR status */}
            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    verificationMethod === "qr" && isVerifying
                      ? "animate-pulse bg-yellow-500"
                      : verificationMethod === "qr" &&
                        verificationStatus === "success"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />

                <span className="text-sm font-medium text-gray-700">
                  {verificationMethod === "qr" && isVerifying
                    ? "Verifying QR code..."
                    : verificationMethod === "qr" &&
                      verificationStatus === "success"
                    ? "QR code verified successfully"
                    : "QR verification required"}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isVerifying}
              onClick={handleQRVerification}
              className="
                mt-5 flex w-full items-center
                justify-center gap-2 rounded-xl
                border border-gray-950
                bg-white px-5 py-3.5
                text-sm font-semibold text-gray-950
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-gray-950
                hover:text-white
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <QRIcon />

              {isVerifying && verificationMethod === "qr"
                ? "Verifying..."
                : "Scan QR Code"}
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              QR verification is available at the office.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          VERIFICATION SUCCESS
      ===================================================== */}

      {verificationStatus === "success" && (
        <div className="mb-8 overflow-hidden rounded-3xl border border-green-200 bg-green-50">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
              <CheckIcon />
            </div>

            <div>
              <h3 className="font-bold text-green-900">
                Attendance Verified Successfully
              </h3>

              <p className="mt-1 text-sm text-green-700">
                Your attendance has been marked for today using{" "}
                {verificationMethod === "location"
                  ? "office location"
                  : "QR code"}{" "}
                verification.
              </p>
            </div>

            <span className="sm:ml-auto rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-700">
              Present
            </span>
          </div>
        </div>
      )}

      {/* =====================================================
          ATTENDANCE HISTORY
      ===================================================== */}

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-950">
              Attendance History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your recent attendance records.
            </p>
          </div>

          <button
            type="button"
            className="w-fit text-sm font-semibold text-gray-600 transition hover:text-gray-950"
          >
            View all →
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-3xl border border-black/[0.06] bg-white md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-black/[0.06] bg-gray-50/70">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Check In
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Verification
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendanceRecords.map((record) => (
                  <tr
                    key={`${record.date}-${record.day}`}
                    className="border-b border-black/[0.05] last:border-0"
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-gray-950">
                        {record.date}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {record.day}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ClockIcon />

                        {record.checkIn}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600">
                        {record.method}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <AttendanceBadge status={record.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {attendanceRecords.map((record) => (
            <div
              key={`${record.date}-${record.day}`}
              className="rounded-2xl border border-black/[0.06] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-950">
                    {record.date}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {record.day}
                  </p>
                </div>

                <AttendanceBadge status={record.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-black/[0.06] pt-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Check In
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {record.checkIn}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Verification
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {record.method}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   ATTENDANCE BADGE
========================================================= */

function AttendanceBadge({
  status,
}: {
  status: AttendanceStatus;
}) {
  if (status === "Present") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Present
      </span>
    );
  }

  if (status === "Late") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        Late
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Absent
    </span>
  );
}