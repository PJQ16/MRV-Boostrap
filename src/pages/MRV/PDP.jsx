import React from 'react'
import Accordion from "../../components/Accordion";
import Table from '../../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaSave } from "react-icons/fa";
import Card from '../../components/Card';

export default function PDP() {
    const navigate = useNavigate();
    const handleCalculate = async() =>{
     const res =  await Swal.fire({
        icon:'question',
        title:'ท่านต้องการบันทึกข้อมูลใช่หรือไม่?',
        showCancelButton:true
       });


       if(res.isConfirmed){
        toast.success('บันทึกข้อมูสำเร็จ' ,{autoClose:600,position:'top-center'});
        navigate('/pdpCalculate')
       }

       
    }

    
    const accordionItems = [
        {
          title: "ไฟฟ้า",
          content: (
            <Table tbSty="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ลำดับ</th>
                  <th>รายละเอียด</th>
                  <th>หน่วย</th>
                  <th>แผน</th>
                  <th>ผล</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>1</td>
                  <td>ดัชนีโอกาสเกิดไฟฟ้าดับ (LOLE)</td>
                  <td>วัน/ปี</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>กำลังผลิตพึ่งได้กลางวัน</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>3</td>
                  <td>กำลังผลิตพึ่งได้กลางคืน</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>4</td>
                  <td>Peak Load</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>5</td>
                  <td>ปริมาณการปล่อย CO2</td>
                  <td>MtCO<sub>2</sub></td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                  
                      placeholder=''
                      readOnly
                      data-bs-toggle="modal"
                      data-bs-target="#monthlyModal"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                     
                      placeholder=''
                      readOnly
                      data-bs-toggle="modal"
                      data-bs-target="#monthlyModal"
                    />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>6</td>
                  <td>กำลังผลิตไฟฟ้า ณ ธ.ค. 2566</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                
              </tbody>
            </Table>
          ),
        },
        {
          title: "กำลังการผลิตไฟฟ้าใหม่",
          content: (
            <Table tbSty="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ลำดับ</th>
                  <th>รายละเอียด</th>
                  <th>หน่วย</th>
                  <th>แผน</th>
                  <th>ผล</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>1</td>
                  <td>โรงไฟฟ้าพลังงานหมุนเวียน</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>โรงไฟฟ้าพลังความร้อนร่วม</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>3</td>
                  <td>โรงไฟฟ้าพลังความร้อน</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>4</td>
                  <td>รับซื้อไฟฟ้าจากต่างประเทศ</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>5</td>
                  <td>พลังน้ำแบบสูบกลับ</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>6</td>
                  <td>ระบบกักเก็บพลังงานแบบแบตเตอร์รี่</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>7</td>
                  <td>อื่นๆ (DR, V2G)</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
              </tbody>
            </Table>
          ),
        },
        {
          title: "กำลังผลิตไฟฟ้าที่ปรับออกจากระบบ",
          content: (
            <Table tbSty="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ลำดับ</th>
                  <th>รายละเอียด</th>
                  <th>หน่วย</th>
                  <th>แผน</th>
                  <th>ผล</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>1</td>
                  <td>โรงไฟฟ้าพลังงานหมุนเวียน</td>
                  <td>วัน/ปี</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>โรงไฟฟ้าพลังความร้อนร่วม</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>3</td>
                  <td>โรงไฟฟ้าพลังความร้อน</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>4</td>
                  <td>รับซื้อไฟฟ้าจากต่างประเทศ</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>4</td>
                  <td>พลังน้ำแบบสูบกลับ</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>4</td>
                  <td>ระบบกักเก็บพลังงานแบบแบตเตอร์รี่</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>4</td>
                  <td>อื่นๆ (DR, V2G)</td>
                  <td>MW</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                
              </tbody>
            </Table>
          ),
        },
        {
          title: "ค่าเฉลี่ยของจำนวนครั้งที่ไฟฟ้าดับ (SAIFI)",
          content: (
            <Table tbSty="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ลำดับ</th>
                  <th>รายละเอียด</th>
                  <th>หน่วย</th>
                  <th>แผน</th>
                  <th>ผล</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>1</td>
                  <td>กรุงเทพและปริมณฑล</td>
                  <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>พื้นที่อื่นๆ</td>
                  <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>3</td>
                  <td>พื้นที่สัมปทานกิจการไฟฟ้ากองทัพเรือ</td>
                  <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
              </tbody>
            </Table>
          ),
        },
        {
          title: "ค่าเฉลี่ยของระยะเวลาที่ไฟฟ้าดับ (SAIDI)",
          content: (
            <Table tbSty="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ลำดับ</th>
                  <th>รายละเอียด</th>
                  <th>หน่วย</th>
                  <th>แผน</th>
                  <th>ผล</th>
                </tr>
              </thead>
              <tbody>
              <tr className="text-center">
                  <td>1</td>
                  <td>กรุงเทพและปริมณฑล</td>
                  <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>พื้นที่อื่นๆ</td>
                  <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
                <tr className="text-center">
                  <td>3</td>
                  <td>พื้นที่สัมปทานกิจการไฟฟ้ากองทัพเรือ</td>
                  <td>ครั้ง/ปี/ผู้ใช้ไฟฟ้า</td>
                  <td><input type="number" className="form-control" /></td>
                  <td><input type="number" className="form-control" /></td>
                </tr>
              </tbody>
            </Table>
          ),
        }
    
      ];
  return (
    <div>
      <Card card='border-0 p-3 shadow-sm'>
         <Accordion items={accordionItems} />
        <button className='btn my-2' style={{backgroundColor:'#afcd13',color:'white',borderRadius:'20px'}}  onClick={handleCalculate}><FaSave className='mb-2 bg-white rounded-circle p-1' fontSize={16} color='black' /> บันทึก PDP</button>
      </Card>
    </div>
  )
}
