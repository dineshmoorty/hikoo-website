"use client";

import { useState } from "react";

type PaymentStatus = "Paid" | "Pending" | "Partial";

interface Payment {
  id: string;
  date: string;
  description: string;
  method: string;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
}

const payments: Payment[] = [
  {
    id: "PAY-001",
    date: "01 Aug 2026",
    description: "Course Enrollment Fee",
    method: "UPI",
    transactionId: "TXN928374651",
    amount: 10000,
    status: "Paid",
  },
  {
    id: "PAY-002",
    date: "10 Aug 2026",
    description: "Course Fee - Installment 2",
    method: "UPI",
    transactionId: "TXN837465192",
    amount: 5000,
    status: "Paid",
  },
  {
    id: "PAY-003",
    date: "01 Sep 2026",
    description: "Course Fee - Installment 3",
    method: "-",
    transactionId: "-",
    amount: 5000,
    status: "Pending",
  },
];

/* =========================================================
   ICONS
========================================================= */

function RupeeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M6 4h12" />
      <path d="M6 8h9a4 4 0 0 0 0-8" />
      <path d="M6 8l9 12" />
      <path d="M6 12h8" />
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

function ReceiptIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

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

function CreditCardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Paid
      </span>
    );
  }

  if (status === "Partial") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        Partial
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Pending
    </span>
  );
}

/* =========================================================
   FEES PAGE
========================================================= */

export default function StudentFeesPage() {
  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const totalFee = 25000;
  const paidAmount = 15000;
  const pendingAmount = totalFee - paidAmount;

  const paymentPercentage = Math.round(
    (paidAmount / totalFee) * 100
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
          Fees
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          View your course fees, payment status and transaction
          history.
        </p>
      </div>

      {/* =====================================================
          CURRENT PROGRAM
      ===================================================== */}

      <div className="mb-6 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white">
              <CreditCardIcon />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Current Program
              </p>

              <h2 className="mt-1 font-bold text-gray-950">
                Full Stack Web Development
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                6 Months · Enrollment ID: HIKOO-2026-00124
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            Active Enrollment
          </span>
        </div>
      </div>

      {/* =====================================================
          FEE SUMMARY
      ===================================================== */}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Total Fee
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
              <RupeeIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            ₹{totalFee.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Complete program fee
          </p>
        </div>

        {/* Paid */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Amount Paid
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            ₹{paidAmount.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-green-600">
            {paymentPercentage}% completed
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Pending Amount
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
              <ClockIcon />
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-950">
            ₹{pendingAmount.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-yellow-600">
            Payment pending
          </p>
        </div>
      </div>

      {/* =====================================================
          PAYMENT PROGRESS
      ===================================================== */}

      <section className="mb-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-950">
              Payment Progress
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your payment progress for the current program.
            </p>
          </div>

          <p className="text-xl font-bold text-gray-950">
            {paymentPercentage}%
          </p>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gray-950 transition-all duration-500"
            style={{ width: `${paymentPercentage}%` }}
          />
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Paid:{" "}
            <strong className="font-semibold text-gray-600">
              ₹{paidAmount.toLocaleString("en-IN")}
            </strong>
          </span>

          <span>
            Remaining:{" "}
            <strong className="font-semibold text-gray-600">
              ₹{pendingAmount.toLocaleString("en-IN")}
            </strong>
          </span>
        </div>
      </section>

      {/* =====================================================
          PENDING PAYMENT
      ===================================================== */}

      {pendingAmount > 0 && (
        <section className="mb-8 overflow-hidden rounded-3xl border border-yellow-200 bg-yellow-50">
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-yellow-600">
                <ClockIcon />
              </div>

              <div>
                <h3 className="font-bold text-yellow-900">
                  Payment Pending
                </h3>

                <p className="mt-1 text-sm text-yellow-700">
                  ₹{pendingAmount.toLocaleString("en-IN")} is
                  remaining for your current program.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="
                rounded-xl bg-gray-950
                px-5 py-3 text-sm font-semibold
                text-white transition-all
                hover:-translate-y-0.5
                hover:bg-black hover:shadow-lg
              "
            >
              Pay Now
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          PAYMENT HISTORY
      ===================================================== */}

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-950">
            Payment History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View all payments made for your current program.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-hidden rounded-3xl border border-black/[0.06] bg-white md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-black/[0.06] bg-gray-50/70">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Method
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Receipt
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-black/[0.05] last:border-0"
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-gray-950">
                        {payment.description}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {payment.id}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {payment.date}
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600">
                        {payment.method}
                      </span>

                      {payment.transactionId !== "-" && (
                        <p className="mt-1 text-[10px] text-gray-400">
                          {payment.transactionId}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold text-gray-950">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-5">
                      <PaymentStatusBadge
                        status={payment.status}
                      />
                    </td>

                    <td className="px-6 py-5 text-right">
                      {payment.status === "Paid" ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-xl border border-black/[0.07] px-3.5 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
                        >
                          <ReceiptIcon />
                          Receipt
                        </button>
                      ) : (
                        <span className="text-xs text-gray-300">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-2xl border border-black/[0.06] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-950">
                    {payment.description}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {payment.id}
                  </p>
                </div>

                <PaymentStatusBadge status={payment.status} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/[0.06] pt-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {payment.date}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    Amount
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-950">
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    Method
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {payment.method}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    Transaction
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {payment.transactionId}
                  </p>
                </div>
              </div>

              {payment.status === "Paid" && (
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.07] px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
                >
                  <ReceiptIcon />
                  View Receipt
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          PAYMENT MODAL
      ===================================================== */}

      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close payment"
            onClick={() => setShowPaymentModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-950">
                  Complete Payment
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Complete your pending course fee.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.07] text-gray-500 transition hover:bg-gray-50 hover:text-gray-950"
              >
                ×
              </button>
            </div>

            {/* Amount */}
            <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Amount Payable
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-950">
                ₹{pendingAmount.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Payment methods */}
            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-gray-950">
                Select Payment Method
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-black/[0.07] p-4 text-left transition hover:border-gray-950 hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-950">
                      UPI
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>

                  <span className="text-gray-400">→</span>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-black/[0.07] p-4 text-left transition hover:border-gray-950 hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-950">
                      Card
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      Credit or debit card
                    </p>
                  </div>

                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-gray-400">
              Payment gateway integration will be connected here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}