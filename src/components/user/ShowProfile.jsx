import React, { useEffect, useState } from "react";
import { createAlert } from "../../utils/createAlert";
import useUserStore from "../../stores/useUserStore";

function ShowProfile() {
  const token = useUserStore((state) => state.token);
  const currentUser = useUserStore((state) => state.currentUser);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);

  const getUser = async () => {
    try {
      // get user data from backend
      await getCurrentUser(token);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("error", errMsg);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  

  // { username: "bam", email: "bambam@bammail.com"}

  return (
    <>
      <div className="p-6 w-full flex flex-col items-center gap-[48px]">
        {/* User Details */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-semibold">{currentUser?.user.username}</h2>
          <p className="text-sm">{currentUser?.user.email}</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">Username:</span>
              <span className="font-medium">{currentUser?.user.username}</span>
            </div>
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">Email:</span>
              <span className="font-medium">{currentUser?.user.email}</span>
            </div>
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">ระดับความเสี่ยง:</span>
              <span className="font-bold">{currentUser?.user.userRiskAssessments[0].userRiskLevelId}</span>
            </div>
            <div className="flex items-center">
              <span className="w-[150px] opacity-70">
                วันที่ทำแบบประเมินความเสี่ยงล่าสุด:
              </span>
              <span className="font-medium">{currentUser?.user.userRiskAssessments[0].createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowProfile;
