import { EditIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function RiskQuizBtn() {
  return (
    <Link to="/risk-assessment">
      <button className="btn btn-primary btn-sm hover:btn-secondary"><EditIcon size='16px' />ทำแบบประเมินความเสี่ยง</button>
    </Link>
  );
}

export default RiskQuizBtn;
