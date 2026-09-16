"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Filter,
  Loader2,
  Plus,
  Search,
  UserCheck,
  UserX,
  X,
} from "lucide-react";

import {
  AttendanceRecord,
  AttendanceStatus,
  createAttendance,
  getAllAttendance,
  updateAttendance,
  updateAttendanceStatus,
} from "@/services/SuperAdminService";

import { getAllEnrollments } from "@/services/EnrollmentService";

type Enrollment = {
  id: number;
  studentId?: number;
  studentName?: string;
  studentEmail?: string;
  courseId?: number;
  courseName?: string;
  courseCode?: string | null;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "-";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function SuperAdminAttendancePage() {
  const router = useRouter();

  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusId, setStatusId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AttendanceStatus>("ALL");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [courseFilter, setCourseFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AttendanceRecord | null>(null);

  const [formEnrollmentId, setFormEnrollmentId] = useState("");
  const [formDate, setFormDate] = useState(today());
  const [formStatus, setFormStatus] = useState<AttendanceStatus>("PRESENT");
  const [formRemarks, setFormRemarks] = useState("");

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

      const [attendanceData, enrollmentData] = await Promise.all([
        getAllAttendance(),
        getAllEnrollments(),
      ]);

      setRecords(attendanceData);
      setEnrollments(enrollmentData as Enrollment[]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const courses = useMemo(() => {
    return Array.from(
      new Set(
        records
          .map((record) => record.courseName)
          .filter(Boolean)
      )
    ).sort();
  }, [records]);

  const filteredRecords = useMemo(() => {
    const q = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !q ||
        [
          record.studentName,
          record.studentEmail,
          record.courseName,
          record.courseCode,
          record.employeeName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);

      const matchesDate =
        !dateFilter || record.attendanceDate === dateFilter;

      const matchesStatus =
        statusFilter === "ALL" || record.status === statusFilter;

      const matchesActive =
        activeFilter === "ALL" ||
        (activeFilter === "ACTIVE" ? record.active : !record.active);

      const matchesCourse =
        courseFilter === "ALL" || record.courseName === courseFilter;

      return (
        matchesSearch &&
        matchesDate &&
        matchesStatus &&
        matchesActive &&
        matchesCourse
      );
    });
  }, [records, search, dateFilter, statusFilter, activeFilter, courseFilter]);

  const stats = useMemo(() => {
    const active = records.filter((record) => record.active);
    const present = active.filter((record) => record.status === "PRESENT");
    const absent = active.filter((record) => record.status === "ABSENT");

    return {
      total: records.length,
      present: present.length,
      absent: absent.length,
      inactive: records.filter((record) => !record.active).length,
    };
  }, [records]);

  function openCreate() {
    setEditing(null);
    setFormEnrollmentId("");
    setFormDate(today());
    setFormStatus("PRESENT");
    setFormRemarks("");
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function openEdit(record: AttendanceRecord) {
    setEditing(record);
    setFormEnrollmentId(String(record.enrollmentId));
    setFormDate(record.attendanceDate);
    setFormStatus(record.status);
    setFormRemarks(record.remarks ?? "");
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!editing && !formEnrollmentId) {
      setError("Please select a student.");
      return;
    }

    if (!formDate) {
      setError("Attendance date is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editing) {
        await updateAttendance(editing.id, {
          attendanceDate: formDate,
          status: formStatus,
          remarks: formRemarks.trim(),
        });
        setSuccess("Attendance updated successfully.");
      } else {
        await createAttendance({
          enrollmentId: Number(formEnrollmentId),
          attendanceDate: formDate,
          status: formStatus,
          remarks: formRemarks.trim(),
        });
        setSuccess("Attendance created successfully.");
      }

      setShowModal(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save attendance.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(record: AttendanceRecord) {
    try {
      setStatusId(record.id);
      setError("");
      setSuccess("");

      await updateAttendanceStatus(record.id, !record.active);

      setRecords((current) =>
        current.map((item) =>
          item.id === record.id
            ? { ...item, active: !item.active }
            : item
        )
      );

      setSuccess(
        !record.active
          ? "Attendance activated."
          : "Attendance deactivated."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update attendance status."
      );
    } finally {
      setStatusId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-900" />
          <p className="mt-4 text-sm text-gray-500">
            Loading attendance...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">Management</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
            Attendance
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage student attendance across all courses and employees.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add Attendance
        </button>
      </div>

      {(error || success) && (
        <div
          className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {error || success}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Total Records"
          value={stats.total}
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <Stat
          label="Present"
          value={stats.present}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <Stat
          label="Absent"
          value={stats.absent}
          icon={<UserX className="h-5 w-5" />}
        />
        <Stat
          label="Inactive"
          value={stats.inactive}
          icon={<UserCheck className="h-5 w-5" />}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Filter className="h-4 w-4" />
          Filters
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, course, employee..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
          />

          <Select
            value={statusFilter}
            onChange={(value) =>
              setStatusFilter(value as "ALL" | AttendanceStatus)
            }
            options={[
              ["ALL", "All Status"],
              ["PRESENT", "Present"],
              ["ABSENT", "Absent"],
            ]}
          />

          <Select
            value={activeFilter}
            onChange={(value) =>
              setActiveFilter(value as "ALL" | "ACTIVE" | "INACTIVE")
            }
            options={[
              ["ALL", "All Records"],
              ["ACTIVE", "Active"],
              ["INACTIVE", "Inactive"],
            ]}
          />
        </div>

        {courses.length > 0 && (
          <div className="mt-3 max-w-sm">
            <Select
              value={courseFilter}
              onChange={setCourseFilter}
              options={[
                ["ALL", "All Courses"],
                ...courses.map((course) => [course, course]),
              ]}
            />
          </div>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-gray-950">Attendance Records</h2>
            <p className="mt-1 text-xs text-gray-400">
              Showing {filteredRecords.length} of {records.length} records
            </p>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-700">
              No attendance records found
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Try changing your filters or add a new attendance record.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] w-full text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Course</th>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">State</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/70">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {record.studentName}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {record.studentEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-800">
                        {record.courseName}
                      </p>
                      {record.courseCode && (
                        <p className="mt-0.5 text-xs text-gray-400">
                          {record.courseCode}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {record.employeeName ?? "Not assigned"}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {formatDate(record.attendanceDate)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          record.status === "PRESENT"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          record.active
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {record.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(record)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={statusId === record.id}
                          onClick={() => toggleActive(record)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                          {statusId === record.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                          {record.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-950">
                  {editing ? "Edit Attendance" : "Add Attendance"}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  {editing
                    ? "Update attendance details."
                    : "Create attendance for any enrolled student."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4 p-6">
              {!editing && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    Student / Enrollment
                  </span>
                  <select
                    value={formEnrollmentId}
                    onChange={(e) => setFormEnrollmentId(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  >
                    <option value="">Select student</option>
                    {enrollments.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.studentName ?? `Enrollment #${item.id}`}
                        {item.courseName ? ` — ${item.courseName}` : ""}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {editing && (
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-400">Student</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {editing.studentName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {editing.courseName}
                  </p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    Attendance Date
                  </span>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    Status
                  </span>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(e.target.value as AttendanceStatus)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  >
                    <option value="PRESENT">Present</option>
                    <option value="ABSENT">Absent</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-700">
                  Remarks
                </span>
                <textarea
                  value={formRemarks}
                  onChange={(e) => setFormRemarks(e.target.value)}
                  rows={3}
                  placeholder="Optional remarks..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Save Changes" : "Create Attendance"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
            {value}
          </p>
        </div>
        <div className="rounded-xl bg-gray-100 p-2.5 text-gray-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[][];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 text-sm outline-none focus:border-gray-400"
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
