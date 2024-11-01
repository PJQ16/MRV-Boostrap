import React from 'react';
import Inputs from '../components/Inputs';
import { toast } from 'react-toastify';
import PageLogin from '../components/pageLogin';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/mrv.png'
import { CiLogin } from "react-icons/ci";
import Card from '../components/Card';
import { FaAddressCard } from "react-icons/fa6";
import axios from 'axios';
import config from '../../config';
import useLoginStore from '../store/useLogin';
import { motion } from 'framer-motion';

export default function Login({ logoIn, register, handleSubmit, errors,reset}) {
  const {actionLogin,} = useLoginStore();
  const navigate = useNavigate();
  const onSubmit = async(data) => {
    try{
      const res = await  actionLogin(data);
      toast.success('เข้าสู่ระบบสำเร็จ',{autoClose:600,position:'top-center'})
      navigate('/dashboard');
    }catch(err){
      if (err.response) {
        // ถ้า server ส่งสถานะ error มา
        const errMsg = err.response.data.error;
        toast.error(errMsg, { autoClose: 600, position: 'top-center' });
      } else {
        // ถ้าเกิดข้อผิดพลาดในระดับเครือข่ายหรือข้อผิดพลาดอื่นๆ
        const errMsg = err.message;
        toast.error(errMsg, { autoClose: 600, position: 'top-center' });
      }
    }
  };

  return (
    <PageLogin logoIn={logoIn}> {/* ส่ง logoIn ไปยัง PageLogin */}
     <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
    <Card card=' p-4 mt-2 shadow-lg border-0'>
    <div className="d-flex justify-content-center" >
      <img src={logo} width={150} height={150} className='bg-white' />
    </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Inputs
          type="email"
          register={register}
           formStyle='form-control'
          rules={{
            required: 'กรุณากรอก Email',
          }}
          placeholder="Email"
          label="Email"
          name="email"
          errors={errors}
          id="email"
        />

        <Inputs
          type="password"
          formStyle='form-control'
          register={register}
          rules={{
            required: 'กรุณากรอก Password',
            minLength: {
              value: 8,
              message: 'ความยาว Password ต้องมีมากกว่า 8 ตัวขึ้นไป'
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z\d!@#$%^&*]+$/,
              message: 'รหัสผ่านต้องประกอบด้วยอักษรพิเศษอย่างน้อย 1 ตัว และตัวใหญ่อย่างน้อย 1 ตัว ตัวเลขอย่างน้อย 1 ตัว'
            }
          }}
          placeholder="Password"
          label="Password"
          name="password"
          errors={errors}
          id="password"
        />
        <div className="row mt-3">
        <div className="col-md-12">
        <button type='submit' className="btn w-100 text-white" style={{backgroundColor:'#58c780'}}><CiLogin fontSize={30} color='#000000'  className='bg-white rounded-circle p-1 me-1'/> เข้าสู่ระบบ</button>
        </div>
        <div className="col-md-12 my-3">
        <Link to={`/register`} className="btn  btn-secondary w-100"><FaAddressCard fontSize={30} color='#000000'  className='bg-white rounded-circle p-1 me-1' /> ลงทะเบียน</Link>
        </div>
        </div>
      
      </form>
      
      </Card>
      </motion.div>
    </PageLogin>
  );
}
