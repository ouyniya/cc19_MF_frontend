import React, { useEffect, useState } from "react";
import useInvestmentStore from "../../stores/useInvestmentStore";
import useUserStore from "../../stores/useUserStore";
import { BadgeAlert, Edit3Icon } from "lucide-react";
import { createAlert } from "../../utils/createAlert";

function EditPortList() {
  const currentPortfolio = useInvestmentStore(
    (state) => state.currentPortfolio
  );

  // console.log(currentPortfolio);

  const updatePortList = useInvestmentStore((state) => state.updatePortList);
  const getPortfolio = useInvestmentStore((state) => state.getPortfolio);
  const token = useUserStore((state) => state.token);

  const [amount, setAmount] = useState(currentPortfolio?.amount);
  const [otherError, setOtherError] = useState("");

  useEffect(() => {
    setAmount(currentPortfolio?.amount);
  }, [currentPortfolio]);

//   console.log(amount);

  const hdlUpdatePortList = async () => {
    try {
      if (amount === currentPortfolio?.amount) {
        return setOtherError("ไม่มีการเปลี่ยนแปลง");
      } else {
        const body = {
          amount: Number(amount),
        };
        await updatePortList(currentPortfolio?.id, token, body);
        document.getElementById("edit-port-form").close();
        await getPortfolio(token);

        createAlert("success", "แก้ไขพอร์ตเรียบร้อยแล้ว");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      //   console.log(errMsg);
      setOtherError(errMsg);
    }
  };

  return (
    <>
      <div>
        <div className="card w-full mt-7">
          <div className="card-body">
            <h2 className="card-title mb-[24px] text-2xl">
              <Edit3Icon /> แก้ไข wishlist ของคุณ
            </h2>
            {/* alert error */}
            {otherError && (
              <div role="alert" className="alert alert-error">
                <BadgeAlert />
                <span>{otherError}</span>
              </div>
            )}

            <div className="flex gap-0">
              <p className="mb-[8px] text-lg font-semibold">
                กองทุน {currentPortfolio?.fundName || null}
              </p>
            </div>
            <p className="mb-[8px]">จำนวนเงินลงทุน (บาท)</p>
            {/* <NoteEdit /> */}
            <input
              type="number"
              className="input input-bordered"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setOtherError("");
              }}
            />

            <div className="card-actions justify-end">
              <button
                onClick={hdlUpdatePortList}
                className="btn btn-primary rounded-full hover:btn-secondary"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>

        <h1></h1>
      </div>
    </>
  );
}

export default EditPortList;
