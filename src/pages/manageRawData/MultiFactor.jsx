import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { MdEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { useForm } from "react-hook-form";
import useStore from '../../store/useMultiFactorStore';
import Inputs from '../../components/Inputs';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function MultiFactor() {
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

  const { multis, isLoading, error, fetchMulti, addMulti, editMulti, removeMulti } = useStore();

  useEffect(() => {
    fetchMulti();
  }, []);

  useEffect(() => {
    const filtered = multis.filter(item => {
      // แปลงตัวเลขเป็น string และตรวจสอบว่ามีส่วนที่ตรงกัน
      const enocomyMatch = item.enocomy && item.enocomy.toString().includes(search);
      const socialMatch = item.social && item.social.toString().includes(search);
      const sccMatch = item.scc && item.scc.toString().includes(search);
  
      // ตรวจสอบว่าตรงกับเงื่อนไขใดเงื่อนไขหนึ่ง
      return enocomyMatch || socialMatch || sccMatch;
    });
  
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [search, multis]);
  
  const handleData = (setData) => {
    setModalData(setData);
    if (setData) {
      setValue('enocomy', setData.enocomy);
      setValue('social', setData.social);
      setValue('scc', setData.scc);
    } else {
      reset(); 
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (filteredData.length ? filteredData : multis).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    (filteredData.length ? filteredData : multis).length / itemsPerPage
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
          await editMulti({ id: modalData.id, ...data });
          toast.success('แก้ไขข้อมูลสำเร็จ', { autoClose: 600,position:'top-center' });
        } else {
          await addMulti(data);
          toast.success('เพิ่มข้อมูลสำเร็จ', { autoClose: 600 });
        }
        document.getElementById('modalClose').click();
        // ดำเนินการต่อเมื่อการอัปเดตสำเร็จ
        fetchMulti(); // ตรวจสอบว่าฟังก์ชันนี้ทำงานถูกต้อง
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
      await removeMulti(id);
      toast.success('ลบข้อมูลสำเร็จ', { autoClose: 600 });
      fetchMulti();
    }
  };

  return (
    <Layout>
      <div className="container-fluid h-100 p-5">
        <div className="d-flex justify-content-between">
          <div className="h3">จัดการปัจจัยตัวคูณ</div>
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
                  <th>ค่าทางเศรษฐศาสตร์</th>
                  <th>ค่าทางสังคม</th>
                  <th>ต้นทุนคาร์บอนที่เกิดแก่สังคม</th>
                  <th>จัดการข้อมูล</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="text-center" key={item.id}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.enocomy}</td>
                    <td>{item.social}</td>
                    <td>{item.scc}</td>
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
                  <th className="text-center">จำนวนแผนทั้งหมด {filteredData.length || multis.length}</th>
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
          <div className="row p-3">
            <div className="col-md-4">
              <Inputs
                label="ค่าทางเศรษฐศาสตร์"
                name="enocomy"
                type="text"
                formStyle='form-control'
                placeholder={modalData ? "แก้ไขค่าทางเศรษฐศาสตร์" : "เพิ่มค่าทางเศรษฐศาสตร์"}
                register={modalRegister}
                rules={{
                  required: "ระบุ ค่าทางเศรษฐศาสตร์", 
                  pattern: {
                    value: /^[0-9]+(\.[0-9]+)?$/,  // regex สำหรับตัวเลขและทศนิยม
                    message: "กรุณากรอกเฉพาะตัวเลขหรือเลขทศนิยม"
                  }
                }}
                errors={modalErrors}
              />
              </div>
              <div className="col-md-4">
              <Inputs
                label="ค่าทางสังคม"
                name="social"
                 formStyle='form-control'
                type="text"
                placeholder={modalData ? "แก้ไขค่าทางสังคม" : "เพิ่มค่าทางสังคม"}
                register={modalRegister}
                rules={{ required: "ระบุ ค่าทางสังคม",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]+)?$/,  // regex สำหรับตัวเลขและทศนิยม
                    message: "กรุณากรอกเฉพาะตัวเลขหรือเลขทศนิยม"
                  }
                 }}
                errors={modalErrors}
              />
              </div>
              <div className="col-md-4">
              <Inputs
                label="ต้นทุนคาร์บอนที่เกิดแก่สังคม"
                name="scc"
                 formStyle='form-control'
                type="text"
                placeholder={modalData ? "แก้ไขต้นทุนคาร์บอนที่เกิดแก่สังคม" : "เพิ่มต้นทุนคาร์บอนที่เกิดแก่สังคม"}
                register={modalRegister}
                rules={{ required: "ระบุ  ต้นทุนคาร์บอนที่เกิดแก่สังคม",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]+)?$/,  // regex สำหรับตัวเลขและทศนิยม
                    message: "กรุณากรอกเฉพาะตัวเลขหรือเลขทศนิยม"
                  }
                 }}
                errors={modalErrors}
              />
              </div>
              <div className="col-md-4">
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
