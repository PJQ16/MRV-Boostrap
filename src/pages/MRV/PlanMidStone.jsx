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
import Gas from './Gas';
import { IoSearchCircleSharp } from "react-icons/io5";
import useStore from "../../store/useTransectionStore";
import { motion } from "framer-motion";

export default function PlanMidStone() {
  const startYear = 2566;
  const currentYear = new Date().getFullYear() + 543; // Convert to Buddhist year
  const endYear = 2580;

  const [activeTab, setActiveTab] = useState("1");
  const [years, setYears] = useState(currentYear); // ตั้งค่าเริ่มต้นเป็น currentYear
  const { fetchTransections, Transections } = useStore();
  const [modalData, setModalData] = useState(null); // State เพื่อเก็บข้อมูลที่จะแสดงใน Modal


  useEffect(() => {
    fetchTransections(); // ส่งค่า years เพื่อใช้ใน fetchTransections
  }, [years]);

  const handleYearChange = (e) => {
    setYears(e.target.value);
  };

  const handleOpenModal = (data) => {
    setModalData(data); // เก็บข้อมูลที่ส่งมาจาก PDP
  };

  const allyears = [];
  for (let i = startYear; i <= Math.min(currentYear, endYear); i++) {
    allyears.push(i);
  }

  const tabs = Transections.flatMap((item) =>
    item.plan.map((plan, planIndex) => {
      let content;
  
      switch (plan.plan_name) {
        case 'Power':
          content = (
            <>
              <span className="h4 m-2">แผนพลังงาน (Power Development Plan) {years}</span>
              <PDP subCategories={plan.subCategories} onOpenModal={handleOpenModal} /> {/* ส่ง subCategories ทั้งหมดไปที่ PDP */}
            </>
          );
          break;
        case 'Oil':
          content = (
            <>
              <span className="h4">แผนน้ำมัน (Oil Plan) {years}</span>
              <Oil subCategories={plan.subCategories}  onOpenModal={handleOpenModal} />
            </>
          );
          break;
          case 'Gas':
            content = (
              <>
                <span className="h4">แผนก๊าซธรรมชาติ (Gas Plan) {years}</span>
                <Gas subCategories={plan.subCategories}   onOpenModal={handleOpenModal} />
              </>
            );
            break;
          case 'AEDP':
            content = (
              <>
                <span className="h4">แผนพัฒนาพลังงานทดแทน และ
                พลังงานทางเลือก (Alternative Energy Development Plan) {years}</span>
                <AEDP subCategories={plan.subCategories}   onOpenModal={handleOpenModal} />
              </>
            );
            break;
            case 'EEP':
              content = (
                <>
                  <span className="h4">แผนอนุรักษ์พลังงาน (Energy Efficiency plan) {years}</span>
                  <AEDP subCategories={plan.subCategories}  onOpenModal={handleOpenModal} />
                </>
              );
              break;
              case 'CO2':
                content = (
                  <>
                    <span className="h4">แผนคาร์บอน (Carbon Plan) {years}</span>
                    <AEDP subCategories={plan.subCategories}  onOpenModal={handleOpenModal}  />
                  </>
                );
                break;
                case 'EV':
                  content = (
                    <>
                      <span className="h4">แผนยานพาหนะไฟฟ้า (Electric Vehicle) {years}</span>
                      <AEDP subCategories={plan.subCategories}  onOpenModal={handleOpenModal} />
                    </>
                  );
                  break;
                  default:
                    content = <span className="h4">Other Plan {years}</span>;
                    break;
                }
            
                return {
                  id: `${planIndex + 1}`,
                  title: `${planIndex + 1}. ${plan.plan_name}`,
                  content,
                };
              })
            );


  return (
    <div>
      <Layout>
        <div className="m-3">
          <div className="d-flex justify-content-center">
            <p className="h3 fw-bold">แผนปฏิบัติการด้านพลังงาน</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="row">
              <div className="col-9">
                <div className="d-flex justify-content-end">
                  <div className="position-relative d-flex align-items-center">
                    <IoSearchCircleSharp
                      fontSize={24}
                      className="position-absolute"
                      style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'orange' }}
                    />
                    <select
                      className="form-control ps-5"
                      value={years} // ใช้ value เป็น years เพื่อให้แสดงปีปัจจุบันเมื่อโหลด
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
                <TabContent tabs={tabs} activeTab={activeTab} />
              </div>
              <div className="col-3 p-4">
                <div className="px-5">
                  <div className="fw-light">แผนปฏิบัติการรายสาขา</div>
                  <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <Modal id="monthlyModal" size="modal-lg" title={`${modalData?.desciption} ${years}`} motion="fade">
  <Table tbSty="table table-bordered">
    <thead>
      <tr className="text-center">
        <th>เดือน</th>
        <th>ช่องกรอกข้อมูล</th>
      </tr>
    </thead>
    <tbody className="text-center">
      {[
        { name: "มกราคม", value: modalData?.jan_val },
        { name: "กุมภาพันธ์", value: modalData?.feb_val },
        { name: "มีนาคม", value: modalData?.mar_val },
        { name: "เมษายน", value: modalData?.apr_val },
        { name: "พฤษภาคม", value: modalData?.may_val },
        { name: "มิถุนายน", value: modalData?.jun_val },
        { name: "กรกฎาคม", value: modalData?.jul_val },
        { name: "สิงหาคม", value: modalData?.aug_val },
        { name: "กันยายน", value: modalData?.sep_val },
        { name: "ตุลาคม", value: modalData?.oct_val },
        { name: "พฤศจิกายน", value: modalData?.nov_val },
        { name: "ธันวาคม", value: modalData?.dec_val },
      ].map((month, index) => (
        <tr key={index}>
          <td>{month.name}</td>
          <td><input type="number" defaultValue={month.value} className="form-control" /></td>
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
