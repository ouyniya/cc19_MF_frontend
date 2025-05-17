import { MailIcon, User2, KeyRound } from "lucide-react";
import React, { useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { Link } from "react-router";
import { createAlert } from "../../utils/createAlert";
import { useNavigate } from "react-router"; // Hook ของ React Router ที่ช่วยเปลี่ยนเส้นทาง

// แสดงฟอร์มล็อกอิน ที่ให้ผู้ใช้กรอก email และ password
// เมื่อพิมพ์ข้อมูล hdlChange จะอัปเดตค่าที่ useState
// เมื่อกดปุ่ม Login → hdlLogin จะทำงาน
// หยุดการรีโหลดหน้า (e.preventDefault())
// เรียกใช้ login(input) จาก Zustand store
// ถ้าสำเร็จ -> เปลี่ยนหน้าไป /admin หรือ /user
// ถ้าผิดพลาด -> แสดงข้อความแจ้งเตือน
// แสดงปุ่ม สมัครสมาชิก หากยังไม่มีบัญชี

function LoginComp() {
  const login = useUserStore((state) => state.login);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    //// เก็บค่าของ email และ password ที่ผู้ใช้กรอก
    email: "",
    password: "",
  });

  const hdlChange = (e) => {
    // console.log(e.target.value)
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const hdlLogin = async (e) => {
    setLoading(true);

    const redirectPage = (role) => {
      if (role === "ADMIN") {
        navigate("/admin"); // ถ้าเป็นแอดมิน ไปหน้า /admin
      } else {
        navigate("/user"); // ถ้าเป็นผู้ใช้ทั่วไป ไปหน้า /user
      }
    };

    try {
      e.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ

      let res = await login(input); // เรียกใช้ฟังก์ชัน login และรับค่าตอบกลับจากเซิร์ฟเวอร์
      redirectPage(res.user.role); // นำผู้ใช้ไปยังหน้าที่เหมาะสมตาม role

      createAlert("success", "Welcome"); // แสดงข้อความแจ้งเตือน

      setLoading(false);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg); // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={hdlLogin}>
        <div className="flex flex-col justify-center item-center max-w-xl p-[48px] m-auto min-h-[calc(100vh-575px)]">
          <div className="flex flex-col justify-center item-center m-auto min-w-[350px] ">
            <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-5 mb-9">
              <KeyRound
                size="54px"
                className="flex items-center stroke-primary"
              />
              ลงชื่อเข้าใช้
            </h1>
            <div className="flex flex-col gap-5 w-full">
              <div className="input input-bordered flex items-center gap-2 w-full">
                <MailIcon />
                <input
                  type="text"
                  className="grow"
                  placeholder="อีเมล"
                  name="email"
                  onChange={hdlChange}
                  value={input.email}
                />
              </div>
              <div className="input input-bordered flex items-center gap-2 w-full">
                <User2 />
                <input
                  type="password"
                  className="grow"
                  placeholder="รหัสผ่าน"
                  name="password"
                  onChange={hdlChange}
                  value={input.password}
                />
              </div>
            </div>
            <button className="btn btn-active btn-primary w-full my-5">
              {loading === true ? "Loading..." : "Login"}
            </button>
            <span className="text-center">
              ยังไม่มีบัญชีใช่ไหม
              <Link to="/register" className="link link-hover link-primary">
                สมัครสมาชิกที่นี่
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginComp;
