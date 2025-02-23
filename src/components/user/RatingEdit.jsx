import React from "react";
import useWishlistStore from "../../stores/useWishlistStore"; // นำเข้า Zustand store

function RatingEdit() {


  const handleRatingChange = (event) => {
    // alert(Number(event.target.value))
    setRating(Number(event.target.value)); // อัปเดตค่าใน store
  };

  return (
    <div className="flex flex-col">
      {/* Rating */}
      <div className="rating gap-1">
        {[1, 2, 3, 4, 5].map((value, index) => (
          <input
            key={index}
            type="radio"
            name="rating"
            value={value}
            checked={selectedRating === value}
            onChange={handleRatingChange}
            className={`mask mask-heart ${
              value === 1
                ? "bg-red-400"
                : value === 2
                ? "bg-orange-400"
                : value === 3
                ? "bg-yellow-400"
                : value === 4
                ? "bg-lime-400"
                : "bg-green-400"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default RatingEdit;
