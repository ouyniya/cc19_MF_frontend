import React, { useState } from "react";
import useWishlistStore from "../../stores/useWishlistStore";

function EditWishlist() {
  const currentWishlist = useWishlistStore((state) => state.currentWishlist);
  const [rating, setRating] = useState(currentWishlist.rating);
  const [note, setNote] = useState(currentWishlist.note);

  // alert(rating)
  // console.log(note)

  return (
    <>
      <div>
        <div className="card w-full mt-7">
          <div className="card-body">
            <h2 className="card-title mb-[24px]">แก้ไข wishlist ของคุณ</h2>
            <p className="mb-[8px]">Note ของคุณ</p>
            {/* <NoteEdit /> */}
            <textarea
              type="text"
              className="textarea textarea-bordered"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
              <button className="btn btn-primary">บันทึก</button>
            </div>
          </div>
        </div>

        <h1></h1>
      </div>
    </>
  );
}

export default EditWishlist;
