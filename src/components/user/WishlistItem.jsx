import React from "react";
import Rating from "./Rating";
import useWishlistStore from "../../stores/useWishlistStore";

function WishlistItem(props) {
  const { wishlist } = props;
  const setCurrentWishlist = useWishlistStore(
    (state) => state.setCurrentWishlist
  );

  const hdlShowEditModal = () => {
    setCurrentWishlist(wishlist);
    document.getElementById("edit-wishlist-form").showModal();
  };

  return (
    <div key={wishlist.id}>
      <div className="card bg-base-100 w-[300px] shadow-xl">
        {/* button delete list */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={(e) => alert("delete list")}
        >
          ✕
        </button>

        <div className="card-body">
          {/* fund info */}
          <h2 className="card-title">{wishlist.name}</h2>
          <p>{wishlist.description}</p>
          {/* rating */}
          <div className="tooltip flex" data-tip="คะแนนความชอบของคุณ">
            <Rating rating={wishlist.rating} />
          </div>

          <div className="w-full bg-slate-500">{wishlist.note}</div>

          {/* category fund */}
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{wishlist.group}</div>
          </div>

          {/* edit button */}
          <button
            type="button"
            className="btn btn-primary btn-sm text-white w-full"
            onClick={hdlShowEditModal}
          >
            Edit Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
