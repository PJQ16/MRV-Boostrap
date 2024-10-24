import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { MdEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { useForm } from "react-hook-form";
import useStore from "../../store/useMileStoneStore";
import useMultiFactor from '../../store/useMultiFactorStore';
import Inputs from "../../components/Inputs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function MileStone() {
  const [modalData, setModalData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // useForm สำหรับการจัดการฟอร์มหลัก
  const { register, watch } = useForm();
  const search = watch("search", "");

  // useForm สำหรับฟอร์มใน Modal
  const {
    register: modalRegister,
    handleSubmit: handleModalSubmit,
    formState: { errors: modalErrors },
    reset,
    setValue,
  } = useForm();
  const  { multis, fetchMulti, addMulti, editMulti, removeMulti } = useMultiFactor();

  const {
    milestones,
    isLoading,
    error,
    fetchMileStone,
    addMileStone,
    editMileStone,
    removeMileStone,
  } = useStore();

  useEffect(() => {
    fetchMileStone();
    fetchMulti();
  }, []);

  useEffect(() => {
    const filtered = milestones.filter((item) => {
      // แปลงตัวเลขเป็น string และตรวจสอบว่ามีส่วนที่ตรงกัน
      const enocomyMatch =
        item.enocomy && item.enocomy.toString().includes(search);
      const socialMatch =
        item.social && item.social.toString().includes(search);
      const sccMatch = item.scc && item.scc.toString().includes(search);

      // ตรวจสอบว่าตรงกับเงื่อนไขใดเงื่อนไขหนึ่ง
      return enocomyMatch || socialMatch || sccMatch;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, milestones]);

  const handleData = (setData) => {
    setModalData(setData);
    if (setData) {
      setValue("period_type", setData.period_type);
      setValue("actual_year", setData.actual_year);
      setValue("multifactor_id", setData.multifactor_id);
      setValue("active", setData.active);  // กำหนดค่า active ตามข้อมูลที่ได้มา
    } else {
      reset();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (filteredData.length ? filteredData : milestones).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    (filteredData.length ? filteredData : milestones).length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onSubmitModal = async (data) => {
    const res = await Swal.fire({
      icon: "question",
      title: modalData ? "ยืนยันการแก้ไขข้อมูล?" : "ยืนยันการเพิ่มข้อมูล?",
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      try {
        if (modalData) {
          await editMileStone({ id: modalData.id, ...data });
          toast.success("แก้ไขข้อมูลสำเร็จ", {
            autoClose: 600,
            position: "top-center",
          });
        } else {
         
          await addMileStone(data);   
          toast.success("เพิ่มข้อมูลสำเร็จ", { autoClose: 600 });
        }
        document.getElementById("modalClose").click();
        // ดำเนินการต่อเมื่อการอัปเดตสำเร็จ
        fetchMileStone(); // ตรวจสอบว่าฟังก์ชันนี้ทำงานถูกต้อง
        reset();
        setModalData(null);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล",{autoClose:600});
      }
    }
  };

  const handleRemove = async (id) => {
    const res = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบข้อมูล?",
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await removeMileStone(id);
      toast.success("ลบข้อมูลสำเร็จ", { autoClose: 600 });
      fetchMileStone();
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
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
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
                  <th>คำอธิบายปี Mile Stone</th>
                  <th>ปี</th>
                  <th>Multi Factor</th>
                  <th>สถานะ</th>
                  <th>จัดการข้อมูล</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="text-center" key={item.id}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.period_type}</td>
                    <td>{item.actual_year}</td>
                    <td>{item.multifactor_id}</td>
                    <td>{item.active}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleData(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#planModal"
                      >
                        <MdEdit /> แก้ไข
                      </button>
                      <button
                        className="btn mx-2"
                        style={{ backgroundColor: "#ed8517" }}
                      >
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
                  <th className="text-center">
                    จำนวนแผนทั้งหมด {filteredData.length || milestones.length}
                  </th>
                  <th className="text-start" colSpan={2}></th>
                </tr>
              </tfoot>
            </Table>

            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                      style={{
                        backgroundColor:
                          currentPage === index + 1 ? "#FFA500" : "white",
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
        title={modalData ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
        id="planModal"
        motion="fade"
        size="modal-xl"
      >
        <form onSubmit={handleModalSubmit(onSubmitModal)}>
          <div className="row p-3">
            <div className="col-md-4">
              <Inputs
                label="คำอธิบายปี Mile Stone"
                name="period_type"
                formStyle="form-control"
                type="text"
                placeholder={
                  modalData
                    ? "แก้ไขคำอธิบายปี mile stone"
                    : "เพิ่มคำอธิบายปี mile stone"
                }
                register={modalRegister}
                rules={{
                  required: "โปรระบุ คำอธิบายปี mile stone",
                }}
                errors={modalErrors}
              />
            </div>

            <div className="col-md-4">
              <Inputs
                label="ปี"
                name="actual_year"
                formStyle="form-control"
                type="text" // Keep the input type as text to allow validation flexibility
                placeholder={modalData ? "แก้ไขปี" : "เพิ่มปี"}
                register={modalRegister}
                rules={{
                  required: "โปรดระบุ ปี", // Required field validation
                  pattern: {
                    value: /^[0-9]{4}$/, // Ensures only 4 digits are allowed
                    message: "โปรดระบุปีในรูปแบบ YYYY (ตัวเลข 4 หลัก)",
                  },
                }}
                errors={modalErrors}
              />
            </div>

            <div className="col-md-4">
            <Inputs
              label="Multi Factor"
              name="multifactor_id"
              formStyle="form-control"
              type="select"
              placeholder={modalData ? "แก้ไขMulti Factor" : "เพิ่มMulti Factor"}
              register={modalRegister}
              rules={{
                required: "โปรดเลือกMulti Factor", // Required field validation
              }}
              options={multis.map((item) => ({
                value: item.id,
                label: `enomony = ${item.enocomy}, social = ${item.social}, SCC = ${item.scc}`,
              }))} // Corrected map usage to generate the options dynamically
              errors={modalErrors}
            />
            </div>
            <div className="d-flex col-md-3">
  <label className="form-label">สถานะ</label>
  <div className="form-check mx-2 mt-4">
    <input
      className="form-check-input"
      type="radio"
      name="active"
      value="1"  // ส่งค่า 1 สำหรับสถานะ Active
      {...modalRegister("active", {
        required: "โปรดระบุสถานะ",
      })}
      defaultChecked={modalData && modalData.active === "1"}  // กำหนดค่าเริ่มต้น
    />
    <label className="form-check-label" htmlFor="active">
      ใช้งาน
    </label>
  </div>
  <div className="form-check mx-2 mt-4">
    <input
      className="form-check-input"
      type="radio"
      name="active"
      value="0"  // ส่งค่า 0 สำหรับสถานะ Inactive
      {...modalRegister("active")}
      defaultChecked={modalData && modalData.active === "0"}  // กำหนดค่าเริ่มต้น
    />
    <label className="form-check-label" htmlFor="inactive">
      ไม่ใช้งาน
    </label>
  </div>

  {/* แสดง error หากมี validation */}
  {modalErrors.active && (
    <span className="text-danger blockquote-footer ms-2">
      {modalErrors.active.message}
    </span>
  )}
</div>


            <div className="col-md-12 mt-1">
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