import { PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createAlert } from "../../utils/createAlert";
import useInvestmentStore from "../../stores/useInvestmentStore";
import useUserStore from "../../stores/useUserStore";
import useFundStore from "../../stores/useFundStore";

function AddPortList() {
  const addPortList = useInvestmentStore((state) => state.addPortList);
  const getPortfolio = useInvestmentStore((state) => state.getPortfolio);
  const getFundNames = useFundStore((state) => state.getFundNames);
  const fundNames = useFundStore((state) => state.fundNames);

  const token = useUserStore((state) => state.token);

  const [classAbbrName, setClassAbbrName] = useState("");
  const [classAbbrNameWait, setClassAbbrNameWait] = useState(""); // for fetching
  const [amount, setAmount] = useState(0);
  const [otherError, setOtherError] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  // fetch ด้วยตัวที่หน่วงเวลาแล้ว
  useEffect(() => {
    getFundNames(classAbbrNameWait);
  }, [classAbbrNameWait]);

  // หน่วงเวลารอ user พิมพ์ก่อนค่อย fetch
  useEffect(() => {
    let timer = setTimeout(() => {
      setClassAbbrNameWait(classAbbrName);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [classAbbrName]);

  const hdlFundNameChange = (e) => {
    setClassAbbrName(e.target.value);
    setShowDropdown(true); // แสดง dropdown เมื่อพิมพ์
    setOtherError(""); // ตอนพิมพ์ให้ลบ error เก่า
  };

  const handleSelect = (name) => {
    setClassAbbrName(name); // เปลี่ยนค่า fund name ของเรา
    setShowDropdown(false); // ซ่อน dropdown หลังจากเลือกค่า
  };

  const hdlAddPortList = async () => {
    // check input
    if (!amount || !classAbbrName) {
      return setOtherError("กรุณาใส่ข้อมูลให้ครบถ้วน");
    }

    // define input
    const body = {
      classAbbrName: classAbbrName,
      amount: Number(amount),
    };

    // console.log(body);

    // add port list
    try {
      await addPortList(token, body);
      // // clear data
      setClassAbbrName("");
      setClassAbbrNameWait("");
      setAmount(0);

      // close modal
      document.getElementById("add-port-form").close();

      // refresh port
      await getPortfolio(token)

      // alert to user
      createAlert("success", "เพิ่มกองทุนใหม่เรียบร้อยแล้ว");
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
            <div className="flex justify-center">
              <h2 className="card-title text-2xl mb-[24px]">
                <PlusCircleIcon size="28px" className="stroke-teal-500" />{" "}
                เพิ่มสินทรัพย์ลงทุน
              </h2>
            </div>

            {/* alert error */}

            <p className="mb-[8px]">ชื่อย่อกองทุน</p>
            {/* <classAbbr /> */}
            <input
              type="text"
              className="input input-bordered"
              value={classAbbrName}
              onChange={hdlFundNameChange}
            />
            <div className="relative">
              <div className="absolute top-0 rounded-lg z-10 w-full max-h-[200px] overflow-scroll">
                <ul className="">
                  {showDropdown && fundNames?.result?.length > 0
                    ? fundNames.result.map((el, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 hover:link-primary hover:bg-blue-100 bg-blue-50 cursor-pointer"
                          onClick={() => handleSelect(el.classAbbrName)}
                        >
                          {el.classAbbrName}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
            <p className="mb-[8px] mt-[12px]">จำนวนเงินลงทุน (บาท)</p>
            {/* <amount /> */}
            <input
              type="number"
              className="input input-bordered"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />

            <div className="card-actions flex items-center justify-end mt-[12px]">
              {<p className="text-secondary text-sm">{otherError}</p>}
              <button
                onClick={hdlAddPortList}
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

export default AddPortList;
