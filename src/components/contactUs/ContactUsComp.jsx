import React, { useState, useRef } from "react";
import { MailIcon, User2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { createAlert } from "../../utils/createAlert";

function ContactUsComp() {
  const initialEmail = {
    name: "",
    email: "",
    message: "",
  };

  const formRef = useRef(null); // ใช้ ref เพื่อเก็บ element ของ form

  const [formData, setFormData] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // validate form
  const validateForm = () => {
    const { name, email, message } = formData;

    if (!name) {
      createAlert("info", "กรุณาใส่ชื่อ");
      return false;
    }

    if (!email) {
      createAlert("info", "กรุณาใส่อีเมล");
      return false;
    }

    if (!message) {
      createAlert("info", "กรุณาใส่ข้อความ");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs
      .sendForm(serviceID, templateID, formRef.current, {
        publicKey: userID,
      })
      .then(
        (res) => {
          console.log("Email ถูกส่งเรียบร้อยแล้ว");
          createAlert("success", "ส่งอีเมลสำเร็จ!");
          setFormData(initialEmail);
          setIsSent(true);
        },
        (error) => {
          console.log("FAILED...", error);
          createAlert("info", "เกิดข้อผิดพลาดในการส่งอีเมล");
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isSent ? (
        // เมื่อ isSent เป็น true จะแสดงข้อความ "ส่งอีเมลสำเร็จ"
        <div className="flex flex-col justify-center item-center max-w-xl p-[48px] m-auto min-h-[calc(100vh-575px)]">
          <div className="flex flex-col justify-center item-center m-auto min-w-[350px] ">
            <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-5 mb-9">
              <MailIcon size="54px" className="flex items-center stroke-primary" />
              ส่งอีเมลสำเร็จ!
            </h1>
            <p className="text-center text-lg">ขอบคุณที่ติดต่อเรา เราจะตอบกลับคุณเร็วๆ นี้</p>
          </div>
        </div>
      ) : (
        // เมื่อ isSent เป็น false จะแสดงฟอร์ม
        <form onSubmit={handleSubmit} ref={formRef}>
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input input-bordered flex items-center gap-2 w-full">
                  <MailIcon />
                  <input
                    type="email"
                    className="grow"
                    placeholder="อีเมล"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  className="textarea textarea-bordered flex items-center gap-2 w-full"
                  placeholder="ใส่ข้อความของคุณที่นี่"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-active btn-primary w-full my-5" type="submit" disabled={isLoading}>
                {isLoading ? "กำลังส่ง..." : "ส่ง"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default ContactUsComp;
