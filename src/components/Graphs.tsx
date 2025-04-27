import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

// Types
interface GraphsProps {
  pieData: { name: string; value: number }[];
  lineChartData: { date: string; count: number }[];
  lineChartRange: "7" | "30" | "all";
}

const Graphs: React.FC<GraphsProps> = ({
  pieData,
  lineChartData,
  lineChartRange,
}) => {
  const COLORS = ["#2ed6b4", "#fff051", "#ff7a7a"];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Line Chart */}
      <div className="flex flex-col items-center mb-6 bg-[#F1EFEC] p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mt-5 mb-4">Incidents Over Time</h2>
        <div className="mb-4">
          <select
            value={lineChartRange}
            onChange={(_e) => {}}
            className="border-gray-300 border p-2 rounded-2xl"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div className="w-full h-64 mr-12.5 mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex flex-col items-center w-full bg-[#F1EFEC] p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mt-5 mb-4">
          Severity Distribution
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <h2 className="text-lg font-semibold mt-4 mb-2">
            Total Incidents: {pieData.reduce((acc, cur) => acc + cur.value, 0)} 
        </h2>
      </div>
    </div>
  );
};

export default Graphs;
