interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: "blue" | "red" | "green" | "purple";
}

const colorClasses = {
  blue: "from-blue-500 to-cyan-500",
  red: "from-red-500 to-rose-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-pink-500",
};

export function StatsCard({ title, value, subtitle, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${colorClasses[color]}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">{icon}</span>
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
