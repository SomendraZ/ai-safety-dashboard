import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const NavbarSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <main className="sm:ml-64 pt-10">
        <Dashboard />
      </main>
    </>
  );
};

export default NavbarSidebar;
