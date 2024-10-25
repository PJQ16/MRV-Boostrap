import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { PiDeviceRotateBold } from "react-icons/pi";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [screenSize, setScreenSize] = useState('lg'); // เก็บสถานะของขนาดหน้าจอ

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 992) {
        setScreenSize('lg'); // lg หรือใหญ่กว่า
      } else {
        setScreenSize('sm-md'); // ขนาดเล็กกว่า lg
      }
    };

    checkScreenSize(); // ตรวจสอบเมื่อโหลดหน้า

    // ตรวจสอบเมื่อหน้าจอเปลี่ยนขนาด
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div className="container-fluid d-flex flex-column" style={{ height: '100vh' }}>
      {/* แสดงข้อความแจ้งเตือนพร้อมพื้นหลังสีดำเมื่อหน้าจอขนาดเล็กกว่า lg */}
      {screenSize !== 'lg' && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'black', zIndex: 9999 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white text-center"
          >
            <h5 className="mb-3">Web Application รองรับหน้าจอ ที่มีขนาดความกว้าง 992 px ขึ้นไป</h5>
            <motion.div
              animate={{ rotate: 90 }} // หมุนไอคอน
              transition={{ 
                duration: 3,  // หมุน 1 รอบใช้เวลา 3 วินาที
                ease: "linear",  // การหมุนแบบต่อเนื่อง
                repeat: Infinity  // หมุนแบบไม่สิ้นสุด
              }}
              style={{ fontSize: '50px', margin: '20px auto' }}
            >
              <PiDeviceRotateBold size={300}/>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* แสดงผลปกติสำหรับหน้าจอ lg ขึ้นไป */}
      {screenSize === 'lg' && (
        <div className="row flex-grow-1">
          {/* Sidebar */}
          <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

          <div className={`col-${isSidebarOpen ? '10' : '12'} bg-white d-flex flex-column p-0`}>
            {/* Navbar */}
            <Navbar toggleSidebar={toggleSidebar} />

            {/* Content */}
            <div className="flex-grow-1 d-flex flex-column p-3 bg-white">
              {children}
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
