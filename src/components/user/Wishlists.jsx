import React from "react";
import Logout from "../auth/Logout";
import WishlistItem from "./WishlistItem";
import EditWishlist from "./EditWishlist";
import useWishlistStore from "../../stores/useWishlistStore"; // นำเข้า Zustand store

function Wishlists() {
  const wishlists = useWishlistStore(state => state.wishlists);
  const currentWishlist = useWishlistStore(state => state.currentWishlist)
  const setCurrentWishlist = useWishlistStore(state => state.setCurrentWishlist)
  const getWishlists = useWishlistStore(state => state.getWishlists)

  
  return (
    <>
      <div className="flex flex-col p-6 transition-all duration-300 w-[calc(100vw-350px)]">
        <div className="container h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Wish Funds</h1>
            <Logout />
          </div>

          <div className="flex justify-start items-start gap-7 flex-wrap mt-[48px]">
            {/* all cards */}
            { wishlists.map((wishlist, index) => (
                <WishlistItem key={index} wishlist={wishlist} />
            ))}
          </div>
        </div>
      </div>

      <dialog id="edit-wishlist-form" className="modal" onClose={() => setCurrentWishlist(null)}>
        <div className="modal-box">
          <button // close model box
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => document.getElementById("edit-wishlist-form").close()}
          >
            ✕
          </button>
          {currentWishlist && <EditWishlist />}
        </div>
      </dialog>
    </>
  );
}

export default Wishlists;
