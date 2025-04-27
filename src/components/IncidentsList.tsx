import React from "react";

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
}

interface IncidentsListProps {
  currentIncidents: Incident[];
  expandedIncidentId: number | null;
  handleExpandDetails: (id: number) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const IncidentsList: React.FC<IncidentsListProps> = ({
  currentIncidents,
  expandedIncidentId,
  handleExpandDetails,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="space-y-4">
      {currentIncidents.map((incident) => (
        <div
          key={incident.id}
          className="bg-[#F1EFEC] p-4 rounded-2xl shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between">
            <h3 className="text-xl font-bold">{incident.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(incident.reported_at).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span
              className={`px-4 py-1 rounded-full text-sm font-bold border-1 ${
                incident.severity === "High"
                  ? "bg-[#ff7a7a] text-[#8a1119]"
                  : incident.severity === "Medium"
                  ? "bg-[#fff051] text-[#AF741F]"
                  : "bg-[#2ed6b4] text-[#00423f]"
              }`}
            >
              {incident.severity}
            </span>

            <button
              onClick={() => handleExpandDetails(incident.id)}
              className="text-blue-500 text-sm cursor-pointer"
            >
              {expandedIncidentId === incident.id
                ? "Hide Details"
                : "View Details"}
            </button>
          </div>

          {expandedIncidentId === incident.id && (
            <p className="mt-2 text-gray-700">{incident.description}</p>
          )}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between mt-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-2xl disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        <p className="text-center text-sm font-bold">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-2xl disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IncidentsList;
