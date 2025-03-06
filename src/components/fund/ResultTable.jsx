import React, { useEffect } from "react";
import useFundStore from "../../stores/useFundStore";

function ResultTable() {
  const getFilteredFunds = useFundStore((state) => state.getFilteredFunds);
  const filteredFunds = useFundStore((state) => state.filteredFunds);

  // get all fund รอบแรก
  useEffect(() => {
    hdlSearchFilter();
  }, []);

  // ข้อมูลเริ่มต้นเป็นแบบไม่ filter 
  const hdlSearchFilter = async () => {
    await getFilteredFunds("", "", "", "", "", "", 1, 10);
  };

  // console.log(filteredFunds);

  // filter hdl when not loading
  const funds = filteredFunds.message ? filteredFunds.message : [];

  return (
    <>
      <div className="overflow-x-auto h-[750px] mt-[48px]">
        {filteredFunds === null ? (
          <div className="absolute text-lg text-rose-500">
            *** ไม่มีข้อมูลกองทุนหรือยังไม่ได้ทำการระบุเงื่อนไขในการค้นหา ***
          </div>
        ) : filteredFunds?.length === 0 ? (
          <div className="absolute text-lg text-rose-500">
            *** ไม่มีข้อมูลกองทุนหรือยังไม่ได้ทำการระบุเงื่อนไขในการค้นหา ***
          </div>
        ) : (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th rowSpan={2} className="min-w-[150px]">
                  ชื่อย่อ
                </th>
                <th rowSpan={2} className="min-w-[200px]">
                  ชื่อกองทุน
                </th>
                <th rowSpan={2} className="min-w-[200px]">
                  บริษัท
                </th>
                <th colSpan={6} className="text-center">
                  ผลตอบแทน (%)
                </th>
                <th colSpan={6} className="text-center">
                  ความผันผวน (%)
                </th>
                <th colSpan={2}>
                  ค่าธรรมเนียมและค่าใช้จ่าย <br /> รวมทั้งหมด (%)
                </th>
                <th rowSpan={2}>หนังสือชี้ชวน</th>
              </tr>
              <tr>
                {["3m", "6m", "1y", "3y", "5y", "10y"].map((period) => (
                  <th key={`return-${period}`}>{period}</th>
                ))}
                {["3m", "6m", "1y", "3y", "5y", "10y"].map((period) => (
                  <th key={`risk-${period}`}>{period}</th>
                ))}
                <th>ตามหนังสือชี้ชวน</th>
                <th>เก็บจริง</th>
              </tr>
            </thead>

            <tbody>
              {funds.map((fund) => (
                <tr key={fund.id}>
                  <td>{fund.classAbbrName}</td>
                  <td>{fund.funds.projNameTh}</td>
                  <td>{fund.funds.companies.companyName}</td>
                  {[
                    "3 months",
                    "6 months",
                    "1 year",
                    "3 years",
                    "5 years",
                    "10 years",
                  ].map((period) => (
                    <td
                      key={period}
                      className={
                        fund.fundPerformanceRisk
                          .find(
                            (r) =>
                              r.performancePeriod === period &&
                              r.performanceType === "ผลตอบแทนกองทุนรวม"
                          )
                          ?.performanceValue?.toFixed(2) == 0
                          ? "text-base-content"
                          : fund.fundPerformanceRisk
                              .find(
                                (r) =>
                                  r.performancePeriod === period &&
                                  r.performanceType === "ผลตอบแทนกองทุนรวม"
                              )
                              ?.performanceValue?.toFixed(2) < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {fund.fundPerformanceRisk
                        .find(
                          (r) =>
                            r.performancePeriod === period &&
                            r.performanceType === "ผลตอบแทนกองทุนรวม"
                        )
                        ?.performanceValue?.toFixed(2) == 0
                        ? "-"
                        : fund.fundPerformanceRisk
                            .find(
                              (r) =>
                                r.performancePeriod === period &&
                                r.performanceType === "ผลตอบแทนกองทุนรวม"
                            )
                            ?.performanceValue?.toFixed(2) ?? "-"}
                    </td>
                  ))}
                  {[
                    "3 months",
                    "6 months",
                    "1 year",
                    "3 years",
                    "5 years",
                    "10 years",
                  ].map((period) => (
                    <td key={period}>
                      {fund.fundPerformanceRisk
                        .find(
                          (r) =>
                            r.performancePeriod === period &&
                            r.performanceType === "ความผันผวนของกองทุนรวม"
                        )
                        ?.performanceValue.toFixed(2) == 0
                        ? "-"
                        : fund.fundPerformanceRisk
                            .find(
                              (r) =>
                                r.performancePeriod === period &&
                                r.performanceType === "ความผันผวนของกองทุนรวม"
                            )
                            ?.performanceValue.toFixed(2) ?? "-"}
                    </td>
                  ))}
                  {/* //rateUnit */}
                  <td>
                    <div
                      className="tooltip flex items-center justify-center"
                      data-tip={
                        fund.FeeDetial[0]?.rateUnit === ""
                          ? "ไม่มีข้อมูลหน่วย"
                          : fund.FeeDetial[0]?.rateUnit ?? "ไม่มีข้อมูลหน่วย"
                      }
                    >
                      {fund.FeeDetial[0]?.rate?.toFixed(2) ?? "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      className="tooltip flex items-center justify-center"
                      data-tip={
                        fund.FeeDetial[0]?.rateUnit === ""
                          ? "ไม่มีข้อมูลหน่วย"
                          : fund.FeeDetial[0]?.rateUnit ?? "ไม่มีข้อมูลหน่วย"
                      }
                    >
                      {fund.FeeDetial[0]?.actualValue?.toFixed(2) ?? "-"}
                    </div>
                  </td>
                  <td>
                    <a
                      href={fund.funds.urlFactsheet}
                      target="_blank"
                      className="btn btn-primary rounded-full btn-xs btn-outline"
                    >
                      ดาวน์โหลด
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ResultTable;
