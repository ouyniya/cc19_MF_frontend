import React, { useEffect, useState } from "react";
import Logout from "../auth/Logout";
import {
  AlertCircle,
  Asterisk,
  Edit2,
  Plus,
  Sparkle,
  Trash2,
} from "lucide-react";
import useUserStore from "../../stores/useUserStore";
import ChartPort from "./ChartPort";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useInvestmentStore from "../../stores/useInvestmentStore";
import useRiskAssessmentStore from "../../stores/useRiskAssessmentStore";
import { createAlert } from "../../utils/createAlert";
import AddPortList from "./AddPortList";
import EditPortList from "./EditPortList";
import RiskQuizBtn from "../riskAssessment/RiskQuizBtn";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  ArcElement
);

function Investment() {
  // ประกาศ State และดึงข้อมูลจาก Zustand Store
  const currentUser = useUserStore((state) => state.currentUser?.user);
  const getPortfolio = useInvestmentStore((state) => state.getPortfolio);
  const analyzePort = useInvestmentStore((state) => state.analyzePort);
  const token = useUserStore((state) => state.token);
  const currentPortfolio = useInvestmentStore(
    (state) => state.currentPortfolio
  );
  const portfolio = useInvestmentStore((state) => state.portfolio);
  const deletePortList = useInvestmentStore((state) => state.deletePortList);
  const setCurrentPortfolio = useInvestmentStore(
    (state) => state.setCurrentPortfolio
  );
  const getRiskResultById = useRiskAssessmentStore(
    (state) => state.getRiskResultById
  );
  const myRiskResultForPort = useRiskAssessmentStore(
    (state) => state.myRiskResultForPort?.result?.recommendPort
  );

  const [convertedData, setConvertedData] = useState([]);
  const [weightedAssets, setWeightedAssets] = useState([]);
  const [aiResult, setAiResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get all assets of this user
  useEffect(() => {
    getMyPort(token);
  }, []);

  // load port
  useEffect(() => {
    convertData(portfolio);
    getRiskResultByIdThisPage(); // ดึงผลการวิเคราะห์ความเสี่ยง >> myRiskResultForPort
  }, [portfolio]);

  const getMyPort = async (token) => {
    try {
      await getPortfolio(token);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  const getRiskResultByIdThisPage = async () => {
    try {
      if (!currentUser?.userRiskAssessments[0]) {
        return;
        // return createAlert(
        //   "info",
        //   "กรุณาทำแบบประเมินความเสี่ยงก่อนใช้งานตัวอย่างพอร์ตการลงทุนแนะนำ"
        // );
      }
      await getRiskResultById(
        currentUser?.userRiskAssessments[0]?.userRiskLevelId
      );
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  const hdlDeletePort = async (id, currentPort) => {
    setCurrentPortfolio(currentPort);

    try {
      //   console.log(id);
      await deletePortList(Number(id), token);

      // alert
      createAlert("success", "ลบข้อมูลเรียบร้อยแล้ว");

      // refresh port
      await getPortfolio(token);

      const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
      delay(1500).then(() => window.location.reload());
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  //   convert groups
  // แปลงข้อมูลพอร์ตเพื่อใช้ในการวิเคราะห์
  const convertData = (portfolio) => {
    let convertedData = [];
    const shortTermBond = ["Money Market Government"];
    const otherEQ = [
      "Asia Pacific Ex Japan",
      "Emerging market",
      "Health Care",
      "Energy",
      "SET 50 Index Fund",
    ];
    if (portfolio.length !== 0) {
      for (let el of portfolio) {
        convertedData.push({
          id: el?.id,
          amount: el?.amount,
          fundName: el?.classAbbrs?.classAbbrName,
          fundCompareGroup: el?.classAbbrs?.funds?.fundCompareGroup,
          group: shortTermBond.includes(el?.classAbbrs?.funds?.fundCompareGroup)
            ? "กองทุนรวมพันธบัตรรัฐบาลระยะสั้น"
            : el?.classAbbrs?.funds?.fundCompareGroup.includes("Money")
            ? "กองทุนรวมตลาดเงินที่ลงทุนในประเทศ"
            : el?.classAbbrs?.funds?.fundCompareGroup.includes("Bond")
            ? "กองทุนรวมตราสารหนี้ระยะยาว"
            : el?.classAbbrs?.funds?.fundCompareGroup.includes("Allocation")
            ? "กองทุนรวมผสม"
            : el?.classAbbrs?.funds?.fundCompareGroup.includes("Equity")
            ? "กองทุนรวมตราสารทุน"
            : otherEQ.includes(el?.classAbbrs?.funds?.fundCompareGroup)
            ? "กองทุนรวมตราสารทุน"
            : "กองทุนรวมทรัพย์สินทางเลือกและอื่นๆ",
        });
      }

      setConvertedData(convertedData);

      // sum weight of each group
      let convertedWeight = [];

      for (let el of convertedData) {
        let found = false;

        for (let group of convertedWeight) {
          if (el.group === group.group) {
            group.totalAmount += el.amount;
            found = true; // Mark as found
            break; // ไม่ต้องวน loop ต่อ เพราะเจอแล้ว
          }
        }

        if (!found) {
          convertedWeight.push({
            group: el.group,
            totalAmount: el.amount,
          });
        }
      }

      //  คำนวณ total amount ทั้งหมด
      let totalAmount = convertedWeight.reduce(
        (sum, asset) => sum + asset.totalAmount,
        0
      );

      //  คำนวณ weight ของแต่ละ asset
      let weightedAssets = convertedWeight.map((asset) => ({
        group: asset.group,
        totalAmount: asset.totalAmount,
        weight: (asset.totalAmount / totalAmount).toFixed(1), // แปลงเป็น %
      }));

      setWeightedAssets(weightedAssets);
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

  // define risk level
  const riskLevelId = currentUser?.userRiskAssessments[0]?.userRiskLevelId;
  const riskLevel = userRiskLevelName(riskLevelId) ?? "";

  // สร้างชุดข้อมูลโดยจับคู่ข้อมูลจากทั้งสอง array
  let normalizedInvestmentData = weightedAssets?.map((asset) => {
    // หาคู่จาก myRiskResultForPort ที่ตรงกับ investmentType
    let matchedInvestment = myRiskResultForPort?.find(
      (investment) => investment.investmentType === asset.group
    );

    // console.log(matchedInvestment)

    // ถ้าไม่พบการจับคู่ ให้เติมข้อมูลที่เป็นค่า default (เช่น null หรือ 0)
    return {
      id: matchedInvestment ? matchedInvestment.id : null, // ถ้าไม่มีคู่ให้ใช้ null
      investmentType: asset.group, // ใช้ group จาก weightedAssets
      userRiskLevelId: matchedInvestment
        ? matchedInvestment.userRiskLevelId
        : null, // ถ้าไม่พบให้เป็น null
      weight: matchedInvestment ? matchedInvestment.weight : 0, // ถ้าไม่พบให้เป็น 0
    };
  });

  // เพิ่มข้อมูลจาก myRiskResultForPort ที่ไม่มีใน weightedAssets
  myRiskResultForPort?.forEach((investment) => {
    // เช็คว่า investmentType ของ myRiskResultForPort มีอยู่ใน normalizedInvestmentData หรือไม่
    let isExist = normalizedInvestmentData.some(
      (data) => data.investmentType === investment.investmentType
    );

    if (!isExist) {
      normalizedInvestmentData.push({
        id: investment.id,
        investmentType: investment.investmentType,
        userRiskLevelId: investment.userRiskLevelId,
        weight: investment.weight,
      });
    }
  });

  // chart data
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ปิดการรักษาอัตราส่วน เพื่อให้ปรับขนาดได้
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "center",
        labels: {
          font: {
            size: 12,
            family: "Noto Sans Thai",
          },
        },
      },
      title: { display: false },
      datalabels: {
        display: true,
        color: "#fff",
        font: { weight: "bold", size: 14 },
        anchor: "center", // จัดให้อยู่ตรงกลาง
        align: "center", // จัดให้อยู่ตรงกลาง
        formatter: (value) => `${value * 100}%`,
      },
    },
  };

  const Mydata = {
    labels: weightedAssets.map((el) => el.group),
    datasets: [
      {
        label: "สัดส่วน (%)",
        data: weightedAssets.map((el) => el.weight),
        backgroundColor: [
          "#06b9aa",
          "#FFBB38",
          "#2D60FF",
          "#FF82AC",
          "#539BFF",
          "#999999",
        ],
        borderWidth: 0,
      },
    ],
  };

  // prepare data for ai
  let myPortForAi = [];
  let recommendPortForAi = [];

  for (let el of weightedAssets) {
    myPortForAi.push({
      group: el.group,
      weight: el.weight,
    });
  }

  for (let el of normalizedInvestmentData) {
    recommendPortForAi.push({
      group: el.investmentType,
      weight: el.weight,
    });
  }

  // console.log(myPortForAi)
  // console.log(recommendPortForAi)

  const hdlAIAnalyst = async () => {
    setIsLoading(true); // เริ่มโหลด

    try {
      // console.log(myRiskResultForPort);
      if (myPortForAi.length === 0) {
        return createAlert("info", "ไม่มีข้อมูลพอร์ตการลงทุน");
      }

      if (!myRiskResultForPort) {
        return createAlert("info", "ไม่มีข้อมูลผลการประเมินความเสี่ยง");
      }

      const body = {
        userPortfolio: myPortForAi,
        recommendPort: recommendPortForAi,
      };

      const aiResultData = await analyzePort(token, body);
      // const aiResultData =
      //     "<p>พอร์ตของผู้ใช้มีความแตกต่างจากพอร์ตตัวอย่างที่แนะนำดังนี้:</p>\n<p>1. พอร์ตของผู้ใช้มีการลงทุนในกองทุนรวมผสม 90% และกองทุนรวมตราสารหนี้ระยะยาว 10% ซึ่งแสดงให้เห็นถึงความเสี่ยงต่ำและการเน้นลงทุนในตราสารหนี้มากเกินไป</p>\n<p>2. พอร์ตตัวอย่างที่แนะนำมีการกระจายการลงทุนมากขึ้น โดยมีการแบ่งสัดส่วนในการลงทุนในกองทุนรวมพันธบัตรรัฐบาลระยะสั้น 10%, กองทุนรวมตราสารหนี้ระยะยาว 30%, กองทุนรวมตราสารทุน 40%, และกองทุนรวมทองคำ 20% ซึ่งสร้างความหลากหลายและลดความเสี่ยงได้ดีกว่า</p>\n<p>สำหรับการปรับพอร์ตของผู้ใช้ ควรพิจารณาดังนี้:</p>\n<p>- ควรลดสัดส่วนการลงทุนในกองทุนรวมผสม เพราะแม้จะช่วยกระจายความเสี่ยงแต่ควรศึกษาเนื้อหาในหนังสือชี้ชวนของกองทุนเพื่อความเข้าใจที่ดี</p>\n<p>- เพิ่มสัดส่วนการลงทุนในกองทุนรวมตราสารทุนที่มีศักยภาพในการเติบโต และกองทุนรวมทองคำเพื่อป้องกันความเสี่ยงจากเงินเฟ้อ</p>\n<p>- รักษาสัดส่วนการลงทุนในกองทุนรวมตราสารหนี้ระยะยาวเหลือประมาณ 30% เพื่อให้พอร์ตมีความหลากหลายและมีโอกาสในการเติบโตดีขึ้น</p>\n<p>ความเสี่ยงของพอร์ตของผู้ใช้ในปัจจุบันมีความเสี่ยงต่ำจากการลงทุนในกองทุนรวมตราสารหนี้ แต่การลงทุนในกองทุนรวมผสมอาจมีความเสี่ยงขึ้นอยู่กับแง่มุมการลงทุนต่างๆ ดังนั้นควรศึกษาและตรวจสอบหนังสือชี้ชวนเพื่อให้เข้าใจถึงความเสี่ยงที่จะเกิดขึ้น</p>";
      setAiResult(aiResultData);
      //   console.log(aiResultData);

      document.getElementById("analyze-port-form").showModal();
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    } finally {
      setIsLoading(false); // โหลดเสร็จ
    }
  };

  const Portdata = {
    labels: normalizedInvestmentData.map((el) => el.investmentType),
    datasets: [
      {
        label: "สัดส่วน (%)",
        data: normalizedInvestmentData?.map((el) => el.weight),
        backgroundColor: [
          "#06b9aa",
          "#FFBB38",
          "#2D60FF",
          "#FF82AC",
          "#539BFF",
          "#999999",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col p-6 transition-all duration-300 w-[calc(100vw-350px)]">
        <div className="container h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">การลงทุนของคุณ</h1>
            <Logout />
          </div>

          {/* ส่วนแรก */}
          <div className="xl:flex block gap-5 mt-[48px]">
            <div className="flex flex-1 gap-7 bg-base-100 rounded-3xl px-[32px] py-[20px]">
              <div className="avatar">
                <div
                  className={`mask mask-squircle w-[50px] 
                    ${
                      riskLevelId >= 5
                        ? "bg-pink-500"
                        : riskLevelId >= 4
                        ? "bg-orange-500"
                        : riskLevelId >= 3
                        ? "bg-yellow-500"
                        : "bg-teal-500"
                    }
                    !flex justify-center items-center`}
                >
                  <Asterisk stroke="white" />
                </div>
              </div>
              <div>
                {!!riskLevel ? (
                  <p>คุณคือผู้ลงทุนแบบ</p>
                ) : (
                  "คุณยังไม่ได้ทำการประเมินความเสี่ยง"
                )}

                <p
                  className={`text-2xl font-bold
                    ${
                      riskLevelId >= 5
                        ? "text-pink-500"
                        : riskLevelId >= 4
                        ? "text-orange-500"
                        : riskLevelId >= 3
                        ? "text-yellow-500"
                        : "text-teal-500"
                    }
                    `}
                >
                  {riskLevel}
                </p>
              </div>
            </div>
            <div
              onClick={hdlAIAnalyst}
              className="w-[270px] bg-gradient-to-br from-blue-700 to-[var(--pink)] text-white rounded-3xl px-[32px] py-[20px] hover:cursor-pointer"
            >
              <div className="flex gap-2">
                <Sparkle size="18px" className="opacity-70" />
                <p>วิเคราะห์</p>
                <div className="badge badge-dash badge-white badge-outline">
                  AI
                </div>
              </div>

              {isLoading ? (
                <p className="text-xl font-bold">Loading...</p>
              ) : (
                <>
                  <p className="text-xl font-bold">พอร์ตการลงทุนของคุณ</p>
                </>
              )}
            </div>
          </div>

          {/* ส่วน port */}
          <div className="xl:flex block gap-5 mt-[32px]">
            <div className="flex flex-1 gap-7 bg-base-100 rounded-3xl px-[32px] py-[20px]">
              <div className="w-full m-auto">
                <p className="font-bold">พอร์ตการลงทุนของคุณ</p>
                <div className="p-[24px] m-auto">
                  {portfolio?.length !== 0 ? (
                    <ChartPort options={options} data={Mydata} />
                  ) : (
                    <>
                      <div className="absolute flex gap-2">
                        <p className="text-secondary">
                          คุณยังไม่มีพอร์ตการลงทุน
                        </p>
                        <button
                          onClick={(e) =>
                            document.getElementById("add-port-form").showModal()
                          }
                          className="btn btn-xs btn-outline btn-secondary rounded-full z-10"
                        >
                          {" "}
                          <Plus size="15px" />
                          เพิ่มกองทุนในพอร์ต
                        </button>
                      </div>

                      <div className="opacity-0 -z-10">
                        <ChartPort options={options} data={Mydata} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-1 gap-7 bg-base-300 rounded-3xl px-[32px] py-[20px]">
              <div className="w-full m-auto">
                <p className="font-bold">ตัวอย่างพอร์ตการลงทุนแนะนำ*</p>

                <div className="p-[24px] m-auto relative">
                  {!!currentUser?.userRiskAssessments[0] ? (
                    <ChartPort options={options} data={Portdata} />
                  ) : (
                    <>
                      <div className="absolute flex flex-col justify-center items-center gap-2">
                        <p>คุณยังไม่มีคะแนนความเสี่ยง</p>
                        <div className="z-10">
                          <RiskQuizBtn />
                        </div>
                      </div>
                      <div className="opacity-0">
                        <ChartPort options={options} data={Portdata} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนตาราง */}

          <div className="mt-[48px]">
            <div className="flex justify-between">
              <p className="font-bold mb-[24px]">รายการสินทรัพย์ลงทุนของคุณ</p>
              <button
                onClick={(e) =>
                  document.getElementById("add-port-form").showModal()
                }
                className="btn btn-xs btn-outline btn-primary rounded-full"
              >
                {" "}
                <Plus size="15px" />
                เพิ่มกองทุนในพอร์ต
              </button>
            </div>

            {convertedData?.length === 0 ? (
              <p className="text-center">ไม่มีข้อมูลการลงทุน</p>
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3">
                        ชื่อกองทุน
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ประเภทกองทุน
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        จำนวนเงินลงทุน
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span>แก้ไข / ลบ</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row  */}
                    {convertedData?.map((el, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th className="text-center">{index + 1}</th>
                        <td className="px-6 py-4">{el.fundName}</td>
                        <td className="px-6 py-4">{el.group}</td>
                        <td className="px-6 py-4 text-right ">
                          {el.amount.toLocaleString()}
                        </td>
                        <td className="flex gap-5 px-6 py-4">
                          <button
                            onClick={(e) => {
                              setCurrentPortfolio(el);
                              // console.log(el);
                              document
                                .getElementById("edit-port-form")
                                .showModal();
                            }}
                          >
                            <Edit2
                              size="18px"
                              className="stroke-blue-500 hover:stroke-blue-700 hover:cursor-pointer"
                            />
                          </button>

                          <button onClick={() => hdlDeletePort(el.id, el)}>
                            <Trash2
                              size="18px"
                              className="stroke-rose-500 hover:stroke-rose-700 hover:cursor-pointer"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <a
          className="text-xs text-slate-300"
          href="https://www.flaticon.com/free-animated-icons/loading"
          title="loading animated icons"
        >
          Loading animated icons created by Freepik - Flaticon
        </a>
      </div>

      <dialog id="add-port-form" className="modal">
        <div className="modal-box">
          <button // close model box
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => document.getElementById("add-port-form").close()}
          >
            ✕
          </button>
          <AddPortList />
        </div>
      </dialog>

      <dialog id="edit-port-form" className="modal">
        <div className="modal-box">
          <button // close model box
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => document.getElementById("edit-port-form").close()}
          >
            ✕
          </button>
          <EditPortList />
        </div>
      </dialog>

      <dialog id="analyze-port-form" className="modal">
        <div className="modal-box">
          <button // close model box
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) =>
              document.getElementById("analyze-port-form").close()
            }
          >
            ✕
          </button>
          <p className="text-xl font-bold py-[24px]">ผลการวิเคราะห์พอร์ต</p>
          {/* {aiResult} */}
          {aiResult ? (
            aiResult
              ?.split("<p>")
              ?.join(" ")
              ?.split("</p>")
              ?.map((el, index) => (
                <div key={index}>
                  <p className="mb-[12px]">{el}</p>
                </div>
              ))
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">

              <AlertCircle />
              <p>
                ยังไม่เปิดให้ใช้บริการวิเคราะห์ข้อมูลพอร์ตการลงทุนสำหรับบุคคลทั่วไป
              </p>
              </div>
              <p>หากท่านต้องการทดลองใช้งาน กรุณาติดต่อที่ support@nysdev.com</p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

export default Investment;
