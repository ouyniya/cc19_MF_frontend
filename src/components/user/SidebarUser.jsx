import React from "react";
import { UserPen, HandCoins, Heart } from "lucide-react";
import { Link } from "react-router";

function SidebarUser() {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full shadow-xl transition-all duration-300 z-40 bg-[var(--blue)] border-[var(--blue)] text-white +active:text-pink-300 w-64 p-4"`}
      >
        <ul className="menu first-line:flex flex-col gap-0">
          <div className="h-[250px] bg-[var(--gray)] text-center text-white">
            profile1
          </div>
          <li className="">
            <Link
              to="/user"
              className="py-3 rounded-xl hover:bg-[var(--bluehover)] hover:text-blue-200 visited:bg-[var(--blue)] visited:text-white"
              href="#"
            >
              <UserPen />
              Profile
            </Link>
          </li>
          <li className="">
            <Link
              to="investment"
              className="py-3 rounded-xl hover:bg-[var(--bluehover)] visited:bg-[var(--blue)] visited:text-white"
              href="#"
            >
              <HandCoins />
              Investment<span className="badge badge-xs badge-accent"></span>
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
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SidebarUser;
