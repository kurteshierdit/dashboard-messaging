"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  refreshData: number;
};

const colors = {
  Total: "#f59e0b",
  Sent: "#3b82f6",
  Delivered: "#10b981",
  Failed: "#ef4444",
};

export default function DataMetrics({ refreshData }: Props) {
  const [chartData, setChartData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const stats = await res.json();

        const formattedData = Object.entries(stats)
          .map(([name, value]) => ({
            name,
            value: Number(value),
            color: colors[name as keyof typeof colors],
          }))
          .filter((entry) => entry.value > 0);
        console.log(chartData);

        setChartData(formattedData);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [refreshData]);

  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-semibold mb-4 text-black">Message Stats</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading stats...</p>
      ) : chartData.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No stats available yet.</p>
      ) : (
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
      )}
    </div>
  );
}
