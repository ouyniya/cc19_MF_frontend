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
      <div className="flex flex-col lg:flex-row justify-center md:justify-center items-center lg:justify-start lg:items-start lg:min-w-[200px] h-auto min-h-[200px] bg-[var(--blue)] lg:h-screen text-white">
        <div className="inline-flex lg:block h-full text-center w-full min-w-sm max-w-md lg:w-full">
          {/* profile image */}
          <div className="flex flex-col gap-2 w-full justify-center items-center p-4">
            <div className="flex justify-center items-center w-full">
              <div className="w-[100px] lg:w-[150px] rounded-full hover:ring-2 hover:ring-blue-400">
                {currentUser?.user.profileImage ? (
                  <img
                    src={currentUser?.user.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex md:flex-col gap-2 justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <User2 className="w-full h-[100px] text-white" />
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold">{currentUser?.user.username}</h1>
          </div>

          {/* menu */}
          <div className="lg:mt-[24px] px-4 h-auto">
            <ul className="flex flex-col lg:gap-2 justify-center">
              <li className="">
                <Link to="/user" className="side-menu" href="#">
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
                <Link to="investment" className="side-menu" href="#">
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
                <Link to="wishlist" className="side-menu" href="#">
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
          {/* go home */}
          <Link to="/">
            <div className="lg:absolute lg:bottom-0 flex flex-col lg:flex-row justify-center gap-2 items-center h-[120px] px-[24px] text-xl hover:cursor-pointer transition hover:transition-all duration-1000 ease-in-out">
              <HomeIcon size="32px" />
              <p className="lg:visible invisible">กลับหน้าหลัก</p>
            </div>
          </Link>
        </div>
      </div>

      {/* <div
        className={`md:fixed md:top-0 mg:left-0 md:h-full shadow-xl transition-all duration-300 z-40 bg-[var(--blue)] border-[var(--blue)] text-white active:text-pink-300 w-64 p-4"`}
      >
        <div className="flex flex-col justify-between md:h-full">
          <div className="md:h-full">
            <ul className="menu first-line:flex md:flex-col flex-row gap-0">
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
                      <div className="flex md:flex-col gap-2 justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <User2 className="w-full h-[100px] text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  {currentUser?.user.username}
                </h1>
              </div>

              <div className="flex md:block gap-2 justify-center">
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
              </div>
            </ul>
          </div>

          <Link to="/">
            <div className="flex justify-center gap-2 items-center h-[120px] px-[24px] text-xl hover:cursor-pointer hover:bg-[var(--bluehover)] transition hover:transition-all duration-1000 ease-in-out">
              <HomeIcon size="32px" />
              กลับหน้าหลัก
            </div>
          </Link>
        </div>
      </div> */}
    </>
  );
}

export default SidebarUser;
