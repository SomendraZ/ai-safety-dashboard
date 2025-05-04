import React from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-gray-800 border-r border-gray-700 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white bg-blue-500 rounded-2xl hover:bg-blue-600"
              onClick={closeSidebar}
            >   
              <svg
                className="w-5 h-5 text-white transition duration-75"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
