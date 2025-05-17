import { useEffect, useState } from "react";
import useUserStore from "../stores/useUserStore";
import { Loader } from "lucide-react";
import { Link } from "react-router";

function ProtectAuth(props) {
  const { el } = props;

  // get user and token from store
  const token = useUserStore((state) => state.token);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);

  //loading
  const [loading, setLoading] = useState(true);

  // set status login >> ok or not?
  const [ok, setOk] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(null);

  useEffect(() => {
    checkPermission();
  }, []);

  // check permission
  const checkPermission = async () => {
    try {
      // get user data from backend
      const user = await getCurrentUser(token);

      console.log("user", user);

      if (user) {
        setOk(false);
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      console.log(errorMsg);

      if (errorMsg === "jwt expired") {
        setTokenExpired(true);
      }

      setOk(true);
    }
  };

  if (tokenExpired) {
    return (
      <>
        <div className="flex w-screen justify-center items-center">
          <span className="text-center">
            Log in หมดอายุแล้ว กรุณา Log in ใหม่อีกครั้ง
          </span>
        </div>
        {el}
      </>
    );
  }

  // loading part
  if (ok === null) {
    return <>
    <div className="w-screen h-screen flex justify-center items-center">
    <Loader className="animate-spin" />
    </div>
    </>
  }

  if (!ok) {
    return (
      <>
        <div className="text-center text-xl font-bold py-[350px]">
          คุณได้ Log in แล้ว
        </div>
      </>
    );
  }
  return <>{el}</>; // el คือ Component ที่จะเรนเดอร์ถ้าผู้ใช้มีสิทธิ์
}

export default ProtectAuth;
