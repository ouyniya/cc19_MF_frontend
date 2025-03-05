import React from "react";
import useRiskAssessmentStore from "../../stores/useRiskAssessmentStore";
import {
  ChartLine,
  InfoIcon,
  Save,
  ScrollText,
  Sparkles,
  Wallet,
} from "lucide-react";
import ExamplePort from "./ExamplePort";
import { Chart, ArcElement } from "chart.js";
import useUserStore from "../../stores/useUserStore";
import { createAlert } from "../../utils/createAlert";
Chart.register(ArcElement);

function RiskLevel() {
  const riskResult = useRiskAssessmentStore((state) => state.riskResult.result);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const saveRiskResult = useRiskAssessmentStore((state) => state.saveRiskResult);

  const hdlSaveRisk = async () => {
    try {
      if (!user || !riskResult) {
        return createAlert("info", "ไม่มีข้อมูลผู้ใช้งานหรือคะแนนความเสี่ยง")
      }

      const body = {
        userRiskLevelId: Number(riskResult.id)
      }

      await saveRiskResult(token, body)
      createAlert("success", "บันทึกข้อมูลเรียบร้อยแล้ว")

    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  const userRiskLevelName = (riskLevelId) => {
    if (riskLevelId === 1) {
      return "ความเสี่ยงต่ำ";
    } else if (riskLevelId === 2) {
      return "ความเสี่ยงปานกลางค่อนข้างต่ำ";
    } else if (riskLevelId === 3) {
      return "ความเสี่ยงปานกลางค่อนข้างสูง";
    } else if (riskLevelId === 4) {
      return "ความเสี่ยงสูง";
    } else if (riskLevelId === 5) {
      return "ความเสี่ยงสูงมาก";
    } else {
      return null;
    }
  };

  let useRiskLevel = null;
  useRiskLevel = userRiskLevelName(riskResult?.id);

  return (
    <>
      <div className="text-center mt-[100px] max-w-4xl m-auto ">
        <h2 className="text-2xl font-semibold">คุณคือผู้ลงทุนแบบ</h2>
        <p
          className={`font-bold bg-gradient-to-r from-blue-600 
          ${
            riskResult?.id === 5
              ? "via-pink-400"
              : riskResult?.id === 4
              ? "via-orange-400"
              : riskResult?.id === 3
              ? "via-yellow-400"
              : riskResult?.id === 3
              ? "via-green-400"
              : riskResult?.id === 2
              ? "via-teal-400"
              : "via-sky-400"
          }
          to-indigo-400 inline-block text-transparent bg-clip-text text-6xl line leading-[100px]`}
        >
          {useRiskLevel}
        </p>

        <div className=" flex flex-col justify-start items-start w-full">
          <div className="m-auto pt-[100px]">
            <p className="mb-[24px] text-2xl font-semibold">
              {" "}
              ตัวอย่างพอร์​ตการลงทุน
            </p>
            <div className=" rounded-xl p-[24px] w-[800px] m-auto">
              <ExamplePort />
            </div>
          </div>

          <div className="m-auto pt-[60px]">
            <p className="mb-[24px] text-2xl font-semibold">
              {" "}
              ตัวอย่างการจัดสรรค์พอร์ตการลงทุน
            </p>

            <div className="stats shadow">
              {/* ตัวอย่างการจัดสรรค์พอร์ตการลงทุน */}
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <Wallet className="stroke-blue-400" />
                </div>
                <div className="stat-title">
                  {riskResult?.recommendCriteria[0].fundAssetType}
                </div>
                <div className="stat-value text-xl font-bold">
                  {riskResult?.recommendCriteria[0].percentInvest}
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <ScrollText className="stroke-teal-400" />
                </div>
                <div className="stat-title">
                  {riskResult?.recommendCriteria[1].fundAssetType}
                </div>
                <div className="stat-value text-xl font-bold">
                  {riskResult?.recommendCriteria[1].percentInvest}
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <ChartLine className="stroke-rose-400" />
                </div>
                <div className="stat-title">
                  {riskResult?.recommendCriteria[2].fundAssetType}
                </div>
                <div className="stat-value text-xl font-bold">
                  {riskResult?.recommendCriteria[2].percentInvest}
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <Sparkles className="stroke-amber-400" />
                </div>
                <div className="stat-title">
                  {riskResult?.recommendCriteria[3].fundAssetType}
                </div>
                <div className="stat-value text-xl font-bold">
                  {riskResult?.recommendCriteria[3].percentInvest}
                </div>
              </div>
            </div>

            {/* ตัวอย่างการจัดสรรค์พอร์ตการลงทุน */}
          </div>

          <h2 className="mt-[60px] text-2xl font-semibold">ลงทุนในกองไหนดี?</h2>
          <p className="mt-[12px]">{`คุณมีระดับความเสี่ยงที่ยอมรับได้อยู่ใน “${useRiskLevel}” สามารถเลือกลงทุนในกองทุนที่มีระดับความเสี่ยง ดังนี้`}</p>
          <br />
          <div className="flex flex-wrap gap-2">
            {riskResult?.riskLevelMapping.map((el, index) => (
              <div
                key={index}
                className={`badge badge-outline badge-lg
             ${
               index === 0
                 ? "badge-info"
                 : index === 1
                 ? "badge-primary"
                 : index === 2
                 ? "badge-accent"
                 : index === 3
                 ? "badge-success"
                 : index === 4
                 ? "badge-warning"
                 : index === 5
                 ? "badge-error"
                 : "badge-secondary"
             }
             `}
              >
                {el.fundRiskLevelName}
              </div>
            ))}
          </div>

          {user && (
            <button
              onClick={hdlSaveRisk}
              className="btn btn-primary btn-lg mt-[60px] m-auto text-white"
            >
              <Save />
              บันทึกข้อมูลของคุณ
            </button>
          )}
        </div>
      </div>
      <div className="collapse bg-base-100 border-base-300 border text-left mt-[60px] max-w-4xl m-auto">
        <input type="checkbox" />
        <div className="collapse-title font-semibold flex gap-2 items-center text-lg">
          <InfoIcon size="20px" className="stroke-amber-400" />{" "}
          ข้อจำกัดการใช้งาน
        </div>
        <div className="collapse-content">
          <ul>
            <li>
              ‣
              ข้อมูลผลประเมินการจัดพอร์ตการลงทุนนำมาจากสำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์{" "}
              <a
                href="https://www.smarttoinvest.com/Pages/Know%20Investment/Money%20Calculation%20Tool/InvestmentPortfolioResult.aspx?Result=29"
                className="link link-info"
              >
                คลิกที่นี่
              </a>
            </li>
            <li>
              ‣ ข้อมูลที่นำเสนอในเว็บไซต์นี้
              เป็นข้อมูลเบื้องต้นที่มีจุดประสงค์เพื่อให้ผู้ใช้สามารถเข้าใจหลักการวางแผนการลงทุนตามระดับความเสี่ยงที่เหมาะสม
              มิได้ถือเป็นคำแนะนำการลงทุนที่เฉพาะเจาะจง
              และไม่สามารถใช้ทดแทนคำแนะนำจากที่ปรึกษาการลงทุนที่ได้รับใบอนุญาตได้
            </li>
            <li>
              {" "}
              ‣ ควรพิจารณาปัจจัยอื่นๆ เช่น วัตถุประสงค์ในการลงทุน,
              สถานการณ์ทางเศรษฐกิจ และภาวะตลาด เพื่อการตัดสินใจลงทุนที่เหมาะสม
            </li>
            <li>
              ‣
              ผลการคำนวณและการจัดสรรพอร์ตการลงทุนที่แสดงเป็นเพียงการประมาณการจากข้อมูลในอดีต
              ซึ่งอาจมีความแตกต่างจากผลลัพธ์จริงในอนาคต
            </li>
            <li>
              ‣ การลงทุนในสินทรัพย์ที่มีความเสี่ยงสูงอาจทำให้สูญเสียเงินลงทุนได้
              ผู้ใช้ควรพิจารณาความเสี่ยงและการลงทุนที่เหมาะสมกับความสามารถทางการเงินของตน
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default RiskLevel;
