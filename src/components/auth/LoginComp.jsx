import { MailIcon, User2, KeyRound } from "lucide-react";
import React, { useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { Link } from "react-router";
import { createAlert } from "../../utils/createAlert";
import { useNavigate } from "react-router";

function LoginComp() {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const [input, setInput] = useState({
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
    // หน่วงเวลาเพื่อให้แสดง icon loading ได้
    const redirectPage = (role) => {
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    };

    try {
      e.preventDefault();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      let res = await login(input);
      // console.log("res", res.message);

      // console.log(res.user.role);
      redirectPage(res.user.role);

      createAlert("success", "Welcome");
    } catch (error) {
      // console.log(error.response?.data.message)
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
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
              Login
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
