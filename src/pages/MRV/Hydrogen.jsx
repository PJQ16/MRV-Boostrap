import React from 'react'
import Accordion from "../../components/Accordion";
import Table from '../../components/Table';

export default function Hydrogen() {
    const accordionItems = [
        {
          title: "ไฟฟ้า",
          content: (
            <Table tbSty="table table-bordered">
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
                  <td>ปริมาณการปล่อย CO2</td>
                  <td>MtCO<sub>2</sub></td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value="21"
                      readOnly
                      data-bs-toggle="modal"
                      data-bs-target="#monthlyModal"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value="21"
                      readOnly
                      data-bs-toggle="modal"
                      data-bs-target="#monthlyModal"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          ),
        },
        {
          title: "กำลังการผลิตไฟฟ้าใหม่",
          content: (
            <Table tbSty="table table-bordered">
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
                  <td>ปริมาณการปล่อย CO2</td>
                  <td>MtCO<sub>2</sub></td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value="21"
                      readOnly
                      data-bs-toggle="modal"
                      data-bs-target="#monthlyModal"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value="21"
                      readOnly
                      data-bs-toggle="modal"
                      data-bs-target="#monthlyModal"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          ),
        },
    
      ];
  return (
    <div>
         <Accordion items={accordionItems} />
    </div>
  )
}
