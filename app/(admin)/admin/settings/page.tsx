"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Profile");

  const sections = [
    {
      name: "Profile",
      description: "Manage your administrator profile",
      icon: <UserIcon />,
    },
    {
      name: "Platform",
      description: "Configure HIKOO platform settings",
      icon: <GlobeIcon />,
    },
    {
      name: "Security",
      description: "Manage password and account security",
      icon: <ShieldIcon />,
    },
    {
      name: "Notifications",
      description: "Control system notifications",
      icon: <BellIcon />,
    },
    {
      name: "System",
      description: "View application information",
      icon: <ServerIcon />,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50/60">
      {/* Background Glow */}

      <div className="pointer-events-none fixed right-0 top-20 -z-0 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 left-0 -z-0 h-80 w-80 rounded-full bg-violet-100/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-10 lg:px-10">
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

        <div className="mt-8">
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
            Administration
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
            Settings
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            Manage your Super Admin account and configure the
            HIKOO platform.
          </p>
        </div>

        {/* Settings Layout */}

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Settings Navigation */}

          <aside
            className="
              h-fit
              rounded-[2rem]
              border
              border-black/[0.06]
              bg-white
              p-3
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            "
          >
            <p className="px-4 pb-3 pt-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Settings
            </p>

            <div className="space-y-1">
              {sections.map((section) => {
                const isActive = activeSection === section.name;

                return (
                  <button
                    key={section.name}
                    type="button"
                    onClick={() => setActiveSection(section.name)}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-2xl
                      px-4
                      py-3.5
                      text-left
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-gray-950 text-white shadow-lg shadow-gray-950/10"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {section.icon}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {section.name}
                      </span>

                      <span
                        className={`
                          mt-0.5 block truncate text-xs
                          ${
                            isActive
                              ? "text-white/60"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {section.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Settings Content */}

          <section
            className="
              min-w-0
              rounded-[2rem]
              border
              border-black/[0.06]
              bg-white
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            "
          >
            {activeSection === "Profile" && <ProfileSettings />}

            {activeSection === "Platform" && <PlatformSettings />}

            {activeSection === "Security" && <SecuritySettings />}

            {activeSection === "Notifications" && (
              <NotificationSettings />
            )}

            {activeSection === "System" && <SystemSettings />}
          </section>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   PROFILE SETTINGS
===================================================== */

function ProfileSettings() {
  return (
    <SettingsSection
      title="Profile"
      description="Manage your Super Admin account information."
    >
      {/* Profile Header */}

      <div className="flex flex-col gap-5 rounded-3xl border border-black/[0.06] bg-gray-50/60 p-5 sm:flex-row sm:items-center">
        <div
          className="
            flex
            h-20
            w-20
            shrink-0
            items-center
            justify-center
            rounded-3xl
            bg-gray-950
            text-2xl
            font-bold
            text-white
            shadow-lg
          "
        >
          SA
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-950">
            Super Admin
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            superadmin@hikoo.com
          </p>

          <span
            className="
              mt-3
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-3
              py-1.5
              text-xs
              font-semibold
              text-emerald-700
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Super Administrator
          </span>
        </div>

        <button
          type="button"
          className="
            rounded-xl
            border
            border-black/[0.07]
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            transition
            hover:border-gray-950
            hover:text-gray-950
          "
        >
          Change Photo
        </button>
      </div>

      {/* Form */}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <InputField
          label="Full Name"
          value="Super Admin"
        />

        <InputField
          label="Email Address"
          value="superadmin@hikoo.com"
          type="email"
        />

        <InputField
          label="Phone Number"
          value="+91 98765 00000"
        />

        <InputField
          label="Role"
          value="Super Administrator"
          disabled
        />
      </div>

      <SaveButton />
    </SettingsSection>
  );
}

/* =====================================================
   PLATFORM SETTINGS
===================================================== */

function PlatformSettings() {
  return (
    <SettingsSection
      title="Platform Settings"
      description="Configure global settings for the HIKOO platform."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          label="Platform Name"
          value="HIKOO"
        />

        <InputField
          label="Support Email"
          value="support@hikoo.com"
          type="email"
        />

        <InputField
          label="Support Phone"
          value="+91 98765 00000"
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Timezone
          </label>

          <select
            defaultValue="Asia/Kolkata"
            className="
              w-full
              rounded-xl
              border
              border-black/[0.08]
              bg-gray-50/50
              px-4
              py-3.5
              text-sm
              text-gray-950
              outline-none
              transition
              focus:border-gray-950
              focus:bg-white
              focus:ring-4
              focus:ring-gray-950/5
            "
          >
            <option value="Asia/Kolkata">
              India Standard Time (IST)
            </option>

            <option value="UTC">UTC</option>

            <option value="Asia/Dubai">
              Gulf Standard Time
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Default Language
          </label>

          <select
            defaultValue="English"
            className="
              w-full
              rounded-xl
              border
              border-black/[0.08]
              bg-gray-50/50
              px-4
              py-3.5
              text-sm
              text-gray-950
              outline-none
              transition
              focus:border-gray-950
              focus:bg-white
              focus:ring-4
              focus:ring-gray-950/5
            "
          >
            <option>English</option>
            <option>Tamil</option>
          </select>
        </div>
      </div>

      <SaveButton />
    </SettingsSection>
  );
}

/* =====================================================
   SECURITY SETTINGS
===================================================== */

function SecuritySettings() {
  return (
    <SettingsSection
      title="Security"
      description="Manage your account security and authentication settings."
    >
      <div className="space-y-4">
        <SecurityCard
          icon={<KeyIcon />}
          title="Change Password"
          description="Update your Super Admin account password."
          action="Change Password"
        />

        <SecurityCard
          icon={<ShieldIcon />}
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account."
          action="Enable"
        />

        <SecurityCard
          icon={<MonitorIcon />}
          title="Active Sessions"
          description="Review devices currently signed in to your account."
          action="View Sessions"
        />

        <SecurityCard
          icon={<ActivityIcon />}
          title="Account Activity"
          description="Review recent login and security activity."
          action="View Activity"
        />
      </div>
    </SettingsSection>
  );
}

/* =====================================================
   NOTIFICATION SETTINGS
===================================================== */

function NotificationSettings() {
  return (
    <SettingsSection
      title="Notifications"
      description="Choose which platform events should notify you."
    >
      <div className="space-y-1">
        <NotificationRow
          title="New Company Registration"
          description="Notify when a new company is registered."
          defaultChecked
        />

        <NotificationRow
          title="New Admin Account"
          description="Notify when a new company admin is created."
          defaultChecked
        />

        <NotificationRow
          title="New Employee"
          description="Notify when an employee is added."
          defaultChecked
        />

        <NotificationRow
          title="New Student Application"
          description="Notify when a student joins the platform."
          defaultChecked
        />

        <NotificationRow
          title="Security Alerts"
          description="Receive notifications about important security events."
          defaultChecked
        />

        <NotificationRow
          title="System Updates"
          description="Receive important platform and maintenance updates."
        />
      </div>
    </SettingsSection>
  );
}

/* =====================================================
   SYSTEM SETTINGS
===================================================== */

function SystemSettings() {
  return (
    <SettingsSection
      title="System"
      description="View information about the HIKOO platform."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <SystemCard
          label="Application"
          value="HIKOO Admin"
        />

        <SystemCard
          label="Version"
          value="1.0.0"
        />

        <SystemCard
          label="Environment"
          value="Production"
          status="success"
        />

        <SystemCard
          label="Database"
          value="Connected"
          status="success"
        />

        <SystemCard
          label="Platform"
          value="Next.js"
        />

        <SystemCard
          label="Last Updated"
          value="13 Aug 2026"
        />
      </div>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50/60 p-6">
        <div className="flex items-start gap-4">
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
              text-blue-600
              shadow-sm
            "
          >
            <InfoIcon />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-950">
              System Information
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-800/70">
              This area will display live system and database
              information once the backend is connected.
            </p>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

/* =====================================================
   SETTINGS SECTION
===================================================== */

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-b border-black/[0.06] px-6 py-6 sm:px-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-950">
          {title}
        </h2>

        <p className="mt-1.5 text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>

      <div className="px-6 py-7 sm:px-8 sm:py-8">
        {children}
      </div>
    </div>
  );
}

/* =====================================================
   INPUT
===================================================== */

function InputField({
  label,
  value,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        className={`
          w-full
          rounded-xl
          border
          border-black/[0.08]
          px-4
          py-3.5
          text-sm
          outline-none
          transition
          ${
            disabled
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-gray-50/50 text-gray-950 focus:border-gray-950 focus:bg-white focus:ring-4 focus:ring-gray-950/5"
          }
        `}
      />
    </div>
  );
}

/* =====================================================
   SAVE BUTTON
===================================================== */

function SaveButton() {
  return (
    <div className="mt-8 flex justify-end border-t border-black/[0.06] pt-6">
      <button
        type="button"
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
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
        Save Changes
        <span>→</span>
      </button>
    </div>
  );
}

/* =====================================================
   SECURITY CARD
===================================================== */

function SecurityCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-3xl
        border
        border-black/[0.06]
        bg-gray-50/50
        p-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="flex items-center gap-4">
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
            text-gray-600
            shadow-sm
          "
        >
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-950">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="
          shrink-0
          rounded-xl
          border
          border-black/[0.07]
          bg-white
          px-4
          py-2.5
          text-sm
          font-medium
          text-gray-700
          shadow-sm
          transition
          hover:border-gray-950
          hover:text-gray-950
        "
      >
        {action}
      </button>
    </div>
  );
}

/* =====================================================
   NOTIFICATION ROW
===================================================== */

function NotificationRow({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        border-b
        border-black/[0.05]
        py-5
        last:border-0
      "
    >
      <div>
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        aria-label={`Toggle ${title}`}
        className={`
          relative
          h-7
          w-12
          shrink-0
          rounded-full
          transition-colors
          duration-200
          ${
            enabled
              ? "bg-gray-950"
              : "bg-gray-200"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            duration-200
            ${
              enabled
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </button>
    </div>
  );
}

/* =====================================================
   SYSTEM CARD
===================================================== */

function SystemCard({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: "success";
}) {
  return (
    <div className="rounded-3xl border border-black/[0.06] bg-gray-50/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <div className="mt-3 flex items-center gap-2">
        {status === "success" && (
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        )}

        <p className="text-sm font-semibold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   ICONS
===================================================== */

function UserIcon() {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function GlobeIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function ShieldIcon() {
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
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function BellIcon() {
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
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function ServerIcon() {
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
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

function KeyIcon() {
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
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9" />
      <path d="m17 6 2 2" />
      <path d="m14 9 2 2" />
    </svg>
  );
}

function MonitorIcon() {
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
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
    </svg>
  );
}

function ActivityIcon() {
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
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </svg>
  );
}

function InfoIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}