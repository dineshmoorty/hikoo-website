"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

import {
  getMyAttendance,
  type AttendanceStatus,
  type StudentAttendanceRecord,
} from "@/services/StudentAttendanceService";

function formatDate(value: string) {
  if (!value) return "Not available";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Not available";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getTodayInputValue() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function StudentAttendancePage() {
  const [records, setRecords] = useState<StudentAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [courseFilter, setCourseFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AttendanceStatus>(
    "ALL"
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  async function loadData(showRefresh = false) {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);

      setError("");
      const data = await getMyAttendance();

      setRecords(
        [...data].sort((a, b) =>
          b.attendanceDate.localeCompare(a.attendanceDate)
        )
      );
    } catch (err) {
      console.error("Student attendance load error:", err);
      setError(
        err instanceof Error ? err.message : "Unable to load attendance."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const courses = useMemo(() => {
    const map = new Map<number, string>();
    records.forEach((record) => map.set(record.courseId, record.courseName));
    return Array.from(map.entries()).sort((a, b) =>
      a[1].localeCompare(b[1])
    );
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesCourse =
        courseFilter === "ALL" || String(record.courseId) === courseFilter;
      const matchesStatus =
        statusFilter === "ALL" || record.status === statusFilter;
      const matchesFrom = !fromDate || record.attendanceDate >= fromDate;
      const matchesTo = !toDate || record.attendanceDate <= toDate;
      const matchesSearch =
        !query ||
        record.courseName.toLowerCase().includes(query) ||
        (record.courseCode ?? "").toLowerCase().includes(query) ||
        (record.employeeName ?? "").toLowerCase().includes(query) ||
        (record.remarks ?? "").toLowerCase().includes(query);

      return (
        matchesCourse &&
        matchesStatus &&
        matchesFrom &&
        matchesTo &&
        matchesSearch
      );
    });
  }, [records, courseFilter, statusFilter, fromDate, toDate, search]);

  const totalCount = filteredRecords.length;
  const presentCount = filteredRecords.filter(
    (record) => record.status === "PRESENT"
  ).length;
  const absentCount = filteredRecords.filter(
    (record) => record.status === "ABSENT"
  ).length;
  const attendancePercentage =
    totalCount === 0 ? 0 : Math.round((presentCount / totalCount) * 100);

  const latestRecord = filteredRecords[0] ?? null;

  function clearFilters() {
    setCourseFilter("ALL");
    setStatusFilter("ALL");
    setFromDate("");
    setToDate("");
    setSearch("");
  }

  const hasFilters =
    courseFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    Boolean(fromDate) ||
    Boolean(toDate) ||
    Boolean(search);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
        <div className="h-[500px] animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">Student Portal</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            Attendance
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track your attendance records and course-wise attendance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadData(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={<CalendarDays className="h-5 w-5" />} label="Total Days" value={totalCount} />
        <SummaryCard icon={<CheckCircle2 className="h-5 w-5" />} label="Present" value={presentCount} />
        <SummaryCard icon={<XCircle className="h-5 w-5" />} label="Absent" value={absentCount} />
        <SummaryCard icon={<Clock3 className="h-5 w-5" />} label="Attendance" value={`${attendancePercentage}%`} />
      </div>

      {latestRecord && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Latest Attendance
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {formatDate(latestRecord.attendanceDate)}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {latestRecord.courseName}
              </p>
            </div>
            <StatusBadge status={latestRecord.status} />
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search course, mentor or remarks..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-indigo-300"
            >
              <option value="ALL">All Courses</option>
              {courses.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "ALL" | AttendanceStatus)
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-indigo-300"
            >
              <option value="ALL">All Status</option>
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
            </select>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">From</label>
              <input
                type="date"
                value={fromDate}
                max={toDate || getTodayInputValue()}
                onChange={(event) => setFromDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-300"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">To</label>
              <input
                type="date"
                value={toDate}
                max={getTodayInputValue()}
                min={fromDate || undefined}
                onChange={(event) => setToDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-300"
              />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="self-end rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <CalendarDays className="h-6 w-6 text-slate-400" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-950">
            No attendance records
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            {records.length === 0
              ? "Your attendance records will appear here once attendance is marked."
              : "No records match the selected filters."}
          </p>
          {hasFilters && records.length > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-950">
                  Attendance History
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {filteredRecords.length} record{filteredRecords.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white">
                {attendancePercentage}% Present
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Date</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Course</th>
                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Mentor</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">{formatDate(record.attendanceDate)}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-800">{record.courseName}</p>
                      {record.courseCode && <p className="mt-1 text-xs text-slate-400">{record.courseCode}</p>}
                    </td>
                    <td className="px-5 py-4 text-center"><StatusBadge status={record.status} /></td>
                    <td className="px-5 py-4 text-sm text-slate-700">{record.employeeName || "Not assigned"}</td>
                    <td className="max-w-[260px] px-5 py-4 text-sm text-slate-500">{record.remarks || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 lg:hidden">
            {filteredRecords.map((record) => (
              <div key={record.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{formatDate(record.attendanceDate)}</p>
                    <p className="mt-1 text-sm text-slate-600">{record.courseName}</p>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoItem label="Mentor" value={record.employeeName || "Not assigned"} />
                  <InfoItem label="Course Code" value={record.courseCode || "—"} />
                </div>
                {record.remarks && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-medium text-slate-400">Remarks</p>
                    <p className="mt-1 text-sm text-slate-700">{record.remarks}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>
      <p className="mt-5 text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
  return status === "PRESENT" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Present
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
      <XCircle className="h-3.5 w-3.5" />
      Absent
    </span>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}
