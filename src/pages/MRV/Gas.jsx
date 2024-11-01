import React from 'react';
import Accordion from "../../components/Accordion";
import Table from '../../components/Table';
import { FaSave } from "react-icons/fa";
import Card from '../../components/Card';
import Modal from '../../components/Modal';

export default function Gas({ subCategories,onOpenModal }) { // รับ subCategories ทั้งหมดเป็น props

  const valueYear = (data) => {
    return [
      data.jan_val,
      data.feb_val,
      data.mar_val,
      data.apr_val,
      data.may_val,
      data.jun_val,
      data.jul_val,
      data.aug_val,
      data.sep_val,
      data.oct_val,
      data.nov_val,
      data.dec_val,
    ].reduce((total, value) => total + (parseFloat(value) || 0), 0);
  };

  const accordionItems = subCategories.map((subCategory, subCategoryIndex) => ({
    title: subCategory.category, // ชื่อหัวข้อของ Accordion แต่ละอัน
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
          {subCategory.detail.map((detail, detailIndex) => (
            <tr key={detailIndex} >
              <td className="text-center">{detailIndex + 1}</td>
              <td>{detail.desciption}</td>
              <td className="text-center">{detail.unit}</td>
              {detail.period_type === 'Yearly' ? (
                <>
                 <td><input type="number" defaultValue={detail.plan_value} className="form-control" /></td>
                 <td><input type="number" defaultValue={detail.actual_value} className="form-control" /></td>
                </>
              ) : (
                <>
                <td><input type="number"  defaultValue={detail.plan_value}  className="form-control" /></td>
                <td><input type="number" defaultValue={valueYear(detail)}  readOnly onClick={() => onOpenModal(detail)}
                data-bs-toggle="modal" data-bs-target="#monthlyModal" className="form-control" /></td>
               </>  
              )}
             
            </tr>
          ))}
        </tbody>
      </Table>
    ),
  }));

  return (
    <div>
      <Card card='border-0 p-3 shadow-sm'>
        <Accordion items={accordionItems} /> {/* แสดง Accordion หลายอันเรียงกัน */}
        <button className='btn my-2' style={{ backgroundColor: '#afcd13', color: 'white', borderRadius: '20px' }}>
          <FaSave className='mb-2 bg-white rounded-circle p-1' fontSize={16} color='black' /> บันทึก PDP
        </button>
      </Card>
    </div>
  );
}
