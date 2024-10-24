import React, { useState, useEffect } from 'react';
import { FaHome, FaChartBar, FaFileImport, FaProjectDiagram, FaGasPump } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/mrv.png';
import { BsBoxes } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdCopyright, MdGasMeter, MdOutlineCo2 } from 'react-icons/md';
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { SiLightning } from "react-icons/si";
import { GiElectricalSocket } from "react-icons/gi";
import { AiOutlineDashboard } from "react-icons/ai";


export default function Sidebar({ isSidebarOpen }) {
  const [isDropdownOpen1, setDropdownOpen1] = useState(false); // สำหรับ dropdown แรก
  const [isDropdownOpen2, setDropdownOpen2] = useState(false); // สำหรับ dropdown ที่สอง
  const [isDropdownOpen3, setDropdownOpen3] = useState(false);
  const location = useLocation(); // ใช้สำหรับตรวจสอบเส้นทางปัจจุบัน

  // ฟังก์ชันเช็คว่าหน้านี้ active หรือไม่
  const isActive = (path) => {
    return location.pathname === path ? 'border border-3 rounded-start' : '';
  };

  // ตรวจสอบว่าผู้ใช้กำลังอยู่ในหน้า dropdown หรือไม่
  useEffect(() => {
    const dropdownPaths1 = ['/plan', '/subCategories', '/period','/milestone','/multifactor','/detail','/staticassumption','/subtarget','/target','/transection','/verify'];
    setDropdownOpen1(dropdownPaths1.includes(location.pathname));

    const dropdownPaths2 = ['/otherPlan', '/anotherCategory', '/anotherPeriod'];
    setDropdownOpen2(dropdownPaths2.includes(location.pathname));

    const dropdownPaths3 = ['/otherPlan', '/anotherCategory', '/anotherPeriod'];
    setDropdownOpen3(dropdownPaths3.includes(location.pathname));

  }, [location.pathname]);

  

  const toggleDropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setDropdownOpen3(!isDropdownOpen3);
  };

  return (
    <div className={`col-md-2 p-0 transition-all ${isSidebarOpen ? 'show' : 'collapse'}`} id="sidebar" style={{
      background: 'linear-gradient(180deg, #ee8311, #faf0e7)', // Gradient สีส้มและเทา
      opacity: isSidebarOpen ? 1 : 0, // เปลี่ยนค่า opacity
      transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', // ใช้ transform เพื่อหด Sidebar
      transition: 'opacity 0.5s ease, transform 0.5s ease', // กำหนด transition สำหรับ opacity และ transform
      pointerEvents: isSidebarOpen ? 'auto' : 'none', // ปิดการใช้งาน events เมื่อปิด
    }}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"  style={{ marginBottom: '0px' }}>
    <path fill="#FFFFFF" d="M0,0L0,160L62.6,160L62.6,256L125.2,256L125.2,32L187.8,32L187.8,256L250.4,256L250.4,320L313,320L313,224L375.7,224L375.7,160L438.3,160L438.3,64L500.9,64L500.9,192L563.5,192L563.5,64L626.1,64L626.1,96L688.7,96L688.7,160L751.3,160L751.3,160L813.9,160L813.9,64L876.5,64L876.5,64L939.1,64L939.1,288L1001.7,288L1001.7,160L1064.3,160L1064.3,160L1127,160L1127,32L1189.6,32L1189.6,64L1252.2,64L1252.2,256L1314.8,256L1314.8,96L1377.4,96L1377.4,192L1440,192L1440,0L1377.4,0L1377.4,0L1314.8,0L1314.8,0L1252.2,0L1252.2,0L1189.6,0L1189.6,0L1127,0L1127,0L1064.3,0L1064.3,0L1001.7,0L1001.7,0L939.1,0L939.1,0L876.5,0L876.5,0L813.9,0L813.9,0L751.3,0L751.3,0L688.7,0L688.7,0L626.1,0L626.1,0L563.5,0L563.5,0L500.9,0L500.9,0L438.3,0L438.3,0L375.7,0L375.7,0L313,0L313,0L250.4,0L250.4,0L187.8,0L187.8,0L125.2,0L125.2,0L62.6,0L62.6,0L0,0L0,0Z"></path>
  </svg>
      <div className="text-center mb-4 pt-3">
        <img src={Logo} className="bg-transparent " style={{ width: '150px', height: '150px' }} alt="Logo" />
      </div>

      <ul className="list-unstyled px-4 ">
        <li className={`sidebar-item ${isActive('/dashboard')} p-3`}>
          <Link to="/dashboard" className="d-flex align-items-center text-white text-decoration-none">
            <FaHome size={20} />
            {isSidebarOpen && <span className="ms-3">Dashboard</span>}
          </Link>
        </li>

         {/* Dropdown แรก */}
         <li className="sidebar-item dropdown">
          <a href="#" onClick={toggleDropdown3} className="d-flex align-items-center justify-content-between p-3 text-white text-decoration-none">
            <div className="d-flex align-items-center">
              <FaUser size={20} />
              {isSidebarOpen && <span className="ms-3">จัดการผู้ใช้งานในระบบ</span>}
            </div>
            {isSidebarOpen && <FiChevronDown />}
          </a>
          {isDropdownOpen3 && (
            <ul className={`list-unstyled ps-4 mt-1 ${isSidebarOpen ? '' : 'd-none'}`}>
              <li className={`sidebar-sub-item ${isActive('/plan')} p-2`}>
                <Link to="/plan" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>Super Admin</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/subCategories')} p-2`}>
                <Link to="/subCategories" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>Admin</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/period')} p-2`}>
                <Link to="/period" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>other</span></Link>
              </li>
            </ul>
          )}
        </li>

        {/* Dropdown แรก */}
        <li className="sidebar-item dropdown">
          <a href="#" onClick={toggleDropdown1} className="d-flex align-items-center justify-content-between p-3 text-white text-decoration-none">
            <div className="d-flex align-items-center">
              <FaChartBar size={20} />
              {isSidebarOpen && <span className="ms-3">จัดการข้อมูลดิบ</span>}
            </div>
            {isSidebarOpen && <FiChevronDown />}
          </a>
          {isDropdownOpen1 && (
            <ul className={`list-unstyled ps-4 mt-1 ${isSidebarOpen ? '' : 'd-none'}`}>
              <li className={`sidebar-sub-item ${isActive('/plan')} p-2`}>
                <Link to="/plan" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>แผน</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/subCategories')} p-2`}>
                <Link to="/subCategories" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>หมวดหมู่ย่อย</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/period')} p-2`}>
                <Link to="/period" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>รูปแบบเวลา</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/milestone')} p-2`}>
                <Link to="/milestone" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>ระยะเวลา</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/multifactor')} p-2`}>
                <Link to="/multifactor" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>ตัวคูณ</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/detail')} p-2`}>
                <Link to="/detail" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>รายละเอียด</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/staticassumption')} p-2`}>
                <Link to="/staticassumption" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>
                สมมติฐานคงที่</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/subtarget')} p-2`}>
                <Link to="/subtarget" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>เป้าหมายย่อย</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/target')} p-2`}>
                <Link to="/target" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>เป้าหมาย</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/transection')} p-2`}>
                <Link to="/transection" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>การทำกิจกรรม</span></Link>
              </li>
              <li className={`sidebar-sub-item ${isActive('/verify')} p-2`}>
                <Link to="/verify" className="d-flex align-items-center text-white text-decoration-none"><BsBoxes /> <span className='mx-2'>ผู้อนุญาติข้อมูล</span></Link>
              </li>
            </ul>
          )}
        </li>

       
        <li className={`sidebar-item ${isActive('/planingmidstone')} p-3`}>
          <Link to="/planingmidstone" className="d-flex align-items-center text-white text-decoration-none">
            <AiOutlineDashboard size={20} />
            {isSidebarOpen && <span className="ms-3">แผนปฏิบัติการด้านพลังงาน</span>}
          </Link>
        </li>




        <li className={`sidebar-item ${isActive('/cobenfit')} p-3`}>
          <Link to="/cobenfit" className="d-flex align-items-center text-white text-decoration-none">
            <FaFileImport size={20} />
            {isSidebarOpen && <span className="ms-3">การนำเข้าข้อมูลตัวชี้วัด</span>}
          </Link>
        </li>
      </ul>
     

    </div>
  );
}
