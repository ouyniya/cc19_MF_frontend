import React from "react";

function FilterFund() {
  return (
    <>
      <div className="text-center mb-[24px] mt-[48px]">
        <p className="text-2xl font-bold">เรียงลำดับกองทุน</p>
      </div>

      <div className="flex gap-5">
        <div className="dropdown dropdown-bottom flex basis-1/4">
          <div
            tabIndex="0"
            role="button"
            className="btn m-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-full text-white"
          >
            ผลตอบแทนระยะสั้น
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom flex basis-1/4">
          <div
            tabIndex="0"
            role="button"
            className="btn m-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full w-full text-white"
          >
            ผลตอบแทนระยะยาว
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom flex basis-1/4">
          <div
            tabIndex="0"
            role="button"
            className="btn m-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full w-full text-white"
          >
            ความเสี่ยงกองทุน
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom flex basis-1/4">
          <div
            tabIndex="0"
            role="button"
            className="btn m-1 bg-gradient-to-r from-yellow-500 to-emerald-500 rounded-full w-full text-white"
          >
            ค่าธรรมเนียม
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default FilterFund;
