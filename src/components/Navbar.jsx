import React, { useRef, useEffect, useState } from "react";
import { LogoIcon, MenuIcon } from "../icons";
import { Link } from "react-router";
import useUserStore from "../stores/useUserStore";
import { User2 } from "lucide-react";

function Navbar() {
  const user = useUserStore((state) => state.user);
  const detailsRef = useRef(null);
  const currentUserRaw = useUserStore((state) => state.currentUser);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);
  const logout = useUserStore((state) => state.logout);
  const [currentUser, setCurrentUser] = useState(null);

  const handleClickOutside = (event) => {
    // console.log(event.target)
    // console.log(detailsRef.current)
    if (!detailsRef.current.contains(event.target)) {
      detailsRef.current.removeAttribute("open"); // ปิด dropdown
    }
  };

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open"); // ปิด dropdown
    }
  };

  // const callGetCurrentUser = async () => {
    
  //   try {
  //     await getCurrentUser();
  //     if (user) {
  //       setCurrentUser(currentUserRaw);
  //     } else {
  //       setCurrentUser(null);
  //     }
  //   } catch (error) {
  //       setCurrentUser(null);
  //   }
  // };
  
  useEffect(() => {
    // callGetCurrentUser();

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside); // เมื่อ component ถูก unmount
    };
  }, []);

  return (
    <>
      <div className="navbar fixed top-0 left-0 w-full z-10 bg-[var(--blue)]">
        <div className="navbar-start">
          {/* small size */}
          <div className="dropdown">
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
              <MenuIcon className="w-[24px]" />
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
            >
              <li className="hover:bg-[var(--yellow)] hover:text-white rounded-lg">
                <Link to="/">Home</Link>
              </li>
              <li>
                <a className="hover:bg-white rounded-lg">บริการของเรา</a>
                <ul className="p-2 text-[var(--gray)] bg-white">
                  <li className="hover:bg-[var(--blue)] hover:text-white  rounded-lg">
                    <Link to="risk-assessment">ประเมินความเสี่ยงการลงทุน</Link>
                  </li>
                  <li className="hover:bg-[var(--green)] hover:text-white  rounded-lg">
                    <Link to="fund">ค้นหากองทุน</Link>
                  </li>
                </ul>
              </li>
              <li className="hover:bg-[var(--pink)] hover:text-white  rounded-lg">
                <Link to="contact-us">ติดต่อเรา</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl text-white">
            MyWishFund
            <LogoIcon className="w-[20px]" />
          </Link>
        </div>
        {/* end: small size */}

        {/* large size */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <details ref={detailsRef}>
                <summary>บริการของเรา</summary>
                <ul className="p-2 w-[200px] text-[var(--gray)] bg-white">
                  <li className="hover:bg-[var(--green)] hover:text-white  rounded-lg">
                    <Link to="risk-assessment" onClick={closeMenu}>
                      ประเมินความเสี่ยงการลงทุน
                    </Link>
                  </li>
                  <li className="hover:bg-[var(--pink)] hover:text-white  rounded-lg">
                    <Link to="fund" onClick={closeMenu}>
                      ค้นหากองทุน
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              {" "}
              <Link to="contact-us">ติดต่อเรา</Link>
            </li>
          </ul>
        </div>
        {/* register and login */}
        <div className="navbar-end flex gap-3">
          {user && currentUser ? (
            <>
              <p className="text-white">{currentUser?.user.username}</p>
              <Link to={currentUser?.user.role === "ADMIN" ? "/admin" : "user"}>
                <div className="avatar">
                  <div className="w-[40px] rounded-full hover:ring-2 hover:ring-blue-300">
                    {currentUser?.user.profileImage ? (
                      <img
                        src={currentUser?.user.profileImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User2 className="w-full h-[50px] text-zinc-100" />
                    )}
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="register">
                <button className="btn rounded-full text-white bg-[var(--blue)] border-[var(--blue)] hover:bg-[var(--blue)] hover:border-[var(--blue)]">
                  สมัครสมาชิก
                </button>
              </Link>
              <Link to="login">
                <button className="btn rounded-full text-white bg-[var(--blue)] border-white border-2 hover:bg-[var(--blue)] hover:border-white">
                  ลงชื่อเข้าใช้
                </button>
              </Link>
            </>
          )}
        </div>

        {/* end: large size */}
      </div>
      <div className="pt-[75px]"></div>
    </>
  );
}

export default Navbar;
