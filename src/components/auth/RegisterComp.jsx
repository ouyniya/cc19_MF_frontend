import { MailIcon, User2, KeyRound, BookUser } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

// not re render
const initInput = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterComp() {
  const [input, setInput] = useState(initInput);

  const hdlChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const hdlClearInput = () => {
    setInput(initInput);
  };

  const hdlRegister = async (e) => {
    try {
      e.preventDefault();
      const { username, email, password, confirmPassword } = input;

      // validation
      if (
        !username.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        return toast("Please fill all inputs");
      }

      if (password !== confirmPassword) {
        return toast("Password and Confirm password unmatched!!");
      }

      // toast.success(JSON.stringify(input), {position: 'top-right'})

      // ** send request to api (backend)
      const rs = await axios.post("http://localhost:8899/auth/register", input);
      // toast(JSON.stringify(rs.data))

      hdlClearInput();
      document.getElementById("register-form").close();
      toast("Register successfully");
    } catch (err) {
      // console.log(err)
      const errMsg = err.response?.data?.error || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <form onSubmit={hdlRegister}>
      <div className="flex flex-col justify-center item-center max-w-xl p-[48px] m-auto min-h-[calc(100vh-575px)]">
        <div className="flex flex-col justify-center item-center m-auto min-w-[350px] ">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-5 mb-9">
            <BookUser size="54px" className="flex items-center stroke-primary" />
            สมัครสมาชิก
          </h1>
          <div className="flex flex-col gap-5 w-full">
            <div className="input input-bordered flex items-center gap-2 w-full">
              <User2 />
              <input
                type="text"
                className="grow"
                placeholder="ชื่อผู้ใช้งาน"
                name="username"
                onChange={hdlChange}
                value={input.username}
              />
            </div>
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
              <KeyRound />
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

          <div className="flex justify-between items-center w-full gap-5 mt-5">
            <button // reset data
              className="btn btn-active btn-ghost"
              type="button"
              onClick={hdlClearInput}
            >
              ล้างข้อมูล
            </button>

            <button className="btn btn-active btn-primary my-5 basis-1/2">
              สมัครสมาชิก
            </button>
          </div>

          <hr className="opacity-20"/>

          <span className="text-center mt-5">
            มีบัญชีแล้วใช่ไหม{" "}
            <Link to="/login" className="link link-hover link-primary">
              ลงชื่อเข้าใช้ที่นี่
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}

export default RegisterComp;
