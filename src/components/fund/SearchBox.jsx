import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import useFundStore from "../../stores/useFundStore";
import ResultTable from "./ResultTable";
import FilterFund from "./FilterFund";
import { createAlert } from "../../utils/createAlert";

function SearchBox() {
  const getFilteredFunds = useFundStore((state) => state.getFilteredFunds);
  const getCompanies = useFundStore((state) => state.getCompanies);
  const getGroup = useFundStore((state) => state.getGroup);
  const getRiskLevel = useFundStore((state) => state.getRiskLevel);
  const getGlobalInv = useFundStore((state) => state.getGlobalInv);
  const filteredFunds = useFundStore((state) => state.filteredFunds.message);


  const company = useFundStore((state) => state.company?.result);
  const group = useFundStore((state) => state.group?.result);
  const riskLevel = useFundStore((state) => state.riskLevel?.result);
  const globalInv = useFundStore((state) => state.globalInv?.result);

  const [currentPage, setCurrentPage] = useState(1); // Starting at page 1
  const [classAbbrName, setClassAbbrName] = useState("");
  const [fundCompareGroup, setFundCompareGroup] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [fundRiskLevelId, setFundRiskLevelId] = useState("");
  const [investCountryFlag, setInvestCountryFlag] = useState("");
  const [dividendPolicy, setDividendPolicy] = useState("");

  useEffect(() => {
    getCompanies(); // โหลดข้อมูลบริษัทเมื่อ component โหลด
    getGroup();
    getRiskLevel();
    getGlobalInv();
  }, [getCompanies, getGroup, getRiskLevel, getGlobalInv]);

  // console.log("company", companyId, "dividendPolicy", dividendPolicy);

  const handleDividendChange = (e) => {
    const value = e.target.value;
    setDividendPolicy(value); // อัพเดทค่า dividendPolicy ตามที่เลือก
  };

  const hdlSearchFilter = async (pageNumber) => {
    try {
      const page = pageNumber || 1;
      console.log("***", page);
     await getFilteredFunds(
        classAbbrName,
        companyId,
        fundCompareGroup,
        fundRiskLevelId,
        investCountryFlag,
        dividendPolicy,
        page,
        10
      );

      console.log(filteredFunds)

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
      console.log(currentPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1); // Increase page number
    hdlSearchFilter(currentPage + 1); // Trigger the filter function
    console.log(currentPage);
  };

  console.log(currentPage);

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
            <button className="btn rounded-full px-[24px] btn-lg">
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

      <FilterFund />
      <ResultTable />

      <div className="flex justify-between mt-[28px]">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className=" btn btn-primary btn-outline rounded-full w-[150px]"
        >
          Previous page
        </button>
        <button
          onClick={handleNext}
          className=" btn btn-primary btn-outline rounded-full w-[150px]"
        >
          Next
        </button>
      </div>

      <p className="text-xs font-bold mt-[60px]">หมายเหตุ</p>
      <ul className="text-xs">
        <li>ข้อมูล ณ สิ้นสุดเดิอน ธันวาคม พ.ศ. 2567</li>
        <li>ระยะเวลามากกว่า 1 ปีขึ้นไปจะแสดงในรูปแบบของข้อมูลต่อปี</li>
        <li>
          ข้อมูลที่แสดงทั้งหมดมาจากแหล่งข้อมูลที่น่าเชื่อถือ เช่น สำนักงาน กลต.
          หรือ เว็บไซต์ของบริษัทหลักทรัพย์จัดการกองทุน เป็นต้น อย่างไรก็ตาม ทาง
          MyWishFund ไม่รับรองถึงความถูกต้องสมบูรณ์ของข้อมูลดังกล่าว
        </li>
      </ul>
    </>
  );
}

export default SearchBox;
