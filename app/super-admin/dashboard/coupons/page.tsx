"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Edit3,
  Percent,
  Plus,
  Power,
  Search,
  Ticket,
  Trash2,
  X,
} from "lucide-react";
import {
  Coupon,
  CouponApplicableTo,
  CreateCouponRequest,
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
  updateCouponStatus,
} from "@/services/CouponService";
import { Course, getCourses } from "@/services/CourseService";

const emptyForm: CreateCouponRequest = {
  code: "",
  discountPercentage: 0,
  applicableTo: "ALL_COURSES",
  courseId: null,
  usageLimit: null,
  validFrom: null,
  validUntil: null,
};

export default function CouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<CreateCouponRequest>(emptyForm);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusId, setStatusId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "SUPER_ADMIN") {
        router.replace("/super-admin/login");
        return;
      }

      const [couponData, courseData] = await Promise.all([
        getCoupons(),
        getCourses(),
      ]);

      setCoupons(couponData);
      setCourses([...courseData].sort((a, b) => a.courseOrder - b.courseOrder));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load coupons.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredCoupons = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return coupons;

    return coupons.filter((coupon) =>
      [
        coupon.code,
        coupon.courseName ?? "",
        coupon.applicableTo,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [coupons, search]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function openEdit(coupon: Coupon) {
    setEditing(coupon);
    setForm({
      code: coupon.code,
      discountPercentage: Number(coupon.discountPercentage),
      applicableTo: coupon.applicableTo,
      courseId: coupon.courseId,
      usageLimit: coupon.usageLimit,
      validFrom: toInputDate(coupon.validFrom),
      validUntil: toInputDate(coupon.validUntil),
    });
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const code = form.code.trim().toUpperCase();

    if (!code) {
      setError("Coupon code is required.");
      return;
    }

    if (form.discountPercentage <= 0 || form.discountPercentage > 100) {
      setError("Discount must be greater than 0% and up to 100%.");
      return;
    }

    if (form.applicableTo === "SPECIFIC_COURSE" && !form.courseId) {
      setError("Please select a course.");
      return;
    }

    if (form.usageLimit !== null && Number(form.usageLimit) < 1) {
      setError("Usage limit must be at least 1.");
      return;
    }

    if (form.validFrom && form.validUntil && form.validFrom >= form.validUntil) {
      setError("Valid until must be after valid from.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        code,
        discountPercentage: Number(form.discountPercentage),
        applicableTo: form.applicableTo,
        courseId:
          form.applicableTo === "SPECIFIC_COURSE" ? form.courseId : null,
        usageLimit:
          form.usageLimit === null || form.usageLimit === undefined
            ? null
            : Number(form.usageLimit),
        validFrom: form.validFrom
          ? new Date(form.validFrom).toISOString()
          : null,
        validUntil: form.validUntil
          ? new Date(form.validUntil).toISOString()
          : null,
      };

      if (editing) {
        await updateCoupon(editing.id, payload);
        setSuccess("Coupon updated successfully.");
      } else {
        await createCoupon(payload);
        setSuccess("Coupon created successfully.");
      }

      setShowModal(false);
      setEditing(null);
      setForm(emptyForm);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save coupon.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(coupon: Coupon) {
    try {
      setStatusId(coupon.id);
      setError("");
      setSuccess("");
      await updateCouponStatus(coupon.id, !coupon.active);
      setSuccess(
        coupon.active
          ? `${coupon.code} deactivated.`
          : `${coupon.code} activated.`
      );
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update coupon status."
      );
    } finally {
      setStatusId(null);
    }
  }

  async function handleDelete(coupon: Coupon) {
    const confirmed = window.confirm(
      `Delete coupon "${coupon.code}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(coupon.id);
      setError("");
      setSuccess("");
      await deleteCoupon(coupon.id);
      setSuccess(`${coupon.code} deleted successfully.`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete coupon.");
    } finally {
      setDeletingId(null);
    }
  }

  const activeCount = coupons.filter((coupon) => coupon.active).length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-gray-400">Management</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
            Coupons
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create and manage discounts for HIKOO course purchases.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add Coupon
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Coupons</p>
          <p className="mt-2 text-3xl font-semibold text-gray-950">{coupons.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <p className="text-sm text-emerald-700">Active</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-900">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="mt-2 text-3xl font-semibold text-gray-700">
            {coupons.length - activeCount}
          </p>
        </div>
      </div>

      {error && !showModal && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && !showModal && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coupon code or course..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
              <p className="mt-3 text-sm text-gray-500">Loading coupons...</p>
            </div>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="rounded-2xl bg-gray-100 p-4">
              <Ticket className="h-7 w-7 text-gray-500" />
            </div>
            <h3 className="mt-4 font-semibold text-gray-950">No coupons found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search ? "Try another search." : "Create your first coupon."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredCoupons.map((coupon) => (
              <div key={coupon.id} className="p-5 transition hover:bg-gray-50/70 sm:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white">
                      <Percent className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold tracking-wide text-gray-950">
                          {coupon.code}
                        </h2>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            coupon.active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {coupon.active ? "Active" : "Inactive"}
                        </span>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          {coupon.discountPercentage}% OFF
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        {coupon.applicableTo === "ALL_COURSES"
                          ? "All Courses"
                          : coupon.courseName || "Specific Course"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                        <span>
                          Used{" "}
                          <strong className="font-semibold text-gray-800">
                            {coupon.usedCount}
                          </strong>
                          {coupon.usageLimit !== null
                            ? ` / ${coupon.usageLimit}`
                            : " times"}
                        </span>
                        {coupon.validUntil && (
                          <span>Until {formatDate(coupon.validUntil)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 xl:justify-end">
                    <button
                      onClick={() => openEdit(coupon)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-white"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(coupon)}
                      disabled={statusId === coupon.id}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold disabled:opacity-50 ${
                        coupon.active
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-gray-950 text-white hover:bg-gray-800"
                      }`}
                    >
                      <Power className="h-4 w-4" />
                      {statusId === coupon.id
                        ? "Saving..."
                        : coupon.active
                          ? "Deactivate"
                          : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(coupon)}
                      disabled={deletingId === coupon.id}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === coupon.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Coupon Management
                </p>
                <h2 className="mt-1 text-xl font-semibold text-gray-950">
                  {editing ? "Edit Coupon" : "Add Coupon"}
                </h2>
              </div>
              <button
                onClick={() => !saving && setShowModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Coupon Code" required>
                  <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="WELCOME10"
                    className={inputClass}
                  />
                </Field>

                <Field label="Discount (%)" required>
                  <input
                    type="number"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={form.discountPercentage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        discountPercentage: Number(e.target.value),
                      })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Applicable To" required>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Choice
                    selected={form.applicableTo === "ALL_COURSES"}
                    title="All Courses"
                    description="Coupon can be used for any course."
                    onClick={() =>
                      setForm({
                        ...form,
                        applicableTo: "ALL_COURSES",
                        courseId: null,
                      })
                    }
                  />
                  <Choice
                    selected={form.applicableTo === "SPECIFIC_COURSE"}
                    title="Specific Course"
                    description="Coupon applies to one course."
                    onClick={() =>
                      setForm({
                        ...form,
                        applicableTo: "SPECIFIC_COURSE",
                      })
                    }
                  />
                </div>
              </Field>

              {form.applicableTo === "SPECIFIC_COURSE" && (
                <Field label="Course" required>
                  <select
                    value={form.courseId ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        courseId: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseOrder}. {course.name}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Usage Limit">
                  <input
                    type="number"
                    min="1"
                    value={form.usageLimit ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        usageLimit: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                    placeholder="Unlimited"
                    className={inputClass}
                  />
                </Field>

                <Field label="Valid From">
                  <input
                    type="datetime-local"
                    value={form.validFrom ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, validFrom: e.target.value || null })
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Valid Until">
                  <input
                    type="datetime-local"
                    value={form.validUntil ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, validUntil: e.target.value || null })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {form.discountPercentage || 0}% discount
                </span>{" "}
                will be applied to{" "}
                <span className="font-semibold text-gray-900">
                  {form.applicableTo === "ALL_COURSES"
                    ? "all courses"
                    : courses.find((c) => c.id === form.courseId)?.name ||
                      "the selected course"}
                </span>
                .
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  {saving ? "Saving..." : editing ? "Save Changes" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function Choice({
  selected,
  title,
  description,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition ${
        selected
          ? "border-gray-950 bg-gray-50 ring-1 ring-gray-950"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">{title}</span>
        {selected && <Check className="h-4 w-4 text-gray-950" />}
      </div>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </button>
  );
}

function toInputDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
