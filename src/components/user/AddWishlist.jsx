import React, { useEffect, useState } from "react";
import useWishlistStore from "../../stores/useWishlistStore";
import { BadgeAlert, PlusCircleIcon } from "lucide-react";
import useFundStore from "../../stores/useFundStore";
import useUserStore from "../../stores/useUserStore";
import { createAlert } from "../../utils/createAlert";

function AddWishlist() {
  const token = useUserStore((state) => state.token);
  const [classAbbrName, setClassAbbrName] = useState("");
  const [classAbbrNameWait, setClassAbbrNameWait] = useState(""); // for fetching
  const [rating, setRating] = useState(3);
  const [note, setNote] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [checkNote, setCheckNote] = useState(""); // check note length
  const [otherError, setOtherError] = useState("");
  const getWishlists = useWishlistStore((state) => state.getWishlists);

  const addWishlist = useWishlistStore((state) => state.addWishlist);
  const fundNames = useFundStore((state) => state.fundNames);
  const getFundNames = useFundStore((state) => state.getFundNames);

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
    setOtherError("");
  };

  const handleSelect = (name) => {
    setClassAbbrName(name);
    setShowDropdown(false); // ซ่อน dropdown หลังจากเลือกค่า
  };

  const hdlAddWishlist = async () => {
    try {
      const body = {
        interestRating: rating,
        note: note,
        classAbbrName: classAbbrName,
      };
      await addWishlist(token, body);
      await getWishlists(token);

      // // clear data
      setClassAbbrName("");
      setClassAbbrNameWait("");
      setRating(3);
      setNote("");

      document.getElementById("add-wishlist-form").close();
      createAlert("success", "เพิ่ม Wishlist เรียบร้อยแล้ว");
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      //   console.log(errMsg);
      setOtherError(errMsg);
    }
  };

  //   console.log("****", fundNames);
  //
  return (
    <>
      <div>
        <div className="card w-full mt-7">
          <div className="card-body">
            <div className="flex justify-center">
              <h2 className="card-title text-2xl mb-[24px]">
                <PlusCircleIcon size="28px" className="stroke-teal-500" /> เพิ่ม
                wishlist ของคุณ
              </h2>
            </div>

            {/* alert error */}
            { otherError &&
              <div role="alert" className="alert alert-error">
                <BadgeAlert />
                <span>{otherError}</span>
              </div>
            }
            <p className="mb-[8px]">ชื่อย่อกองทุน</p>
            {/* <classAbbr Edit /> */}
            <input
              type="text"
              className="textarea textarea-bordered"
              value={classAbbrName}
              onChange={hdlFundNameChange}
              rows={note.split("\n").length}
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
            <p className="mb-[8px] mt-[12px]">Note ของคุณ</p>

            {/* check note*/}
            <p className="text-secondary">{checkNote}</p>
            {/* <NoteEdit /> */}
            <textarea
              type="text"
              className="textarea textarea-bordered"
              value={note}
              onChange={(e) => {
                if (e.target.value.length >= 100) {
                  setCheckNote("ความยาวของ Note เกิน 100 ตัวอักษร");
                  setNote(e.target.value.slice(0, 100));
                } else {
                  setNote(e.target.value);
                  setCheckNote("");
                }
              }}
              rows={note.split("\n").length}
            />
            <p className="mb-[8px] mt-[12px]">คะแนนความชอบของคุณ</p>
            {/* <RatingEdit /> */}
            <div className="flex flex-col">
              <div className="rating gap-1">
                {[1, 2, 3, 4, 5].map((value, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                    className="mask mask-heart bg-rose-500"
                  />
                ))}
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                onClick={hdlAddWishlist}
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

export default AddWishlist;
