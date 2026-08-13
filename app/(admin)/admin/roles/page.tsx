"use client";

import { useState } from "react";

type Role = {
  name: string;
  code: string;
  description: string;
  access: string[];
  users: number;
  status: "System" | "Custom";
};

const roles: Role[] = [
  {
    name: "Super Admin",
    code: "SUPER_ADMIN",
    description:
      "Full platform access. Can manage companies, administrators, employees, students, and system settings.",
    access: [
      "All Companies",
      "All Administrators",
      "All Employees",
      "All Students",
      "System Settings",
    ],
    users: 1,
    status: "System",
  },
  {
    name: "Admin",
    code: "ADMIN",
    description:
      "Company-level administrator with access limited to their assigned company.",
    access: [
      "Company Dashboard",
      "Employees",
      "Students",
      "Internships",
      "Applications",
    ],
    users: 0,
    status: "System",
  },
  {
    name: "Employee",
    code: "EMPLOYEE",
    description:
      "Company employee with access to assigned company operations and student activities.",
    access: [
      "Company Dashboard",
      "Students",
      "Internships",
      "Applications",
    ],
    users: 0,
    status: "System",
  },
  {
    name: "Student",
    code: "STUDENT",
    description:
      "Student account with access to internships, applications, profile, and personal information.",
    access: [
      "Student Dashboard",
      "Internships",
      "Applications",
      "Profile",
    ],
    users: 0,
    status: "System",
  },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <main className="min-h-screen bg-gray-50/60 px-5 py-8 sm:px-8 lg:px-10">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
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
              font-semibold
              uppercase
              tracking-wider
              text-gray-500
              shadow-sm
            "
          >
            Access Control
          </span>

          <h1
            className="
              mt-4
              text-3xl
              font-bold
              tracking-tight
              text-gray-950
              sm:text-4xl
            "
          >
            Roles
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Manage system roles and understand the permissions available
            to each type of user.
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-black/[0.06]
            bg-white
            px-5
            py-3
            shadow-sm
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-gray-950
              text-sm
              font-bold
              text-white
            "
          >
            {roles.length}
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Total Roles
            </p>

            <p className="text-sm font-semibold text-gray-950">
              System Roles
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          ROLE GRID
      ====================================================== */}

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role.code}
            className="
              group
              rounded-[1.75rem]
              border
              border-black/[0.06]
              bg-white
              p-6
              shadow-[0_10px_35px_rgba(0,0,0,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]
              sm:p-7
            "
          >
            {/* Top */}

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gray-950
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-gray-950/10
                  "
                >
                  {role.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-950">
                    {role.name}
                  </h2>

                  <p className="mt-0.5 text-xs font-medium tracking-wide text-gray-400">
                    {role.code}
                  </p>
                </div>
              </div>

              <span
                className="
                  rounded-full
                  border
                  border-black/[0.06]
                  bg-gray-50
                  px-3
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-gray-500
                "
              >
                {role.status}
              </span>
            </div>

            {/* Description */}

            <p className="mt-5 text-sm leading-6 text-gray-600">
              {role.description}
            </p>

            {/* Permissions */}

            <div className="mt-6">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Access
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {role.access.map((permission) => (
                  <span
                    key={permission}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-black/[0.05]
                      bg-gray-50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-gray-600
                    "
                  >
                    <span className="text-gray-950">
                      ✓
                    </span>

                    {permission}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}

            <div className="mt-7 flex items-center justify-between border-t border-black/[0.06] pt-5">
              <div>
                <p className="text-xs text-gray-400">
                  Assigned Users
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-950">
                  {role.users}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRole(role)}
                className="
                  rounded-xl
                  border
                  border-black/[0.06]
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-gray-700
                  transition-all
                  duration-200
                  hover:bg-gray-950
                  hover:text-white
                "
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          INFO CARD
      ====================================================== */}

      <div
        className="
          mt-6
          rounded-[1.75rem]
          border
          border-blue-100
          bg-gradient-to-br
          from-blue-50
          via-white
          to-violet-50
          p-6
          sm:p-7
        "
      >
        <div className="flex gap-4">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gray-950
              text-sm
              font-bold
              text-white
            "
          >
            i
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-950">
              Role-based access control
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Users can only access resources allowed by their role.
              Company-level users are additionally restricted using
              their company ID.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          DETAILS MODAL
      ====================================================== */}

      {selectedRole && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/30
            p-5
            backdrop-blur-sm
          "
          onClick={() => setSelectedRole(null)}
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-[2rem]
              border
              border-black/[0.06]
              bg-white
              p-7
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Role Details
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-950">
                  {selectedRole.name}
                </h2>

                <p className="mt-1 text-xs font-medium text-gray-400">
                  {selectedRole.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-black/[0.06]
                  text-lg
                  text-gray-500
                  transition
                  hover:bg-gray-50
                  hover:text-gray-950
                "
              >
                ×
              </button>
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-600">
              {selectedRole.description}
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Permissions
              </p>

              <div className="mt-3 space-y-2">
                {selectedRole.access.map((permission) => (
                  <div
                    key={permission}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      bg-gray-50
                      px-4
                      py-3
                    "
                  >
                    <span
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-950
                        text-[10px]
                        text-white
                      "
                    >
                      ✓
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      {permission}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              className="
                mt-7
                w-full
                rounded-xl
                bg-gray-950
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-black
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}