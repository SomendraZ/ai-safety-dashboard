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
          className="bg-[#1E1E1E] border border-[#333] text-white p-4 rounded-2xl shadow"
        >
          <div className="flex flex-wrap items-center justify-between">
            <h3 className="text-xl font-bold">{incident.title}</h3>
            <p className="text-sm text-gray-400">
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
              className="text-blue-400 text-sm hover:underline"
            >
              {expandedIncidentId === incident.id
                ? "Hide Details"
                : "View Details"}
            </button>
          </div>

          {expandedIncidentId === incident.id && (
            <p className="mt-2 text-gray-300">{incident.description}</p>
          )}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm rounded-lg ${
            currentPage === 1
              ? "bg-[#2C2C2C] text-gray-300 cursor-not-allowed"
              : "bg-[#4CAF50] text-white hover:bg-[#45a049]"
          } disabled:opacity-50`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2 flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-[#2C2C2C] text-gray-300 hover:bg-[#3a3a3a]"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-sm rounded-lg ${
            currentPage === totalPages
              ? "bg-[#2C2C2C] text-gray-300 cursor-not-allowed"
              : "bg-[#4CAF50] text-white hover:bg-[#45a049]"
          } disabled:opacity-50`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IncidentsList;
