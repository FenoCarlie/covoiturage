import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { svg } from "../../assets/image";

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div id="guestLayout" className="flex justify-evenly h-full bg-[#F6F8F9]">
      <div className="flex w-[65%] flex-col">
        <header className="flex text-xl justify-center p-6 items-center w-full">
          COCOVOIT
        </header>
        <img className="m-auto w-[75%]" src={svg.login} alt="image" />
      </div>
      <div className="h-full bg-[#92E3A9] w-[35%] flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
