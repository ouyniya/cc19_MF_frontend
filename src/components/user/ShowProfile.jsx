import React from "react";
import { Pencil, Mail, UserPen, KeyRound } from "lucide-react";
import { Link } from "react-router";

function ShowProfile() {
  return (
    <>
      <div className="p-6 w-full flex flex-col items-center gap-[48px]">
        {/* User Details */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-sm">john.doe@example.com</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">Username:</span>
              <span className="font-medium">john_doe</span>
            </div>
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">Email:</span>
              <span className="font-medium">john.doe@example.com</span>
            </div>
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">Password:</span>
              <span className="font-medium">••••••••</span>
            </div>
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">ระดับความเสี่ยง:</span>
              <span className="font-bold">5 (ความเสี่ยงปานกลางค่อนข้างสูง)</span>
            </div>
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">วันที่ทำแบบประเมินความเสี่ยงล่าสุด:</span>
              <span className="font-medium">12/01/2025</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowProfile;
