"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Edit3,
  Percent,
  Power,
  Search,
  Ticket,
  X,
} from "lucide-react";

import {
  Coupon,
  CouponApplicableTo,
  UpdateCouponRequest,
  getAdminCoupons,
  updateAdminCoupon,
  updateAdminCouponStatus,
} from "@/services/AdminCouponService";

import {
  AdminCourse,
  getAdminCourses,
} from "@/services/AdminCourseService";

const EMPTY_FORM: UpdateCouponRequest = {
  code: "",
  discountPercentage: 0,
  applicableTo: "ALL_COURSES",
  courseId: null,
  usageLimit: null,
  validFrom: null,
  validUntil: null,
};

function formatDate(value: string | null) {
  if (!value) return "No expiry";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toInputDate(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (number: number) => String(number).padStart(2, "0");

  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
}

export default function AdminCouponsPage() {
  const router = useRouter();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [courses, setCourses] = useState<AdminCourse[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusId, setStatusId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState<UpdateCouponRequest>(EMPTY_FORM);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "ADMIN") {
        router.push("/admin/login");
        return;
      }

      const [couponData, courseData] = await Promise.all([
        getAdminCoupons(),
        getAdminCourses(),
      ]);

      setCoupons(couponData);
      setCourses(courseData);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load coupons"
      );
    } finally {
      setLoading(false);
    }
  }

  function openEdit(coupon: Coupon) {
    setEditingCoupon(coupon);

    setForm({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      applicableTo: coupon.applicableTo,
      courseId: coupon.courseId,
      usageLimit: coupon.usageLimit,
      validFrom: coupon.validFrom,
      validUntil: coupon.validUntil,
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setEditingCoupon(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingCoupon) {
      return;
    }

    setError("");
    setSuccess("");

    const code = String(form.code ?? "").trim().toUpperCase();
    const discount = Number(form.discountPercentage);

    if (!code) {
      setError("Coupon code is required");
      return;
    }

    if (!discount || discount <= 0 || discount > 100) {
      setError("Discount must be greater than 0 and up to 100%");
      return;
    }

    if (
      form.applicableTo === "SPECIFIC_COURSE" &&
      !form.courseId
    ) {
      setError("Please select a course");
      return;
    }

    if (
      form.usageLimit !== null &&
      form.usageLimit !== undefined &&
      Number(form.usageLimit) < 1
    ) {
      setError("Usage limit must be at least 1");
      return;
    }

    if (form.validFrom && form.validUntil) {
      const from = new Date(form.validFrom);
      const until = new Date(form.validUntil);

      if (until <= from) {
        setError("Valid until must be after valid from");
        return;
      }
    }

    try {
      setSaving(true);

      const payload: UpdateCouponRequest = {
        code,
        discountPercentage: discount,
        applicableTo: form.applicableTo,
        courseId:
          form.applicableTo === "SPECIFIC_COURSE"
            ? form.courseId ?? null
            : null,
          usageLimit:
            form.usageLimit === null ||
            form.usageLimit === undefined
              ? null
              : Number(form.usageLimit),
        validFrom: form.validFrom
          ? new Date(form.validFrom).toISOString()
          : null,
        validUntil: form.validUntil
          ? new Date(form.validUntil).toISOString()
          : null,
      };

      const updated = await updateAdminCoupon(
        editingCoupon.id,
        payload
      );

      setCoupons((current) =>
        current.map((coupon) =>
          coupon.id === updated.id ? updated : coupon
        )
      );

      setSuccess("Coupon updated successfully");

      setTimeout(() => {
        closeModal();
      }, 700);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update coupon"
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(coupon: Coupon) {
    try {
      setStatusId(coupon.id);
      setError("");
      setSuccess("");

      const updated = await updateAdminCouponStatus(
        coupon.id,
        !coupon.active
      );

      setCoupons((current) =>
        current.map((item) =>
          item.id === updated.id ? updated : item
        )
      );

      setSuccess(
        updated.active
          ? "Coupon activated successfully"
          : "Coupon deactivated successfully"
      );
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update coupon status"
      );
    } finally {
      setStatusId(null);
    }
  }

  const filteredCoupons = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return coupons;
    }

    return coupons.filter((coupon) => {
      return (
        coupon.code.toLowerCase().includes(query) ||
        (coupon.courseName ?? "")
          .toLowerCase()
          .includes(query) ||
        coupon.applicableTo
          .toLowerCase()
          .includes(query)
      );
    });
  }, [coupons, search]);

  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter(
    (coupon) => coupon.active
  ).length;

  const inactiveCoupons = coupons.filter(
    (coupon) => !coupon.active
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white">
                <Ticket size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Coupons
                </h1>

                <p className="text-sm text-gray-500">
                  View and manage existing coupons
                </p>
              </div>
            </div>
          </div>

          {/* Admin cannot create coupons */}
        </div>

        {/* Messages */}
        {error && (
          <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              className="rounded-lg p-1 hover:bg-red-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <Check size={17} />
            {success}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Coupons
              </p>

              <Ticket size={19} className="text-gray-500" />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {loading ? "…" : totalCoupons}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Active
              </p>

              <Power size={19} className="text-gray-500" />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {loading ? "…" : activeCoupons}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Inactive
              </p>

              <Power size={19} className="text-gray-500" />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {loading ? "…" : inactiveCoupons}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by coupon code, course or applicable type..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
            />
          </div>
        </div>

        {/* Coupon List */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-900">
              Coupon List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredCoupons.length} coupon
              {filteredCoupons.length === 1 ? "" : "s"} found
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading coupons...
            </div>
          ) : filteredCoupons.length === 0 ? (
            <div className="p-12 text-center">
              <Ticket
                size={38}
                className="mx-auto mb-3 text-gray-300"
              />

              <h3 className="font-semibold text-gray-900">
                No coupons found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                There are no coupons matching your search.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="p-5 transition hover:bg-gray-50"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                    {/* Coupon info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-sm font-bold text-gray-900">
                          {coupon.code}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            coupon.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {coupon.active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                          <p className="text-xs text-gray-400">
                            Discount
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 font-semibold text-gray-900">
                            <Percent size={15} />
                            {coupon.discountPercentage}%
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Applicable To
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {coupon.applicableTo ===
                            "ALL_COURSES"
                              ? "All Courses"
                              : coupon.courseName ??
                                "Specific Course"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Usage
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {coupon.usedCount} /{" "}
                            {coupon.usageLimit ??
                              "Unlimited"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Valid Until
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {formatDate(
                              coupon.validUntil
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(coupon)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(coupon)
                        }
                        disabled={
                          statusId === coupon.id
                        }
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                          coupon.active
                            ? "bg-gray-900 text-white hover:bg-gray-800"
                            : "bg-green-600 text-white hover:bg-green-700"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        <Power size={16} />

                        {statusId === coupon.id
                          ? "Updating..."
                          : coupon.active
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editingCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Coupon
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update the existing coupon details
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* Coupon Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Coupon Code
                </label>

                <input
                  type="text"
                  value={form.code ?? ""}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      code: event.target.value
                        .toUpperCase(),
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm uppercase outline-none focus:border-gray-400"
                  placeholder="WELCOME10"
                />
              </div>

              {/* Discount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Discount Percentage
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={
                      form.discountPercentage ?? ""
                    }
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        discountPercentage:
                          Number(event.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-10 text-sm outline-none focus:border-gray-400"
                  />

                  <Percent
                    size={17}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Applicable To */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Applicable To
                </label>

                <select
                  value={form.applicableTo}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      applicableTo:
                        event.target
                          .value as CouponApplicableTo,
                      courseId:
                        event.target.value ===
                        "SPECIFIC_COURSE"
                          ? current.courseId
                          : null,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                >
                  <option value="ALL_COURSES">
                    All Courses
                  </option>

                  <option value="SPECIFIC_COURSE">
                    Specific Course
                  </option>
                </select>
              </div>

              {/* Specific Course */}
              {form.applicableTo ===
                "SPECIFIC_COURSE" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course
                  </label>

                  <select
                    value={form.courseId ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        courseId: event.target.value
                          ? Number(
                              event.target.value
                            )
                          : null,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                  >
                    <option value="">
                      Select a course
                    </option>

                    {courses.map((course) => (
                      <option
                        key={course.id}
                        value={course.id}
                      >
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Usage Limit */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Usage Limit
                </label>

                <input
                  type="number"
                  min="1"
                  value={
                    form.usageLimit ?? ""
                  }
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      usageLimit:
                        event.target.value === ""
                          ? null
                          : Number(
                              event.target.value
                            ),
                    }))
                  }
                  placeholder="Leave empty for unlimited"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                />

                {editingCoupon.usedCount > 0 && (
                  <p className="mt-1.5 text-xs text-gray-500">
                    Already used:{" "}
                    {editingCoupon.usedCount}
                  </p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Valid From
                  </label>

                  <input
                    type="datetime-local"
                    value={toInputDate(
                      form.validFrom ?? null
                    )}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        validFrom:
                          event.target.value || null,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Valid Until
                  </label>

                  <input
                    type="datetime-local"
                    value={toInputDate(
                      form.validUntil ?? null
                    )}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        validUntil:
                          event.target.value || null,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}