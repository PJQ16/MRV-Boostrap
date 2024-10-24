import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { MdEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { useForm } from "react-hook-form";
import useStore from '../../store/usePlanStore';
import Inputs from '../../components/Inputs';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Plan() {
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

  const { plans, isLoading, error, fetchPlan, addPlan, editPlan, removePlan } = useStore();

  useEffect(() => {
    fetchPlan();
  }, []);

  useEffect(() => {
    const filtered = plans.filter(item =>
      item.period_type && item.period_type.toLowerCase().includes(search.toLowerCase()) 
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [search, plans]);
  
  const handleData = (setData) => {
    setModalData(setData);
    if (setData) {
      setValue('name', setData.name);
    } else {
      reset(); 
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (filteredData.length ? filteredData : plans).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    (filteredData.length ? filteredData : plans).length / itemsPerPage
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
          await editPlan({ id: modalData.id, ...data });
          toast.success('แก้ไขข้อมูลสำเร็จ', { autoClose: 600,position:'top-center' });
        } else {
          await addPlan(data);
          toast.success('เพิ่มข้อมูลสำเร็จ', { autoClose: 600,position:'top-center' });
        }
        document.getElementById('modalClose').click();
        // ดำเนินการต่อเมื่อการอัปเดตสำเร็จ
        fetchPlan(); // ตรวจสอบว่าฟังก์ชันนี้ทำงานถูกต้อง
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
      await removePlan(id);
      toast.success('ลบข้อมูลสำเร็จ', { autoClose: 600 });
      fetchPlan();
    }
  };

  return (
    <Layout>
      <div className="container-fluid h-100 p-5">
        <div className="d-flex justify-content-between">
          <div className="h3">จัดการแผน</div>
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
                    <td>{item.name}</td>
                    <td className="text-center">
                      <button
                        className="btn"
                        onClick={() => handleData(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#planModal"
                      >
                        <MdEdit fontSize={30} className='rounded-circle p-1 border-1'  color='#f5db02' style={{backgroundColor:'#fcfae8'}}/>
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FaTrash  fontSize={30} className='rounded-circle p-1 border-1'  color='#f52702' style={{backgroundColor:'#f2d9d4'}} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-center">จำนวนแผนทั้งหมด {filteredData.length || plans.length}</th>
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
                formStyle='form-control'
                label="แผน"
                name="name"
                type="text"
                placeholder={modalData ? "แก้ไขแผน" : "เพิ่มแผน"}
                register={modalRegister}
                rules={{ required: "ระบุ รูปแบบแผน" }}
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