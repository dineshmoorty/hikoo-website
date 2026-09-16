 "use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMyEmployeeProfile,
  updateMyEmployeeProfile,
  EmployeeProfile,
} from "@/services/EmployeeProfileService";

export default function EmployeeProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [form, setForm] = useState({
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token) {
      router.replace("/employee/login");
      return;
    }

    if (role !== "EMPLOYEE") {
      router.replace("/employee/login");
      return;
    }

    loadProfile();
  }, [router]);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyEmployeeProfile();

      setProfile(data);
      setForm({
        phone: data.phone ?? "",
        address: data.address ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        pincode: data.pincode ?? "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!form.address.trim()) {
      setError("Address is required.");
      return;
    }

    if (!form.city.trim()) {
      setError("City is required.");
      return;
    }

    if (!form.state.trim()) {
      setError("State is required.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Pincode must be exactly 6 digits.");
      return;
    }

    try {
      setSaving(true);

      const updated = await updateMyEmployeeProfile({
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      });

      setProfile(updated);
      setForm({
        phone: updated.phone ?? "",
        address: updated.address ?? "",
        city: updated.city ?? "",
        state: updated.state ?? "",
        pincode: updated.pincode ?? "",
      });

      localStorage.setItem(
        "hikoo_profile_completed",
        String(updated.profileCompleted)
      );

      setSuccess("Profile updated successfully.");

      if (updated.profileCompleted) {
        setTimeout(() => {
          router.push("/employee/dashboard");
        }, 700);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Employee Profile</h1>
          <p className="mt-1 text-sm text-gray-600">
            Complete your profile to continue to the employee dashboard.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          {profile && !profile.profileCompleted && (
            <div className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Please complete all required personal details before continuing.
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <section>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ReadOnlyField label="Name" value={profile?.name ?? ""} />
                <ReadOnlyField label="Email" value={profile?.email ?? ""} />
                <ReadOnlyField
                  label="Designation"
                  value={profile?.designation ?? ""}
                />
                <ReadOnlyField
                  label="Specialization"
                  value={profile?.specialization ?? ""}
                />
                <ReadOnlyField
                  label="Department"
                  value={profile?.department ?? ""}
                />
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                  required
                />

                <InputField
                  label="Pincode"
                  value={form.pincode}
                  onChange={(value) =>
                    updateField("pincode", value.replace(/\D/g, "").slice(0, 6))
                  }
                  required
                />

                <InputField
                  label="City"
                  value={form.city}
                  onChange={(value) => updateField("city", value)}
                  required
                />

                <InputField
                  label="State"
                  value={form.state}
                  onChange={(value) => updateField("state", value)}
                  required
                />

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    rows={4}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={loadProfile}
                disabled={saving}
                className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Refresh
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        value={value}
        readOnly
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
      />
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
      />
    </div>
  );
}
