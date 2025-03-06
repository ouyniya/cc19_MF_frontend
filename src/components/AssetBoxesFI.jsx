import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { InfoIcon } from "lucide-react";

function AssetBoxesFI() {
  const cards = [
    {
      url: "src/assets/gov.webp",
      title: "Short Term Government Bond",
      id: 1,
      desc: "ลงทุนในเงินฝากตราสารหนี้ของภาครัฐตามที่สำนักงานกำหนดให้ลงทุนได้โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม และเฉลี่ยจะมีอายุถัวเฉลี่ยแบบถ่วงน้ำหนัก ณ ขณะใดขณะหนึ่ง <= 1 ปี",
    },
    {
      url: "src/assets/gov2.jpeg",
      title: "Mid Term Government Bond",
      id: 2,
      desc: "ลงทุนในเงินฝากตราสารหนี้ของภาครัฐตามที่สำนักงานกำหนดให้ลงทุนได้โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม และเฉลี่ยจะมีอายุถัวเฉลี่ยแบบถ่วงน้ำหนัก ณ ขณะใดขณะหนึ่ง > 1 - 3 ปี",
    },
    {
      url: "src/assets/jp.avif",
      title: "Short Term General Bond",
      id: 3,
      desc: "ลงทุนในเงินฝากตราสารหนี้ทั่วไปตามที่สำนักงาน กำหนดให้ลงทุนได้โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม และเฉลี่ยจะมีอายุถัวเฉลี่ยแบบถ่วงน้ำหนัก ณ ขณะใดขณะหนึ่ง <= 1 ปี",
    },
    {
      url: "src/assets/eu.avif",
      title: "Mid Term General Bond",
      id: 4,
      desc: "ลงทุนในเงินฝากตราสารหนี้ทั่วไปตามที่สำนักงานกำหนดให้ลงทุนได้โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม และเฉลี่ยจะมีอายุถัวเฉลี่ยแบบถ่วงน้ำหนัก ณ ขณะใดขณะหนึ่ง > 1 - 3 ปี",
    },
    {
      url: "src/assets/id.jpeg",
      title: "Long Term General Bond",
      id: 5,
      desc: "ลงทุนในเงินฝากตราสารหนี้ทั่วไปตามที่สำนักงานกำหนดให้ลงทุนได้โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม และเฉลี่ยจะมีอายุถัวเฉลี่ยแบบถ่วงน้ำหนัก ณ ขณะใดขณะหนึ่ง >= 3 ปี",
    },
    {
      url: "src/assets/indo.webp",
      title: "Money Market - Government",
      id: 7,
      desc: "กองทุนรวมตลาดเงินที่ลงทุนในหรือมีไว้ซึ่งเงินฝาก ตราสารหนี้ระยะสั้นของภาครัฐตามที่สำนักงานกำหนดให้ลงทุนได้โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "src/assets/th.jpeg",
      title: "Money Market - General",
      id: 8,
      desc: "กองทุนรวมตลาดเงินที่ลงทุนในหรือมีไว้ซึ่งเงินฝาก ตราสารหนี้ระยะสั้นของภาครัฐตามที่สำนักงานกำหนดให้ลงทุนได้โดยเฉลี่ยในรอบปีบัญชี < 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "",
      title: "กองทุนรวมตราสารหนี้อื่นๆ",
      id: 9,
      desc: "",
    },
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef, // เรากำลังติดตามการเลื่อนที่เกี่ยวข้องกับองค์ประกอบ (element) ที่อ้างอิงผ่าน targetRef
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);
  // ภาพจะถูกเลื่อนออกไปทางซ้ายมากถึง 75% ของความกว้างทั้งหมด (75% ของ 1000px = 750px) ทำให้ภาพเคลื่อนที่ไปทางซ้าย 750px จากตำแหน่งเริ่มต้น
  // ค่าติดลบ (-75%) จึงใช้ในการควบคุมการเคลื่อนที่ไปทางซ้ายตามการเลื่อน (scroll).
  return (
    <>
      <div>
        <div className="flex h-48 items-center justify-center bg-[var(--blue)]">
          <span className="flex gap-2 font-semibold text-2xl uppercase text-white">
            กองทุนรวมประเภทต่างๆ
            <InfoIcon />
          </span>
        </div>

        {/* cards */}
        <section
          ref={targetRef}
          className="relative h-[300vh] w-full bg-gradient-to-b from-[var(--blue)] via-[var(--green)] to-[var(--blue)]"
        >
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="absolute top-[150px] left-1/2 -translate-x-1/2 text-white text-5xl font-bold text-center">
              กองทุนรวมตราสารหนี้
              <div className="px-[24px] py-[12px] mt-[32px] text-lg z-10 font-normal opacity-0 md:opacity-100">
                <p>
                  กองทุนรวมประเภทนี้มีนโยบายลงทุนในตราสารหนี้เป็นหลัก
                  ทั้งภาครัฐและเอกชน เช่น ตั๋วเงินคลัง พันธบัตรรัฐบาล และหุ้นกู้
                  โดยสามารถลงทุนได้ทั้งตราสารหนี้ระยะสั้น (อายุไม่เกิน 1 ปี)
                  และตราสารหนี้ระยะยาว
                </p>
              </div>
            </div>

            <div className="flex justify-center items-start w-4/5 max-w-[1100px] m-auto h-[300px]">
              <div className="glass rounded-3xl basis-1/2 flex flex-col gap-3 p-[32px] xl:pl-[100px] min-w-[400px] mt-[100px]">
                <p className="text-xl font-bold text-white"> ตัวอย่างกองทุนตราสารหนี้</p>
                {cards.map((el, index) => (
                  <div
                    key={index}
                    className="text-white lg:text-md text-sm font-semibold px-[8px]"
                  >
                    ◽ {el.title}
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center basis-1/2 h-[200px]">
                <img src="src/assets/medal.png" alt="bonds" />
              </div>
            </div>

            {/* chat */}
            {/* <div className="chat chat-end absolute bottom-[300px] left-1/2 -translate-x-1/4">
              <motion.div
                initial={{ y: 5 }}
                animate={{ y: -5 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <div className="chat-bubble bg-white text-slate-800 w-[350px]">
                  ⚠️ เหมาะกับผู้ลงทุนที่รับความเสี่ยงได้ไม่มาก
                </div>
              </motion.div>
            </div> */}

            {/* chat 2 */}
            {/* <div className="chat chat-end absolute bottom-[220px] left-1/2 -translate-x-1/5">
              <motion.div
                initial={{ y: 5 }}
                animate={{ y: -5 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                <div className="chat-bubble bg-white text-slate-800 w-[320px]">
                  ไม่คาดหวังผลตอบแทนที่สูงหรือหวือหวา
                </div>
              </motion.div>
            </div> */}

            {/* cloud */}
            <div className="absolute -z-10 opacity-15 bottom-[500px] -right-[700px]">
              <img
                src="src/assets/cloud.png"
                alt="cloud"
                className="w-[1200px]"
              />
            </div>

            <div className="absolute -z-10 opacity-20 bottom-[130px] -left-[250px]">
              <img
                src="src/assets/cloud.png"
                alt="cloud"
                className="w-[700px] scale-x-[-1]"
              />
            </div>
          </div>
        </section>

        {/* <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            <div className="relative overflow-hidden whitespace-nowrap bg-gray-100 py-4"></div>
          </span>
        </div> */}
      </div>
    </>
  );
}

export default AssetBoxesFI;
