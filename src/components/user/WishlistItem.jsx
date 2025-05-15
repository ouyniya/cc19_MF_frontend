import React from "react";
import Rating from "./Rating";
import useWishlistStore from "../../stores/useWishlistStore";
import { Eraser, Edit3Icon, MoreHorizontal, GlobeIcon } from "lucide-react";
import useUserStore from "../../stores/useUserStore";
import { createAlert } from "../../utils/createAlert";
import Swal from "sweetalert2";

function WishlistItem(props) {
  const { wishlist } = props;
  const setCurrentWishlist = useWishlistStore(
    (state) => state.setCurrentWishlist
  );
  const deleteWishlist = useWishlistStore((state) => state.deleteWishlist);
  const getWishlists = useWishlistStore((state) => state.getWishlists);
  const token = useUserStore((state) => state.token);

  // console.log(wishlist);

  const hdlShowEditModal = () => {
    setCurrentWishlist(wishlist);
    document.getElementById("edit-wishlist-form").showModal();
  };

  const hdlDeleteWishlist = async () => {
    try {

      Swal.fire({
        title: "ยืนยันลบรายการใช่ไหม?",
        text: "เมื่อลบแล้วจะไม่สามารถนำกลับมาได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบเลย!",
      }).then(async(result) => {
        if (result.isConfirmed) {
          await deleteWishlist(wishlist.id, token);
          await getWishlists(token);
          Swal.fire({
            title: "ลบเรียบร้อยแล้ว!",
            text: "ลบ wishlist เรียบร้อยแล้ว",
            icon: "success",
          });
        }
      });

    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      //   console.log(errMsg);
      createAlert("info", errMsg);
    }
  };

  return (
    <div key={wishlist.id} className="mx-auto lg:mx-0">
      <div className="card bg-base-100 w-[320px] lg:w-[300px] h-[350px] shadow-xl">
        <div className="dropdown absolute z-50 right-2 top-2">
          <div tabIndex="0" role="button" className="btn btn-ghost btn-xs m-1">
            <MoreHorizontal />
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow"
          >
            {/* edit button */}
            <li onClick={hdlShowEditModal}>
              <a>
                <Edit3Icon size="15px" />
                แก้ไข
              </a>
            </li>
            {/* button delete list */}
            <li onClick={hdlDeleteWishlist}>
              <a>
                <Eraser size="15px" />
                ลบ
              </a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* fund info */}
          <h2 className="card-title">
            {wishlist.name}
            <div className="tooltip" data-tip={wishlist.investCountryFlag}>
              <GlobeIcon size="16px" className="stroke-slate-300" />
            </div>
          </h2>{" "}
          <div
            className={`badge badge-sm
          ${
            wishlist.fundRiskLevelId >= 6
              ? "badge-error"
              : wishlist.fundRiskLevelId >= 4
              ? "badge-warning"
              : "badge-success"
          } 
          badge-outline gap-2`}
          >
            Risk level: {wishlist.fundRiskLevelId}
          </div>
          <p>{wishlist.description}</p>
          <p className="text-sm">{wishlist.investCountryFlag}</p>
          {/* rating */}
          <div className="tooltip flex" data-tip="คะแนนความชอบของคุณ">
            <Rating rating={wishlist.rating} />
          </div>
          <div className="flex w-full"></div>
          <div className="flex flex-col w-full">
            <p className="opacity-65">
              <strong>Note:</strong> {wishlist.note}
            </p>
          </div>
          {/* category fund */}
          <div className="card-actions justify-end">
            <div className="badge badge-ghost badge-sm">{wishlist.group}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
