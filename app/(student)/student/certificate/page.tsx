"use client";

import { useState } from "react";

type CertificateStatus = "Issued" | "Pending";

interface Certificate {
  id: number;
  title: string;
  type: "Course" | "Internship";
  duration: string;
  issueDate: string;
  certificateNo: string;
  status: CertificateStatus;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    type: "Course",
    duration: "6 Months",
    issueDate: "31 January 2027",
    certificateNo: "HIKOO-FSWD-2027-00124",
    status: "Issued",
  },
  {
    id: 2,
    title: "Web Development Internship",
    type: "Internship",
    duration: "1 Month",
    issueDate: "15 September 2026",
    certificateNo: "HIKOO-WDI-2026-00452",
    status: "Pending",
  },
];

/* =========================================================
   CERTIFICATE ICON
========================================================= */

function CertificateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-7 w-7"
    >
      <path d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Z" />
      <circle cx="12" cy="10" r="3" />
      <path d="m10.5 12.5-1 4 2.5-1.3 2.5 1.3-1-4" />
    </svg>
  );
}

/* =========================================================
   EYE ICON
========================================================= */

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

/* =========================================================
   DOWNLOAD ICON
========================================================= */

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 20h16" />
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
   LOCK ICON
========================================================= */

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/* =========================================================
   CERTIFICATE PAGE
========================================================= */

export default function StudentCertificatePage() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const issuedCertificates = certificates.filter(
    (certificate) => certificate.status === "Issued"
  );

  const pendingCertificates = certificates.filter(
    (certificate) => certificate.status === "Pending"
  );

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
          Certificates
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          View and download certificates issued for your completed
          courses and internships.
        </p>
      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Issued */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Certificates Issued
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            {issuedCertificates.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Available for download
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Pending
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
              <LockIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            {pendingCertificates.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Completion required
          </p>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Total Programs
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <CertificateIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            {certificates.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Courses & internships
          </p>
        </div>
      </div>

      {/* =====================================================
          ISSUED CERTIFICATES
      ===================================================== */}

      <section className="mb-10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-950">
            My Certificates
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Certificates that are ready to view and download.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {issuedCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="group overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
            >
              {/* Certificate Preview */}
              <div className="relative m-4 overflow-hidden rounded-2xl border border-black/[0.06] bg-gray-950 p-5 sm:p-7">
                {/* Decorative border */}
                <div className="rounded-xl border border-white/20 p-5 sm:p-7">
                  <div className="text-center">
                    <p className="text-[9px] font-semibold tracking-[0.35em] text-white/50 sm:text-[10px]">
                      HIKOO
                    </p>

                    <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-white/50">
                      Certificate of Completion
                    </p>

                    <div className="mx-auto my-5 h-px w-16 bg-white/20" />

                    <p className="text-[9px] uppercase tracking-widest text-white/40">
                      This certificate is awarded to
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                      Dinesh
                    </h3>

                    <p className="mx-auto mt-3 max-w-md text-[9px] leading-4 text-white/50">
                      For successfully completing the
                    </p>

                    <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
                      {certificate.title}
                    </p>

                    <p className="mt-1 text-[9px] text-white/40">
                      {certificate.duration}
                    </p>

                    <div className="mx-auto mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white">
                      <CertificateIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
                        ISSUED
                      </span>

                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-600">
                        {certificate.type}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-950">
                      {certificate.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      Certificate No: {certificate.certificateNo}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Issued On
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-700">
                      {certificate.issueDate}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCertificate(certificate)
                    }
                    className="
                      flex items-center justify-center
                      gap-2 rounded-xl
                      border border-black/[0.08]
                      bg-white px-4 py-3
                      text-sm font-semibold
                      text-gray-700
                      transition-all duration-200
                      hover:bg-gray-50
                      hover:text-gray-950
                    "
                  >
                    <EyeIcon />
                    View Certificate
                  </button>

                  <button
                    type="button"
                    className="
                      flex items-center justify-center
                      gap-2 rounded-xl
                      bg-gray-950 px-4 py-3
                      text-sm font-semibold
                      text-white
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:bg-black
                      hover:shadow-lg
                    "
                  >
                    <DownloadIcon />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          PENDING CERTIFICATES
      ===================================================== */}

      {pendingCertificates.length > 0 && (
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-950">
              Certificates in Progress
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              These certificates will become available after the
              required program is completed.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {pendingCertificates.map((certificate) => (
              <div
                key={certificate.id}
                className="rounded-3xl border border-dashed border-black/[0.10] bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                    <LockIcon />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-950">
                        {certificate.title}
                      </h3>

                      <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-[10px] font-semibold text-yellow-700">
                        PENDING
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Complete your {certificate.type.toLowerCase()}{" "}
                      to unlock your certificate.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                      <span>
                        Duration:{" "}
                        <strong className="font-semibold text-gray-600">
                          {certificate.duration}
                        </strong>
                      </span>

                      <span>
                        Status:{" "}
                        <strong className="font-semibold text-yellow-600">
                          In Progress
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">
                      Completion
                    </span>

                    <span className="text-xs font-semibold text-gray-600">
                      68%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gray-950"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          VIEW CERTIFICATE MODAL
      ===================================================== */}

      {selectedCertificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close certificate"
            onClick={() => setSelectedCertificate(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 sm:px-7">
              <div>
                <h2 className="font-bold text-gray-950">
                  Certificate Preview
                </h2>

                <p className="mt-0.5 text-xs text-gray-400">
                  {selectedCertificate.certificateNo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.07] text-gray-500 transition hover:bg-gray-50 hover:text-gray-950"
              >
                ×
              </button>
            </div>

            {/* Certificate */}
            <div className="p-5 sm:p-8">
              <div className="mx-auto max-w-3xl rounded-2xl bg-gray-950 p-5 sm:p-10">
                <div className="border border-white/20 p-6 sm:p-12">
                  <div className="border border-white/10 p-6 text-center sm:p-10">
                    <p className="text-xs font-bold tracking-[0.5em] text-white">
                      HIKOO
                    </p>

                    <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/50">
                      Certificate of Completion
                    </p>

                    <div className="mx-auto my-7 h-px w-24 bg-white/20" />

                    <p className="text-xs text-white/40">
                      This certificate is proudly presented to
                    </p>

                    <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                      Dinesh
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-white/50">
                      In recognition of successfully completing the
                      required training and demonstrating commitment
                      throughout the program.
                    </p>

                    <h2 className="mt-5 text-lg font-bold text-white sm:text-xl">
                      {selectedCertificate.title}
                    </h2>

                    <p className="mt-2 text-xs text-white/40">
                      {selectedCertificate.duration}
                    </p>

                    <div className="my-8 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-white">
                        <CertificateIcon />
                      </div>
                    </div>

                    <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-wide text-white/30">
                          Certificate No
                        </p>

                        <p className="mt-1 text-[10px] text-white/70">
                          {selectedCertificate.certificateNo}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-wide text-white/30">
                          Issue Date
                        </p>

                        <p className="mt-1 text-[10px] text-white/70">
                          {selectedCertificate.issueDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-wide text-white/30">
                          Status
                        </p>

                        <p className="mt-1 text-[10px] font-semibold text-green-400">
                          Verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black hover:shadow-lg"
                >
                  <DownloadIcon />
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}