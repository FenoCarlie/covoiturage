import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Header from "../content/Header.jsx";

export default function DefaultLayout() {
  const { token, setUser, notification } = useStateContext();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [token, setUser]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex absolute flex-col mt-[4%] justify-evenly h-full bg-[#F6F8F9]">
      <Header />
      <Outlet />
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}
