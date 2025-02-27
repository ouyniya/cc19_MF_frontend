import React, { useEffect } from "react";
import Logout from "../auth/Logout";
import WishlistItem from "./WishlistItem";
import EditWishlist from "./EditWishlist";
import useWishlistStore from "../../stores/useWishlistStore"; // นำเข้า Zustand store
import useUserStore from "../../stores/useUserStore";

import { Plus } from "lucide-react";
import AddWishlist from "./AddWishlist";

function Wishlists() {
  const token = useUserStore((state) => state.token);
  const wishlists = useWishlistStore((state) => state.wishlists);
  const currentWishlist = useWishlistStore((state) => state.currentWishlist);
  const setCurrentWishlist = useWishlistStore(
    (state) => state.setCurrentWishlist
  );
  const getWishlists = useWishlistStore((state) => state.getWishlists);

  useEffect(() => {
    getWishlists(token);
  }, []);

  console.log(wishlists);

  return (
    <>
      <div className="flex flex-col p-6 transition-all duration-300 w-[calc(100vw-350px)]">
        <div className="container h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Wish Funds</h1>
            <Logout />
          </div>
          <button className="btn text-[var(--blue)] border-[var(--blue)] hover:btn-accent hover:text-white btn-sm rounded-full" onClick={(e) =>
              document.getElementById("add-wishlist-form").showModal()
            }>
            <Plus size="16px" /> เพิ่ม wishlist
          </button>

          <div className="flex justify-start items-start gap-7 flex-wrap mt-[48px]">
            {/* all cards */}
            {wishlists.map((wishlist, index) => (
              <WishlistItem key={index} wishlist={wishlist} />
            ))}
          </div>
        </div>
      </div>

      <dialog
        id="edit-wishlist-form"
        className="modal"
        onClose={() => setCurrentWishlist(null)}
      >
        <div className="modal-box">
          <button // close model box
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) =>
              document.getElementById("edit-wishlist-form").close() 
            }
          >
            ✕
          </button>
          {/* ถ้า currentWishlist มีค่า → แสดง <EditWishlist /> */}
          {currentWishlist && <EditWishlist />}
        </div>
      </dialog>

      <dialog id="add-wishlist-form" className="modal">
        <div className="modal-box">
          <button // close model box
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) =>
              document.getElementById("add-wishlist-form").close()
            }
          >
            ✕
          </button>
          <AddWishlist />
        </div>
      </dialog>
    </>
  );
}

export default Wishlists;
