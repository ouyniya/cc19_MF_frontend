import React from "react";
import useRatingStore from "../../stores/useWishlistStore"; // นำเข้า Zustand store

function Rating({ rating }) {

  return (
    <>
      <div className="flex gap-1">
        {/* สร้างอาร์เรย์ขนาด 5 (5 หัวใจ) */}
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={`mask mask-heart w-[24px] h-[24px] ${
              index < rating ? "bg-rose-500" : "bg-rose-100"
            }`}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Rating;
