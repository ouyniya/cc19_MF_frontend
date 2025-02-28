import { useEffect, useState } from "react";
import useUserStore from "../stores/useUserStore";

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
    return (
      <DotLottieReact
        src="https://lottie.host/e67dbfbb-f98e-4af3-9384-ac4504a18ed9/kQLUf1z89W.lottie"
        loop
        autoplay
      />
    );
  }

  if (!ok) {
    return <h1>Unauthorized!!!</h1>;
  }
  return <>{el}</>;
}

export default ProtectRoutes;


import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
