import React from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import logoIn from '../src/assets/images/orange.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Plan from './pages/manageRawData/plan';
import SubCategories from './pages/manageRawData/SubCategories';
import Period from './pages/manageRawData/Period';
import Detail from './pages/manageRawData/Detail';
import Verify from './pages/manageRawData/Verify';
import Transection from './pages/manageRawData/Transection';
import Target from './pages/manageRawData/Target';
import SubTarget from './pages/manageRawData/SubTarget';
import MultiFactor from './pages/manageRawData/MultiFactor';
import MileStone from './pages/manageRawData/MileStone';
import PlanMidStone from './pages/MRV/PlanMidStone';
import PDPCal from './pages/MRV/PDPCal';
import ProtectRouteUser from './routes/ProtectRouteUser';

export default function App() {
  const { register, handleSubmit, reset,watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    toast.success('Form submitted successfully!', { position: 'bottom-center', autoClose: 500 });
  };

  const password = watch("password");
  
  return (
    <BrowserRouter>
      <Routes>
        {/* ส่ง register, handleSubmit, errors, และ password ไปยัง Login */}
        <Route 
          path="/" 
           element={<Login logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} reset={reset} />}  
        />

        <Route 
          path="/register" 
          element={<Register logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} 
        />

        <Route 
          path="/dashboard" 
           element={<ProtectRouteUser element={<Dashboard logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} 
          />} />} 
         /*  element={<Dashboard logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} 
          />} */
        />
         <Route
          path="/UserInfo" 
         element={<ProtectRouteUser element={<User logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  watch={watch}/>} 
        />}
        /* element={<User logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  watch={watch}/>} */
        />

        <Route 
          path="/plan" 
          element={<ProtectRouteUser  element={<Plan logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />} 
        /*  element={<Plan logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        /> 
        

        <Route 
          path="/subCategories" 
           element={<ProtectRouteUser element={<SubCategories logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />} 
         /*  element={<SubCategories logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        />
         <Route 
          path="/period" 
          element={<ProtectRouteUser element={<Period logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />} 
         /* element={<Period logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        />

        <Route 
          path="/detail" 
           element={<ProtectRouteUser element={<Detail logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />} 
        /*  element={<Detail logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        />

        <Route 
          path="/milestone" 
          element={<ProtectRouteUser element={<MileStone logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />} 
        /*  element={<MileStone logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        />

        <Route 
          path="/multifactor" 
          element={<ProtectRouteUser element={<MultiFactor logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />}
       /*   element={<MultiFactor logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        />

        <Route 
          path="/staticassumption" 
        element={<ProtectRouteUser element={<SubCategories logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />}
       /*  element={<SubCategories logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        />
         <Route 
          path="/subtarget" 
           element={<ProtectRouteUser element={<SubTarget logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} />} 
       /*   element={<SubTarget logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} */
        />

        <Route 
          path="/target" 
           element={<ProtectRouteUser element={<Target logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} />} 
         /*  element={<Target logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset} />} */
        />

        <Route 
          path="/transection" 
          element={<ProtectRouteUser element={<Transection logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} />} 
        /*  element={<Transection logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} */
        />

        <Route 
          path="/verify" 
           element={<ProtectRouteUser element={<Verify logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} />} 
         /*  element={<Verify logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} */
        />

      <Route 
          path="/planingmidstone" 
          element={<ProtectRouteUser element={<PlanMidStone logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} />}
         /*  element={<PlanMidStone logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} */
        />
        
        <Route path='/pdpCalculate'  element={<ProtectRouteUser element={<PDPCal logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} />} 
        /* element={<PDPCal logoIn={logoIn} register={register} handleSubmit={handleSubmit} errors={errors} password={password} reset={reset}  />} */
        />
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
