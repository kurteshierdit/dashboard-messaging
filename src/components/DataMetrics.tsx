"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const chartData = [
  { name: "Sent", value: 12, color: "#3b82f6" },
  { name: "Delivered", value: 9, color: "#10b981" },
  { name: "Failed", value: 3, color: "#ef4444" },
];

export default function DataMetrics() {
  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-semibold mb-4 text-black">Message Stats</h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
