import React from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// auto resize !!!!!
function Header() {
  return (
    <>
      <div className="xl:flex xl:h-[590px] flex-0 justify-between gap-5 w-full p-9">
        {/* header text */}
        <div className="flex flex-1 flex-col items-center m-auto xl:items-start xl:w-full w-[350px]">
          {/* topic */}
          <div className="flex flex-col items-center xl:items-start">
            <p className="leading-tight text-4xl font-medium text-[var(--blue)]">
              ลงทุนอย่างมั่นใจ
            </p>
            <div className="flex">
              <p className="xl:text-6xl mt-[12px] text-5xl font-bold text-[var(--blue)]">
                เลือกกองทุนที่
                <a className="text-left font-bold bg-gradient-to-tr from-[var(--blue)] to-[var(--pink)] bg-clip-text text-transparent">
                  ใช่
                </a>
              </p>
            </div>
            <p className="xl:text-6xl mt-[12px] text-5xl font-bold text-[var(--blue)] bg-gradient-to-r from-[var(--blue)] to-[var(--pink)] bg-[length:100%_6px] bg-no-repeat bg-bottom">
              ในไม่กี่คลิก!
            </p>
            {/* background-size: 100% 6px; กำหนดให้ความสูงของ background เป็น 6px */}
          </div>
          <div className="my-[24px]">
            <p className="font-medium text-2xl">
              กองทุนไหนใช่? เราช่วยคุณคัดกรอง
            </p>
          </div>
          {/* register button */}
          <div>
            <button
              className="btn btn-ghost btn-lg rounded-full bg-[var(--blue)] hover:bg-[var(--darkblue)] shadow-md dark:shadow-base-300 shadow-[var(--lightblue)]
                     text-white"
            >
              สมัครสมาชิก
            </button>
          </div>
        </div>
        {/* header image */}
        <div className="flex flex-1 justify-center items-center h-[500px]">
          {/* <DotLottieReact src="/src/assets/header.lottie" loop autoplay /> */}
        </div>
      </div>
    </>
  );
}

export default Header;
