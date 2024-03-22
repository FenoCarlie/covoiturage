import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Header from "../content/Header.jsx";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [token, setUser]);

  console.log(user);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-48 bg-[#F6F8F9]">
      <Header />
      <Outlet />
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}
