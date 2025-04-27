import React, { useState, useEffect } from "react";
import incidentsData from "../assets/incidents.json";
import TopControls from "./TopControls";
import IncidentsList from "./IncidentsList";
import Graphs from "./Graphs";
import ReportIncidentModal from "./ReportIncidentModal"; // Import the modal

// Type for incident
interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
}

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownSortVisible, setDropdownSortVisible] = useState(false);
  const [expandedIncidentId, setExpandedIncidentId] = useState<number | null>(
    null
  );
  const [lineChartRange, _setLineChartRange] = useState<"7" | "30" | "all">(
    "7"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const mockData: Incident[] = incidentsData;

  useEffect(() => {
    setIncidents(mockData);
  }, []);

  const handleFilterSelect = (value: string) => {
    setFilter(value);
    setDropdownVisible(false);
    setCurrentPage(1);
  };

  const handleSortSelect = (value: string) => {
    setSortOrder(value);
    setDropdownSortVisible(false);
    setCurrentPage(1);
  };

  const handleReportIncident = () => {
    setIsModalOpen(true); // Open modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleReportIncidentSubmit = (
    title: string,
    description: string,
    severity: string
  ) => {
    const newIncident = {
      id: Date.now(),
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };
    setIncidents((prevIncidents) => [newIncident, ...prevIncidents]);
  };

  const filteredIncidents = incidents.filter(
    (incident) => filter === "All" || incident.severity === filter
  );

  const sortedIncidents = filteredIncidents.sort((a, b) => {
    const dateA = new Date(a.reported_at);
    const dateB = new Date(b.reported_at);
    return sortOrder === "newest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  // Pie chart data preparation
  const severityCounts = incidents.reduce(
    (acc, incident) => {
      if (incident.severity === "Low") acc.low++;
      if (incident.severity === "Medium") acc.medium++;
      if (incident.severity === "High") acc.high++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );

  const pieData = [
    { name: "Low", value: severityCounts.low },
    { name: "Medium", value: severityCounts.medium },
    { name: "High", value: severityCounts.high },
  ];

  // Line chart data (all incidents)
  const timelineData = incidents.reduce(
    (acc: { [key: string]: number }, incident) => {
      const date = new Date(incident.reported_at).toLocaleDateString("en-CA"); // yyyy-mm-dd
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const fullTimelineChartData = Object.entries(timelineData)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Filter timeline data based on range
  const getFilteredTimelineData = () => {
    if (lineChartRange === "all") return fullTimelineChartData;

    const days = parseInt(lineChartRange, 10);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return fullTimelineChartData.filter(
      (entry) => new Date(entry.date) >= cutoffDate
    );
  };

  const filteredTimelineChartData = getFilteredTimelineData();

  const indexOfLastIncident = currentPage * itemsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - itemsPerPage;
  const currentIncidents = sortedIncidents.slice(
    indexOfFirstIncident,
    indexOfLastIncident
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedIncidents.length / itemsPerPage);

  return (
    <div className="bg-gray-100 dark:bg-[#94B4C1] min-h-screen p-6">
      {/* Top Controls */}
      <TopControls
        filter={filter}
        sortOrder={sortOrder}
        dropdownVisible={dropdownVisible}
        dropdownSortVisible={dropdownSortVisible}
        toggleDropdown={() => setDropdownVisible(!dropdownVisible)}
        toggleSortDropdown={() => setDropdownSortVisible(!dropdownSortVisible)}
        handleFilterSelect={handleFilterSelect}
        handleSortSelect={handleSortSelect}
        handleReportIncident={handleReportIncident} // Trigger for modal
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Incidents List */}
        <div className="md:col-span-2">
          <IncidentsList
            currentIncidents={currentIncidents}
            expandedIncidentId={expandedIncidentId}
            handleExpandDetails={(id) => {
              if (expandedIncidentId === id) {
                setExpandedIncidentId(null); // Collapse if already open
              } else {
                setExpandedIncidentId(id); // Expand the new one
              }
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
        {/* Right - Graphs */}
        <div className="flex flex-col items-center">
          <Graphs
            pieData={pieData}
            lineChartData={filteredTimelineChartData}
            lineChartRange={lineChartRange}
          />
        </div>
      </div>

      {/* Report Incident Modal */}
      <ReportIncidentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleReportIncidentSubmit}
      />
    </div>
  );
};

export default Dashboard;
