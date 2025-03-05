import React, { useEffect } from "react";
import {
  motion,
  useMotionValue, // set initial value
  useTransform, // set transformed value
  animate,
  useScroll,
} from "framer-motion";

function Stat() {
  // จำนวนกอง
  const countMF = useMotionValue(0);
  const roundedMF = useTransform(countMF, (value) => Math.round(value));

  // มูลค่าสินทรัพย์กองทุนรวมทั้งหมด
  const countNAV = useMotionValue(0);
  const roundedNAV = useTransform(countNAV, (value) => Math.round(value));

  // มูลค่าการลงทุนตปท
  const countForeign = useMotionValue(0);
  const roundedForeign = useTransform(countForeign, (value) =>
    Math.round(value)
  );

  //   จำนวนบลจ
  const countCompany = useMotionValue(0);
  const roundedCompany = useTransform(countCompany, (value) =>
    Math.round(value)
  );

  useEffect(() => {
    const controlsMF = animate(countMF, 255, { duration: 10 });
    const controlsNAV = animate(countNAV, 210, { duration: 10 });
    const controlsForeign = animate(countForeign, 704, { duration: 10 });
    const controlsCompany = animate(countCompany, 23, { duration: 10 });

    return () => {
      controlsMF.stop();
      controlsNAV.stop();
      controlsForeign.stop();
      controlsCompany.stop();
    };
  }, [countMF, countNAV, countForeign, countCompany]);

  return (
    <>
      <div className="stats w-full block md:flex mb-[80px]">
        <div className="stat place-items-center">
          <div className="stat-title text-xl">จำนวนกองทุนรวม</div>
          <div className="stat-value text-[var(--blue)] text-5xl">
            2,<motion.span>{roundedMF}</motion.span>
          </div>
          <div className="stat-desc text-md">As of : 31 Dec 2024</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title text-xl">
            มูลค่าสินทรัพย์สุทธิกองทุนรวม
          </div>
          <div className="stat-value text-[var(--pink)] text-5xl">
            5,<motion.span>{roundedNAV}</motion.span>
          </div>
          <div className="stat-desc last:text-md">พันล้านบาท</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title text-xl">มูลค่าการลงทุนในต่างประเทศ</div>
          <div className="stat-value text-[var(--green)] text-5xl">
            1,<motion.span>{roundedForeign}</motion.span>
          </div>
          <div className="stat-desc text-md">พันล้านบาท</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title text-xl">
            จำนวน บลจ. ที่จัดการกองทุนรวม
          </div>
          <div className="stat-value text-[var(--yellow)] text-5xl">
            <motion.span>{roundedCompany}</motion.span>
          </div>
          <div className="stat-desc text-md">As of : 31 Dec 2024</div>
        </div>
      </div>
    </>
  );
}

export default Stat;
