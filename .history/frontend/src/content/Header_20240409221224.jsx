import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const { user, setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const course = "/dashboard/course";
  const dashboard = "/dashboard";
  const location = useLocation();
  const url = location.pathname;

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

  useEffect(() => {
    setMenu(false);
  }, [location]);

  return (
    <>
      <div className="flex h-[80px] items-center justify-between flex-wrap fixed left-0 right-0 top-0 z-50 bg-[#152046] py-4 px-9">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link
            to="/dashboard"
            className="font-semibold text-2xl tracking-tight"
          >
            Cocovoit
          </Link>
        </div>
        <div className="flex">
          <span
            className={
              url === dashboard ? `hidden` : `relative mr-20 text-white`
            }
          >
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosSearch className="w-[24px] h-[24px] mr-2" />
            </span>
            <Link
              to="/dashboard"
              className=" hover:bg-[#eeeeee2a] text-lg rounded-lg block ps-10 p-2.5"
            >
              Search an itinerary
            </Link>
          </span>
          <span
            className={url === course ? `hidden` : `relative mr-20 text-white`}
          >
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosAddCircleOutline className="w-[24px] h-[24px]" />
            </span>
            <Link
              to="/dashboard/course"
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
                  ? "fadeInDown animated absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-500"
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
