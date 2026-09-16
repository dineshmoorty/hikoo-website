"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
} from "lucide-react";
import {
  getMyAdminProfile,
  updateMyAdminProfile,
  type AdminProfile,
} from "@/services/AdminProfileService";

type FormState = {
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const emptyForm: FormState = {
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function AdminProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "ADMIN") {
      router.replace("/admin/login");
      return;
    }

    loadProfile();
  }, [router]);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyAdminProfile();
      setProfile(data);
      setForm({
        phone: data.phone ?? "",
        address: data.address ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        pincode: data.pincode ?? "",
      });

      if (data.profileCompleted) {
        localStorage.setItem("hikoo_admin_profile_completed", "true");
      } else {
        localStorage.removeItem("hikoo_admin_profile_completed");
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your admin profile."
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setSuccess("");
  }

  function validate() {
    if (!form.phone.trim()) return "Phone number is required.";
    if (!form.address.trim()) return "Address is required.";
    if (!form.city.trim()) return "City is required.";
    if (!form.state.trim()) return "State is required.";
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
      return "Pincode must be exactly 6 digits.";
    }
    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const data = await updateMyAdminProfile({
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      });

      setProfile(data);

      if (data.profileCompleted) {
        localStorage.setItem("hikoo_admin_profile_completed", "true");
        setSuccess("Profile completed successfully. Redirecting...");
        setTimeout(() => {
          router.replace("/admin/dashboard");
        }, 700);
      } else {
        setSuccess("Profile saved. Please complete all required fields.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
            <span className="text-sm font-medium text-slate-600">
              Loading your profile...
            </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              HIKOO Administration
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              Complete your profile
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Before you access the Admin workspace, please complete the
              required profile information.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
            <ShieldCheck className="h-4 w-4" />
            Profile completion required
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
              H
            </div>

            <h2 className="mt-7 text-2xl font-bold">
              Welcome, {profile?.name || "Admin"}
            </h2>

            <p className="mt-2 break-all text-sm text-slate-400">
              {profile?.email || ""}
            </p>

            <div className="mt-8 space-y-3">
              {[
                ["Account", "Administrator"],
                ["Access", "Admin workspace"],
                ["Status", profile?.profileCompleted ? "Completed" : "Pending"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3 rounded-2xl border border-indigo-400/20 bg-indigo-400/10 p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
              <p className="text-xs leading-5 text-slate-300">
                Your profile must contain phone, address, city, state and
                pincode before Admin access is enabled.
              </p>
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Personal & contact details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  All fields below are required.
                </p>
              </div>

              {profile?.profileCompleted && (
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Complete
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full name
                  </label>
                  <input
                    value={profile?.name || ""}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-slate-100`}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Managed from your Admin account.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email address
                  </label>
                  <input
                    value={profile?.email || ""}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-slate-100`}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Managed from your Admin account.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-slate-700"
                >
                  Phone number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-slate-700"
                >
                  Address *
                </label>
                <textarea
                  id="address"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Enter complete address"
                  rows={3}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="city"
                    className="text-sm font-semibold text-slate-700"
                  >
                    City *
                  </label>
                  <input
                    id="city"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Chennai"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="text-sm font-semibold text-slate-700"
                  >
                    State *
                  </label>
                  <input
                    id="state"
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    placeholder="Tamil Nadu"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Pincode *
                  </label>
                  <input
                    id="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      updateField(
                        "pincode",
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    placeholder="600001"
                    className={inputClass}
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving profile..." : "Save & Continue"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
