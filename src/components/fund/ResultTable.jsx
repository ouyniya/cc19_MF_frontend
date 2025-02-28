import { HeartIcon } from "lucide-react";
import React, { useEffect } from "react";
import useFundStore from "../../stores/useFundStore";

function ResultTable() {
  const getFilteredFunds = useFundStore((state) => state.getFilteredFunds);
  const filteredFunds = useFundStore((state) => state.filteredFunds);

  useEffect(() => {
    hdlSearchFilter();
  }, []);

  const hdlSearchFilter = async () => {
    await getFilteredFunds("", "", "", "", "", "", 1, 10);
  };

  const funds = filteredFunds.message ? filteredFunds.message : [];

  // console.log(funds)

  return (
    <>
      <div className="overflow-x-auto h-[750px]">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th rowSpan={2}>Wishlist</th>
              <th rowSpan={2} className="min-w-[200px]">
                ชื่อกองทุน
              </th>
              <th rowSpan={2} className="min-w-[120px]">
                ชื่อย่อ
              </th>
              <th rowSpan={2} className="min-w-[200px]">
                บริษัท
              </th>
              <th colSpan={6} className="text-center">
                ผลตอบแทน
              </th>
              <th colSpan={6} className="text-center">
                ความผันผวน
              </th>
              <th rowSpan={2}>
                ค่าธรรมเนียม <br /> และค่าใช้จ่าย <br /> รวมทั้งหมด
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
            </tr>
          </thead>
          <tbody>
            {funds.map((fund) => (
              <tr key={fund.id}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </td>
                <td>{fund.funds.projNameTh}</td>
                <td>{fund.classAbbrName}</td>
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
                        : (fund.fundPerformanceRisk
                          .find(
                            (r) =>
                              r.performancePeriod === period &&
                              r.performanceType === "ผลตอบแทนกองทุนรวม"
                          )
                          ?.performanceValue?.toFixed(2)) < 0
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
                      ?.performanceValue?.toFixed(2) == 0 ? "-" : fund.fundPerformanceRisk
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
                    {fund.fundPerformanceRisk.find(
                      (r) =>
                        r.performancePeriod === period &&
                        r.performanceType === "ความผันผวนของกองทุนรวม"
                    )?.performanceValue ?? "-"}
                  </td>
                ))}
                <td>{fund.FeeDetial[0]?.rate?.toFixed(2) ?? "-"}</td>
                <td>
                  <a
                    href={fund.funds.urlFactsheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-xs"
                  >
                    ดาวน์โหลด
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </>
  );
}

export default ResultTable;
