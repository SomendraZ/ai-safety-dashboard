import React, { useMemo, useState } from "react";
import { Chart } from "react-google-charts";

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
}

interface GraphsProps {
  sortedIncidents: Incident[];
}

const Graphs: React.FC<GraphsProps> = ({ sortedIncidents }) => {
  const [lineChartRange, setLineChartRange] = useState<"7" | "30" | "all">("7");

  const pieData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0 };
    sortedIncidents.forEach((incident) => {
      counts[incident.severity as "Low" | "Medium" | "High"]++;
    });

    return [
      [
        { type: "string", label: "Severity" },
        { type: "number", label: "Count" },
        { type: "string", role: "tooltip" },
      ],
      ["Low", counts.Low, `Low Severity: ${counts.Low} incident(s).`],
      [
        "Medium",
        counts.Medium,
        `Medium Severity: ${counts.Medium} incident(s).`,
      ],
      ["High", counts.High, `High Severity: ${counts.High} incident(s).`],
    ];
  }, [sortedIncidents]);

  const lineChartData = useMemo(() => {
    const timeline: { [date: string]: number } = {};
    sortedIncidents.forEach((incident) => {
      const date = new Date(incident.reported_at).toLocaleDateString("en-CA");
      timeline[date] = (timeline[date] || 0) + 1;
    });

    const allData = Object.entries(timeline)
      .map(([date, count]) => {
        const formattedTooltip = `${count} incident(s) on ${new Date(
          date
        ).toDateString()}.`;
        return [date, count, formattedTooltip];
      })
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

    const data = [
      [
        { type: "string", label: "Date" },
        { type: "number", label: "Incidents" },
        { type: "string", role: "tooltip" },
      ],
      ...allData,
    ];

    if (lineChartRange === "all") return data;

    const days = parseInt(lineChartRange, 10);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return [
      data[0],
      ...data.slice(1).filter(([date]) => new Date(date as string) >= cutoff),
    ];
  }, [sortedIncidents, lineChartRange]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Line Chart */}
      <div className="flex flex-col items-center mb-6 bg-[#1e1e1e] p-6 rounded-2xl border border-[#333] w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <h2 className="text-xl font-semibold text-white">
            Incidents Over Time
          </h2>
          <select
            className="bg-[#2e2e2e] text-white px-3 py-1 rounded border border-[#444]"
            value={lineChartRange}
            onChange={(e) =>
              setLineChartRange(e.target.value as "7" | "30" | "all")
            }
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div className="w-full h-64 mb-5">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={lineChartData}
            options={{
              chartArea: { width: "80%" },
              hAxis: { title: "Date", textStyle: { color: "#fff" } },
              vAxis: { title: "Incidents", textStyle: { color: "#fff" } },
              backgroundColor: "#1e1e1e",
              colors: ["#8884d8"],
              tooltip: {
                isHtml: true,
                textStyle: { color: "#fff", fontSize: 14 },
                backgroundColor: "#333",
              },
              legend: "none",
            }}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex flex-col items-center w-full bg-[#1e1e1e] p-6 rounded-2xl border border-[#333]">
        <h2 className="text-xl font-semibold mt-5 mb-4 text-white">
          Severity Distribution
        </h2>
        <div className="w-full h-50">
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={pieData}
            options={{
              is3D: true,
              slices: {
                0: { color: "#26b79f" }, // Low
                1: { color: "#e6dc49" }, // Medium
                2: { color: "#e06666" }, // High
              },
              backgroundColor: "#1e1e1e",
              chartArea: {
                left: 50,
                top: 0,
                width: "100%",
                height: "100%",
              },
              tooltip: {
                isHtml: true,
                textStyle: { color: "#fff", fontSize: 14 },
                backgroundColor: "#333",
              },
              legend: {
                textStyle: { color: "#fff" },
              },
              pieSliceTextStyle: {
                color: "black",
              },
            }}
          />
        </div>
        <h2 className="text-xl font-semibold mt-5 mb-4 text-white">
          Total Incidents: {sortedIncidents.length}
        </h2>
      </div>
    </div>
  );
};

export default Graphs;
