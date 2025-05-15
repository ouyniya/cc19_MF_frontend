import { createAlert } from "../../utils/createAlert";
import useUserStore from "../../stores/useUserStore";
import RiskQuizBtn from "../riskAssessment/RiskQuizBtn";
import { MailIcon } from "lucide-react";
import { useEffect } from "react";

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
      createAlert("info", errMsg);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // console.log(currentUser);

  return (
    <>
      <div className="w-full flex flex-col items-center gap-[48px]">
        {/* User Details */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-semibold">
            {currentUser?.user.username}
          </h2>
          <div className="flex gap-1">
            <p className="text-sm">{currentUser?.user.email}</p>
            <MailIcon size="16px" className="stroke-blue-500" />
          </div>

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
              {currentUser?.user.role === "ADMIN" ? (
                ""
              ) : (
                <>
                  <span className="w-[150px] opacity-70">ระดับความเสี่ยง:</span>
                  <span className="font-bold">
                    {!currentUser?.user?.userRiskAssessments[0]
                      ?.userRiskLevelId ? (
                      <RiskQuizBtn />
                    ) : (
                      currentUser?.user?.userRiskAssessments[0]?.userRiskLevelId
                    )}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowProfile;
