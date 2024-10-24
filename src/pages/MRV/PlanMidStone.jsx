import React, { useState } from "react";
import Layout from "../../components/Layout";
import Tabs from "../../components/Tabs"; // Import Tabs component
import TabContent from "../../components/TabContent"; // Import TabContent component
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import "./style.css";
import PDP from "./PDP";
import AEDP from "./AEDP";
import Oil from './Oil';
import { IoSearchCircleSharp } from "react-icons/io5";

export default function PlanMidStone() {
  const [activeTab, setActiveTab] = useState("1");
  const [years,setYears] = useState('');
  const tabs = [
    { id: "1", title: "1.POWER", content: 
      <>
    <span className="h4">พลังงาน {years}</span>
       <PDP />
     </>
     },
    { id: "2", title: "2.AEDP", content: <><span className="h4">พลังงานทดแทน {years}</span> <AEDP/></> },
    { id: "3", title: "3.Oil", content: <><span className="h4">น้ำมัน {years}</span> <Oil/></> },
    { id: "4", title: "4.EEP", content: <>เนื้อหาแท็บ 4</> },
    { id: "5", title: "5.Gas", content: <>เนื้อหาแท็บ 5</> },
    { id: "6", title: "6.EV", content: <>เนื้อหาแท็บ 6</> },
    { id: "7", title: "7.Hydrogen", content: <>เนื้อหาแท็บ 7</> },
    { id: "8", title: "8.CO2", content: <>เนื้อหาแท็บ 8</> },
  ];

  const handleYearChange = (e) =>{
    setYears(e.target.value);
  } 


  const startYear = 2566;
  const currentYear = new Date().getFullYear() + 543; // แปลงเป็นปีพุทธศักราช
  const endYear = 2580;

  const allyears = [];

  // สร้าง array ของปีจาก 2566 จนถึงปีปัจจุบันหรือไม่เกิน 2580
  for (let i = startYear; i <= Math.min(currentYear, endYear); i++) {
    allyears.push(i);
  }

  return (
    <div>
      <Layout>
        <div className="m-3">
          <div className="d-flex justify-content-center">
            <p className="h3 fw-bold">แผนปฏิบัติการด้านพลังงาน</p>
          </div>
          <div className="">
            <div className="row">
              <div className="col-9">
                <div className="">
                <div className="d-flex justify-content-end">
                <div className="position-relative d-flex align-items-center">
              {/* ส่วนที่กำหนดให้ไอคอนอยู่ใน input */}
              <IoSearchCircleSharp 
                fontSize={24}
               
                className="position-absolute" 
                style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'orange' }}
              />
              
              {/* Select ที่มีไอคอนอยู่ใน input */}
              <select
                className="form-control ps-5"  // กำหนด padding left เพื่อเว้นที่ให้ไอคอน
                onChange={handleYearChange}
                style={{ paddingLeft: '40px' }} // เพิ่ม padding ให้ input เลื่อนไปหลังไอคอน
              >
                <option value="">ค้นหาปี</option>
                {allyears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
                    </div>
                  <TabContent tabs={tabs} activeTab={activeTab} />
                </div>
              </div>
              <div className="col-3 p-4">
                <div className=" px-5">
                  <div className="fw-lighte">แผนปฏิบัติการรายสาขา</div>
                  <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal id="monthlyModal" size="modal-lg" title="กรอกข้อมูลตามไตรมาส" motion="fade">
          <Table tbSty="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>เดือน</th>
                <th>ช่องกรอกข้อมูล</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {[
                "มกราคม",
                "กุมภาพันธ์",
                "มีนาคม",
                "เมษายน",
                "พฤษาคม",
                "มิถุนายน",
                "กรกฎาคม",
                "สิงหาคม",
                "กันยายน",
                "ตุลาคม",
                "พฤศจิกายน",
                "ธันวาคม",
              ].map((month, index) => (
                <tr key={index}>
                  <td>{month}</td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button className="btn btn-primary">เพิ่มข้อมูล</button>
        </Modal>
      </Layout>
    </div>
  );
}
