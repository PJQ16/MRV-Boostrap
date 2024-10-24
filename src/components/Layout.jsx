import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="container-fluid d-flex flex-column" style={{ height: '100vh' }}>
      <div className="row flex-grow-1">
        {/* Sidebar */}
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <div className={`col-${isSidebarOpen ? '10' : '12'} bg-white d-flex flex-column p-0`}>
          {/* Navbar */}
          <Navbar  toggleSidebar={toggleSidebar} />

          {/* Content */}
          <div className="flex-grow-1 d-flex flex-column p-3 bg-light">
            {children}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
