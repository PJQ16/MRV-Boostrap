import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Inputs from '../components/Inputs'
import Logo from  '../assets/images/logo.png'
import { FaUserEdit } from "react-icons/fa";
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function User({ logoIn, register, handleSubmit, errors,reset}) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');

   useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const storedData = localStorage.getItem('mrv-store');
    const parsedData = storedData ? JSON.parse(storedData) : null;

    // เข้าถึง fname และตั้งค่า
    if (parsedData) {
      setFname(parsedData.state.user.fname);
      setLname(parsedData.state.user.lname);
      setEmail(parsedData.state.user.email);
    }
  }, []);
  const onSubmit = async(data) => {
   const res = await Swal.fire({
          icon:'question',
          title:'ต้องการแก้ไขข้อมูลใช่หรือไม่?',
          confirmButtonColor:'#df9b15',
          confirmButtonText:'แก้ไขข้อมูล',
          showCancelButton:true,
          cancelButtonColor:'#df3315',
          cancelButtonText:'ยกเลิก'
    });

    if(res.isConfirmed){
      toast.success('แก้ไขข้อมูลผู้ใช้สำเร็จ',{autoClose:600,position:'top-center'})
      console.log(data)
    }
   
  }

  const handleInputChange = (e) => {
    // กรองเฉพาะตัวเลข
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };
  return (
    <>
    <Layout reset={reset}>
      <div className="container-fluid h-100 bg-light p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row pb-5">
            <h1 className='py-3'>ข้อมูลผู้ใช้งาน</h1>
           
              <div className="col-md-3">
                <Card card='shadow-sm border-0'>
                <img src={Logo} className="rounded-lg bg-light img-fluid" style={{ width: '350px', height: '320px' }} />

                </Card>
              </div>

              <div className="col-md-9">
               <Card card="shadow-sm border-0">
                <div className="row">
       
                  <div className="col-md-6">
                  <Inputs
                  type="text"
                  register={register}
                  formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกชื่อท่าน',
                  }}
                  placeholder="ชื่อ"
                  label="ชื่อ"
                  name="first_name"
                  errors={errors}
                  defaultValue='Admin'
                />
                  </div>

                  
                  <div className="col-md-6">
                  <Inputs
                  type="text"
                  register={register}
                   formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกนามสกุล',
                  }}
                  placeholder="นามสกุล"
                  label="นามสกุล"
                  name="last_name"
                  errors={errors}
                  defaultValue='Admin'
                />
                  </div>

                  <div className="col-md-6">
                  <Inputs
                  type="email"
                  register={register}
                  formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกนามสกุล',
                  }}
                  placeholder="email"
                  label="email"
                  name="email"
                  errors={errors}
                  defaultValue='MRV@gmail.com'
                />
                  </div>


                  <div className="col-md-6">
                  <Inputs
                  type="tel"
                  register={register}
                   formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกนามสกุล',
                  }}
                  placeholder="เบอร์โทรศัพท์"
                  label="เบอร์โทรศัพท์"
                  name="tel"
                  errors={errors}
                  defaultValue='0923221120'
                  onInput={handleInputChange}
                />
                  </div>

                  <div className="col-md-6">
                  <Inputs
                  type="text"
                  register={register}
                   formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกสังกัด',
                  }}
                  placeholder="สังกัด"
                  label="สังกัด"
                  name="Affiliation"
                  errors={errors}
                  defaultValue='กฟพ'
                />
                  </div>


                  <div className="col-md-6">
                  <Inputs
                  type="text"
                  register={register}
                  formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกหน่วยงาน',
                  }}
                  placeholder="หน่วยงาน"
                  label="หน่วยงาน"
                  name="Agency"
                  errors={errors}
                  defaultValue='การพลังงานแห่งประเทศ'
                />
                  </div>


                  <div className="col-md-3">
                  <Inputs
                  type="text"
                  register={register}
                   formStyle='form-control'
                  rules={{
                    required: 'กรุณาเลือกจังหวัด',
                  }}
                  placeholder="จังหวัด"
                  label="จังหวัด"
                  name="provence"
                  errors={errors}
                  defaultValue='กรุงเทพมหานคร'
                  
                />
                  </div>


                  <div className="col-md-3">
                  <Inputs
                  type="tel"
                  register={register}
                  formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกอำเภท',
                  }}
                  placeholder="อำเภท"
                  label="อำเภท"
                  name="district"
                  errors={errors}
                  defaultValue='สาทธ'
                />
                  </div>


                  <div className="col-md-3">
                  <Inputs
                  type="text"
                  register={register}
                   formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกตำบล',
                  }}
                  placeholder="ตำบล"
                  label="ตำบล"
                  name="subdistrict"
                  errors={errors}
                  defaultValue='ช่องนนทรี'
                />
                  </div>


                  <div className="col-md-3">
                  <Inputs
                  type="text"
                  register={register}
                   formStyle='form-control'
                  rules={{
                    required: 'กรุณากรอกเลขไปรษณี',
                  }}
                  placeholder="เลขไปรษณี"
                  label="เลขไปรษณี"
                  name="zip_code"
                  errors={errors}
                  defaultValue='30120'
                />
                  </div>
                </div>
              
                  
              </Card>
              </div>

        </div>
        <div className="d-flex justify-content-end">
        <button  className="btn btn-warning" type='submit'><FaUserEdit className='bg-white rounded-circle ms-2'/> บันทึก</button>
        </div>
       
        </form>
      </div>
    </Layout>
    </>
  )
}
