"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createAdmin,
  getSuperAdminUsers,
  updateUserStatus,
} from "@/services/SuperAdminService";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

interface AdminForm {
  name: string;
  email: string;
  password: string;
}

export default function SuperAdminAdminsPage() {
  const router = useRouter();

  // =========================================================
  // STATE
  // =========================================================

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<AdminForm>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // LOAD ADMINS
  // =========================================================

  async function loadAdmins() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "SUPER_ADMIN") {
        router.replace("/super-admin/login");
        return;
      }

      const users = await getSuperAdminUsers();

      const adminUsers = users
        .filter((user) => user.role === "ADMIN")
        .map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
        }));

      setAdmins(adminUsers);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load administrators."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredAdmins = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return admins;
    }

    return admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query)
    );
  }, [admins, search]);

  // =========================================================
  // STATS
  // =========================================================

  const totalAdmins = admins.length;

  const activeAdmins = admins.filter(
    (admin) => admin.active
  ).length;

  const inactiveAdmins = admins.filter(
    (admin) => !admin.active
  ).length;

  // =========================================================
  // OPEN CREATE MODAL
  // =========================================================

  function openCreateModal() {
    setEditingAdmin(null);

    setForm({
      name: "",
      email: "",
      password: "",
    });

    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowModal(true);
  }

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  function openEditModal(admin: Admin) {
    setEditingAdmin(admin);

    setForm({
      name: admin.name,
      email: admin.email,
      password: "",
    });

    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowModal(true);
  }

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setEditingAdmin(null);

    setForm({
      name: "",
      email: "",
      password: "",
    });

    setError("");
    setSuccess("");
  }

  // =========================================================
  // FORM CHANGE
  // =========================================================

  function handleChange(
    field: keyof AdminForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  // =========================================================
  // CREATE / EDIT ADMIN
  // =========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "SUPER_ADMIN") {
      router.replace("/super-admin/login");
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      setError("Name is required.");
      return;
    }

    if (!email) {
      setError("Email address is required.");
      return;
    }

    // =======================================================
    // CREATE
    // =======================================================

    if (!editingAdmin) {
      if (form.password.length < 8) {
        setError(
          "Password must contain at least 8 characters."
        );
        return;
      }

      try {
        setSaving(true);

        await createAdmin({
          name,
          email,
          password: form.password,
        });

        setSuccess("Admin account created successfully.");

        await loadAdmins();

        setTimeout(() => {
          setShowModal(false);

          setForm({
            name: "",
            email: "",
            password: "",
          });

          setSuccess("");
        }, 700);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to create admin account."
        );
      } finally {
        setSaving(false);
      }

      return;
    }

    // =======================================================
    // EDIT
    // =======================================================

    try {
      setSaving(true);

      const payload: {
        name: string;
        email: string;
        password?: string;
      } = {
        name,
        email,
      };

      if (form.password.trim()) {
        if (form.password.length < 8) {
          setError(
            "Password must contain at least 8 characters."
          );
          setSaving(false);
          return;
        }

        payload.password = form.password;
      }

      const response = await fetch(
        `http://localhost:8080/api/super-admin/admins/${editingAdmin.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let message = `Request failed with status ${response.status}`;

        try {
          const data = await response.json();

          if (data?.message) {
            message = data.message;
          }
        } catch {
          // Ignore invalid JSON response
        }

        throw new Error(message);
      }

      setSuccess("Admin updated successfully.");

      await loadAdmins();

      setTimeout(() => {
        setShowModal(false);

        setEditingAdmin(null);

        setForm({
          name: "",
          email: "",
          password: "",
        });

        setSuccess("");
      }, 700);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update admin."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // ACTIVATE / DEACTIVATE
  // =========================================================

  async function handleStatusChange(admin: Admin) {
    const action = admin.active
      ? "deactivate"
      : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${admin.name}?`
    );

    if (!confirmed) return;

    try {
      setStatusLoading(admin.id);
      setError("");
      setSuccess("");

      const updated = await updateUserStatus(
        admin.id,
        !admin.active
      );

      setAdmins((current) =>
        current.map((item) =>
          item.id === admin.id
            ? {
                ...item,
                active: updated.active,
              }
            : item
        )
      );

      setSuccess(
        `${admin.name} is now ${
          updated.active ? "active" : "inactive"
        }.`
      );

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : `Unable to ${action} admin.`
      );
    } finally {
      setStatusLoading(null);
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

          <p className="mt-4 text-sm text-slate-500">
            Loading administrators...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="mx-auto w-full max-w-[1500px] px-1 pb-10">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Management
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Admins
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create and manage HIKOO administrator accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <span className="text-lg leading-none">+</span>
          Add Admin
        </button>
      </div>

      {/* =====================================================
          ALERTS
      ====================================================== */}

      {error && (
        <div className="mb-5 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="ml-4 text-red-400 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      )}

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-950">
            {totalAdmins}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Administrators
          </p>
        </div>

        {/* Active */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active
          </p>

          <p className="mt-3 text-3xl font-bold text-emerald-600">
            {activeAdmins}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Active accounts
          </p>
        </div>

        {/* Inactive */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Inactive
          </p>

          <p className="mt-3 text-3xl font-bold text-amber-600">
            {inactiveAdmins}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Disabled accounts
          </p>
        </div>
      </div>

      {/* =====================================================
          DIRECTORY
      ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Directory Header */}

        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Admin Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredAdmins.length}{" "}
              {filteredAdmins.length === 1
                ? "administrator"
                : "administrators"}{" "}
              found
            </p>
          </div>

          <div className="relative w-full sm:w-[330px]">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search admins..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
            />
          </div>
        </div>

        {/* ===================================================
            DESKTOP TABLE
        ==================================================== */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Admin
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Role
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-7 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-7 py-16 text-center"
                  >
                    <div className="mx-auto max-w-sm">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                        👤
                      </div>

                      <h3 className="mt-4 font-semibold text-slate-900">
                        No admins found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {search
                          ? "Try a different search."
                          : "Create your first administrator."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                  >
                    {/* Admin */}

                    <td className="px-7 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                          {admin.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">
                            {admin.name}
                          </p>

                          <p className="mt-0.5 truncate text-sm text-slate-400">
                            {admin.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}

                    <td className="px-5 py-5">
                      <span className="text-sm font-medium text-slate-700">
                        Administrator
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          admin.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            admin.active
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {admin.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-7 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(admin)
                          }
                          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={
                            statusLoading === admin.id
                          }
                          onClick={() =>
                            handleStatusChange(admin)
                          }
                          className={`rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            admin.active
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {statusLoading === admin.id
                            ? "..."
                            : admin.active
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===================================================
            MOBILE CARDS
        ==================================================== */}

        <div className="space-y-3 p-4 md:hidden">
          {filteredAdmins.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                👤
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No admins found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? "Try a different search."
                  : "Create your first administrator."}
              </p>
            </div>
          ) : (
            filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                      {admin.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {admin.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {admin.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      admin.active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {admin.active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Role
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    Administrator
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(admin)
                    }
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={
                      statusLoading === admin.id
                    }
                    onClick={() =>
                      handleStatusChange(admin)
                    }
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-50 ${
                      admin.active
                        ? "bg-red-50 text-red-600"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {statusLoading === admin.id
                      ? "..."
                      : admin.active
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* =====================================================
          ADD / EDIT ADMIN MODAL
      ====================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {editingAdmin
                    ? "Edit Admin"
                    : "Add Admin"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingAdmin
                    ? "Update administrator information."
                    : "Create a new HIKOO administrator."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleChange(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Enter admin name"
                  disabled={saving}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                />
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    handleChange(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="admin@hikoo.com"
                  disabled={saving}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                />
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {editingAdmin
                    ? "New password"
                    : "Temporary password"}
                </label>

                <div className="relative">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={(event) =>
                      handleChange(
                        "password",
                        event.target.value
                      )
                    }
                    placeholder={
                      editingAdmin
                        ? "Leave blank to keep current password"
                        : "Minimum 8 characters"
                    }
                    disabled={saving}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-900"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {editingAdmin
                    ? "Only enter a password if you want to change it."
                    : "Password must contain at least 8 characters."}
                </p>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Success */}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              {/* Buttons */}

              <div className="flex gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingAdmin
                    ? "Save Changes"
                    : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}