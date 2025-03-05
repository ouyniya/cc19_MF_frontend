import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import Stat from "./Stat";
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
        className="sticky top-[250px] h-screen w-full"
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* cloud */}
        <div className="absolute z-10 left-[100px] top-[150px] opacity-0 md:opacity-80">
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="w-[250px] scale-x-[-1]"
          />
        </div>
        <div className="absolute z-10 right-[70px] top-[230px] opacity-0 md:opacity-80">
          <img src="src/assets/cloud.png" alt="cloud" className="w-[350px]" />
        </div>

        <div className="bg-gradient-to-b from-blue-200 to-white -mt-[5px]"></div>
        <div className="w-full flex-col justify-center items-center">
          {/* header text */}
          <div className="">
            {/* topic */}
            <div className="flex flex-col items-center">
              <p className="leading-tight xl:text-6xl text-5xl font-medium text-[var(--blue)]">
               ลงทุนอย่างมั่นใจ
              </p>
              <div className="flex">
                <p className="xl:text-8xl mt-[12px] text-6xl font-bold text-[var(--blue)]">
                  เลือกกองทุนที่
                  <a className="text-center font-bold bg-gradient-to-tr from-[var(--blue)] to-[var(--pink)] bg-clip-text text-transparent">
                    ใช่
                  </a>
                </p>
              </div>
              <p className="xl:text-7xl mt-[32px] text-6xl font-bold text-[var(--blue)] bg-gradient-to-r from-[var(--blue)] to-[var(--pink)] bg-[length:100%_6px] bg-no-repeat bg-bottom">
                ในไม่กี่คลิก!
              </p>
              {/* background-size: 100% 6px; กำหนดให้ความสูงของ background เป็น 6px */}
              <div className="mt-[86px] mb-[8px]">
                <p className="font-medium xl:text-4xl text-2xl text-center text-gray-500">
                  กองทุนไหนใช่? เราช่วยคุณคัดกรอง
                </p>
              </div>

              <div className="sm:flex px-[24px] sm:gap-5 flex-wrap xl:flex-nowrap md:mt-[80px] z-50">
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
        <div className="absolute z-10 -left-[300px] opacity-0 md:opacity-80">
          <img src="src/assets/cloud.png" alt="cloud" className="w-[700px]" />
        </div>
        <div className="absolute z-10 -right-[500px] bottom-[100px]">
          <img
            src="src/assets/cloud.png"
            alt="cloud"
            className="w-[1500px] opacity-0 md:opacity-80"
          />
        </div>
      </motion.div>
    </>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="src/assets/coin.gif"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="src/assets/coin.gif"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="src/assets/coin.gif"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="src/assets/coin.gif"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

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

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Launch Schedule
      </motion.h1>
      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
      <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
      <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
      <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
      <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <MapPin />
      </div>
    </motion.div>
  );
};

export default Hero;
