import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Tabs from "../../components/Tabs"; 
import TabContent from "../../components/TabContent"; 
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import "./style.css";
import PDP from "./PDP";
import AEDP from "./AEDP";
import Oil from './Oil';
import { IoSearchCircleSharp } from "react-icons/io5";
import useStore from "../../store/usePlanStore";

export default function PlanMidStone() {
  const [activeTab, setActiveTab] = useState("1");
  const [years, setYears] = useState('');
  const { fetchPlan, plans } = useStore();

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleYearChange = (e) => {
    setYears(e.target.value);
  };

  const startYear = 2566;
  const currentYear = new Date().getFullYear() + 543; // Convert to Buddhist year
  const endYear = 2580;

  const allyears = [];

  for (let i = startYear; i <= Math.min(currentYear, endYear); i++) {
    allyears.push(i);
  }

  // Generate tabs dynamically based on plans data
  const tabs = plans.map((item, index) => {
    let content;
  
    switch(item.name) {
      case 'Power':
        content = (
          <>
            <span className="h4 m-2">แผนพลังงาน (Power Development Plan) {years}</span>
            <PDP /> {/* Render PDP component */}
          </>
        );
        break;
      case 'AEDP':
        content = (
          <>
            <span className="h4">Alternative Energy Development Plan {years}</span>
            <AEDP /> {/* Render AEDP component */}
          </>
        );
        break;
      case 'Oil':
        content = (
          <>
            <span className="h4">แผนน้ำมัน (Oil Plan) {years}</span>
            <Oil /> {/* Render Oil component */}
          </>
        );
        break;
      default:
        content = <span className="h4">Other Plan {years}</span>;
        break;
    }
  
    return {
      id: (index + 1).toString(), // Unique ID for each tab
      title: `${index + 1}. ${item.name}`, // Assuming plans has a name property
      content, // The content based on the switch statement
    };
  });
  

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
                      <IoSearchCircleSharp
                        fontSize={24}
                        className="position-absolute"
                        style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'orange' }}
                      />
                      <select
                        className="form-control ps-5"
                        onChange={handleYearChange}
                        style={{ paddingLeft: '40px' }}
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
                  {/* Render TabContent */}
                  <TabContent tabs={tabs} activeTab={activeTab} />
                </div>
              </div>
              <div className="col-3 p-4">
                <div className="px-5">
                  <div className="fw-lighte">แผนปฏิบัติการรายสาขา</div>
                  {/* Render Tabs */}
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
