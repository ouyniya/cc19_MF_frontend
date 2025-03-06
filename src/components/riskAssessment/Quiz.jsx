import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useRiskAssessmentStore from "../../stores/useRiskAssessmentStore";
import { createAlert } from "../../utils/createAlert";
import { ArrowLeft, ArrowRight } from "lucide-react";

// สำหรับแบบทดสอบประเมินความเสี่ยง ซึ่งดึงข้อมูลคำถามจาก Zustand Store และให้ผู้ใช้เลือกคำตอบ โดยคำนวณคะแนนและบันทึกผลลัพธ์ไปยัง Store เมื่อส่งคำตอบ

function Quiz() {
  const getRiskQuiz = useRiskAssessmentStore((state) => state.getRiskQuiz);
  const riskQuiz = useRiskAssessmentStore(
    (state) => state.riskQuiz?.riskQuestion
  );
  const saveScore = useRiskAssessmentStore((state) => state.saveScore);
  const score = useRiskAssessmentStore((state) => state.score);

  const [currentIndex, setCurrentIndex] = useState(0); //เก็บ index ของคำถามปัจจุบัน
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  }); // object {1: Ans1, 2: Ans2} เก็บคำตอบของผู้ใช้ (key = ข้อที่, value = ค่าคะแนน)

  useEffect(() => {
    getRiskQuizForPage();
  }, []);

  const getRiskQuizForPage = async () => {
    try {
      await getRiskQuiz();
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  let scoreall = 0;

  // find all scores
  // วนลูป selectedAnswers เพื่อรวมคะแนนทั้งหมด
  if (selectedAnswers) {
    for (let el in selectedAnswers) {
      scoreall += selectedAnswers[el];
      // console.log(selectedAnswers[el]);
    }
  }

  //เมื่อเลือกคำตอบ จะบันทึกคะแนนของตัวเลือกนั้นใน selectedAnswers
  const handleSelect = (option, score) => {
    setSelectedAnswers({ ...selectedAnswers, [option]: score });
    // console.log(option, score);
  };

  // console.log(selectedAnswers);

  // ไปยังคำถามถัดไป ถ้าตอบแล้ว
  const nextQuestion = () => {
    if (selectedAnswers[currentIndex + 1] === null) {
      createAlert("info", "กรุณาตอบคำถามก่อนไปข้อถัดไป");
      return;
    }
    if (currentIndex < riskQuiz?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      {/* <h1 className="text-2xl text-center">{scoreall}</h1> */}
      {/* แสดง process ว่าทำถึงข้อไหนแล้ว */}
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-575px)] text-gray-800 my-[32px]">
        <div className="flex">
          <ul className="steps">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step, index) => (
              <li
                key={index}
                className={`step ${
                  step - 1 <= currentIndex ? "step-primary" : ""
                }`}
              ></li>
            ))}
          </ul>
        </div>

        {/* แสดงคำถามปัจจุบัน */}
        <div className="bg-white px-[54px] py-[48px] rounded-xl shadow-lg w-full max-w-xl min-w-[350px]">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">
              {riskQuiz ? riskQuiz[currentIndex]?.question : ""}
            </h2>
            <div className="w-full">
              <div className="flex">
                <label className="label cursor-pointer text-left">
                  <input
                    type="radio"
                    value="1"
                    name={currentIndex + 1} // ทำให้ปุ่ม <input> ที่อยู่ในคำถามเดียวกันเป็นกลุ่มเดียวกัน และสามารถเลือกได้เพียงตัวเลือกเดียว
                    className="radio radio-primary mr-[12px]"
                    checked={selectedAnswers[currentIndex + 1] === 1}
                    onChange={() => handleSelect(currentIndex + 1, 1)} // เมื่อคลิกที่ปุ่ม จะบันทึกค่าที่เลือกไปยัง selectedAnswers
                    // ✅ ใช้ onChange สำหรับ <input type="radio"> เพราะมันทำงานเฉพาะเมื่อค่ามีการเปลี่ยนแปลง
                    // ❌ ไม่ควรใช้ onClick เพราะมันจะทำงานซ้ำแม้ค่าจะไม่เปลี่ยน
                  />
                  <span className="label-text text-lg">
                    {riskQuiz ? riskQuiz[currentIndex]?.option1 : ""}
                  </span>
                </label>
              </div>
              <div className="flex">
                <label className="label cursor-pointer text-left">
                  <input
                    type="radio"
                    value="2"
                    name={currentIndex + 1}
                    className="radio radio-primary mr-[12px]"
                    checked={selectedAnswers[currentIndex + 1] === 2}
                    onChange={() => handleSelect(currentIndex + 1, 2)}
                  />
                  <span className="label-text text-lg">
                    {riskQuiz ? riskQuiz[currentIndex]?.option2 : ""}
                  </span>
                </label>
              </div>
              <div className="flex">
                <label className="label cursor-pointer text-left">
                  <input
                    type="radio"
                    value="3"
                    name={currentIndex + 1}
                    className="radio radio-primary mr-[12px]"
                    checked={selectedAnswers[currentIndex + 1] === 3}
                    onChange={() => handleSelect(currentIndex + 1, 3)}
                  />
                  <span className="label-text text-lg">
                    {riskQuiz ? riskQuiz[currentIndex]?.option3 : ""}
                  </span>
                </label>
              </div>
              <div className="flex">
                <label className="label cursor-pointer text-left">
                  <input
                    type="radio"
                    value="4"
                    name={currentIndex + 1}
                    className="radio radio-primary mr-[12px]"
                    checked={selectedAnswers[currentIndex + 1] === 4}
                    onChange={() => handleSelect(currentIndex + 1, 4)}
                  />
                  <span className="label-text text-lg">
                    {riskQuiz ? riskQuiz[currentIndex]?.option4 : ""}
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          {/* ปุ่มย้อนกลับ (ปิดการใช้งานถ้าอยู่ข้อแรก) */}
          <div className="flex justify-between mt-[32px]">
            <button
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 flex gap-2"
              onClick={prevQuestion}
              disabled={currentIndex === 0}
            >
              <ArrowLeft /> ก่อนหน้า
            </button>

            {/* ปุ่มไปข้อต่อไป */}
            {currentIndex < riskQuiz?.length - 1 && (
              <button
                className="px-4 py-2 bg-primary text-white rounded-full flex gap-2"
                onClick={nextQuestion}
                // disabled={currentIndex === quizQuestions.length - 1}
              >
                ถัดไป <ArrowRight />
              </button>
            )}

            {/* ปุ่มส่งแบบทดสอบไปหน้าผลลัพธ์ พร้อมบันทึกคะแนน */}
            {currentIndex === riskQuiz?.length - 1 && (
              <Link to="/risk-assessment-result">
                <button
                  onClick={() => {
                    saveScore(scoreall);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-full"
                >
                  ส่งคำตอบ
                </button>
              </Link>
            )}
          </div>
        </div>
        <p className="text-xs mt-[48px]">
          * แบบประเมินความเสี่ยงนี้นำมาจากเว็บไซต์ของสำนักงาน กลต. ณ วันที่ 4
          มีนาคม 2568{" "}
          <a
            href="https://www.smarttoinvest.com/Pages/Know%20Investment/Money%20Calculation%20Tool/InvestmentPortfolio.aspx"
            className="link link-primary"
          >
            คลิกที่นี่
          </a>
        </p>
      </div>
    </>
  );
}

export default Quiz;
