import { EditIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function RiskQuizBtn() {
  return (
    <Link to="/risk-assessment">
      <button className="btn text-white bg-[var(--blue)] border-[var(--blue)] btn-sm hover:btn-secondary min-w-[200px] rounded-full">
        <EditIcon size="16px" />
        ทำแบบประเมินความเสี่ยง
      </button>
    </Link>
  );
}

export default RiskQuizBtn;
