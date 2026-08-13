"use client";

import { useMemo, useState } from "react";

type EmployeeStatus = "Active" | "Pending" | "Inactive";

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  companyId: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
  joined: string;
};

const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Vikram Raj",
    email: "vikram@hikoo.com",
    phone: "+91 98765 11111",
    company: "HIKOO Technologies",
    companyId: "CMP-001",
    department: "Development",
    designation: "Senior Developer",
    status: "Active",
    joined: "10 Aug 2026",
  },
  {
    id: "EMP-002",
    name: "Sneha Kumar",
    email: "sneha@hikoo.com",
    phone: "+91 98765 22222",
    company: "HIKOO Technologies",
    companyId: "CMP-001",
    department: "HR",
    designation: "HR Executive",
    status: "Active",
    joined: "08 Aug 2026",
  },
  {
    id: "EMP-003",
    name: "Ajay Kumar",
    email: "ajay@novadigital.com",
    phone: "+91 98765 33333",
    company: "Nova Digital Solutions",
    companyId: "CMP-002",
    department: "Development",
    designation: "Frontend Developer",
    status: "Active",
    joined: "05 Aug 2026",
  },
  {
    id: "EMP-004",
    name: "Divya S",
    email: "divya@novadigital.com",
    phone: "+91 98765 44444",
    company: "Nova Digital Solutions",
    companyId: "CMP-002",
    department: "Design",
    designation: "UI/UX Designer",
    status: "Pending",
    joined: "04 Aug 2026",
  },
  {
    id: "EMP-005",
    name: "Manoj Kumar",
    email: "manoj@pixelwave.com",
    phone: "+91 98765 55555",
    company: "Pixelwave Labs",
    companyId: "CMP-003",
    department: "Testing",
    designation: "QA Engineer",
    status: "Inactive",
    joined: "01 Aug 2026",
  },
  {
    id: "EMP-006",
    name: "Harini M",
    email: "harini@techbridge.com",
    phone: "+91 98765 66666",
    company: "TechBridge Systems",
    companyId: "CMP-004",
    department: "Marketing",
    designation: "Marketing Executive",
    status: "Active",
    joined: "30 Jul 2026",
  },
];

const filters = ["All", "Active", "Pending", "Inactive"] as const;

type Filter = (typeof filters)[number];

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filteredEmployees = useMemo(() => {
    const query = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const matchesFilter =
        filter === "All" || employee.status === filter;

      const matchesSearch =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.company.toLowerCase().includes(query) ||
        employee.companyId.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.designation.toLowerCase().includes(query) ||
        employee.id.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;

  const pendingEmployees = employees.filter(
    (employee) => employee.status === "Pending",
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive",
  ).length;

  return (
    <main className="min-h-screen bg-gray-50/60">
      {/* Background glow */}

      <div className="pointer-events-none fixed right-0 top-20 -z-0 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 left-0 -z-0 h-80 w-80 rounded-full bg-violet-100/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-6 py-10 lg:px-10">
        {/* Back */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-600
            transition-colors
            hover:text-gray-950
          "
        >
          <span className="text-lg">←</span>
          Back to Dashboard
        </button>

        {/* Heading */}

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span
              className="
                inline-flex
                rounded-full
                border
                border-black/[0.06]
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-600
                shadow-sm
              "
            >
              Employee Management
            </span>

            <h1
              className="
                mt-5
                text-4xl
                font-bold
                tracking-tight
                text-gray-950
                sm:text-5xl
              "
            >
              Manage Employees
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Manage employees across all registered companies,
              including departments, designations, and account
              access.
            </p>
          </div>

          {/* Add Employee */}

          <button
            type="button"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gray-950
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-gray-950/10
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-black
              hover:shadow-xl
            "
          >
            <span className="text-lg leading-none">+</span>
            Add Employee
          </button>
        </div>

        {/* Stats */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<UsersIcon />}
            label="Total Employees"
            value={totalEmployees}
            description="All employees"
          />

          <StatCard
            icon={<CheckIcon />}
            label="Active Employees"
            value={activeEmployees}
            description="Currently active"
          />

          <StatCard
            icon={<ClockIcon />}
            label="Pending Employees"
            value={pendingEmployees}
            description="Awaiting activation"
          />

          <StatCard
            icon={<LockIcon />}
            label="Inactive Employees"
            value={inactiveEmployees}
            description="Access disabled"
          />
        </div>

        {/* Pending notification */}

        {pendingEmployees > 0 && (
          <div
            className="
              mt-6
              flex
              items-center
              gap-4
              rounded-3xl
              border
              border-amber-200
              bg-amber-50/70
              px-6
              py-5
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-amber-600
                shadow-sm
              "
            >
              <ClockIcon />
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-900">
                {pendingEmployees} employee
                {pendingEmployees !== 1 ? "s" : ""} awaiting
                activation
              </p>

              <p className="mt-1 text-sm text-amber-700">
                Review pending employee accounts before
                granting access.
              </p>
            </div>
          </div>
        )}

        {/* Employee table */}

        <section
          className="
            mt-8
            overflow-hidden
            rounded-[2rem]
            border
            border-black/[0.06]
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
          "
        >
          {/* Toolbar */}

          <div className="border-b border-black/[0.06] p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}

              <div className="relative w-full xl:max-w-xl">
                <span
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                >
                  <SearchIcon />
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search employee, company, department..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/[0.07]
                    bg-gray-50/70
                    py-3.5
                    pl-11
                    pr-4
                    text-sm
                    text-gray-950
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-950
                    focus:bg-white
                    focus:ring-4
                    focus:ring-gray-950/5
                  "
                />
              </div>

              {/* Filters */}

              <div className="flex flex-wrap items-center gap-2">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`
                      rounded-full
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      transition-all
                      ${
                        filter === item
                          ? "bg-gray-950 text-white shadow-md"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-950"
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px]">
              <thead>
                <tr className="border-b border-black/[0.06] bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Employee
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Designation
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="
                      border-b
                      border-black/[0.05]
                      transition-colors
                      last:border-0
                      hover:bg-gray-50/60
                    "
                  >
                    {/* Employee */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Avatar name={employee.name} />

                        <div>
                          <p className="font-semibold text-gray-950">
                            {employee.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {employee.email}
                          </p>

                          <p className="mt-1 text-[11px] font-medium text-gray-400">
                            {employee.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}

                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-900">
                        {employee.company}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {employee.companyId}
                      </p>
                    </td>

                    {/* Department */}

                    <td className="px-6 py-5">
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-blue-50
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-blue-700
                        "
                      >
                        {employee.department}
                      </span>
                    </td>

                    {/* Designation */}

                    <td className="px-6 py-5 text-sm text-gray-700">
                      {employee.designation}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">
                      <StatusBadge status={employee.status} />
                    </td>

                    {/* Joined */}

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {employee.joined}
                    </td>

                    {/* Action */}

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        className="
                          rounded-xl
                          border
                          border-black/[0.07]
                          bg-white
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-gray-700
                          shadow-sm
                          transition-all
                          hover:border-gray-950
                          hover:text-gray-950
                        "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty state */}

            {filteredEmployees.length === 0 && (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  <SearchIcon />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-950">
                  No employees found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-t
              border-black/[0.06]
              bg-gray-50/40
              px-6
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredEmployees.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {employees.length}
              </span>{" "}
              employees
            </p>

            <p className="text-xs text-gray-400">
              Employee access is managed by company admins
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-black/[0.06]
        bg-white
        p-6
        shadow-[0_8px_30px_rgba(0,0,0,0.03)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gray-950
            text-white
          "
        >
          {icon}
        </div>

        <span className="text-gray-300">↗</span>
      </div>

      <p className="mt-7 text-sm font-medium text-gray-500">
        {label}
      </p>

      <div className="mt-1 flex items-end justify-between gap-3">
        <p className="text-4xl font-bold tracking-tight text-gray-950">
          {value}
        </p>

        <p className="pb-1 text-xs text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   AVATAR
===================================================== */

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-gray-100
        text-sm
        font-bold
        text-gray-700
      "
    >
      {initials}
    </div>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({
  status,
}: {
  status: EmployeeStatus;
}) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Inactive: "bg-gray-100 text-gray-500",
  };

  const dots = {
    Active: "bg-emerald-500",
    Pending: "bg-amber-500",
    Inactive: "bg-gray-400",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {status}
    </span>
  );
}

/* =====================================================
   ICONS
===================================================== */

function UsersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}