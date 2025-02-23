import React from "react";
import { Pencil, Mail, UserPen, KeyRound } from "lucide-react";
import { Link } from "react-router";

function EditPersonal() {
  return (
    <>
      <div className="lg:flex w-full pr-[0px] py-[0px] min-w-[450px] gap-5">
        {/*  edit avatar */}
        <div className="relative flex basis-1/4 justify-center items-start">
          <Link></Link>
          <div className="avatar">
            <div className="absolute z-10 bottom-1 right-2 rounded-full bg-secondary px-[8px] py-[2px] flex justify-center items-center hover:ring-2">
              <Pencil className="w-[12px] stroke-blue-900 hover:stroke-pink-700" />
            </div>
            <div className="w-[150px] rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
        {/*  edit profile */}
        <div className="flex flex-col justify-center w-full m-auto mt-[48px]">
          <div className="flex flex-col gap-5">
            <div className="lg:flex justify-around m-auto px-[20px] gap-5 w-full">
              <div className="input input-bordered flex items-center basis-1/2 mb-[18px] lg:mb-[0px]">
                <Mail />
                <input type="text" className="grow ml-3" placeholder="Email" />
              </div>
              <div className="input input-bordered flex items-center basis-1/2 ">
                <UserPen />
                <input
                  type="text"
                  className="grow ml-3"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="lg:flex justify-around m-auto px-[20px] gap-5 w-full">
              <div className="input input-bordered flex items-center basis-1/2 mb-[18px] lg:mb-[0px]">
                <KeyRound />
                <input
                  type="password"
                  placeholder="Password"
                  className="grow ml-3"
                />
              </div>
              <div className="input input-bordered flex items-center basis-1/2 ">
                <KeyRound />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="grow ml-3"
                />
              </div>
            </div>
          </div>

          {/* save button */}
          <div className="flex justify-end mx-[24px] mt-[24px]">
            <button className="btn btn-primary">บันทึก</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPersonal;
