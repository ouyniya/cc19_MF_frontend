import { MailIcon, User2, KeyRound } from "lucide-react";
import React, { useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { Link } from "react-router";

function LoginComp() {
  const login = useUserStore((state) => state.login);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const hdlLogin = async (e) => {
    try {
      e.preventDefault();
      const { identity, password } = input;

      // validation
      if (!identity.trim() || !password.trim()) {
        return toast("Please fill all inputs");
      }

      // send api
      let data = await login(input);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };

  return (
    <>
      <form onSubmit={hdlLogin}>
        <div className="flex flex-col justify-center item-center max-w-xl p-[48px] m-auto min-h-[calc(100vh-575px)]">
          <div className="flex flex-col justify-center item-center m-auto min-w-[350px] ">
            <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-5 mb-9">
              <KeyRound size="54px" className="flex items-center stroke-primary" />
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
              ยังไม่มีบัญชีใช่ไหม{" "}
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
