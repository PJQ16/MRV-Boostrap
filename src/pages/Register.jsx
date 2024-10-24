import React, { useEffect } from "react";
import Inputs from "../components/Inputs";
import useStore from "../store/useRegister"; // นำเข้า useStore
import { toast } from "react-toastify";
import PageLogin from "../components/pageLogin";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mrv.png";
import Card from "../components/Card";
import { FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";

export default function Register({
  logoIn,
  register,
  handleSubmit,
  errors,
  password,
  reset,
}) {
  const { fetchOrganize, plans } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganize();
  }, []);
  const onSubmit = async (data) => {
    try {
      const res = await Swal.fire({
        icon: "question",
        title: "ท่านต้องการสมัครสมาชิกใช่หรือไม่?",
        showCancelButton: true,
      });
      if (res.isConfirmed) {
        toast.success("ลงทะเบียนสำเร็จ", {
          autoClose: 500,
          position: "top-center",
        });
        await axios.post(`${config.urlApi}/api/user`, data);
        reset();
        navigate("/");
      }
    } catch (error) {
      toast.error(`${error.message} เกิดข้อผิดพลาด`, { autoClose: 500, position: "top-center" });
    }
  };

  return (
    <PageLogin logoIn={logoIn}>
      {" "}
      {/* ส่ง logoIn ไปยัง PageLogin */}
      <Card card=" border-0 p-3 rounded">
        <div className="d-flex justify-content-center">
          <img
            src={logo}
            width={150}
            height={150}
            className=" bg-white "
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <Inputs
                type="text"
                register={register}
                formStyle="form-control"
                rules={{
                  required: "กรุณากรอกชื่อผู้ลงทะเบียน",
                }}
                placeholder="ชื่อผู้ลงทะเบียน"
                label="ชื่อ"
                name="fisrt_name"
                errors={errors}
                id="fisrt_name"
              />
            </div>
            <div className="col-md-6">
              <Inputs
                type="text"
                register={register}
                formStyle="form-control"
                rules={{
                  required: "กรุณากรอกนามสกุลผู้ลงทะเบียน",
                }}
                placeholder="นามสกุลผู้ลงทะเบียน"
                label="นามสกุล"
                name="last_name"
                errors={errors}
                 id="last_name"
              />
            </div>
          </div>
          <Inputs
            type="email"
            register={register}
            formStyle="form-control my-2"
            rules={{
              required: "กรุณากรอกอีเมลผู้ลงทะเบียน",
            }}
            placeholder="อีเมลผู้ลงทะเบียน"
            label="อีเมล"
            name="email"
            errors={errors}
            id="email"
          />
          <Inputs
            type="password"
            register={register}
            formStyle="form-control my-2"
            rules={{
              required: "กรุณากรอก Password",
              minLength: {
                value: 8,
                message: "ความยาว Password ต้องมีมากกว่า 8 ตัวขึ้นไป",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z\d!@#$%^&*]+$/,
                message:
                  "รหัสผ่านต้องประกอบด้วยอักษรพิเศษอย่างน้อย 1 ตัว และตัวใหญ่อย่างน้อย 1 ตัว ตัวเลขอย่างน้อย 1 ตัว",
              },
            }}
            placeholder="Password"
            label="Password"
            name="password"
            errors={errors}
            id="password"
          />

          <Inputs
            type="password"
            formStyle="form-control my-2"
            register={register}
            rules={{
              required: "กรุณากรอก Confirm Password",
              validate: (value) => value === password || "รหัสไม่ตรงกัน",
            }}
            placeholder="Confirm Password"
            label="Confirm Password"
            name="coPassword"
            errors={errors}
            id="coPassword"
          />

          <Inputs
            type="select"
            formStyle="form-control my-2"
            register={register}
            rules={{
              required: "เลือกองค์กรของท่าน",
            }}
            placeholder="เลือกองค์กรของท่าน"
            options={plans.map((item) => ({
              value: item.id,
              label: `${item.organization_name}`,
            }))}
            label="องค์กร"
            name="organize_id"
            errors={errors}
            id="organize_id"
          />

          <Inputs
            type="hidden"
            register={register}
            name="role_id"
            defaultValue="3"
            errors={errors}
          />

          <div className="row">
            <div className="col-md-12 col-sm-12">
              <button
                type="submit"
                className="btn w-100 text-white"
                style={{ backgroundColor: "#58c780" }}
              >
                <FaUserEdit
                  fontSize={30}
                  color="black"
                  className="rounded-circle p-1 bg-white "
                />{" "}
                ลงทะเบียน
              </button>
            </div>

            <div className="col-md-12 col-sm-12 my-3">
              <Link to="/" className="btn btn-secondary w-100 p-2 text-white">
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </PageLogin>
  );
}
