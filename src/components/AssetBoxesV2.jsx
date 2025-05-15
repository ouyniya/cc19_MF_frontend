import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowRight, InfoIcon, PieChartIcon } from "lucide-react";
import { Link } from "react-router";

function AssetBoxesV2() {
  const cards = [
    {
      url: "/usa.avif",
      title: "หุ้นสหรัฐฯ 🇺🇸",
      id: 1,
      desc: "ลงทุนในหรือมีไว้ซึ่งตราสารทุนของประเทศอเมริกา โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "/vn.webp",
      title: "หุ้นเวียดนาม 🇻🇳",
      id: 2,
      desc: "ลงทุนในหรือมีไว้ซึ่งตราสารทุนของประเทศเวียดนาม โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "/jp.avif",
      title: "หุ้นญี่ปุ่น 🇯🇵",
      id: 3,
      desc: "ลงทุนในหรือมีไว้ซึ่งตราสารทุนของประเทศญี่ปุ่น โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "/eu.avif",
      title: "หุ้นยุโรป",
      id: 4,
      desc: "ลงทุนในหรือมีไว้ซึ่งตราสารทุนต่างประเทศกลุ่มยุโรป โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "/id.jpeg",
      title: "หุ้นอินเดีย 🇮🇳",
      id: 5,
      desc: "ลงทุนในหรือมีไว้ซึ่งตราสารทุนของประเทศอินเดีย โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "/indo.webp",
      title: "หุ้น Emerging market",
      id: 7,
      desc: "ลงทุนในหรือมีไว้ซึ่งตราสารทุนต่างประเทศกลุ่ม emerging market โดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "/th.jpeg",
      title: "หุ้นไทย 🇹🇭",
      id: 8,
      desc: "ลงทุนในหรือมีไว้ซึ่งหุ้นไทยโดยเฉลี่ยในรอบปีบัญชี >= 80% ของมูลค่าทรัพย์สินสุทธิของกองทุนรวม",
    },
    {
      url: "",
      title: "กองทุนรวมหุ้นอื่นๆ",
      id: 9,
      desc: "",
    },
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

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
          className="relative h-[300vh] w-full bg-gradient-to-b from-[var(--blue)] via-[var(--pink)] to-[var(--blue)]"
        >
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="absolute top-[150px] left-1/2 -translate-x-1/2 text-white text-5xl font-bold text-center">
              กองทุนรวมหุ้น
              <div className="px-[24px] py-[12px] mt-[32px] text-lg z-10 font-normal opacity-0 md:opacity-100">
                <p>
                  กองทุนรวมประเภทนี้เน้นลงทุนในหุ้นหลากหลายรูปแบบ เช่น หุ้นสามัญ
                  หุ้นบุริมสิทธิ ใบสำคัญแสดงสิทธิ
                  รวมถึงหน่วยลงทุนของกองทุนรวมหุ้น
                  โดยกองทุนจะมีการลงทุนในสินทรัพย์เหล่านี้ไม่น้อยกว่าร้อยละ 80
                  ของมูลค่าทรัพย์สินสุทธิ (NAV) โดยเฉลี่ยในแต่ละรอบปีบัญชี
                </p>
              </div>
            </div>
            <motion.div style={{ x }} className="flex gap-4">
              {cards.map((card) => {
                return (
                  <div
                    key={card.id}
                    className="group relative h-[450px] w-[350px] overflow-hidden rounded-3xl"
                  >
                    {card.id - 1 === cards.length ? (
                      <Link to="/fund">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-2xl font-medium shadow-md hover:bg-white/30 transition top-1/2 absolute -translate-y-1/2 ml-[60px]">
                          ค้นหาเพิ่มเติม
                          <ArrowRight className="w-7 h-7" />
                        </button>
                      </Link>
                    ) : (
                      <>
                        <div
                          style={{
                            backgroundImage: `url(${card.url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110 "
                        ></div>
                        <div className="absolute inset-0 z-10 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-100 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 text-white">
                          <div className="flex flex-col justify-center px-[40px] pt-[100px]">
                            <PieChartIcon
                              size="50px"
                              className="mb-[12px] opacity-55"
                            />
                            <p className="text-2xl font-bold">{card.title}</p>
                            <p className="text-lg font-bold py-[12px]">
                              สัดส่วนการลงทุน
                            </p>
                            <p>{card.desc}</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 z-9 grid place-content-center">
                          <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-3xl font-bold uppercase text-white backdrop-blur-lg">
                            {card.title}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </motion.div>

            {/* chat */}
            <div className="chat chat-end absolute bottom-[300px] left-1/2 -translate-x-1/4">
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
                <div className="chat-bubble bg-white text-slate-800 w-[300px]">
                  ⚠️ เหมาะกับคนที่รับความเสี่ยงได้สูง
                </div>
              </motion.div>
            </div>

            {/* chat 2 */}
            <div className="chat chat-end absolute bottom-[190px] left-1/2 -translate-x-1/5">
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
                เข้าใจว่าราคาหุ้นมีขึ้นมีลงตลอดเวลา <br />
                และควรมองการลงทุนเป็นเรื่องระยะยาว
                </div>
              </motion.div>
            </div>


            {/* cloud */}
            <div className="absolute -z-10 opacity-15 -bottom-[50px] -right-[500px]">
              <img
                src="/cloud.png"
                alt="cloud"
                className="w-[1200px]"
              />
            </div>

            <div className="absolute -z-10 opacity-20 bottom-[130px] -left-[250px]">
              <img
                src="/cloud.png"
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

export default AssetBoxesV2;
