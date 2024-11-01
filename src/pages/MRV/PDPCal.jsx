import React from 'react'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
export default function PDPCal() {
    const navigate = useNavigate();
    const handleEditFillData = async()=>{
        const res = await Swal.fire(
            {
                icon:'question',
                title:'คุณต้องการแก้ไขและกรอกข้อมูลใช่หรือไม่',
                showCancelButton:true
            }
        );

        if(res.isConfirmed){
            navigate('/planingmidstone');
        }
    }
  return (
    <div>
        <Layout>
        <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
            <div className="border-0 bg-white shadow-sm  rounded p-5 m-4">
                    <span className='fw-bold h4'>2. ตารางคำนวณและแสดงผล PDP (Power Development Plan)</span>
                    <p className='mt-2 ps-2  h5 fw-light'>2.1 ตารางคำนวณและแสดงผลสำหรับ target 1.1.2</p>
                    <Table tbSty='table '>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th colSpan={2}>ปี 2566</th>
                                <th colSpan={2}>ปี 2567</th>
                                <th colSpan={2}>ปี 2568</th>
                                <th colSpan={2}>ปี 2569</th>
                                <th colSpan={2}>ปี 2570</th>
                                <th colSpan={2}>ปี 2571</th>
                                <th colSpan={2}>ปี 2572</th>
                                <th colSpan={2}>ปี 2573</th>
                                <th colSpan={2}>ปี 2574</th>
                                <th colSpan={2}>ปี 2575</th>
                                <th colSpan={2}>ปี 2576</th>
                                <th colSpan={2}>ปี 2577</th>
                                <th colSpan={2}>ปี 2578</th>
                                <th colSpan={2}>ปี 2579</th>
                                <th colSpan={2}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                               
                                <th>แผน</th>
                                <th>ผล</th>
                               
                                <th>แผน</th>
                                <th>ผล</th>
                              
                                <th>แผน</th>
                                <th>ผล</th>
                                
                                <th>แผน</th>
                                <th>ผล</th>
                               
                                <th>แผน</th>
                                <th>ผล</th>
                                
                                <th>แผน</th>
                                <th>ผล</th>
                               
                                <th>แผน</th>
                                <th>ผล</th>
                           
                                <th>แผน</th>
                                <th>ผล</th>
                              
                                <th>แผน</th>
                                <th>ผล</th>
                               
                                <th>แผน</th>
                                <th>ผล</th>
                              
                                <th>แผน</th>
                                <th>ผล</th>
                                
                                <th>แผน</th>
                                <th>ผล</th>
                                
                                <th>แผน</th>
                                <th>ผล</th>
                               
                                <th>แผน</th>
                                <th>ผล</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                        <td className='text-nowrap'>ดัชนีโอกาสเกิดไฟฟ้าดับ (LOLE)</td>
                            <td>วัน/ปี</td>
                            <td>0.7</td>
                            <td>0.6</td>
                        </tr>    
                        </tbody>
                    </Table>

                    <p className='mt-2 ps-2  h5 fw-light'>2.2 ตารางคำนวณและแสดงผลสำหรับ target 1.2.1</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>พื้นที่</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th rowSpan={2}>หน่วยงาน</th>
                                <th colSpan={2}>ปี 2566</th>
                                <th colSpan={2}>ปี 2567</th>
                                <th colSpan={2}>ปี 2568</th>
                                <th colSpan={2}>ปี 2569</th>
                                <th colSpan={2}>ปี 2570</th>
                                <th colSpan={2}>ปี 2571</th>
                                <th colSpan={2}>ปี 2572</th>
                                <th colSpan={2}>ปี 2573</th>
                                <th colSpan={2}>ปี 2574</th>
                                <th colSpan={2}>ปี 2575</th>
                                <th colSpan={2}>ปี 2576</th>
                                <th colSpan={2}>ปี 2577</th>
                                <th colSpan={2}>ปี 2578</th>
                                <th colSpan={2}>ปี 2579</th>
                                <th colSpan={2}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>                             
                                <th>แผน</th>
                                <th>ผล</th>              
                                <th>แผน</th>
                                <th>ผล</th>           
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>     
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        <tr className='text-center'>
                            <td rowSpan={3}>1</td>
                            <td rowSpan={3} className='text-nowrap'>ค่าเฉลี่ยของจำนวนครั้งที่ไฟฟ้าดับ (SAIFI)</td>
                            <td className='text-nowrap'>กรุงเทพและปริมณฑล</td>
                            <td className='text-nowrap'>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟน.</td>
                            <td>0.88</td>
                            <td>0.569</td>
                        </tr>
                        <tr>
                            <td>พื้นที่อื่นๆ</td>
                            <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟภ.</td>
                            <td>2.7</td>
                            <td>1.46</td>
                        </tr>
                        <tr>
                            <td>พื้นที่สัมปทานกิจการไฟฟ้ากองทัพเรือ</td>
                            <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟภ.</td>
                            <td>4.92</td>
                            <td>0</td>
                        </tr>
                        <tr className='text-center'>
                            <td rowSpan={3}>2</td>
                            <td rowSpan={3} className='text-nowrap'>ค่าเฉลี่ยของระยะเวลาที่ไฟฟ้าดับ (SAIDI)</td>
                            <td className='text-nowrap'>กรุงเทพและปริมณฑล</td>
                            <td className='text-nowrap'>นาที/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟน.</td>
                            <td>26.96</td>
                            <td>19.847</td>
                        </tr>
                        <tr>
                            <td>พื้นที่อื่นๆ</td>
                            <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟภ.</td>
                            <td>60.13</td>
                            <td>27.58</td>
                        </tr>
                        <tr>
                            <td>พื้นที่สัมปทานกิจการไฟฟ้ากองทัพเรือ</td>
                            <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td></td>
                            <td>114.17</td>
                            <td>0</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p className='mt-2 ps-2  h5 fw-light'>2.3 ตารางคำนวณและแสดงผลสำหรับ target 2.1.1</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th rowSpan={2}>หน่วยงาน</th>
                                <th colSpan={2}>ปี 2566</th>
                                <th colSpan={2}>ปี 2567</th>
                                <th colSpan={2}>ปี 2568</th>
                                <th colSpan={2}>ปี 2569</th>
                                <th colSpan={2}>ปี 2570</th>
                                <th colSpan={2}>ปี 2571</th>
                                <th colSpan={2}>ปี 2572</th>
                                <th colSpan={2}>ปี 2573</th>
                                <th colSpan={2}>ปี 2574</th>
                                <th colSpan={2}>ปี 2575</th>
                                <th colSpan={2}>ปี 2576</th>
                                <th colSpan={2}>ปี 2577</th>
                                <th colSpan={2}>ปี 2578</th>
                                <th colSpan={2}>ปี 2579</th>
                                <th colSpan={2}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>                             
                                <th>แผน</th>
                                <th>ผล</th>              
                                <th>แผน</th>
                                <th>ผล</th>           
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>     
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        <tr className='text-center'>
                            <td rowSpan={3}>1</td>
                            <td rowSpan={3} className='text-nowrap'>ปริมาณการปล่อย CO2</td>
                           
                            <td className='text-nowrap'>MtCO2</td>
                            <td>กฟน.</td>
                            <td>250</td>
                            <td>300</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p className='mt-2 ps-2  h5 fw-light'>2.4 ตารางคำนวณและแสดงผลสำหรับ target 2.4.1</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th rowSpan={2}>หน่วยงาน</th>
                                <th colSpan={2}>ปี 2566</th>
                                <th colSpan={2}>ปี 2567</th>
                                <th colSpan={2}>ปี 2568</th>
                                <th colSpan={2}>ปี 2569</th>
                                <th colSpan={2}>ปี 2570</th>
                                <th colSpan={2}>ปี 2571</th>
                                <th colSpan={2}>ปี 2572</th>
                                <th colSpan={2}>ปี 2573</th>
                                <th colSpan={2}>ปี 2574</th>
                                <th colSpan={2}>ปี 2575</th>
                                <th colSpan={2}>ปี 2576</th>
                                <th colSpan={2}>ปี 2577</th>
                                <th colSpan={2}>ปี 2578</th>
                                <th colSpan={2}>ปี 2579</th>
                                <th colSpan={2}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>                             
                                <th>แผน</th>
                                <th>ผล</th>              
                                <th>แผน</th>
                                <th>ผล</th>           
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>     
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        <tr className='text-center'>
                            <td rowSpan={3}>1</td>
                            <td rowSpan={3} className='text-nowrap'>มีแผนงาน/โครงการ ส่งเสริม/สนับสนุนการใช้ พลังงานทางเลือกรูปแบบใหม่</td>
                            <td className='text-nowrap'>แผน</td>
                            <td>กฟน.</td>
                            <td>15</td>
                            <td>4</td>
                        </tr>
                        </tbody>
                    </Table>


                    <p className='mt-2 ps-2  h5 fw-light'>2.5 ตารางคำนวณและแสดงผลสำหรับ target 3.1.2</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th rowSpan={2}>หน่วยงาน</th>
                                <th colSpan={2}>ปี 2566</th>
                                <th colSpan={2}>ปี 2567</th>
                                <th colSpan={2}>ปี 2568</th>
                                <th colSpan={2}>ปี 2569</th>
                                <th colSpan={2}>ปี 2570</th>
                                <th colSpan={2}>ปี 2571</th>
                                <th colSpan={2}>ปี 2572</th>
                                <th colSpan={2}>ปี 2573</th>
                                <th colSpan={2}>ปี 2574</th>
                                <th colSpan={2}>ปี 2575</th>
                                <th colSpan={2}>ปี 2576</th>
                                <th colSpan={2}>ปี 2577</th>
                                <th colSpan={2}>ปี 2578</th>
                                <th colSpan={2}>ปี 2579</th>
                                <th colSpan={2}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>                             
                                <th>แผน</th>
                                <th>ผล</th>              
                                <th>แผน</th>
                                <th>ผล</th>           
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>     
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        <tr className='text-center'>
                            <td rowSpan={3}>1</td>
                            <td rowSpan={3} className='text-nowrap'>จัดทำนโยบายการปรับโครงสร้างการแข่งขันในกิจการไฟฟ้าเพื่อส่งเสริมให้เกิดการเปิดเสรีในกิจการไฟฟ้า</td>
                            <td className='text-nowrap'>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟน.</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p className='mt-2 ps-2  h5 fw-light'>2.6 ตารางคำนวณและแสดงผลสำหรับ target 3.2.2</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th rowSpan={2}>หน่วยงาน</th>
                                <th colSpan={2}>ปี 2566</th>
                                <th colSpan={2}>ปี 2567</th>
                                <th colSpan={2}>ปี 2568</th>
                                <th colSpan={2}>ปี 2569</th>
                                <th colSpan={2}>ปี 2570</th>
                                <th colSpan={2}>ปี 2571</th>
                                <th colSpan={2}>ปี 2572</th>
                                <th colSpan={2}>ปี 2573</th>
                                <th colSpan={2}>ปี 2574</th>
                                <th colSpan={2}>ปี 2575</th>
                                <th colSpan={2}>ปี 2576</th>
                                <th colSpan={2}>ปี 2577</th>
                                <th colSpan={2}>ปี 2578</th>
                                <th colSpan={2}>ปี 2579</th>
                                <th colSpan={2}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>                             
                                <th>แผน</th>
                                <th>ผล</th>              
                                <th>แผน</th>
                                <th>ผล</th>           
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>     
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        <tr className='text-center'>
                            <td rowSpan={3}>1</td>
                            <td rowSpan={3} className='text-nowrap'>มีการปรับปรุงกฎหมาย กฎระเบียบด้านก๊าซธรรมชาติ เพื่อรองรับจัดตั้ง Transmission System Opeator (TSO) เป็นนิติบุคคล</td>
                            <td className='text-nowrap'>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟน.</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p className='mt-2 ps-2  h5 fw-light'>2.7 ตารางคำนวณและแสดงผลสำหรับ target 3.3.1</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th rowSpan={2}>หน่วยงาน</th>
                                <th colSpan={2}>ปี 2566</th>
                                <th colSpan={2}>ปี 2567</th>
                                <th colSpan={2}>ปี 2568</th>
                                <th colSpan={2}>ปี 2569</th>
                                <th colSpan={2}>ปี 2570</th>
                                <th colSpan={2}>ปี 2571</th>
                                <th colSpan={2}>ปี 2572</th>
                                <th colSpan={2}>ปี 2573</th>
                                <th colSpan={2}>ปี 2574</th>
                                <th colSpan={2}>ปี 2575</th>
                                <th colSpan={2}>ปี 2576</th>
                                <th colSpan={2}>ปี 2577</th>
                                <th colSpan={2}>ปี 2578</th>
                                <th colSpan={2}>ปี 2579</th>
                                <th colSpan={2}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>                             
                                <th>แผน</th>
                                <th>ผล</th>              
                                <th>แผน</th>
                                <th>ผล</th>           
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>     
                                <th>แผน</th>
                                <th>ผล</th>   
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>แผน</th>
                                <th>ผล</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        <tr className='text-center'>
                            <td rowSpan={3}>1</td>
                            <td rowSpan={3} className='text-nowrap'>มีโครงสร้างราคาก๊าซธรรมชาติที่สอดคล้องตามการส่งเสริมการแข่งขันในกิจการก๊าซธรรมชาติ ระยะที่ 2</td>
                            <td className='text-nowrap'>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                            <td>กฟน.</td>
                            <td>1</td>
                            <td>6</td>
                        </tr>
                        </tbody>
                    </Table>


                    <p className='mt-2 ps-2  h5 fw-light'>2.8 ตารางคำนวณและแสดงผลปริมาณไฟฟ้าตามแผน PDP</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th colSpan={3}>ปี 2566</th>
                                <th colSpan={3}>ปี 2567</th>
                                <th colSpan={3}>ปี 2568</th>
                                <th colSpan={3}>ปี 2569</th>
                                <th colSpan={3}>ปี 2570</th>
                                <th colSpan={3}>ปี 2571</th>
                                <th colSpan={3}>ปี 2572</th>
                                <th colSpan={3}>ปี 2573</th>
                                <th colSpan={3}>ปี 2574</th>
                                <th colSpan={3}>ปี 2575</th>
                                <th colSpan={3}>ปี 2576</th>
                                <th colSpan={3}>ปี 2577</th>
                                <th colSpan={3}>ปี 2578</th>
                                <th colSpan={3}>ปี 2579</th>
                                <th colSpan={3}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td className='text-nowrap'>กำลังผลิตไฟฟ้า ณ ธ.ค. 2566</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td className='text-nowrap'>กำลังการผลิตไฟฟ้าใหม่</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td className='text-nowrap'>กำลังผลิตไฟฟ้าที่ปรับออกจากระบบ</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td className='text-nowrap'>รวมกำลังผลิตตามสัญญาทั้งสิ้น</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                           
                        </tbody>
                    </Table>

                    <p className='mt-2 ps-2 h5 fw-light'>2.9 ตารางคำนวณและแสดงผลสำหรับข้อมูลอื่นๆ</p>
                    <Table tbSty='table'>
                        <thead className='table-primary'>
                            <tr className='text-center '>
                                <th rowSpan={2}>ลำดับ</th>
                                <th rowSpan={2}>รานละเอียด</th>
                                <th rowSpan={2}>หน่วย</th>
                                <th colSpan={3}>ปี 2566</th>
                                <th colSpan={3}>ปี 2567</th>
                                <th colSpan={3}>ปี 2568</th>
                                <th colSpan={3}>ปี 2569</th>
                                <th colSpan={3}>ปี 2570</th>
                                <th colSpan={3}>ปี 2571</th>
                                <th colSpan={3}>ปี 2572</th>
                                <th colSpan={3}>ปี 2573</th>
                                <th colSpan={3}>ปี 2574</th>
                                <th colSpan={3}>ปี 2575</th>
                                <th colSpan={3}>ปี 2576</th>
                                <th colSpan={3}>ปี 2577</th>
                                <th colSpan={3}>ปี 2578</th>
                                <th colSpan={3}>ปี 2579</th>
                                <th colSpan={3}>ปี 2580</th>
                            </tr>
                            <tr>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                                <th>แผน</th>
                                <th>ผล</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td className='text-nowrap'>กำลังผลิตพึ่งได้กลางวัน</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td className='text-nowrap'>กำลังผลิตพึ่งได้กลางคืน</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td className='text-nowrap'>Peak Load</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td className='text-nowrap'>ปริมาณการปล่อย CO2</td>
                            <td>MW</td>
                            <td>2000</td>
                            <td>3000</td>
                            <td>150%</td>
                        </tr>
                           
                        </tbody>
                    </Table>


                    <p className='mt-2 ps-2 h5 fw-light'>2.10 ตารางคำนวณและแสดงผลสำหรับ co-benefit</p>
                        <Table tbSty='table'>
                            <thead>
                                <tr className='text-center'>
                                    <th rowSpan={2} className='table-primary'>PDP</th>
                                    <th colSpan={2} className='table-danger'>Input</th>
                                    <th colSpan={12} className='table-primary'>Assumptions</th>
                                </tr>
                                <tr className='text-center text-nowrap '>
                                    <th className='table-danger'>กำลังการผลิตไฟฟ้าใหม่</th>
                                    <th className='table-danger'>หน่วย</th>
                                    <th className='table-primary'>การลงทุนที่เกิดขึ้นใหม่</th>
                                    <th className='table-primary'>หน่วย</th>
                                    <th className='table-primary'>การจ้างงานใหม่</th>
                                    <th className='table-primary'>หน่วย</th>
                                    <th className='table-primary'>รายได้ที่เกิดขึ้นใหม่</th>
                                    <th className='table-primary'>หน่วย</th>
                                    <th className='table-primary'>เม็ดเงินที่ลงไปสู่ เกษตรกร และชุมชน</th>
                                    <th className='table-primary'>หน่วย</th>
                                    <th className='table-primary'>มูลค่าการซื้อขายพลังงานใหม่จากเทคโนโลยีใหม่</th>
                                    <th className='table-primary'>หน่วย</th>
                                    <th className='table-primary'>ปริมาณ GHG ที่ลดได้</th>
                                    <th className='table-primary'>หน่วย</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr className='text-center text-nowrap '>
                                    <td>โรงไฟฟ้าพลังงานหมุนเวียน</td>
                                    <td>800</td>
                                    <td>MW</td>
                                    <td>700000</td>
                                    <td>THB/MW</td>
                                    <td>0.5</td>
                                    <td>คน/MW</td>
                                    <td>30000</td>
                                    <td>THB/คน/เดือน</td>
                                    <td></td>
                                    <td>THB/MW</td>
                                    <td></td>
                                    <td>THB</td>
                                    <td>1</td>
                                    <td>ton CO2e/MW</td>
                                </tr>
                                <tr className='text-center text-nowrap '>
                                    <td>โรงไฟฟ้าพลังความร้อนร่วม</td>
                                    <td>800</td>
                                    <td>MW</td>
                                    <td>700000</td>
                                    <td>THB/MW</td>
                                    <td>0.5</td>
                                    <td>คน/MW</td>
                                    <td>30000</td>
                                    <td>THB/คน/เดือน</td>
                                    <td></td>
                                    <td>THB/MW</td>
                                    <td></td>
                                    <td>THB</td>
                                    <td>1</td>
                                    <td>ton CO2e/MW</td>
                                </tr>
                                <tr className='text-center text-nowrap '>
                                    <td>โรงไฟฟ้าพลังความร้อน</td>
                                    <td>800</td>
                                    <td>MW</td>
                                    <td>700000</td>
                                    <td>THB/MW</td>
                                    <td>0.5</td>
                                    <td>คน/MW</td>
                                    <td>30000</td>
                                    <td>THB/คน/เดือน</td>
                                    <td></td>
                                    <td>THB/MW</td>
                                    <td></td>
                                    <td>THB</td>
                                    <td>1</td>
                                    <td>ton CO2e/MW</td>
                                </tr>
                                <tr className='text-center text-nowrap '>
                                    <td>รับซื้อไฟฟ้าจากต่างประเทศ</td>
                                    <td>800</td>
                                    <td>MW</td>
                                    <td>700000</td>
                                    <td>THB/MW</td>
                                    <td>0.5</td>
                                    <td>คน/MW</td>
                                    <td>30000</td>
                                    <td>THB/คน/เดือน</td>
                                    <td></td>
                                    <td>THB/MW</td>
                                    <td></td>
                                    <td>THB</td>
                                    <td>1</td>
                                    <td>ton CO2e/MW</td>
                                </tr>
                                <tr className='text-center text-nowrap '>
                                    <td>พลังน้ำแบบสูบกลับ</td>
                                    <td>800</td>
                                    <td>MW</td>
                                    <td>700000</td>
                                    <td>THB/MW</td>
                                    <td>0.5</td>
                                    <td>คน/MW</td>
                                    <td>30000</td>
                                    <td>THB/คน/เดือน</td>
                                    <td></td>
                                    <td>THB/MW</td>
                                    <td></td>
                                    <td>THB</td>
                                    <td>1</td>
                                    <td>ton CO2e/MW</td>
                                </tr>
                                <tr className='text-center text-nowrap '>
                                    <td>ระบบกักเก็บพลังงานแบบแบตเตอร์รี่</td>
                                    <td>800</td>
                                    <td>MW</td>
                                    <td>700000</td>
                                    <td>THB/MW</td>
                                    <td>0.5</td>
                                    <td>คน/MW</td>
                                    <td>30000</td>
                                    <td>THB/คน/เดือน</td>
                                    <td></td>
                                    <td>THB/MW</td>
                                    <td></td>
                                    <td>THB</td>
                                    <td>1</td>
                                    <td>ton CO2e/MW</td>
                                </tr>
                                <tr className='text-center text-nowrap '>
                                    <td>อื่นๆ (DR, V2G)</td>
                                    <td>800</td>
                                    <td>MW</td>
                                    <td>700000</td>
                                    <td>THB/MW</td>
                                    <td>0.5</td>
                                    <td>คน/MW</td>
                                    <td>30000</td>
                                    <td>THB/คน/เดือน</td>
                                    <td></td>
                                    <td>THB/MW</td>
                                    <td></td>
                                    <td>THB</td>
                                    <td>1</td>
                                    <td>ton CO2e/MW</td>
                                </tr>
                            </tbody>
                        </Table>
                        
                   
                   <button onClick={handleEditFillData} className='btn btn-warning'><CiEdit fontSize={35} style={{backgroundColor:'white',borderRadius:360,padding:'10px',color:'black'}}/> แก้ไขข้อมูล</button>
            </div>
            </motion.div>
        </Layout>
    </div>
  )
}
