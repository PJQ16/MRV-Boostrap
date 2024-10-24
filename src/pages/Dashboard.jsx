import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Chart from '../components/Chart';
import useLoginStore from '../store/useLogin';

export default function Dashboard() {
  
  const salesData = [
    { id: 1, years: 2023, sale: 2000, month: 1 },
    { id: 2, years: 2024, sale: 3300, month: 2 },
    { id: 3, years: 2025, sale: 3100, month: 3 },
    { id: 4, years: 2026, sale: 2700, month: 4 },
    { id: 5, years: 2027, sale: 2200, month: 5 },
  ];

  const buyData = [
    { id: 1, buy: 16000, month: 1 },
    { id: 2, buy: 2500, month: 2 },
    { id: 3, buy: 2100, month: 3 },
    { id: 4, buy: 2100, month: 4 },
    { id: 5, buy: 2600, month: 5 },
  ];

  // แปลงข้อมูลเป็น labels และ data
  const labels = useMemo(() => salesData.map(item => `${item.years}`), [salesData]);
  const sales = useMemo(() => salesData.map(item => item.sale), [salesData]);
  const buys = useMemo(() => buyData.map(item => item.buy), [buyData]);

  const backgroundColors = [
    'rgba( 251, 126, 1 )',
    'rgba( 251, 136, 21)',
    'rgba(250, 149, 49 )',
    'rgba(251, 162, 74)',
    'rgba(251, 179, 108)',
  ];

  const borderColors = [
    'rgba( 251, 126, 1 )',
    'rgba( 251, 136, 21)',
    'rgba(250, 149, 49 )',
    'rgba(251, 162, 74)',
    'rgba(251, 179, 108)',
  ];

  // ใช้ useMemo เพื่อ cache ค่า datasets
  const datasets = useMemo(() => [
    {
      label: 'T1',
      data: sales,
      backgroundColor: backgroundColors, // สีของ Sales
      borderColor: borderColors,
      borderWidth: 1,
    },
    {
      label: 'T2',
      data: buys,
      backgroundColor: backgroundColors, // สีของ Buy
      borderColor: borderColors,
      borderWidth: 1,
    },
    {
      label: 'T3',
      data: buys,
      backgroundColor: backgroundColors, // สีของ Buy
      borderColor: borderColors,
      borderWidth: 1,
    },
  ], [sales, buys, backgroundColors, borderColors]); // dependencies ของ useMemo

  return (
    <Layout>
      <div className="row p-3">
        <div className="col-md-12">
         
          <Card card='border-0 shadow-sm rounded'>
            <div className="card-body text-center">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart
                  type='doughnut'
                  labels=''
                  datasets={datasets} // ส่ง datasets มาเป็น props
                  mark='top'
                  explain='NEP เป้าหมายรวม'
                  posiEx='top'
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-4">
          <Card card='border-0 shadow-sm rounded'>
            <Chart
              type='doughnut'
              labels=''
              datasets={datasets} // ส่ง datasets มาเป็น props
              mark='top'
              explain='T1 เสริมสร้างพลังงานมั่นคง'
              posiEx='top'
            />
          </Card>
        </div>

        <div className="col-md-4">
          <Card card='border-0 shadow-sm rounded'>
            <Chart
              type='doughnut'
              labels=''
              datasets={datasets} // ส่ง datasets มาเป็น props
              mark='top'
              explain='T2 มุ่งสู่พลังงานยั่งยืน'
              posiEx='top'
            />
          </Card>
        </div>

        <div className="col-md-4">
          <Card card="border-0">
            <Chart
              type='doughnut'
              labels=''
              datasets={datasets} // ส่ง datasets มาเป็น props
              mark='top'
              explain='T3 ดูแลพลังงานให้เป็นธรรม'
              posiEx='top'
            />
          </Card>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-6">
          <Card card='border-0 shadow-sm rounded'>
            <Chart
              type='bar'
              labels={labels}
              datasets={datasets} // ส่ง datasets มาเป็น props
              mark='top'
              explain='แผนพลังงานชาติ'
              posiEx='left'
            />
          </Card>
        </div>
        <div className="col-md-6">
          <Card card='border-0 shadow-sm rounded'>
            <Chart
              type='line'
              labels={labels}
              datasets={datasets} // ส่ง datasets มาเป็น props
              mark='top'
              explain='แผนพลังงานชาติ'
              posiEx='left'
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
}
