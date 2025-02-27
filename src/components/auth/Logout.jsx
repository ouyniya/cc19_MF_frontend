import React from "react";
import { LogOut } from "lucide-react";
import useUserStore from "../../stores/useUserStore";
import { useNavigate } from "react-router";
import { createAlert } from "../../utils/createAlert";

function Logout() {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const hdlLogout = () => {
    createAlert("success", "Logout successfully");

    logout();
    navigate("/");
  };

  return (
    <button className="btn text-white bg-[var(--blue)] border-[var(--blue)] hover:btn-secondary rounded-full" onClick={hdlLogout}>
      <LogOut />
      Logout
    </button>
  );
}

export default Logout;
