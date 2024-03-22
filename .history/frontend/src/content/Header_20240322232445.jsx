import { IoIosAddCircleOutline } from "react-icons/io";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const goToUser = () => {
    handleMenu();
    navigate("/dashboard/user");
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap sticky bg-[#152046] py-4 px-9">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-2xl tracking-tight">
            Cocovoit
          </span>
        </div>
        <div className="flex">
          <span className="relative mr-20 text-white">
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosAddCircleOutline className="w-[24px] h-[24px]" />
            </span>
            <Link
              onClick={goToUser}
              className=" hover:bg-[#eeeeee2a] text-lg rounded-lg block ps-10 p-2.5"
            >
              Add an itinerary
            </Link>
          </span>

          <div className="relative inline-block text-left">
            <div
              onClick={handleMenu}
              className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            >
              {/*<img
              src={img.avatar}
              alt="image"
              className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
  />*/}
            </div>

            <div
              className={
                menu
                  ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-500"
                  : "hidden"
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <Link
                  to="/dashboard/user"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-0"
                >
                  Account settings
                </Link>

                <button
                  onClick={(onLogout, handleMenu)}
                  type="submit"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
