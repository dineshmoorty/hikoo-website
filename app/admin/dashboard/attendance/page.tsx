"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Edit3,
  Power,
  Search,
  Users,
  X,
  XCircle,
} from "lucide-react";

import {
  AdminAttendanceRecord,
  AttendanceStatus,
  getAdminAttendance,
  updateAdminAttendance,
  updateAdminAttendanceStatus,
} from "@/services/AdminAttendanceService";

function formatDate(value: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toInputDate(value: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AdminAttendancePage() {
  const router = useRouter();

  const [attendance, setAttendance] =
    useState<AdminAttendanceRecord[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | AttendanceStatus>("ALL");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusId, setStatusId] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editing, setEditing] =
    useState<AdminAttendanceRecord | null>(null);

  const [attendanceDate, setAttendanceDate] =
    useState("");
  const [attendanceStatus, setAttendanceStatus] =
    useState<AttendanceStatus>("PRESENT");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("hikoo_token");

      const role =
        localStorage.getItem("hikoo_role");

      if (!token || role !== "ADMIN") {
        router.push("/admin/login");
        return;
      }

      const data = await getAdminAttendance();

      setAttendance(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load attendance"
      );
    } finally {
      setLoading(false);
    }
  }

  function openEdit(record: AdminAttendanceRecord) {
    setEditing(record);

    setAttendanceDate(
      toInputDate(record.attendanceDate)
    );

    setAttendanceStatus(record.status);
    setRemarks(record.remarks ?? "");

    setError("");
    setSuccess("");
  }

  function closeEdit() {
    if (saving) return;

    setEditing(null);
    setAttendanceDate("");
    setAttendanceStatus("PRESENT");
    setRemarks("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!editing) return;

    if (!attendanceDate) {
      setError("Attendance date is required");
      return;
    }

    if (!attendanceStatus) {
      setError("Attendance status is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updated =
        await updateAdminAttendance(
          editing.id,
          {
            attendanceDate,
            status: attendanceStatus,
            remarks,
          }
        );

      setAttendance((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );

      setSuccess(
        "Attendance updated successfully"
      );

      setTimeout(() => {
        closeEdit();
      }, 700);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update attendance"
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(
    record: AdminAttendanceRecord
  ) {
    try {
      setStatusId(record.id);
      setError("");
      setSuccess("");

      const updated =
        await updateAdminAttendanceStatus(
          record.id,
          !record.active
        );

      setAttendance((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );

      setSuccess(
        updated.active
          ? "Attendance activated successfully"
          : "Attendance deactivated successfully"
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update attendance status"
      );
    } finally {
      setStatusId(null);
    }
  }

  const filteredAttendance = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return attendance.filter((record) => {
      const matchesSearch =
        !query ||
        record.studentName
          .toLowerCase()
          .includes(query) ||
        record.studentEmail
          .toLowerCase()
          .includes(query) ||
        record.courseName
          .toLowerCase()
          .includes(query) ||
        (record.courseCode ?? "")
          .toLowerCase()
          .includes(query) ||
        (record.employeeName ?? "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        record.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    attendance,
    search,
    statusFilter,
  ]);

  const totalCount = attendance.length;

  const presentCount = attendance.filter(
    (item) =>
      item.status === "PRESENT"
  ).length;

  const absentCount = attendance.filter(
    (item) =>
      item.status === "ABSENT"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white">
              <CalendarDays size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Attendance
              </h1>

              <p className="text-sm text-gray-500">
                View and manage student attendance
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
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

        {/* Success */}
        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 size={17} />
            {success}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Records
              </p>

              <Users
                size={19}
                className="text-gray-500"
              />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {loading ? "…" : totalCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Present
              </p>

              <CheckCircle2
                size={19}
                className="text-gray-500"
              />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {loading ? "…" : presentCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Absent
              </p>

              <XCircle
                size={19}
                className="text-gray-500"
              />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {loading ? "…" : absentCount}
            </p>
          </div>

        </div>

        {/* Search / Filter */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative flex-1">
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
                placeholder="Search student, email, course or employee..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "ALL"
                    | AttendanceStatus
                )
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400"
            >
              <option value="ALL">
                All Status
              </option>

              <option value="PRESENT">
                Present
              </option>

              <option value="ABSENT">
                Absent
              </option>
            </select>

          </div>
        </div>

        {/* Attendance List */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-900">
              Attendance Records
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredAttendance.length} record
              {filteredAttendance.length === 1
                ? ""
                : "s"} found
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading attendance...
            </div>
          ) : filteredAttendance.length === 0 ? (
            <div className="p-12 text-center">
              <CalendarDays
                size={38}
                className="mx-auto mb-3 text-gray-300"
              />

              <h3 className="font-semibold text-gray-900">
                No attendance found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                No attendance records match your search.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">

              {filteredAttendance.map(
                (record) => (
                  <div
                    key={record.id}
                    className="p-5 transition hover:bg-gray-50"
                  >
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                      {/* Details */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="font-semibold text-gray-900">
                            {record.studentName}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              record.status ===
                              "PRESENT"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {record.status}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              record.active
                                ? "bg-gray-100 text-gray-700"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {record.active
                              ? "Active"
                              : "Inactive"}
                          </span>

                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                          {record.studentEmail}
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                          <div>
                            <p className="text-xs text-gray-400">
                              Course
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-800">
                              {record.courseName}
                            </p>

                            {record.courseCode && (
                              <p className="text-xs text-gray-400">
                                {record.courseCode}
                              </p>
                            )}
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">
                              Attendance Date
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-800">
                              {formatDate(
                                record.attendanceDate
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">
                              Employee
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-800">
                              {record.employeeName ??
                                "Not Assigned"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">
                              Remarks
                            </p>

                            <p className="mt-1 max-w-xs truncate text-sm font-medium text-gray-800">
                              {record.remarks ??
                                "—"}
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            openEdit(record)
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          <Edit3 size={16} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleStatus(record)
                          }
                          disabled={
                            statusId === record.id
                          }
                          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white ${
                            record.active
                              ? "bg-gray-900 hover:bg-gray-800"
                              : "bg-green-600 hover:bg-green-700"
                          } disabled:opacity-60`}
                        >
                          <Power size={16} />

                          {statusId ===
                          record.id
                            ? "Updating..."
                            : record.active
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                      </div>
                    </div>
                  </div>
                )
              )}

            </div>
          )}

        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Attendance
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editing.studentName}
                </p>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Student */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Student
                </label>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  {editing.studentName}
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Course
                </label>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  {editing.courseName}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Attendance Date
                </label>

                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(event) =>
                    setAttendanceDate(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  value={attendanceStatus}
                  onChange={(event) =>
                    setAttendanceStatus(
                      event.target
                        .value as AttendanceStatus
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                >
                  <option value="PRESENT">
                    Present
                  </option>

                  <option value="ABSENT">
                    Absent
                  </option>
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Remarks
                </label>

                <textarea
                  value={remarks}
                  onChange={(event) =>
                    setRemarks(
                      event.target.value
                    )
                  }
                  rows={4}
                  maxLength={500}
                  placeholder="Enter remarks..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
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