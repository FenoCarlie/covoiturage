import { FaLocationDot } from "react-icons/fa6";
import {
  FaRegCalendarAlt,
  FaPlusCircle,
  FaMinusCircle,
  FaEuroSign,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdPerson, IoMdPricetags } from "react-icons/io";
import Calendar from "react-calendar";
import { useStateContext } from "../../../../context/ContextProvider.jsx";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { svg } from "../../../../assets/image";
import axiosClient from "../../../../API/axios-client";
import Stepper from "./content/stepper/Stepper";
import { BsPersonBadgeFill, BsPersonPlusFill } from "react-icons/bs";

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
    description: "",
    car_num: "",
  });

  const time_start = `${course.hour_start} : ${
    course.minute_start === 0 ? `00` : `${course.minute_start}`
  } ${course.period_start}`;

  const date_start = new Date(course.date_start).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const NUMBER_OF_STEPS = 3;

  if (!token) {
    return <Navigate to="/login" />;
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < NUMBER_OF_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

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
      description: course.description,
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
        <div className="h-full w-[55%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="w-[45%] flex h-full">
          <div className="bg-white w-full">
            <Stepper
              data
              steps={[
                {
                  content: (
                    <div className="pt-3">
                      <label
                        htmlFor="location-icon"
                        className="block mb-2 font-medium"
                      >
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
                        Select your date
                      </label>

                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <FaRegCalendarAlt />
                        </div>
                        <span className="bg-gray-50 border border-gray-300 flex flex-row items-center rounded-lg ps-10 p-2.5 ">
                          <div className="mr-2">
                            {`${day < 10 ? "0" + day : day} ${
                              month < 10 ? "0" + month : month
                            } ${year}`}
                          </div>
                          <div className="justify-center items-center flex">
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
                                  if (e.target.value > 12)
                                    e.target.value = "12";
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
                                  if (e.target.value > 60)
                                    e.target.value = "60";
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
                          </div>
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <div
                          className="py-1 flex flex-col  items-center"
                          role="none"
                        >
                          <DatePicker
                            onChange={(e) =>
                              setCourse({ ...course, date_start: e })
                            }
                            value={course.date_start}
                            selected={new Date()}
                            inline
                          />
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <FaLocationDot />,
                  info: {
                    name: "Route & date",
                    description: "Specify your route and departure date",
                  },
                },
                {
                  content: (
                    <div className="w-[85%]">
                      <label
                        htmlFor="email-address-icon"
                        className="block mb-2 font-medium mt-4"
                      >
                        Put your price per person
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <FaEuroSign />
                        </div>
                        <input
                          type="number"
                          autoComplete="off"
                          min={0}
                          id="email-address-icon"
                          placeholder="15"
                          className="bg-gray-50 border border-gray-300 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 "
                          value={course.cost_one}
                          onChange={(e) =>
                            setCourse({ ...course, cost_one: e.target.value })
                          }
                        />
                      </div>
                      <label
                        htmlFor="email-address-icon"
                        className="block mb-2 font-medium mt-4"
                      >
                        Put the number of free seats
                      </label>
                      <div
                        className={`p-2 bg-gray-50 border border-gray-300 flex items-center justify-center text-  origin-top-right rounded-md mt-2 w-full focus:outline-none ease-in-out duration-500`}
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
                          <span>{`${place} ${
                            place === 1 ? "seat" : "seats"
                          }`}</span>
                          <FaPlusCircle
                            onClick={() => setIncrementCondition(true)}
                          />
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
                      <label className="block mb-2  font-medium mt-4">
                        Put your car description
                      </label>
                      <div className="relative">
                        <textarea
                          type="text"
                          className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                          placeholder="Peugeot 206, metal grey, with cocovoit sticker on right-hand doorframe,... "
                          value={course.description}
                          onChange={(e) =>
                            setCourse({
                              ...course,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  ),
                  icone: <FaLocationDot />,
                  info: {
                    name: "Details",
                    description:
                      "Add price per person, number of seats and car description",
                  },
                },
                {
                  content: (
                    <div className="w-full pt-3">
                      <div className="flex w-full justify-between">
                        <ol className="relative border-s-4 h-[75px] border-teal-400">
                          <li className="mb-4 ms-6">
                            <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                            <h3 className="font-medium leading-tight">
                              {course.loc_start}
                            </h3>
                            <p className="text-sm pl-4">{date_start}</p>
                            <p className="text-sm pl-4">{time_start}</p>
                          </li>
                          <li className="ms-6 justify-between">
                            <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-white"></span>
                            <h3 className="font-medium leading-tight text-bold">
                              {course.loc_end}
                            </h3>
                          </li>
                        </ol>
                        <span>{course.cost_one} €</span>
                      </div>
                      <div className="flex flex-col mt-10">
                        <div className="flex mb-2 relative items-center">
                          <BsPersonPlusFill className="h-6 w-6 mr-6" />
                          <span>
                            {course.car_place}{" "}
                            {course.car_place === 1 ? "seat" : "seats"}
                          </span>
                        </div>
                        <div className="flex mt-2 relative items-center">
                          <p>{course.description}</p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <FaLocationDot />,
                  info: {
                    name: "Validation",
                    description: "Check information before validating",
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
