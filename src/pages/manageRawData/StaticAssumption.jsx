import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { MdEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { useForm } from "react-hook-form";


export default function StaticAssumption() {
  const [modalData, setModalData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // สำหรับ pagination
  const [itemsPerPage, setItemsPerPage] = useState(5); // จำนวนรายการต่อหน้า (เริ่มต้นที่ 5)
  const { register, watch } = useForm();
  const search = watch('search', ''); // ดูค่า search แบบเรียลไทม์, ค่าดีฟอลต์คือ ''

  const data = [
    { id: 1, name: 'กำลังการผลิตไฟฟ้าใหม่ (PDP)' },
    { id: 2, name: 'กำลังผลิตไฟฟ้าที่ปรับออกจากระบบ (PDP)' },
    { id: 3, name: 'พลังงานไฟฟ้า (AEDP : หน่วย MWh )' },
    { id: 4, name: 'พลังงานไฟฟ้า (AEDP : หน่วย ktoe )' },
    { id: 5, name: 'พลังงานความร้อน (AEDP)' },
    { id: 6, name: 'เชื้อเพลิงชีวภาพ (AEDP)' },
    { id: 7, name: 'ทางบก เบนซิน (Oil)' },
    { id: 13, name: 'ทางบก ดีเซล (Oil)' }
  ];


  // ฟังก์ชันกรองข้อมูลตามการพิมพ์
  useEffect(() => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  }, [search]); // Re-run เมื่อ search เปลี่ยนค่า

  const handleData = (setData) => {
    setModalData(setData);
  };

  // Get current data for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (filteredData.length ? filteredData : data).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    (filteredData.length ? filteredData : data).length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

    return (
      <Layout>
        <div className="container-fluid h-100 p-5">
          <div className="d-flex justify-content-between">
            <div className="h3">จัดการระยะเวลา</div>
            <div className="">
              <button
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#planModal"
                onClick={() => handleData(null)} // ตั้งค่า null สำหรับการเพิ่มข้อมูลใหม่
              >
                <IoIosAddCircle fontSize={30} />
                <span className="mx-1">เพิ่มข้อมูล</span>
              </button>
            </div>
          </div>
  
          {/* Input ค้นหาแบบเรียลไทม์ */}
  
          <div className="my-4 row d-flex justify-content-end">
              <div className="col-md-2">
                  <label htmlFor="search">ค้นหา</label>
              <input
              id='search'
              type="text"
              className="form-control"
              placeholder="ค้นหาแผน..."
              {...register("search")}
            />
              </div>
           
              <div className="col-md-1">
              <label htmlFor="rowPage">แถว</label>
            
            <select
              id="rowPage"
              className="form-control d-inline"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
            </select>
              </div>
          </div>
          
          {/* ตารางข้อมูล */}
          <Table tbSty="table table-white table-hover  mt-4">
            <thead>
              <tr className="text-center">
                <th>ลำดับ</th>
                <th>ชื่อแผน</th>
                <th >จัดการข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr className="text-center" key={item.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{item.name}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleData(item)} // ใช้ฟังก์ชันใหม่ในการส่งข้อมูล
                      data-bs-toggle="modal"
                      data-bs-target="#planModal"
                    >
                      <MdEdit /> แก้ไข
                    </button>
                    <button className="btn mx-2" style={{ backgroundColor: '#ed8517' }}>
                      <FaEye /> มองเห็น
                    </button>
                    <button className="btn btn-danger">
                      <FaTrash /> ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className="text-center">จำนวนแผนทั้งหมด {filteredData.length || data.length}</th>
                <th className="text-start" colSpan={2}></th>
              </tr>
            </tfoot>
          </Table>
  
          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
          style={{
            backgroundColor: currentPage === index + 1 ? "#FFA500" : "white", // สีส้มถ้าเป็นหน้า active
            color: currentPage === index + 1 ? "white" : "#FFA500", // สีตัวอักษร
            borderColor: "#FFA500" // สีขอบ
          }}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
  
        {/* Modal */}
        <Modal
          title={modalData ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}
          id="planModal"
          motion="fade"
          size="modal-xl"
        >
          {modalData ? (
            <>
              <p>แก้ไขข้อมูลของแผน:</p>
              <p>
                <strong>ชื่อแผน:</strong> {modalData.name}
              </p>
            </>
          ) : (
            <p>เพิ่มข้อมูลใหม่</p>
          )}
        </Modal>
      </Layout>
  )
}
