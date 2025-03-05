import { useEffect, useState } from "react";
import useUserStore from "../stores/useUserStore";
import { Loader } from "lucide-react";
import { Link } from "react-router";

function ProtectRoutes(props) {
  const { el, allows } = props;

  // get user and token from store
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);
  // console.log(token)
  // set status login >> ok or not?
  const [ok, setOk] = useState(null);

  useEffect(() => {
    checkPermission();
  }, []);

  // check permission
  const checkPermission = async () => {
    try {
      // get user data from backend
      const rs = await getCurrentUser(token);
      // console.log(rs)

      const role = rs.user.role;
      // console.log('***',role)
      // check role of user >> admin or user
      setOk(allows.includes(role) ? true : false);
    } catch (error) {
      setOk(false);
    }
  };

  // loading part
  if (ok === null) {
    return <Loader />;
  }

  if (!ok) {
    return (
      <div className="flex justify-center items-center w-screen h-screen m-auto">
        <div className="text-center">
          <h1 className="text-9xl font-black">401</h1>

          <p className="text-2xl font-bold tracking-tight sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500">
            คุณไม่สามารถเข้าใช้งานหน้านี้ได้
            <br />
            กรุณาลงชื่อเข้าใช้งาน <Link to='/login' className="link link-primary">ที่นี่</Link> หรือตรวจสอบสิทธิ์ของคุณผู้ดูแลระบบอีกครั้ง
          </p>

          <Link to='/'
            className="btn btn-primary text-white btn-md mt-[24px]"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }
  return <>{el}</>;
}

export default ProtectRoutes;
