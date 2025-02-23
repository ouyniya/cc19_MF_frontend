import { MailIcon, User2 } from "lucide-react";
import React, { useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { Link } from "react-router";

function ContactUsComp() {
  return (
    <>
      <form>
        <div className="flex flex-col justify-center item-center max-w-xl p-[48px] m-auto min-h-[calc(100vh-575px)]">
          <div className="flex flex-col justify-center item-center m-auto min-w-[350px] ">
            <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-5 mb-9">
              <MailIcon size="54px" className="flex items-center stroke-primary" />
              ติดต่อเรา
            </h1>
            <div className="flex flex-col gap-5 w-full">
              <div className="input input-bordered flex items-center gap-2 w-full">
                <User2 />
                <input
                  type="text"
                  className="grow"
                  placeholder="ชื่อผู้ติดต่อ"
                  name="contactName"
                />
              </div>
              <div className="input input-bordered flex items-center gap-2 w-full">
                <MailIcon />
                <input
                  type="text"
                  className="grow"
                  placeholder="อีเมล"
                  name="email"
                />
              </div>
              <textarea
                type="password"
                className="textarea textarea-bordered flex items-center gap-2 w-full"
                placeholder="ใส่ข้อความของคุณที่นี่"
                name="message"
              />
            </div>
            <button className="btn btn-active btn-primary w-full my-5">
              ส่ง
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ContactUsComp;
