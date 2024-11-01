import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');

   useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const storedData = localStorage.getItem('mrv-store');
    const parsedData = storedData ? JSON.parse(storedData) : null;

    // เข้าถึง fname และตั้งค่า
    if (parsedData) {
      setFname(parsedData.state.user.fname);
      setLname(parsedData.state.user.lname);
      setEmail(parsedData.state.user.email);
    }
  }, []);
  const handleLogout = async()=>{
   const res = await Swal.fire({ 
      icon:'question',
      title:'ต้องการออกจากระบบใช่หรือไม่?',
      confirmButtonColor:'#e1ac71',
      confirmButtonText:'ออกจากระบบ',
      showCancelButton:true,
      cancelButtonColor:'#e17971',
      cancelButtonText:'ยกเลิก'

    });
    if(res.isConfirmed){
      localStorage.clear(); 
      toast.success('ออกจากระบบเรียบร้อย',{autoClose:600,position:'top-center'});
      navigate('/');
    }
  }

  return (
    <nav 
  className="navbar navbar-expand-lg navbar-light rounded-bottom-5"
  style={{ 
    background: 'linear-gradient(to right, #ee8311, #ec9279)', // Gradient สีส้มและเทา
  }}
>
    <div className="container-fluid d-flex justify-content-between">
      <div>
        <button onClick={toggleSidebar} className="btn btn-link" style={{ cursor: 'pointer' }}>
          <GiHamburgerMenu size={36} color='#ff5500' className='ms-3' />
        </button>
        <Link className="navbar-brand" to="/dashboard">MRV ระบบกรอกข้อมูล</Link>
      </div>
  
      <div className="d-flex align-items-center">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-dark" href="#"><IoIosSettings color='#ff5500' /> การตั้งค่า</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/UserInfo">
                <FaUser color='#ff5500' /> {fname}
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" onClick={handleLogout} href='#'>
                <VscSignOut color='#ff5500' /> ออกจากระบบ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  
  );
}
