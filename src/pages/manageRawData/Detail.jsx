import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { MdEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { useForm } from "react-hook-form";
import useStore from '../../store/useDetailStore';
import Inputs from '../../components/Inputs';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useTargetStore from '../../store/useTargetStore';
import useMileStoneStore from '../../store/useMileStoneStore'
import usePlanStore from '../../store/usePlanStore'
import useSubCateStore from '../../store/useSubCateStore'
import usePeriodStore from '../../store/usePeriodStore';
import useSubTarget from '../../store/useSubTarget';
export default function Detail() {
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

  const { details, isLoading, error, fetchDetail, addDetail, editDetail, removeDetail } = useStore();
  const { targets,fetchTarget } = useTargetStore();
  const {  milestones,fetchMileStone} = useMileStoneStore();
  const { plans,fetchPlan } = usePlanStore();
  const { subcategorys, fetchSubcategory } = useSubCateStore();
  const { periods,fetchPeriods } = usePeriodStore();
  const { subTargets,fetchSubTarget } =useSubTarget();



  useEffect(() => {
    fetchDetail();
    fetchTarget();
    fetchMileStone();
    fetchPlan();
    fetchSubcategory();
    fetchPeriods();
    fetchSubTarget();
  }, []);

  useEffect(() => {
    const filtered = details.filter(item =>
      item.desciption && item.desciption.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [search, details]);
  
  const handleData = (setData) => {
    setModalData(setData);
    if (setData) {
      setValue('desciption', setData.desciption);
      setValue('unit', setData.unit);
      setValue('plan_id', setData.plan_id);
      setValue('categories_id', setData.categories_id);
      setValue('periods_id', setData.periods_id);
      setValue('user_plan_id', setData.user_plan_id);
      setValue('user_input_id', setData.user_input_id);
      setValue('user_verify_id', setData.user_verify_id);
      setValue('sub_target_id', setData.sub_target_id);
      setValue('capex', setData.capex);
      setValue('opex', setData.opex);
      setValue('opex_ratio', setData.opex_ratio);
      setValue('social_investment', setData.social_investment);
      setValue('social_income', setData.social_income);
      setValue('ghg_co2', setData.ghg_co2);
    } else {
      reset(); 
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (filteredData.length ? filteredData : details).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    (filteredData.length ? filteredData : details).length / itemsPerPage
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
          await editDetail({ id: modalData.id, ...data });
          toast.success('แก้ไขข้อมูลสำเร็จ', { autoClose: 600,position:'top-center' });
        } else {
          await addDetail(data);
          toast.success('เพิ่มข้อมูลสำเร็จ', { autoClose: 600 });
        }
        document.getElementById('modalClose').click();
        // ดำเนินการต่อเมื่อการอัปเดตสำเร็จ
        fetchDetail(); // ตรวจสอบว่าฟังก์ชันนี้ทำงานถูกต้อง
        reset(); 
        setModalData(null);
      } catch (error) {
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล',{autoClose:600,position:'top-center'});
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
      await removeDetail(id);
      toast.success('ลบข้อมูลสำเร็จ', { autoClose: 600,position:'top-center' });
      fetchDetail();
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
                  <th>คำอธิบาย</th>
                  <th>หน่วย</th>
                  <th>แผน</th>
                  <th>หมวดหมู่</th>
                  <th>รูปแบบเวลาข้อมูล</th>
                  <th>เป้าหมายย่อย</th>
                  <th>ผู้กำหนดแผน</th>
                  <th>ผู้นำเข้าข้อมูล</th>
                  <th>ผู้ตรวจสอบ</th>
                  <th>capex</th>
                  <th>opex</th>
                  <th>สัดส่วน opex</th>
                  <th>การลงทุนทางสังคม</th>
                  <th>รายได้ทางสังคม</th>
                  <th>GHG CO<sub>2</sub></th>
                  <th>จัดการข้อมูล</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr className="text-center" key={item.id}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.desciption}</td>
                    <td>{item.unit}</td>
                    <td>{item.plan_id}</td>
                    <td>{item.categories_id}</td>
                    <td>{item.periods_id}</td>
                    <td>{item.user_plan_id}</td>
                    <td>{item.user_input_id}</td>
                    <td>{item.user_verify_id}</td>
                    <td>{item.sub_target_id}</td>
                    <td>{item.capex}</td>
                    <td>{item.opex}</td>
                    <td>{item.opex_ratio}</td>
                    <td>{item.social_investment}</td>
                    <td>{item.social_income}</td>
                    <td>{item.ghg_co2}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleData(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#planModal"
                      >
                        <MdEdit /> แก้ไข
                      </button>
                      <button className="btn m-2" style={{ backgroundColor: '#ed8517' }}>
                        <FaEye /> มองเห็น
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FaTrash /> ลบ
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-center">จำนวนแผนทั้งหมด {filteredData.length || details.length}</th>
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
        size="modal-xl"
      >
        <form onSubmit={handleModalSubmit(onSubmitModal)}>
          <div className="row pt-3 px-4">
            <div className="col-md-9">
              <Inputs
                label="คำอธิบาย"
                name="desciption"
                formStyle='form-control'
                type="text"
                placeholder={modalData ? "แก้ไขคำอธิบาย" : "เพิ่มคำอธิบาย"}
                register={modalRegister}
                rules={{ required: "ระบุคำอธิบาย" }}
                errors={modalErrors}
              />
          </div>
          <div className="col-md-3">
              <Inputs
                label="หน่วย"
                name="unit"
                formStyle='form-control'
                type="text"
                placeholder={modalData ? "แก้ไขหน่วย" : "เพิ่มหน่วย"}
                register={modalRegister}
                rules={{ required: "ระบุหน่วย" }}
                errors={modalErrors}
              />
          </div>
              <div className="col-md-3">
              <Inputs
                  label="แผน"
                  name="plan_id"
                  formStyle="form-control"
                  type="select"
                  placeholder={modalData ? "แก้ไขแผน" : "เพิ่มแผน"}
                  register={modalRegister}
                  rules={{
                    required: "โปรดเลือกแผน", // Required field validation
                  }}
                  options={plans.map((item) => ({
                    value: item.id,
                    label: `${item.name}`,
                  }))} // Corrected map usage to generate the options dynamically
                  errors={modalErrors}
                />
              </div>
              <div className="col-md-3">
              <Inputs
                  label="เป้าหมายย่อย"
                  name="sub_target_id"
                  formStyle="form-control"
                  type="select"
                  placeholder={modalData ? "แก้ไขเป้าหมายย่อย" : "เพิ่มเป้าหมายย่อย"}
                  register={modalRegister}
                  rules={{
                    required: "โปรดเลือกเป้าหมายย่อย", // Required field validation
                  }}
                  options={subTargets.map((item) => ({
                    value: item.id,
                    label: `${item.sub_target_name} ,${item.description}`,
                  }))} // Corrected map usage to generate the options dynamically
                  errors={modalErrors}
                />
              </div>
              <div className="col-md-3">
              <Inputs
                  label="หมวดหมู่"
                  name="categories_id"
                  formStyle="form-control"
                  type="select"
                  placeholder={modalData ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่"}
                  register={modalRegister}
                  rules={{
                    required: "โปรดเลือกหมวดหมู่", // Required field validation
                  }}
                  options={subcategorys.map((item) => ({
                    value: item.id,
                    label: `${item.category}`,
                  }))} // Corrected map usage to generate the options dynamically
                  errors={modalErrors}
                />
              </div>
              <div className="col-md-3">
              <Inputs
                  label="รูปแบบเวลาข้อมูล"
                  name="periods_id"
                  formStyle="form-control"
                  type="select"
                  placeholder={modalData ? "แก้ไขรูปแบบเวลาข้อมูล" : "เพิ่มรูปแบบเวลาข้อมูล"}
                  register={modalRegister}
                  rules={{
                    required: "โปรดเลือกรูปแบบเวลาข้อมูล", // Required field validation
                  }}
                  options={periods.map((item) => ({
                    value: item.id,
                    label: `${item.period_type}`,
                  }))} // Corrected map usage to generate the options dynamically
                  errors={modalErrors}
                />
              </div>
             
              <div className="col-md-4">
              <Inputs
                  label="ผู้กำหนดแผน"
                  name="user_plan_id"
                  formStyle="form-control"
                  type="select"
                  placeholder={modalData ? "แก้ไขผู้กำหนดแผน" : "เพิ่มผู้กำหนดแผน"}
                  register={modalRegister}
                  rules={{
                    required: "โปรดเลือกผู้กำหนดแผน", // Required field validation
                  }}
                  options={[
                    { value: 1, label: 'demo' },            // เพิ่มตัวอย่าง option
                  ]}
                  errors={modalErrors}
                />
              </div>
              <div className="col-md-4">
              <Inputs
                  label="ผู้นำเข้าข้อมูล"
                  name="user_input_id"
                  formStyle="form-control"
                  type="select"
                  placeholder={modalData ? "แก้ไขผู้นำเข้าข้อมูล" : "เพิ่มผู้นำเข้าข้อมูล"}
                  register={modalRegister}
                  rules={{
                    required: "โปรดเลือกผู้นำเข้าข้อมูล", // Required field validation
                  }}
                  options={[
                    { value: 1, label: 'demo' },            // เพิ่มตัวอย่าง option
                  ]}
                  errors={modalErrors}
                />
              </div>
              <div className="col-md-4">
              <Inputs
                  label="ผู้ตรวจสอบ"
                  name="user_verify_id"
                  formStyle="form-control"
                  type="select"
                  placeholder={modalData ? "แก้ไขผู้ตรวจสอบ" : "เพิ่มผู้ตรวจสอบ"}
                  register={modalRegister}
                  rules={{
                    required: "โปรดเลือกผู้ตรวจสอบ", // Required field validation
                  }}
                  options={[
                    { value: 1, label: 'demo' },            // เพิ่มตัวอย่าง option
                  ]}
                  errors={modalErrors}
                />
              </div>
              <div className="col-md-2">
              <Inputs
                label="ค่า capex"
                name="capex"
                formStyle='form-control'
                type="number"
                placeholder={modalData ? "แก้ไขค่า" : "เพิ่มค่า"}
                register={modalRegister}
                rules={{ required: "ระบุค่า" }}
                errors={modalErrors}
              />
              </div>
              <div className="col-md-2">
              <Inputs
                label="ค่า opex"
                name="opex"
                formStyle='form-control'
                type="number"
                placeholder={modalData ? "แก้ไขค่า" : "เพิ่มค่า"}
                register={modalRegister}
                rules={{ required: "ระบุค่า" }}
                errors={modalErrors}
              />
               </div>

               <div className="col-md-2">
              <Inputs
                label="สัดส่วน opex"
                name="opex_ratio"
                formStyle='form-control'
                type="number"
                placeholder={modalData ? "แก้ไขค่า" : "เพิ่มค่า"}
                register={modalRegister}
                rules={{ required: "ระบุค่า" }}
                errors={modalErrors}
              />
               </div>
               <div className="col-md-2">
              <Inputs
                label="การลงทุนทางสังคม "
                name="social_investment"
                formStyle='form-control'
                type="number"
                placeholder={modalData ? "แก้ไขค่า" : "เพิ่มค่า"}
                register={modalRegister}
                rules={{ required: "ระบุค่า" }}
                errors={modalErrors}
              />
               </div>
               <div className="col-md-2">
              <Inputs
                label="รายได้ต่อสังคม"
                name="social_income"
                formStyle='form-control'
                type="number"
                placeholder={modalData ? "แก้ไขค่า" : "เพิ่มค่า"}
                register={modalRegister}
                rules={{ required: "ระบุค่า" }}
                errors={modalErrors}
              />
               </div>
               <div className="col-md-2">
              <Inputs
                label={<>ค่า GHG CO<sub>2</sub></>}
                name="ghg_co2"
                formStyle='form-control'
                type="number"
                placeholder={modalData ? "แก้ไขค่า" : "เพิ่มค่า"}
                register={modalRegister}
                rules={{ required: "ระบุค่า" }}
                errors={modalErrors}
              />
               </div>
              
              
               <div className="col-md-3"></div>
              <button type="submit" className="btn btn-success my-3">
                {modalData ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มข้อมูล"}
              </button>
            </div>
          
        </form>
      </Modal>
    </Layout>
  );
}
