import { svg } from "../assets/image.js";
import { FaLocationDot } from "react-icons/fa6";
//import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { FaRegCalendarAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
//import { BsCardChecklist } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoMdPerson, IoMdPricetags } from "react-icons/io";
//import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import Calendar from "react-calendar";
import { useStateContext } from "../context/ContextProvider.jsx";
import { jwtDecode } from "jwt-decode";

const Course = () => {
  const { user } = useStateContext();
  const [place, setPlace] = useState(1);
  const [date] = useState(new Date());
  const [palaceMenu, setPlaceMenu] = useState(false);
  const [calendarMenu, setCalendarMenu] = useState(false);
  const [incrementCondition, setIncrementCondition] = useState(false);
  const [decrementCondition, setDecrementCondition] = useState(false);
  const minValue = 1;
  const maxValue = 22;
  const [course, setCourse] = useState({
    id_driver: user?.id || "",
    loc_start: "",
    loc_end: "",
    cost_one: "",
    time_start: date,
    car_place: place,
    car_num: "",
  });

  console.log(course);

  function getMonthName(monthNumber) {
    return new Date("1999-" + monthNumber + "-15").toLocaleString("en-us", {
      month: "long",
    });
  }

  const day = course.time_start.getDate();
  const month = getMonthName(course.time_start.getMonth() + 1); // Months are zero-based
  const year = course.time_start.getFullYear();

  const handlePalaceMenu = () => {
    setPlaceMenu(!palaceMenu);
    if (calendarMenu === true) {
      setCalendarMenu(false);
    }
  };

  const handleCalendarMenu = () => {
    setCalendarMenu(!calendarMenu);
    if (palaceMenu === true) {
      setPlaceMenu(false);
    }
  };

  useEffect(() => {
    if (incrementCondition) {
      setPlace((prevCount) => {
        const nextValue = prevCount + 1;
        return nextValue > maxValue ? minValue : nextValue;
      });
      setIncrementCondition(false);
    } else if (decrementCondition) {
      setPlace((prevCount) => {
        const nextValue = prevCount - 1;
        return nextValue < minValue ? minValue : nextValue;
      });
      setDecrementCondition(false);
    }
    setCourse({ ...course, car_place: place });
  }, [incrementCondition, decrementCondition]);

  return (
    <div className="h-full flex flex-col justify-evenly w-full ">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Your trip, cheaper and more fun!</h1>
      </header>
      <div className="flex h-full justify-center">
        <div className="h-full w-[60%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="w-[40%] flex flex-col items-center">
          <div className="w-[50%] bg-white shadow-l rounded-[15px]">
            <div className="p-10 text-base">
              <label
                htmlFor="location-icon"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Select your start location
              </label>
              <div className="relative">
                <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLocationDot />
                </div>
                <input
                  type="text"
                  id="location-icon"
                  className=" bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  value={course.loc_start}
                  onChange={(e) =>
                    setCourse({ ...course, loc_start: e.target.value })
                  }
                />
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium text-gray-900 dark:text-white mt-4"
              >
                Select your end location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLocationDot />
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  value={course.loc_end}
                  onChange={(e) =>
                    setCourse({ ...course, loc_end: e.target.value })
                  }
                />
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium text-gray-900 dark:text-white mt-4"
              >
                Put your price per person
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdPricetags />
                </div>
                <input
                  type="number"
                  min={0}
                  id="email-address-icon"
                  placeholder="15 "
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={course.cost_one}
                  onChange={(e) =>
                    setCourse({ ...course, cost_one: e.target.value })
                  }
                />
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium text-gray-900 dark:text-white mt-4"
              >
                Select your date
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaRegCalendarAlt />
                </div>
                <span
                  onClick={handleCalendarMenu}
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {`${day < 10 ? "0" + day : day} ${
                    month < 10 ? "0" + month : month
                  } ${year}`}
                </span>
                <div
                  className={
                    calendarMenu
                      ? `absolute fadeInDown animated palace-menu -right-[14em] p-2  flex items-center justify-center z-10 w-56 top-0 text-xl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-500`
                      : `hidden`
                  }
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div
                    className="py-1 flex justify-between items-center"
                    role="none"
                  >
                    <Calendar
                      onChange={(e) => setCourse({ ...course, time_start: e })}
                      value={course.time_start}
                      minDate={new Date()}
                    />
                  </div>
                </div>
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2 font-medium text-gray-900 dark:text-white mt-4"
              >
                Put the number of free place
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdPerson />
                </div>

                <label
                  onClick={handlePalaceMenu}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {`${place} place`}
                </label>
                <div
                  className={
                    palaceMenu
                      ? `absolute fadeInDown animated -right-[14em] p-2  flex items-center justify-center z-10 w-56 top-0 text-xl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-500`
                      : `hidden`
                  }
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div
                    className="py-1 flex  w-full justify-between items-center p-2"
                    role="none"
                  >
                    <FaMinusCircle
                      onClick={() => setDecrementCondition(true)}
                    />
                    <span>{place}</span>
                    <FaPlusCircle onClick={() => setIncrementCondition(true)} />
                  </div>
                </div>
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium text-gray-900 dark:text-white mt-4"
              >
                Put your car number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLocationDot />
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="bg-gray-50 uppercase border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="7869 WWT"
                  value={course.car_num}
                  onChange={(e) =>
                    setCourse({ ...course, car_num: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex text-white bg-[#30acd1] justify-center p-3">
              <span className="">Validate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
