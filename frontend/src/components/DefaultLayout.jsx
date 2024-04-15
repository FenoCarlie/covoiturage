import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useEffect } from "react";
import Header from "../content/Header.jsx";

export default function DefaultLayout() {
  const { token, setUser, notification, alert, error } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex absolute left-0 top-[80px] right-0 bottom-0 flex-col justify-evenly bg-[#F6F8F9]">
      <Header />
      <Outlet />
      {notification ? (
        <div className="message bg-[#00a762]">{notification}</div>
      ) : alert ? (
        <div className="message bg-[#fdf4e7]">{alert}</div>
      ) : error ? (
        <div className="message bg-[#d51d2c]">{error}</div>
      ) : null}
    </div>
  );
}
