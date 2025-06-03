import React from "react";
import RegisterComp from "../../components/auth/RegisterComp";
import { Link } from "react-router";

function Register() {
  return (
    <>
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            ทดลองใช้งานเว็บไซต์
          </h1>
          <p className="text-gray-700 mb-4">
            เว็บไซต์นี้สร้างขึ้นเพื่อการศึกษาการเขียนโปรแกรมเท่านั้น ไม่ได้เปิดให้ใช้งานบริการจริง
            หากต้องการทดลองใช้งานเพื่อทดสอบระบบของเว็บไซต์
            กรุณาใช้บัญชีทดลองต่อไปนี้:
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
            <p>
              <span className="font-semibold">Username:</span> demo_user@nysdev.com
            </p>
            <p>
              <span className="font-semibold">Password:</span> 123456
            </p>
          </div>

          <p className="text-sm text-gray-600">
            ข้อมูลทั้งหมดเป็นข้อมูลสมมติเพื่อการศึกษาเท่านั้น ทางเว็บไซต์ไม่เก็บข้อมูลที่สามารถระบุตัวตนของบุคคลจริงใดๆ ทั้งสิ้น
            
          </p>
          <br />
          <span className="text-center mt-5">
            <Link to="/login" className="link link-hover link-primary">
              <button className="btn btn-primary">ลงชื่อเข้าใช้ที่นี่</button>
            </Link>
          </span>
        </div>
      </div>

      {/* <RegisterComp /> */}
    </>
  );
}

export default Register;
