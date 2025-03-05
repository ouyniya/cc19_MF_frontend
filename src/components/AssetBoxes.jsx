import React from "react";
import { useNavigate } from "react-router";
import { NextIcon } from "../icons";
import useFundStore from "../stores/useFundStore";

function AssetBoxes(props) {
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const {
    text,
    beginColor,
    endingColor,
    style,
    fundRiskLevelId,
    ...restProps
  } = props;
  
  const getFilteredAndSortedFunds = useFundStore(
    (state) => state.getFilteredAndSortedFunds
  );

  const filteredFunds = useFundStore(
    (state) => state.filteredFunds
  );

  const hdlGetFunds = async (fundRiskLevelId) => {
    await getFilteredAndSortedFunds(
      "",
      "",
      "",
      fundRiskLevelId,
      "",
      "",
      1,
      10,
      "return",
      "ผลตอบแทนกองทุนรวม",
      "1 year"
    );

    navigate("/fund"); // ไปที่หน้า filter

};

// console.log(filteredFunds)


  return (
    <>
      <div
        onClick={() => hdlGetFunds(fundRiskLevelId)}
        className={`relative m-auto my-[24px] flex flex-col justify-between xl:basis-1/4 sm:w-[270px] w-full min-w-[270px] h-[210px] rounded-2xl hover:cursor-pointer hover:rotate-6 transition-all duration-75`}
        style={style}
      >
        <div className="flex flex-col basis-3/4 px-[36px] py-[36px]">
          <p className="leading-9 text-xl font-light text-white">กองทุนรวม</p>
          <p className="text-2xl font-bold text-white">{text}</p>
        </div>
        <div className="absolute flex gap-2 bottom-[16px] right-[24px]">
          <p className="text-md font-light text-white">เลือกกองทุน</p>
          <NextIcon className="w-[18px]" />
        </div>
        <div className="w-full h-[50px] from-white bg-gradient-to-b opacity-15"></div>
      </div>
    </>
  );
}

export default AssetBoxes;
