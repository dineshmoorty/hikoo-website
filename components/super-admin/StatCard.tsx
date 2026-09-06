interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
            {value}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}