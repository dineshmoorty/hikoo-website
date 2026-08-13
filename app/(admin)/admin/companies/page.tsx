"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type CompanyStatus = "Active" | "Pending" | "Inactive";

type Company = {
  id: number;
  name: string;
  companyId: string;
  admin: string;
  email: string;
  employees: number;
  students: number;
  status: CompanyStatus;
};

const companies: Company[] = [
  {
    id: 1,
    name: "HIKOO Technologies",
    companyId: "HIKOO001",
    admin: "Arun Kumar",
    email: "arun@hikoo.com",
    employees: 28,
    students: 64,
    status: "Active",
  },
  {
    id: 2,
    name: "Nova Digital Solutions",
    companyId: "NOVA002",
    admin: "Priya Sharma",
    email: "priya@novadigital.com",
    employees: 19,
    students: 48,
    status: "Active",
  },
  {
    id: 3,
    name: "Vertex Systems",
    companyId: "VERT003",
    admin: "Rahul Raj",
    email: "rahul@vertexsystems.com",
    employees: 14,
    students: 31,
    status: "Active",
  },
  {
    id: 4,
    name: "Pixelwave Labs",
    companyId: "PIXEL004",
    admin: "Karthik S",
    email: "karthik@pixelwave.com",
    employees: 11,
    students: 22,
    status: "Pending",
  },
  {
    id: 5,
    name: "Cloudnest Technologies",
    companyId: "CLOUD005",
    admin: "Meena Devi",
    email: "meena@cloudnest.com",
    employees: 9,
    students: 17,
    status: "Inactive",
  },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | CompanyStatus>("All");

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        company.name.toLowerCase().includes(searchValue) ||
        company.companyId.toLowerCase().includes(searchValue) ||
        company.admin.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" || company.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const activeCount = companies.filter(
    (company) => company.status === "Active"
  ).length;

  const pendingCount = companies.filter(
    (company) => company.status === "Pending"
  ).length;

  const totalEmployees = companies.reduce(
    (total, company) => total + company.employees,
    0
  );

  const totalStudents = companies.reduce(
    (total, company) => total + company.students,
    0
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-950">
      {/* Background Glows */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-violet-100/30 blur-3xl" />

      {/* Main Content */}

      <section className="relative px-6 py-8 lg:px-10 lg:py-10">
        <div className="relative mx-auto max-w-[1500px]">

          {/* Back */}

          <Link
            href="/admin/dashboard"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              transition-colors
              hover:text-gray-950
            "
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          {/* Heading */}

          <div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
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
                  text-xs
                  font-medium
                  text-gray-500
                  shadow-sm
                "
              >
                Company Management
              </span>

              <h1
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-tight
                  text-gray-950
                  sm:text-4xl
                "
              >
                Manage Companies
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Manage companies registered on the HIKOO platform
                and control their administration access.
              </p>
            </div>

            {/* Add Company */}

            <button
              type="button"
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gray-950
                px-5
                py-3
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
              <Plus size={17} />
              Add Company
            </button>
          </div>

          {/* Stats */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={Building2}
              title="Total Companies"
              value={companies.length.toString()}
            />

            <SummaryCard
              icon={CheckCircle2}
              title="Active Companies"
              value={activeCount.toString()}
            />

            <SummaryCard
              icon={Users}
              title="Total Employees"
              value={totalEmployees.toString()}
            />

            <SummaryCard
              icon={Users}
              title="Total Students"
              value={totalStudents.toString()}
            />
          </div>

          {/* Pending Notice */}

          {pendingCount > 0 && (
            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-amber-200
                bg-amber-50
                px-5
                py-4
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-amber-600
                  shadow-sm
                "
              >
                <XCircle size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-900">
                  {pendingCount} company awaiting activation
                </p>

                <p className="mt-0.5 text-xs text-amber-700">
                  Review the company before granting full platform
                  access.
                </p>
              </div>
            </div>
          )}

          {/* Companies Table Card */}

          <div
            className="
              mt-8
              rounded-3xl
              border
              border-black/[0.06]
              bg-white
              shadow-[0_10px_40px_rgba(0,0,0,0.035)]
            "
          >
            {/* Toolbar */}

            <div className="border-b border-black/[0.06] p-5 sm:p-6">
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                {/* Search */}

                <div className="relative w-full lg:max-w-md">
                  <Search
                    size={17}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search company, ID or admin..."
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-black/[0.07]
                      bg-gray-50/60
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

                {/* Status Filters */}

                <div className="flex flex-wrap items-center gap-2">
                  {(
                    ["All", "Active", "Pending", "Inactive"] as const
                  ).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStatus(item)}
                      className={`
                        rounded-full
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        transition-all
                        ${
                          status === item
                            ? "bg-gray-950 text-white"
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
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
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-black/[0.06]">
                    <TableHead>Company</TableHead>
                    <TableHead>Company ID</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </tr>
                </thead>

                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className="
                        border-b
                        border-black/[0.04]
                        transition-colors
                        last:border-0
                        hover:bg-gray-50/60
                      "
                    >
                      {/* Company */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              bg-gray-100
                              text-sm
                              font-bold
                              text-gray-700
                            "
                          >
                            {company.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {company.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {company.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Company ID */}

                      <td className="px-6 py-5">
                        <span
                          className="
                            rounded-lg
                            bg-gray-100
                            px-2.5
                            py-1.5
                            font-mono
                            text-xs
                            font-medium
                            text-gray-600
                          "
                        >
                          {company.companyId}
                        </span>
                      </td>

                      {/* Admin */}

                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-gray-700">
                          {company.admin}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          Company Admin
                        </p>
                      </td>

                      {/* Users */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {company.employees}
                            </p>

                            <p className="text-[11px] text-gray-400">
                              Employees
                            </p>
                          </div>

                          <div className="h-7 w-px bg-gray-200" />

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {company.students}
                            </p>

                            <p className="text-[11px] text-gray-400">
                              Students
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">
                        <StatusBadge status={company.status} />
                      </td>

                      {/* Action */}

                      <td className="px-6 py-5">
                        <button
                          type="button"
                          className="
                            rounded-xl
                            border
                            border-black/[0.06]
                            p-2
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-950
                          "
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Empty State */}

                  {filteredCompanies.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-16 text-center"
                      >
                        <div
                          className="
                            mx-auto
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gray-100
                          "
                        >
                          <Search
                            size={19}
                            className="text-gray-400"
                          />
                        </div>

                        <p className="mt-4 text-sm font-semibold">
                          No companies found
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Try changing your search or filter.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            <div
              className="
                flex
                flex-col
                justify-between
                gap-3
                border-t
                border-black/[0.06]
                px-6
                py-4
                sm:flex-row
                sm:items-center
              "
            >
              <p className="text-xs text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-600">
                  {filteredCompanies.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-600">
                  {companies.length}
                </span>{" "}
                companies
              </p>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  font-semibold
                  text-gray-600
                  transition
                  hover:text-gray-950
                "
              >
                Company management
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-black/[0.06]
        bg-white
        p-5
        shadow-[0_10px_40px_rgba(0,0,0,0.035)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-gray-950
            text-white
          "
        >
          <Icon size={17} />
        </div>

        <ArrowUpRight
          size={16}
          className="text-gray-300 transition group-hover:text-gray-950"
        />
      </div>

      <p className="mt-5 text-xs font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>
    </div>
  );
}

/* =====================================================
   TABLE HEAD
===================================================== */

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      className="
        px-6
        py-4
        text-left
        text-[11px]
        font-semibold
        uppercase
        tracking-wider
        text-gray-400
      "
    >
      {children}
    </th>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({
  status,
}: {
  status: CompanyStatus;
}) {
  if (status === "Active") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-green-50
          px-3
          py-1.5
          text-[11px]
          font-semibold
          text-green-700
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  }

  if (status === "Pending") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-amber-50
          px-3
          py-1.5
          text-[11px]
          font-semibold
          text-amber-700
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Pending
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        bg-gray-100
        px-3
        py-1.5
        text-[11px]
        font-semibold
        text-gray-500
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Inactive
    </span>
  );
}