import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { svg } from "../../assets/image";
import Header from "../../content/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GuestLayout() {
  const { token, notification, alert, error } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div
      id="guestLayout"
      className=" font-rubik flex justify-evenly h-full text-myColor bg-[#F6F8F9]"
    >
      <div className="flex w-[65%] flex-col">
        <Header />
        <img className="m-auto w-[75%]" src={svg.login} alt="image" />
      </div>
      <div className="h-full bg-[#92E3A9] w-[35%] flex flex-col justify-center items-center">
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
}
