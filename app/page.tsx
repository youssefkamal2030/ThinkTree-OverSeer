"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            ThinkTree Overseer
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Chess Academy Management System
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <DashboardCard
            title="Active Groups"
            value="0"
            description="Currently teaching"
          />
          <DashboardCard
            title="Upcoming Sessions"
            value="0"
            description="This week"
          />
          <DashboardCard
            title="Pending Payments"
            value="$0"
            description="Expected this month"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton label="Add Group" />
            <ActionButton label="Mark Session Complete" />
            <ActionButton label="View Payments" />
            <ActionButton label="Income Report" />
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-700">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {title}
      </h3>
      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
        {value}
      </p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="bg-zinc-900 dark:bg-zinc-700 text-white px-4 py-3 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-600 transition-colors text-sm font-medium">
      {label}
    </button>
  );
}
