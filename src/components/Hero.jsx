import { ReactLenis } from "lenis/dist/lenis-react"; //ใช้ทำ smooth scrolling
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react"; // ใช้เก็บ reference ของ DOM element
import AssetBoxes from "./AssetBoxes";

function Hero() {
  return <SmoothScrollHero />;
}

export const SmoothScrollHero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white -mt-[50px]">
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          // lerp: 0.05 → ควบคุมความนุ่มนวลของการเลื่อน (low-pass filter)
          // ค่า ต่ำ → การเลื่อนจะมีความหนืดและช้าลง
          // ค่า สูง → การเลื่อนเร็วขึ้น
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        <Heros />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Heros = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 " />
    </div>
  );
};

const CenterImage = () => {
  const assetBoxes = [
    {
      text: "พันธบัตรรัฐบาล",
      fundRiskLevelId: 3,
      beginColor: "darkblue",
      endingColor: "mediumblue",
    },
    {
      text: "ตราสารหนี้",
      fundRiskLevelId: 4,
      beginColor: "mediumblue",
      endingColor: "pink",
    },
    {
      text: "ตราสารทุน",
      fundRiskLevelId: 6,
      beginColor: "pink",
      endingColor: "orange",
    },
    {
      text: "ทรัพย์สินทางเลือก",
      fundRiskLevelId: 8,
      beginColor: "orange",
      endingColor: "green",
    },
  ];

  return (
    <>
      <motion.div
        className="sticky top-[100px] md:top-[130px] lg:top-[180px] h-screen w-full"
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* cloud */}
        <div className="absolute z-10 left-[100px] top-[150px] opacity-0 md:opacity-80">
          <img
            src="/cloud.png"
            alt="cloud"
            className="w-[250px] scale-x-[-1]"
          />
        </div>
        <div className="absolute z-10 right-[70px] top-[230px] opacity-0 md:opacity-80">
          <img src="/cloud.png" alt="cloud" className="w-[350px]" />
        </div>

        <div className="bg-gradient-to-b from-blue-200 to-white -mt-[5px]"></div>
        <div className="w-full flex-col justify-center items-center">
          {/* header text */}
          <div className="">
            {/* topic */}
            <div className="flex flex-col items-center">
              <p className="leading-tight text-2xl xl:text-6xl md:text-5xl font-medium text-[var(--blue)]">
                ลงทุนอย่างมั่นใจ
              </p>
              <div className="flex">
                <p className="xl:text-8xl mt-[12px] text-4xl md:text-6xl font-bold text-[var(--blue)]">
                  เลือกกองทุนที่
                  <a className="text-center font-bold bg-gradient-to-tr from-[var(--blue)] to-[var(--pink)] bg-clip-text text-transparent">
                    ใช่
                  </a>
                </p>
              </div>
              <p className="xl:text-7xl mt-2 md:mt-[32px] text-3xl md:text-6xl font-bold text-[var(--blue)] bg-gradient-to-r from-[var(--blue)] to-[var(--pink)] bg-[length:100%_6px] bg-no-repeat bg-bottom z-10">
                ในไม่กี่คลิก!
              </p>
              {/* background-size: 100% 6px; กำหนดให้ความสูงของ background เป็น 6px */}
              <div className="mt-4 md:mt-[60px] z-10">
                <p className="font-medium z-50 xl:text-4xl text-2xl text-center text-gray-500">
                  กองทุนไหนใช่? เราช่วยคุณคัดกรอง
                </p>
              </div>

              <div className="sm:flex px-[24px] sm:gap-5 flex-wrap xl:flex-nowrap md:mt-[24px] z-50">
                {assetBoxes.map((item, index) => (
                  <AssetBoxes
                    key={index}
                    text={item.text}
                    beginColor={item.beginColor}
                    endingColor={item.endingColor}
                    style={{
                      background: `linear-gradient(to bottom right, var(--${item.beginColor}), var(--${item.endingColor}))`,
                    }}
                    fundRiskLevelId={item.fundRiskLevelId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* cloud */}
        {/* <div className="absolute z-10 -left-[300px] opacity-0 md:opacity-80">
          <img src="/cloud.png" alt="cloud" className="w-[700px]" />
        </div>
        <div className="absolute z-10 -right-[500px] bottom-[100px]">
          <img
            src="/cloud.png"
            alt="cloud"
            className="w-[1500px] opacity-0 md:opacity-80"
          />
        </div> */}
      </motion.div>
    </>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/coin.gif"
        alt="And example of a space launch"
        start={-200} // จุดเริ่มต้นของตำแหน่ง Y
        end={200} // จุดสิ้นสุดของตำแหน่ง Y
        className="w-1/3"
      />
      <ParallaxImg
        src="/coin.gif"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="/coin.gif"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="/coin.gif"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null); // ใช้เก็บ reference ของรูปภาพ เพื่อให้ useScroll ติดตามตำแหน่งการเลื่อนของมัน

  const { scrollYProgress } = useScroll({
    // useScroll สำหรับติดตามค่าการเลื่อนของหน้าเว็บ
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });
  //   ใช้ offset เพื่อกำหนด ช่วงที่ animation จะเริ่มและจบ
  // ["start end", "end start"] แปลว่า:
  // เมื่อรูปภาพ เข้าใกล้จอ (ที่ตำแหน่ง start) → scrollYProgress = 0
  // เมื่อรูปภาพ เลื่อนออกจากจอ (ถึง end) → scrollYProgress = 1

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  // opacity: เมื่อ scrollYProgress เปลี่ยนจาก 0.75 → 1
  // ค่า opacity จะเปลี่ยนจาก 1 (มองเห็นชัด) → 0 (หายไป)

  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  // scrollYProgress = 0.75 → scale = 1 (ขนาดปกติ)
  // scrollYProgress = 1 → scale = 0.85 (หดลง 85% ของขนาดเดิม)

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;
  //   useMotionTemplate เป็น Hook ของ Framer Motion
  // ใช้สำหรับ รวมค่าต่างๆ เป็น string สำหรับ CSS transform property
  // แปลงค่า y และ scale ให้อยู่ในรูปของ CSS transform string
  // "translateY(100px) scale(0.9)" ตัวอย่างผลลัพธ์เมื่อ y = 100 และ scale = 0.9

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

export default Hero;
