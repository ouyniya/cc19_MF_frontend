import { useEffect, useState } from "react"; 
import useUserStore from "../stores/useUserStore";
import { Loader } from "lucide-react";
import { Link } from "react-router";

function ProtectAuth(props) {
  const { el } = props; 

  // get user and token from store
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  // set status login >> ok or not?
  const [ok, setOk] = useState(null);

  useEffect(() => {
    checkPermission();
  }, []);

  // check permission
  const checkPermission = async () => {
    try {
      // get user data from backend
      const id = user?.id;
      // console.log(id)
      if (!id) {
        setOk(true);
      }
    } catch (error) {
      setOk(false);
    }
  };


  if (!ok) {
    return (
      <>
      <div className="text-center text-xl font-bold py-[350px]">
      คุณได้ Log in แล้ว
      </div></>
    );
  }
  return <>{el}</>; // el คือ Component ที่จะเรนเดอร์ถ้าผู้ใช้มีสิทธิ์
}

export default ProtectAuth;
