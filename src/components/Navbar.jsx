import React, { useRef, useEffect } from "react";
import { LogoIcon, MenuIcon } from "../icons";
import { Link } from "react-router";

function Navbar() {

  const detailsRef = useRef(null);

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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside); // 3️⃣ เริ่มฟัง event คลิกที่ document
    return () => {
      document.removeEventListener("click", handleClickOutside); // 4️⃣ ทำความสะอาดเมื่อ component ถูก unmount
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
                <a className="hover:bg-white rounded-lg">Services</a>
                <ul className="p-2 text-[var(--gray)] bg-white">
                  <li className="hover:bg-[var(--blue)] hover:text-white  rounded-lg">
                    <Link to="risk-assessment">Risk Assessment</Link>
                  </li>
                  <li className="hover:bg-[var(--green)] hover:text-white  rounded-lg">
                    <Link to="fund">Mutual Funds</Link>
                  </li>
                </ul>
              </li>
              <li className="hover:bg-[var(--pink)] hover:text-white  rounded-lg">
                <Link to="contact-us">contact us</Link>
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
                <summary>Services</summary>
                <ul className="p-2 w-[200px] text-[var(--gray)] bg-white">
                  <li className="hover:bg-[var(--green)] hover:text-white  rounded-lg">
                    <Link to="risk-assessment" onClick={closeMenu}>
                      Risk Assessment
                    </Link>
                  </li>
                  <li className="hover:bg-[var(--pink)] hover:text-white  rounded-lg">
                    <Link to="fund" onClick={closeMenu}>
                      Mutual Funds
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              {" "}
              <Link to="contact-us">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-3">
          <Link to="register">
            <button className="btn rounded-full text-white bg-[var(--blue)] border-[var(--blue)] hover:bg-[var(--blue)] hover:border-[var(--blue)]">
              Register
            </button>
          </Link>
          <Link to="login">
            <button className="btn rounded-full text-white bg-[var(--blue)] border-white border-2 hover:bg-[var(--blue)] hover:border-white">
              Sign in
            </button>
          </Link>
        </div>
        {/* end: large size */}
      </div>
      <div className="pt-[75px]"></div>
    </>
  );
}

export default Navbar;
