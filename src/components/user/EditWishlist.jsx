import React, { useEffect, useState } from "react";
import useWishlistStore from "../../stores/useWishlistStore";
import useUserStore from "../../stores/useUserStore";
import { BadgeAlert, Edit3Icon } from "lucide-react";
import { createAlert } from "../../utils/createAlert";

function EditWishlist() {
  const currentWishlist = useWishlistStore((state) => state.currentWishlist);
  const updateWishlist = useWishlistStore((state) => state.updateWishlist);
  const getWishlists = useWishlistStore((state) => state.getWishlists);
  const token = useUserStore((state) => state.token);

  const [rating, setRating] = useState(currentWishlist.rating);
  const [note, setNote] = useState(currentWishlist.note);
  const [otherError, setOtherError] = useState("");

  const hdlUpdateWishlist = async () => {
    try {
      if (rating === currentWishlist.rating && note.trim() === currentWishlist.note.trim()) {
        setOtherError("ไม่มีการเปลี่ยนแปลง");
      } else {
        const body = {
          interestRating: rating,
          note: note,
        };
        await updateWishlist(currentWishlist.id, token, body);
        document.getElementById("edit-wishlist-form").close();
        await getWishlists(token);

        createAlert("success", "แก้ไข wishlist เรียบร้อยแล้ว");
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
                กองทุน {currentWishlist?.name || null}
              </p>
            </div>
            <p className="mb-[8px]">Note ของคุณ</p>
            {/* <NoteEdit /> */}
            <textarea
              type="text"
              className="textarea textarea-bordered"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setOtherError("");
              }}
              rows={note.split("\n").length}
            />
            <p className="mb-[8px] mt-[12px]">คะแนนความชอบของคุณ</p>
            {/* <RatingEdit /> */}
            <div className="flex flex-col">
              <div className="rating gap-1">
                {[1, 2, 3, 4, 5].map((value) => {
                  return (
                    <input
                      key={value}
                      type="radio"
                      value={value}
                      checked={rating === value} // ตรวจสอบค่าคะแนนที่ถูกเลือก
                      onChange={() => {
                        setRating(value);
                      }}
                      className="mask mask-heart bg-rose-500"
                    />
                  );
                })}
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                onClick={hdlUpdateWishlist}
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

export default EditWishlist;
