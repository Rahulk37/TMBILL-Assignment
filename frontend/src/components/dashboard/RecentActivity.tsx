import {
  CheckCircle,
  Package,
  Archive,
} from "lucide-react";

const activities = [
  {
    text: "Order #1001 created",
    icon: Package,
  },
  {
    text: "Order #1002 completed",
    icon: CheckCircle,
  },
  {
    text: "18 orders archived",
    icon: Archive,
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="mt-5 space-y-5">
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                <Icon size={18} />
              </div>

              <p className="text-slate-700">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}