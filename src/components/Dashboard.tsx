import React, { useState, useEffect } from "react";
import incidentsData from "../assets/incidents.json";
import TopControls from "./TopControls";
import IncidentsList from "./IncidentsList";
import Graphs from "./Graphs";
import ReportIncidentModal from "./ReportIncidentModal";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleReportIncident = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const filteredIncidents = incidents.filter((incident) => {
    const incidentDate = new Date(incident.reported_at);
    return filter === "All" || incident.severity === filter
      ? incidentDate < tomorrow
      : false;
  });

  const sortedIncidents = filteredIncidents.sort((a, b) => {
    const dateA = new Date(a.reported_at);
    const dateB = new Date(b.reported_at);
    return sortOrder === "newest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

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
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <TopControls
        filter={filter}
        sortOrder={sortOrder}
        dropdownVisible={dropdownVisible}
        dropdownSortVisible={dropdownSortVisible}
        toggleDropdown={() => setDropdownVisible(!dropdownVisible)}
        toggleSortDropdown={() => setDropdownSortVisible(!dropdownSortVisible)}
        handleFilterSelect={handleFilterSelect}
        handleSortSelect={handleSortSelect}
        handleReportIncident={handleReportIncident}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <IncidentsList
            currentIncidents={currentIncidents}
            expandedIncidentId={expandedIncidentId}
            handleExpandDetails={(id) => {
              setExpandedIncidentId(expandedIncidentId === id ? null : id);
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>

        <div className="flex flex-col items-center">
          <Graphs sortedIncidents={sortedIncidents} />
        </div>
      </div>

      <ReportIncidentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleReportIncidentSubmit}
      />
    </div>
  );
};

export default Dashboard;
