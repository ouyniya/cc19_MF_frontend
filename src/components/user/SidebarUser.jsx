import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { UserPen, HandCoins, Heart, HomeIcon, User2 } from "lucide-react";
import { Link } from "react-router";
import useUserStore from "../../stores/useUserStore";

function SidebarUser() {
  const currentUser = useUserStore((state) => state.currentUser);
  const location = useLocation();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full shadow-xl transition-all duration-300 z-40 bg-[var(--blue)] border-[var(--blue)] text-white active:text-pink-300 w-64 p-4"`}
      >
        <div className="flex flex-col justify-between h-full ">
          <div className="h-full">
            <ul className="menu first-line:flex flex-col gap-0">
              <div className="flex flex-col justify-center items-center h-[250px] text-center text-white">
                <div className="avatar">
                  <div className="w-[180px] rounded-full hover:ring-2 hover:ring-blue-400">
                    {currentUser?.user.profileImage ? (
                      <img
                        src={currentUser?.user.profileImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col gap-2 justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <User2 className="w-full h-[100px] text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  {currentUser?.user.username}
                </h1>
              </div>
              <li className="mt-[24px]">
                <Link
                  to="/user"
                  className="py-3 rounded-xl hover:bg-[var(--bluehover)] hover:text-blue-200 visited:bg-[var(--blue)] visited:text-white"
                  href="#"
                >
                  <UserPen />
                  Profile
                  {location.pathname === "/user" ? (
                    <span className="badge badge-xs badge-accent"></span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
              <li className="">
                <Link
                  to="investment"
                  className="py-3 rounded-xl hover:bg-[var(--bluehover)] visited:bg-[var(--blue)] visited:text-white"
                  href="#"
                >
                  <HandCoins />
                  Investment
                  {location.pathname === "/user/investment" ? (
                    <span className="badge badge-xs badge-accent"></span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
              <li className="">
                <Link
                  to="wishlist"
                  className="py-3 rounded-xl hover:bg-[var(--bluehover)] visited:bg-[var(--blue)] visited:text-white"
                  href="#"
                >
                  <Heart />
                  Wishlist
                  {location.pathname === "/user/wishlist" ? (
                    <span className="badge badge-xs badge-accent"></span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/">
            <div className="flex justify-center gap-2 items-center h-[120px] px-[24px] text-xl hover:cursor-pointer hover:bg-[var(--bluehover)] transition hover:transition-all duration-1000 ease-in-out">
              <HomeIcon size="32px" />
              กลับหน้าหลัก
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SidebarUser;
