import React from "react";
import { motion } from "framer-motion";

function SearchBar() {
  return (
    <>
      <div className="flex justify-center px-4 py-12 lg:py-24 md:mt-0 w-full">
      {/* place-content-center: ใช้เพื่อจัดตำแหน่งเนื้อหาให้อยู่ตรงกลางทั้งในแนวตั้งและแนวนอน */}
        <h1 className="max-w-2xl text-center text-xl md:text-4xl leading-snug">
        {/* leading-snug: กำหนดระยะห่างระหว่างบรรทัดให้กระชับ (ประมาณ 1.375rem) */}
          กำลังมองหากองทุนอยู่ใช่ไหม... <br />
          <p className="text-2xl md:text-5xl mt-[12px]">
            ค้นหา{" "}
            <span className="relative font-bold text-[var(--blue)]">
              กองทุนที่ใช่
              <svg
                viewBox="0 0 286 73"
                fill="none"
                className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
              >
                {/* ใช้สำหรับสร้างแอนิเมชันการเคลื่อนที่ของเส้น (path) ด้วย Framer Motion */}
                <motion.path
                  initial={{ pathLength: 0 }} 
                  // กำหนดให้ความยาวของเส้นเริ่มต้นจาก 0
                  whileInView={{ pathLength: 1 }}
                  // กำหนดให้เส้นเคลื่อนไปถึงความยาวเต็มเมื่อ SVG อยู่ในมุมมองของผู้ใช้
                  transition={{
                    duration: 1.25,
                    ease: "easeInOut", // ตั้งค่าการเคลื่อนไหวให้ใช้เวลานาน 1.25 วินาทีและมีลักษณะการเคลื่อนไหวแบบ easeInOut (เริ่มช้าแล้วเร็วขึ้น)
                  }}
                  d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                  stroke="#FF82AC"
                  strokeWidth="3"
                />
              </svg>
            </span>{" "}
            ของคุณได้ที่นี่
          </p>
        </h1>
      </div>
    </>
  );
}

export default SearchBar;
