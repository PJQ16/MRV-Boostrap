import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { MdEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { useForm } from "react-hook-form";
import useStore from '../../store/usePeriodStore';
import Inputs from '../../components/Inputs';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Period() {
  const [modalData, setModalData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(5); 

  // useForm สำหรับการจัดการฟอร์มหลัก
  const { register, watch } = useForm();
  const search = watch('search', ''); 

  // useForm สำหรับฟอร์มใน Modal
  const {
    register: modalRegister,
    handleSubmit: handleModalSubmit,
    formState: { errors: modalErrors },
    reset,
    setValue,
  } = useForm();

  const { periods, isLoading, error, fetchPeriods, addPeriod, editPeriod, removePeriod } = useStore();

  useEffect(() => {
    fetchPeriods();
  }, []);

  useEffect(() => {
    const filtered = periods.filter(item =>
      item.period_type && item.period_type.toLowerCase().includes(search.toLowerCase()) 
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [search, periods]);
  
  const handleData = (setData) => {
    setModalData(setData);
    if (setData) {
      setValue('period_type', setData.period_type);
    } else {
      reset(); 
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (filteredData.length ? filteredData : periods).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    (filteredData.length ? filteredData : periods).length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onSubmitModal = async (data) => {
    const res = await Swal.fire({
      icon: 'question',
      title: modalData ? 'ยืนยันการแก้ไขข้อมูล?' : 'ยืนยันการเพิ่มข้อมูล?',
      showCancelButton: true
    });

    if (res.isConfirmed) {
      try {
        if (modalData) {
          await editPeriod({ id: modalData.id, ...data });
          toast.success('แก้ไขข้อมูลสำเร็จ', { autoClose: 600,position:'top-center' });
        } else {
          await addPeriod(data);
          toast.success('เพิ่มข้อมูลสำเร็จ', { autoClose: 600 });
        }
        document.getElementById('modalClose').click();
        // ดำเนินการต่อเมื่อการอัปเดตสำเร็จ
        fetchPeriods(); // ตรวจสอบว่าฟังก์ชันนี้ทำงานถูกต้อง
        reset(); 
        setModalData(null);
      } catch (error) {
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    }
  };

  const handleRemove = async (id) => {
    const res = await Swal.fire({
      icon: 'warning',
      title: 'ยืนยันการลบข้อมูล?',
      showCancelButton: true
    });

    if (res.isConfirmed) {
      await removePeriod(id);
      toast.success('ลบข้อมูลสำเร็จ', { autoClose: 600 });
      fetchPeriods();
    }
  };

  return (
    <Layout>
      <div className="container-fluid h-100 p-5">
        <div className="d-flex justify-content-between">
          <div className="h3">จัดการรูปแบบเวลาการกรอกข้อมูล</div>
          <div className="">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#planModal"
              onClick={() => handleData(null)} 
            >
              <IoIosAddCircle fontSize={30} />
              <span className="mx-1">เพิ่มข้อมูล</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div className="my-4 row d-flex justify-content-end">
              <div className="col-md-2">
                <label htmlFor="search">ค้นหา</label>
                <input
                  id="search"
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
                  onChange={e => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                </select>
              </div>
            </div>

            <Table tbSty="table table-white table-hover mt-4">
              <thead>
                <tr className="text-center">
                  <th>ลำดับ</th>
                  <th>ชื่อแผน</th>
                  <th>จัดการข้อมูล</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="text-center" key={item.id}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.period_type}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleData(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#planModal"
                      >
                        <MdEdit /> แก้ไข
                      </button>
                      <button className="btn mx-2" style={{ backgroundColor: '#ed8517' }}>
                        <FaEye /> มองเห็น
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FaTrash /> ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-center">จำนวนแผนทั้งหมด {filteredData.length || periods.length}</th>
                  <th className="text-start" colSpan={2}></th>
                </tr>
              </tfoot>
            </Table>

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
                        backgroundColor: currentPage === index + 1 ? "#FFA500" : "white",
                        color: currentPage === index + 1 ? "white" : "#FFA500",
                        borderColor: "#FFA500",
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>

      <Modal
        title={modalData ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}
        id="planModal"
        motion="fade"
        size="modal-lg"
      >
        <form onSubmit={handleModalSubmit(onSubmitModal)}>
          <div className="row">
            <div className="col-md-5">
              <Inputs
                label="ระยะเวลา"
                name="period_type"
                formStyle='form-control'
                type="text"
                placeholder={modalData ? "แก้ไขระยะเวลา" : "เพิ่มระยะเวลา"}
                register={modalRegister}
                rules={{ required: "ระบุ รูปแบบระยะเวลา" }}
                errors={modalErrors}
              />
              <button type="submit" className="btn btn-success">
                {modalData ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มข้อมูล"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
