// TopControls.tsx
import React from "react";
import danger from "../assets/danger.png";

interface TopControlsProps {
  filter: string;
  sortOrder: string;
  dropdownVisible: boolean;
  dropdownSortVisible: boolean;
  toggleDropdown: () => void;
  toggleSortDropdown: () => void;
  handleFilterSelect: (value: string) => void;
  handleSortSelect: (value: string) => void;
  handleReportIncident: () => void;
}

const TopControls: React.FC<TopControlsProps> = ({
  filter,
  sortOrder,
  dropdownVisible,
  dropdownSortVisible,
  toggleDropdown,
  toggleSortDropdown,
  handleFilterSelect,
  handleSortSelect,
  handleReportIncident,
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center gap-3 justify-between mb-5 mt-3">
      <div className="flex gap-3 flex-wrap">
        {/* Filter Dropdown */}
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
          >
            {filter}
            <svg
              className="w-2.5 h-2.5 inline ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 6"
            >
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
          {dropdownVisible && (
            <div className="absolute mt-2 w-44 bg-white dark:bg-[#F1EFEC] rounded-lg shadow">
              <ul className="py-2 text-sm">
                {["All", "Low", "Medium", "High"].map((severity) => (
                  <li key={severity}>
                    <a
                      href="#"
                      onClick={() => handleFilterSelect(severity)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#547792] hover:text-white"
                    >
                      {severity === "All" ? "All Severities" : severity}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative inline-block">
          <button
            onClick={toggleSortDropdown}
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-2xl text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer"
          >
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            <svg
              className="w-2.5 h-2.5 inline ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 6"
            >
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
          {dropdownSortVisible && (
            <div className="absolute mt-2 w-44 bg-white dark:bg-[#F1EFEC] rounded-2xl shadow-lg">
              <ul className="py-2 text-sm">
                {["newest", "oldest"].map((order) => (
                  <li key={order}>
                    <a
                      href="#"
                      onClick={() => handleSortSelect(order)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#547792] hover:text-white"
                    >
                      {order === "newest" ? "Newest First" : "Oldest First"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Report Button */}
      <button
        onClick={handleReportIncident}
        className="bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-br text-white font-medium rounded-2xl text-sm px-5 py-2.5 flex items-center gap-2 cursor-pointer"
      >
        <img src={danger} alt="danger" className="w-7.5" />
        Report Incident
      </button>
    </div>
  );
};

export default TopControls;
