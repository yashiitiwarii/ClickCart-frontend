import React, { useEffect } from "react";
import { logout } from "../../services/userServices";
const LogOut = () => {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);

  return null;
};

export default LogOut;
