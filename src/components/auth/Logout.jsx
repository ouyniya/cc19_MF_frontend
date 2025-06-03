import React from "react";
import { LogOut } from "lucide-react";
import useUserStore from "../../stores/useUserStore";
import { useNavigate } from "react-router";
import { createAlert } from "../../utils/createAlert";

function Logout() {
  const logout = useUserStore((state) => state.logout);
  const currentUser = useUserStore((state) => state.currentUser);
  const navigate = useNavigate();

  const hdlLogout = async () => {
    
    await logout();
    // navigate("/");
    window.location.href = "/"; // เปลี่ยนเส้นทางไปที่ homepage และ reload หน้าใหม่
    createAlert("success", "Logout successfully");

    console.log("currentUser after logout:", currentUser); // ต้องเป็น ""
  };

  return (
    <button className="btn text-white bg-[var(--blue)] border-[var(--blue)] hover:btn-secondary rounded-full" onClick={hdlLogout}>
      <LogOut />
      Logout
    </button>
  );
}

export default Logout;
