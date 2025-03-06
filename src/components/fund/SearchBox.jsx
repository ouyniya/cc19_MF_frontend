import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import useFundStore from "../../stores/useFundStore";
import ResultTable from "./ResultTable";
import { createAlert } from "../../utils/createAlert";
import Remark from "./Remark";

function SearchBox() {
  const getFilteredAndSortedFunds = useFundStore(
    (state) => state.getFilteredAndSortedFunds
  );
  const filteredFunds = useFundStore((state) => state.filteredFunds);
  const getCompanies = useFundStore((state) => state.getCompanies);
  const getGroup = useFundStore((state) => state.getGroup);
  const getRiskLevel = useFundStore((state) => state.getRiskLevel);
  const getGlobalInv = useFundStore((state) => state.getGlobalInv);
  const countFunds = useFundStore((state) => state.filteredFunds.count);

  // select
  const company = useFundStore((state) => state.company?.result);
  const group = useFundStore((state) => state.group?.result);
  const riskLevel = useFundStore((state) => state.riskLevel?.result);
  const globalInv = useFundStore((state) => state.globalInv?.result);

  // filter
  const [currentPage, setCurrentPage] = useState(1); // Starting at page 1
  const [classAbbrName, setClassAbbrName] = useState("");
  const [fundCompareGroup, setFundCompareGroup] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [fundRiskLevelId, setFundRiskLevelId] = useState("");
  const [investCountryFlag, setInvestCountryFlag] = useState("");
  const [dividendPolicy, setDividendPolicy] = useState("");
  const [sortBy, setSortBy] = useState("return");
  const [performanceType, setPerformanceType] = useState("ผลตอบแทนกองทุนรวม");
  const [performancePeriod, setPerformancePeriod] = useState("1 year");

  useEffect(() => {
    getCompanies(); // โหลดข้อมูลบริษัทเมื่อ component โหลด
    getGroup();
    getRiskLevel();
    getGlobalInv();
  }, []);

  useEffect(() => {
      hdlSearchFilter(1);
      setCurrentPage(1)
  }, [sortBy, performanceType, performancePeriod]); // ดึงข้อมูลใหม่เมื่อ state เปลี่ยน

  let countFundsConverted = countFunds <= 10 ? 1 : Math.ceil(countFunds / 10);

  // console.log("company", companyId, "dividendPolicy", dividendPolicy);

  const handleDividendChange = (e) => {
    const value = e.target.value;
    setDividendPolicy(value); // อัพเดทค่า dividendPolicy ตามที่เลือก
  };

  const hdlSearchFilter = async (pageNumber) => {
    try {
      const page = pageNumber || 1;
      // console.log("***", page);

      await getFilteredAndSortedFunds(
        classAbbrName,
        companyId,
        fundCompareGroup,
        fundRiskLevelId,
        investCountryFlag,
        dividendPolicy,
        page,
        10,
        sortBy,
        performanceType,
        performancePeriod
      );

      // console.log(filteredFunds);
    } catch (error) {
      // console.log(error.response?.data.message)
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrease page number
      hdlSearchFilter(currentPage - 1); // Trigger the filter function
      // console.log(currentPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1); // Increase page number
    hdlSearchFilter(currentPage + 1); // Trigger the filter function
    // console.log(currentPage);
  };

  const handleClear = () => {
    setCurrentPage(1);
    setClassAbbrName("");
    setFundCompareGroup("");
    setCompanyId("");
    setFundRiskLevelId("");
    setInvestCountryFlag("");
    setDividendPolicy("");
    setSortBy("return");
    setPerformanceType("ผลตอบแทนกองทุนรวม");
    setPerformancePeriod("1 year");
  };

  const handleSortedFunds = (sort, type, period) => {
    setSortBy(sort);
    setPerformanceType(type);
    setPerformancePeriod(period);
  };

  return (
    <>
      <div className="text-center mb-[24px] mt-[48px]">
        <p className="text-2xl font-bold">ค้นหากองทุน</p>
      </div>
      <div className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          value={classAbbrName}
          onChange={(e) => setClassAbbrName(e.target.value)}
          placeholder="ใส่ชื่อกองทุนที่นี่"
        />
        <SearchIcon color="gray" />
      </div>

      {/* select boxes */}
      <div className="searchBoxes mt-[24px]">
        <div className="searchBoxes inside1 flex gap-5 w-full">
          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">บริษัทหลักทรัพย์จัดการกองทุน</span>
              </div>

              <select
                className="select select-bordered"
                value={companyId || ""}
                onChange={(e) => setCompanyId(e.target.value)}
                disabled={company?.length === 0} // ปิดการใช้งานหากไม่มีข้อมูล
              >
                <option disabled value="">
                  เลือกบริษัทจัดการกองทุนที่นี่
                </option>
                {/* เงื่อนไขให้แสดงข้อมูลจาก company */}
                {company?.map((el, index) => (
                  <option key={index} value={el.id}>
                    {el.companyName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">ประเภทของกองทุนรวม</span>
              </div>
              <select
                className="select select-bordered"
                value={fundCompareGroup || ""}
                onChange={(e) => setFundCompareGroup(e.target.value)}
                disabled={group?.length === 0} // ปิดการใช้งานหากไม่มีข้อมูล
              >
                <option disabled value="">
                  เลือกประเภทกองทุนที่นี่
                </option>
                {/* เงื่อนไขให้แสดงข้อมูลจาก company */}
                {group?.map((el, index) => (
                  <option key={index} value={el.id}>
                    {el.fundCompareGroup}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="searchBoxes inside2 flex gap-5 w-full">
          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">ระดับความเสี่ยง</span>
              </div>
              <select
                className="select select-bordered"
                value={fundRiskLevelId || ""}
                onChange={(e) => setFundRiskLevelId(e.target.value)}
                disabled={riskLevel?.length === 0} // ปิดการใช้งานหากไม่มีข้อมูล
              >
                <option disabled value="">
                  เลือกระดับความเสี่ยงของกองทุนที่นี่
                </option>
                {/* เงื่อนไขให้แสดงข้อมูลจาก company */}
                {riskLevel?.map((el, index) => (
                  <option key={index} value={el.id}>
                    {el.id}: {el.fundRiskLevelName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">ลงทุนในต่างประเทศ</span>
              </div>
              <select
                className="select select-bordered"
                value={investCountryFlag || ""}
                onChange={(e) => setInvestCountryFlag(e.target.value)}
                disabled={globalInv?.length === 0} // ปิดการใช้งานหากไม่มีข้อมูล
              >
                <option disabled value="">
                  เลือกการลงทุนในต่างประเทศที่นี่
                </option>
                {/* เงื่อนไขให้แสดงข้อมูลจาก company */}
                {globalInv?.map((el, index) => (
                  <option key={index} value={el.id}>
                    {el.investCountryFlag}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="searchBoxes inside3 flex justify-between gap-5 w-full">
          <div className="flex justify-between basis-1/4">
            {/* radio button สำหรับ "จ่ายปันผล" */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="Y"
                  checked={dividendPolicy === "Y"}
                  onChange={handleDividendChange}
                  className="radio radio-primary"
                />
                <span className="label-text mx-3 min-w-[80px]">จ่ายปันผล</span>
              </label>
            </div>

            {/* radio button สำหรับ "ไม่จ่ายปันผล" */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="N"
                  checked={dividendPolicy === "N"}
                  onChange={handleDividendChange}
                  className="radio radio-primary"
                />
                <span className="label-text mx-3  min-w-[80px]">
                  ไม่จ่ายปันผล
                </span>
              </label>
            </div>

            {/* radio button สำหรับ "ไม่ระบุ" */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value=""
                  checked={dividendPolicy === ""}
                  onChange={handleDividendChange}
                  className="radio radio-primary"
                />
                <span className="label-text mx-3  min-w-[80px]">ไม่ระบุ</span>
              </label>
            </div>
          </div>

          {/* button */}
          <div className="flex gap-5 my-[24px]">
            <button
              onClick={handleClear}
              className="btn rounded-full px-[24px] btn-lg"
            >
              ค่าเริ่มต้น
            </button>
            <button
              onClick={() => hdlSearchFilter(1)}
              className="btn btn-active btn-primary rounded-full px-[54px] btn-lg"
            >
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      {/* filter funds */}
      <div className="text-center mb-[24px] mt-[48px]">
        <p className="text-2xl font-bold">เรียงลำดับกองทุน</p>
        <p className="text-sm">
          คุณกำลังเรียงลำดับกองทุนตาม:{" "}
          {sortBy === "fee"
            ? "ค่าธรรมเนียมเก็บจริง"
            : sortBy === "return"
            ? "ผลตอบแทน"
            : sortBy === "risk"
            ? "ความผันผวน"
            : "-"}{" "}
          {performancePeriod}
        </p>
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
            <li
              onClick={() =>
                handleSortedFunds("return", "ผลตอบแทนกองทุนรวม", "3 months")
              }
            >
              <a>3 เดือน</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("return", "ผลตอบแทนกองทุนรวม", "6 months")
              }
            >
              <a>6 เดือน</a>
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
            <li
              onClick={() =>
                handleSortedFunds("return", "ผลตอบแทนกองทุนรวม", "1 year")
              }
            >
              <a>1 ปี</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("return", "ผลตอบแทนกองทุนรวม", "3 years")
              }
            >
              <a>3 ปี</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("return", "ผลตอบแทนกองทุนรวม", "5 years")
              }
            >
              <a>5 ปี</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("return", "ผลตอบแทนกองทุนรวม", "10 years")
              }
            >
              <a>10 ปี</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom flex basis-1/4">
          <div
            tabIndex="0"
            role="button"
            className="btn m-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full w-full text-white"
          >
            {/* ความผันผวนของกองทุนรวม */}
            ความเสี่ยงกองทุน
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li
              onClick={() =>
                handleSortedFunds("risk", "ความผันผวนของกองทุนรวม", "3 months")
              }
            >
              <a>3 เดือน</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("risk", "ความผันผวนของกองทุนรวม", "6 months")
              }
            >
              <a>6 เดือน</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("risk", "ความผันผวนของกองทุนรวม", "1 year")
              }
            >
              <a>1 ปี</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("risk", "ความผันผวนของกองทุนรวม", "3 years")
              }
            >
              <a>3 ปี</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("risk", "ความผันผวนของกองทุนรวม", "5 years")
              }
            >
              <a>5 ปี</a>
            </li>
            <li
              onClick={() =>
                handleSortedFunds("risk", "ความผันผวนของกองทุนรวม", "10 years")
              }
            >
              <a>10 ปี</a>
            </li>
          </ul>
        </div>
        <div className="flex basis-1/4">
          <div
            onClick={() => handleSortedFunds("fee", "", "")}
            tabIndex="0"
            role="button"
            className="btn m-1 bg-gradient-to-r from-yellow-500 to-emerald-500 rounded-full w-full text-white"
          >
            ค่าธรรมเนียม (เก็บจริง)
          </div>
        </div>
      </div>

      <ResultTable />

      {(filteredFunds === null || filteredFunds?.length === 0) ? "" : (
        <div className="flex justify-between items-center mt-[28px]">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className=" btn btn-primary btn-outline rounded-full w-[150px]"
          >
            ก่อนหน้า
          </button>
          {/* Page */}
          <p>
            {currentPage}/{countFundsConverted}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPage === countFundsConverted}
            className=" btn btn-primary btn-outline rounded-full w-[150px]"
          >
            ถัดไป
          </button>
        </div>
      )}

     <Remark />
    </>
  );
}

export default SearchBox;
