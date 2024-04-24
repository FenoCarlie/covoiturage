import { svg } from "../assets/image.js";
import { FaLocationDot } from "react-icons/fa6";
//import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { FaRegCalendarAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
//import { BsCardChecklist } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoMdPerson, IoMdPricetags } from "react-icons/io";
import Calendar from "react-calendar";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate();
  const { setItineraryId, setNotification } = useStateContext();
  const { user, token } = useStateContext();
  const [place, setPlace] = useState(1);
  const [date] = useState(new Date());
  const [palaceMenu, setPlaceMenu] = useState(false);
  const [period, setPeriod] = useState("a.m.");
  const [calendarMenu, setCalendarMenu] = useState(false);
  const [incrementCondition, setIncrementCondition] = useState(false);
  const [decrementCondition, setDecrementCondition] = useState(false);
  const minValue = 1;
  const maxValue = 22;
  const [start, setStart] = useState("");
  const [course, setCourse] = useState({
    id_driver: user?._id || "",
    loc_start: start,
    loc_end: "",
    cost_one: "",
    date_start: date,
    hour_start: "12",
    minute_start: "00",
    period_start: period,
    car_place: place,
    car_num: "",
  });
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const time_start = `${course.hour_start} : ${
      course.minute_start === 0 ? `00` : `${course.minute_start}`
    } ${course.period_start}`;

    const payload = {
      idUsers: course.id_driver,
      locStart: course.loc_start,
      locEnd: course.loc_end,
      cost: parseInt(course.cost_one),
      dateDep: {
        date: course.date_start,
        time: time_start,
      },
      seats: course.car_place,
      carNumber: course.car_num,
    };

    try {
      const response = await axiosClient.post("/add/courses", payload);
      setItineraryId(response.data);
      navigate(`/dashboard/itinerary`);
      console.log(response);
      setNotification("your course is added successfully");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        alert(response.data.message);
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

  const handleStartChange = async (e) => {
    const value = e.target.value;
    setCourse({ ...course, loc_start: e.target.value });

    if (value.length > 2) {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=${
          import.meta.env.VITE_API_OPENCAGE_GEOCODING_API_KEY_TOKEN
        }`
      );
      setStartSuggestions(response.data.results);
    } else {
      setStartSuggestions([]);
    }
    if (value.length === 0) {
      setStartSuggestions([]);
      console.log("ok");
    }
  };

  const handleEndChange = async (e) => {
    const value = e.target.value;
    setCourse({ ...course, loc_end: e.target.value });

    if (value.length > 2) {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=${
          import.meta.env.VITE_API_OPENCAGE_GEOCODING_API_KEY_TOKEN
        }`
      );
      setEndSuggestions(response.data.results);
    } else {
      setEndSuggestions([]);
    }
  };

  console.log(course);

  return (
    <div className="h-full flex flex-col justify-evenly w-full text-myColor">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Your trip, cheaper and more fun!</h1>
      </header>
      <div className="flex h-full justify-center items-center">
        <div className="h-full w-[60%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="w-[40%] flex flex-col">
          <div className="w-[50%] bg-white shadow-l rounded-[15px]">
            <div className="p-10 text-base">
              <label htmlFor="location-icon" className="block mb-2 font-medium">
                Select your start location
              </label>
              <div className="relative">
                <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLocationDot />
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  id="location-icon"
                  className=" bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                  placeholder="16th Arrondissement, Paris, Ile-de-France, France"
                  value={course.loc_start}
                  onChange={handleStartChange}
                />
                <div
                  className={
                    startSuggestions.length > 1
                      ? `overflow-auto absolute max-h-56 w-[600px] fadeInDown animated_suggest mt-2 p-2  flex z-10 text-gl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-75`
                      : `hidden`
                  }
                >
                  <ul className="w-full">
                    {startSuggestions.map((startSuggestion, index) => (
                      <li
                        className="w-full p-2 hover:bg-slate-100"
                        onClick={() => {
                          setCourse({
                            ...course,
                            loc_start: startSuggestion.formatted,
                          });
                          setStartSuggestions([]);
                        }}
                        key={index}
                      >
                        {startSuggestion.formatted}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium mt-4"
              >
                Select your end location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLocationDot />
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  placeholder="Lyons-la-Forêt, Les Andelys, Normandy, France"
                  value={course.loc_end}
                  onChange={handleEndChange}
                />
                <div
                  className={
                    endSuggestions.length > 1
                      ? `overflow-auto absolute max-h-56 w-[600px] fadeInDown animated_suggest mt-2 p-2  flex z-10 text-gl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-75`
                      : `hidden`
                  }
                >
                  <ul>
                    {endSuggestions.map((endSuggestion, index) => (
                      <li
                        className="w-full p-2 hover:bg-slate-100"
                        onClick={() => {
                          setCourse({
                            ...course,
                            loc_end: endSuggestion.formatted,
                          });
                          setEndSuggestions([]);
                        }}
                        key={index}
                      >
                        {endSuggestion.formatted}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium mt-4"
              >
                Put your price per person
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdPricetags />
                </div>
                <input
                  type="number"
                  autoComplete="off"
                  min={0}
                  id="email-address-icon"
                  placeholder="15 €"
                  className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  value={course.cost_one}
                  onChange={(e) =>
                    setCourse({ ...course, cost_one: e.target.value })
                  }
                />
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2  font-medium mt-4"
              >
                Select your date
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaRegCalendarAlt />
                </div>
                <span
                  onClick={handleCalendarMenu}
                  className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                >
                  {`${day < 10 ? "0" + day : day} ${
                    month < 10 ? "0" + month : month
                  } ${year} - ${course.hour_start} : ${
                    course.minute_start
                  } ${period}`}
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
                          placeholder="12"
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
                          type="number"
                          placeholder={"00"}
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
                            value="a.m."
                            checked={period === "a.m."}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="peer hidden"
                          />
                          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#2b6be2] peer-checked:to-[#82a8ee] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                            a.m.
                          </span>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                          <input
                            type="radio"
                            name="radio"
                            value="p.m."
                            checked={period === "p.m."}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="peer hidden"
                          />
                          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#2b6be2] peer-checked:to-[#82a8ee] peer-checked:text-white p-2 rounded-lg transition duration-150 ease-in-out">
                            p.m.
                          </span>
                        </label>
                      </section>
                    </section>
                  </div>
                </div>
              </div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2 font-medium mt-4"
              >
                Put the number of free seats
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdPerson />
                </div>

                <label
                  onClick={handlePalaceMenu}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
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
                className="block mb-2  font-medium mt-4"
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
                  className="bg-gray-50 uppercase border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  placeholder="7869 WWT"
                  value={course.car_num}
                  onChange={(e) =>
                    setCourse({ ...course, car_num: e.target.value })
                  }
                />
              </div>
            </div>
            <div
              onClick={
                course.loc_start === "" ||
                course.loc_end === "" ||
                course.cost_one === "" ||
                course.car_num === ""
                  ? null
                  : onSubmit
              }
              className={
                course.loc_start === "" ||
                course.loc_end === "" ||
                course.cost_one === "" ||
                course.car_num === ""
                  ? "bg-gray-500 flex text-white justify-center p-3"
                  : "flex text-white bg-[#30acd1] justify-center p-3 cursor-pointer"
              }
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
