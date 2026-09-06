"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getSuperAdminUsers,
  updateUserStatus,
} from "@/services/SuperAdminService";

import {
  SuperAdminUser,
  UserRole,
} from "@/types/superAdmin";

export default function SuperAdminUsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<SuperAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("hikoo_token");
      const role = localStorage.getItem("hikoo_role");

      if (!token || role !== "SUPER_ADMIN") {
        router.replace("/super-admin/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getSuperAdminUsers();

        setUsers(data);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load users."
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [router]);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && user.active) ||
        (statusFilter === "INACTIVE" && !user.active);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, roleFilter, statusFilter]);

  async function handleStatusChange(
    user: SuperAdminUser
  ) {
    try {
      setUpdatingId(user.id);
      setError("");

      const updatedUser = await updateUserStatus(
        user.id,
        !user.active
      );

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === updatedUser.id
            ? updatedUser
            : currentUser
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update user status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function getRoleBadge(role: UserRole) {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "ADMIN":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "EMPLOYEE":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "STUDENT":
        return "bg-gray-100 text-gray-700 border-gray-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

  function formatRole(role: UserRole) {
    return role.replace("_", " ");
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-4 text-sm text-gray-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">
            Management
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
            Users
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage all HIKOO platform accounts.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-gray-400">
            Total Users
          </p>

          <p className="mt-1 text-xl font-semibold text-gray-950">
            {users.length}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">

          {/* Search */}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          {/* Role */}
          <select
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(
                event.target.value as "ALL" | UserRole
              )
            }
            className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-900 focus:bg-white"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="STUDENT">Student</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "ALL"
                  | "ACTIVE"
                  | "INACTIVE"
              )
            }
            className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-900 focus:bg-white"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">

            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-gray-50/70"
                >

                  {/* User */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-700">
                        {user.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-medium ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {formatRole(user.role)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">

                      <span
                        className={`h-2 w-2 rounded-full ${
                          user.active
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />

                      <span
                        className={`text-sm ${
                          user.active
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        {user.active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">

                    {user.role === "SUPER_ADMIN" ? (
                      <span className="text-xs text-gray-400">
                        Protected
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={
                          updatingId === user.id
                        }
                        onClick={() =>
                          handleStatusChange(user)
                        }
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          user.active
                            ? "border-red-200 text-red-600 hover:bg-red-50"
                            : "border-green-200 text-green-700 hover:bg-green-50"
                        }`}
                      >
                        {updatingId === user.id
                          ? "Updating..."
                          : user.active
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-medium text-gray-900">
              No users found
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Try changing your search or filters.
            </p>
          </div>
        )}

      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-700">
                  {user.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {user.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-400">
                    {user.email}
                  </p>
                </div>

              </div>

              <span
                className={`shrink-0 rounded-lg border px-2 py-1 text-[10px] font-medium ${getRoleBadge(
                  user.role
                )}`}
              >
                {formatRole(user.role)}
              </span>

            </div>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.active
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />

                <span className="text-xs text-gray-500">
                  {user.active
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              {user.role === "SUPER_ADMIN" ? (
                <span className="text-xs text-gray-400">
                  Protected
                </span>
              ) : (
                <button
                  type="button"
                  disabled={updatingId === user.id}
                  onClick={() =>
                    handleStatusChange(user)
                  }
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${
                    user.active
                      ? "border-red-200 text-red-600 hover:bg-red-50"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }`}
                >
                  {updatingId === user.id
                    ? "Updating..."
                    : user.active
                    ? "Deactivate"
                    : "Activate"}
                </button>
              )}

            </div>

          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <p className="text-sm font-medium text-gray-900">
              No users found
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Try changing your search or filters.
            </p>
          </div>
        )}

      </div>

      {/* Results count */}
      <div className="mt-4 text-xs text-gray-400">
        Showing {filteredUsers.length} of {users.length} users
      </div>

    </div>
  );
}