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
import axiosClient from "../axios-client.js";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Course = () => {
  const { user } = useStateContext();
  const [place, setPlace] = useState(1);
  const [date] = useState(new Date());
  const [palaceMenu, setPlaceMenu] = useState(false);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState();
  const [time, setTime] = useState(
    `${hour} : ${minute === 0 ? `00` : `${minute}`} ${period}`
  );
  const [calendarMenu, setCalendarMenu] = useState(false);
  const [incrementCondition, setIncrementCondition] = useState(false);
  const [decrementCondition, setDecrementCondition] = useState(false);
  const minValue = 1;
  const maxValue = 22;
  const [course, setCourse] = useState({
    id_driver: user?._id || "",
    loc_start: "",
    loc_end: "",
    cost_one: "",
    date_start: date,
    hour_start: "12",
    minute_start: "00",
    period_start: period,
    car_place: place,
    car_num: "",
  });

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const time_start = `${course.hour_start} : ${
      course.minute_start === 0 ? `00` : `${course.minute_start}`
    } ${course.period_start}`;

    const payload = {
      idUser: course.id_driver,
      locStart: course.loc_start,
      locEnd: course.loc_end,
      cost: course.cost_one,
      dateDep: {
        date: course.date_start,
        time: time_start,
      },
      carPlace: course.car_place,
      carNumber: course.car_num,
    };

    console.log(payload);

    try {
      const response = await axiosClient.post("/add/courses", payload);
      console.log(response);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.message);
      }
    }
  };

  function getMonthName(monthNumber) {
    return new Date("1999-" + monthNumber + "-15").toLocaleString("en-us", {
      month: "long",
    });
  }

  const day = course.date_start.getDate();
  const month = getMonthName(course.date_start.getMonth() + 1); // Months are zero-based
  const year = course.date_start.getFullYear();

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
      <div className="flex h-full justify-center items-center">
        <div className="h-full w-[60%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="w-[40%] flex flex-col">
          <div className="w-[50%] bg-white shadow-l rounded-[15px]">
            <div className="p-10 text-base">
              <label
                htmlFor="location-icon"
                className="block mb-2 font-medium text-gray-900"
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
                  className=" bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                  placeholder="name@flowbite.com"
                  value={course.loc_start}
                  onChange={(e) =>
                    setCourse({ ...course, loc_start: e.target.value })
                  }
                />
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium text-gray-900 mt-4"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  placeholder="name@flowbite.com"
                  value={course.loc_end}
                  onChange={(e) =>
                    setCourse({ ...course, loc_end: e.target.value })
                  }
                />
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium text-gray-900 mt-4"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  value={course.cost_one}
                  onChange={(e) =>
                    setCourse({ ...course, cost_one: e.target.value })
                  }
                />
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium text-gray-900 mt-4"
              >
                Select your date
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaRegCalendarAlt />
                </div>
                <span
                  onClick={handleCalendarMenu}
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                >
                  {`${day < 10 ? "0" + day : day} ${
                    month < 10 ? "0" + month : month
                  } ${year} - ${course.hour_start} : ${course.minute_start} ${
                    course.period_start
                  }`}
                </span>
                <div
                  className={
                    calendarMenu
                      ? `absolute fadeInDown animated palace-menu -right-[15em] flex items-center justify-center z-10 top-0 text-xl  origin-top-right rounded-md focus:outline-none ease-in-out duration-500`
                      : `hidden`
                  }
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div
                    className="py-1 flex flex-col justify-between items-center"
                    role="none"
                  >
                    <DatePicker
                      onChange={(e) => setCourse({ ...course, date_start: e })}
                      value={course.date_start}
                      selected={new Date()}
                      inline
                    />
                    <section className="bg-white justify-center items-center flex w-full mt-2 p-3 rounded-lg border">
                      <section className="bg-[#f9fafb] border rounded-md p-2 mr-3 flex items-center justify-center">
                        <input
                          type="number"
                          className="w-[30px]"
                          min="0"
                          max="12"
                          step="1"
                          pattern="[0-9]{2}"
                          inputMode="numeric"
                          placeholder={hour}
                          onChange={(e) => {
                            if (e.target.value < 0) e.target.value = "00";
                            if (e.target.value > 12) e.target.value = "12";
                            setCourse({
                              ...course,
                              hour_start: e.target.value,
                            });
                          }}
                        />
                        <span className="mr-1"> : </span>
                        <input
                          className="w-[30px]"
                          min="0"
                          max="60"
                          step="1"
                          pattern="[0-9]{2}"
                          inputMode="numeric"
                          checked={period === "PM"}
                          type="number"
                          placeholder={minute === 0 ? "00" : minute}
                          onChange={(e) => {
                            if (e.target.value < 0) e.target.value = "00";
                            if (e.target.value > 60) e.target.value = "60";
                            setCourse({
                              ...course,
                              minute_start: e.target.value,
                            });
                          }}
                        />
                      </section>
                      <section className="flex select-none">
                        <label className="radio flex flex-grow items-center justify-center rounded-lg cursor-pointer">
                          <input
                            type="radio"
                            name="radio"
                            value="am"
                            checked={period === "am"}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="peer hidden"
                          />
                          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#2b6be2] peer-checked:to-[#82a8ee] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                            AM
                          </span>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                          <input
                            type="radio"
                            name="radio"
                            value="pm"
                            checked={period === "pm"}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="peer hidden"
                          />
                          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#2b6be2] peer-checked:to-[#82a8ee] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                            PM
                          </span>
                        </label>
                      </section>
                    </section>
                  </div>
                </div>
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2 font-medium text-gray-900 mt-4"
              >
                Put the number of free place
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdPerson />
                </div>

                <label
                  onClick={handlePalaceMenu}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
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
                className="block mb-2  font-medium text-gray-900 mt-4"
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
                  className="bg-gray-50 uppercase border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  placeholder="7869 WWT"
                  value={course.car_num}
                  onChange={(e) =>
                    setCourse({ ...course, car_num: e.target.value })
                  }
                />
              </div>
            </div>
            <div
              onClick={onSubmit}
              className="flex text-white bg-[#30acd1] justify-center p-3"
            >
              <span className="">Validate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
