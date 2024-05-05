import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {
  FaRegCalendarAlt,
  FaPlusCircle,
  FaMinusCircle,
  FaEuroSign,
} from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../../../context/ContextProvider";
import DatePicker from "react-datepicker";
import { BsPersonPlusFill } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../../../../../API/axios-client";
import axios from "axios";

function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { setItineraryId, setNotification } = useStateContext();
  const { user, token } = useStateContext();
  const [place, setPlace] = useState(1);
  const [date] = useState(new Date());
  const [palaceMenu, setPlaceMenu] = useState(false);
  const [period, setPeriod] = useState("a.m.");
  const [calendarMenu, setCalendarMenu] = useState(false);
  const minValue = 1;
  const maxValue = 22;
  const [start, setStart] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const NUMBER_OF_STEPS = 3;
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

  useEffect(() => {
    const currentStep = document.getElementById(`step-${activeStep}`);
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (currentStep) currentStep.classList.remove("hidden");
    if (currentStepBar) {
      currentStepBar.classList.remove("text-gray-500/50");
      currentStepBar.classList.add("text-myColor");
    }
  }, [activeStep]);

  useEffect(() => {
    setCourse({ ...course, car_place: place });
  }, [place]);

  useEffect(() => {
    const active = document.getElementById(`step-${activeStep}`);
    const value = active.querySelectorAll("input");
    var index = 0;
    setIsEmpty(false);
    while (index < value.length) {
      if (value[index].value.trim() == "") {
        setIsEmpty(true);
      }
      index++;
    }
  });

  const steps = [
    {
      info: {
        name: "Route & date",
        description: "Specify your route and departure date",
      },
    },
    {
      info: {
        name: "Details",
        description:
          "Add price per person, number of seats and car description",
      },
    },
    {
      info: {
        name: "Validation",
        description: "Check information before validating",
      },
    },
  ];

  if (!token) {
    return <Navigate to="/login" />;
  }

  const toRight = () => {
    const nextStep = document.getElementById(
      `step-${(activeStep + 1) % NUMBER_OF_STEPS}`
    );
    const nextStepBar = document.getElementById(
      `stepBar-${(activeStep + 1) % NUMBER_OF_STEPS}`
    );
    const currentStep = document.getElementById(`step-${activeStep}`);
    if (nextStep) {
      nextStep.classList.remove("hidden");
      nextStep.classList.add("animate-fade-down");
    }
    if (currentStep) currentStep.classList.add("hidden");
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (nextStepBar) nextStepBar.classList.remove("text-gray-500/50");
    if (currentStepBar) currentStepBar.classList.add("text-myColor");
  };

  const toLeft = () => {
    const prevStep = document.getElementById(
      `step-${(activeStep - 1 + NUMBER_OF_STEPS) % NUMBER_OF_STEPS}`
    );
    const currentStep = document.getElementById(`step-${activeStep}`);
    if (prevStep) {
      prevStep.classList.remove("hidden");
      prevStep.classList.add(
        "animate-fade-up",
        "animate-once",
        "animate-ease-in"
      );
    }
    if (currentStep) currentStep.classList.add("hidden");
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (currentStepBar) {
      currentStepBar.classList.remove("text-myColor");
      currentStepBar.classList.add("text-gray-500/50");
    }
  };

  const prevStep = () => {
    setActiveStep((activeStep - 1 + NUMBER_OF_STEPS) % NUMBER_OF_STEPS);
    toLeft();
  };

  const nextStep = () => {
    setActiveStep((activeStep + 1) % NUMBER_OF_STEPS);
    toRight();
  };

  const time_start = `${course.hour_start} : ${
    course.minute_start === 0 ? `00` : `${course.minute_start}`
  } ${course.period_start}`;

  const date_start = new Date(course.date_start).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const data = {
    course,
    time_start,
  };

  function getMonthName(monthNumber) {
    return new Date("1999-" + monthNumber + "-15").toLocaleString("en-us", {
      month: "long",
    });
  }

  const day = course.date_start.getDate();
  const month = getMonthName(course.date_start.getMonth() + 1); // Months are zero-based
  const year = course.date_start.getFullYear();

  const handleStartChange = async (e) => {
    const value = e.target.value;
    const inStart = document.getElementById("inStart");
    const startValue = inStart.querySelector("input");

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
    if (value.length == 0 || value.length == 1) {
      setStartSuggestions([]);
    }

    if (startValue.value == "") {
      setStartSuggestions([]);
    }
  };

  const handleEndChange = async (e) => {
    const inEnd = document.getElementById("inEnd");
    const endValue = inEnd.querySelector("input");
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
    if (value.length == 0 || value.length == 1) {
      setEndSuggestions([]);
    }
    if (endValue.value == "") {
      setEndSuggestions([]);
    }
  };

  var incrementCondition = () => {
    setPlace((prevCount) => {
      const nextValue = prevCount + 1;
      return nextValue > maxValue ? minValue : nextValue;
    });
  };

  var decrementCondition = () => {
    setPlace((prevCount) => {
      const nextValue = prevCount - 1;
      return nextValue < minValue ? minValue : nextValue;
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      idUsers: data.course.id_driver,
      locStart: data.course.loc_start,
      locEnd: data.course.loc_end,
      cost: parseInt(data.course.cost_one),
      dateDep: {
        date: data.course.date_start,
        time: data.time_start,
      },
      seats: data.course.car_place,
      carNumber: data.course.car_num,
      description: data.course.description,
    };

    /*try {
      const response = await axiosClient.post("/add/courses", payload);
      setItineraryId(response.data);
      navigate(`/dashboard/itinerary`);
      setNotification("your course is added successfully");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        alert(response.data.message);
      }
    }*/

    console.log(payload);
  };

  return (
    <div className="flex p-3 h-full justify-center flex-col w-full">
      <div className="flex m-2 flex-row px-[50px] h-[75%]">
        <div className="flex flex-col justify-between w-[35%] mr-2 border-r p-4 ">
          {steps.map((step, index) => (
            <div key={step.id} className="">
              <ul className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                <li
                  id={`stepBar-${index}`}
                  className={`flex items-center space-x-2.5 rtl:space-x-reverse text-gray-500/50
                      `}
                >
                  <span className="flex items-center justify-center w-8 h-8 border rounded-full shrink-0">
                    {index + 1}
                  </span>
                  <span>
                    <h3 className="text-lg font-bold leading-tight">
                      {step.info.name}
                    </h3>
                    <p className="">{step.info.description}</p>
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mb-2 w-[65%] h-full">
          <div
            id={`step-0`}
            className={`flex ${
              activeStep === 0
                ? "flex ml-10 items-start h-full flex-col"
                : "hidden"
            }`}
          >
            <div className="pt-3">
              <label className="flex">
                <span className="block mb-2 font-medium">
                  Select your start location
                </span>
                <span className="text-red-600 ml-[]">*</span>
              </label>
              <div className="relative" id="inStart">
                <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLocationDot />
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  className=" bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                  placeholder="16th Arrondissement, Paris, Ile-de-France, France"
                  value={course.loc_start}
                  onChange={handleStartChange}
                />
                <div
                  className={
                    startSuggestions.length > 0
                      ? `overflow-auto absolute max-h-56 w-[400px] fadeInDown animated_suggest mt-2 p-2  flex z-10 text-gl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-75`
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
              <label className="flex mt-4">
                <span className="block mb-2 font-medium">
                  Select your end location
                </span>
                <span className="text-red-600 ml-[]">*</span>
              </label>
              <div className="relative" id="inEnd">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLocationDot />
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  placeholder="Lyons-la-Forêt, Les Andelys, Normandy, France"
                  value={course.loc_end}
                  onChange={handleEndChange}
                />
                <div
                  className={
                    endSuggestions.length > 0
                      ? `overflow-auto absolute max-h-56 w-[400px] fadeInDown animated_suggest mt-2 p-2  flex z-10 text-gl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-75`
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
              <label className="flex mt-4">
                <span className="block mb-2 font-medium">Select your date</span>
                <span className="text-red-600 ml-[]">*</span>
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
                  </div>
                </span>
              </div>
              <div className="flex flex-row">
                <div className="py-1 flex flex-col  items-center" role="none">
                  <DatePicker
                    onChange={(e) => setCourse({ ...course, date_start: e })}
                    value={course.date_start}
                    selected={new Date()}
                    inline
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id={`step-1`}
            className={`flex ${
              activeStep === 1
                ? "flex ml-10 items-start h-full flex-col"
                : "hidden"
            }`}
          >
            <div className="w-[85%]">
              <label className="flex mt-4">
                <span className="block mb-2 font-medium">
                  Put your price per person
                </span>
                <span className="text-red-600 ml-[]">*</span>
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
              <label className="flex mt-4">
                <span className="block mb-2 font-medium">
                  Put the number of free seats
                </span>
                <span className="text-red-600 ml-[]">*</span>
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
                    onClick={() => {
                      decrementCondition();
                    }}
                  />
                  <span>{`${place} ${place === 1 ? "seat" : "seats"}`}</span>
                  <FaPlusCircle
                    onClick={() => {
                      incrementCondition();
                    }}
                  />
                </div>
              </div>
              <label className="flex mt-4">
                <span className="block mb-2 font-medium">
                  Put your car number
                </span>
                <span className="text-red-600 ml-[]">*</span>
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
              <label className="flex mt-4">
                <span className="block mb-2 font-medium">
                  Put your car description
                </span>
                <span className="text-red-600 ml-[]">*</span>
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
          </div>
          <div
            id={`step-2`}
            className={`flex ${
              activeStep === 2
                ? "flex ml-10 items-start h-full flex-col"
                : "hidden"
            }`}
          >
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
              </div>
              <div className="flex flex-col mt-10">
                <div className="flex justify-between">
                  <div className="flex mb-2 relative items-center">
                    <BsPersonPlusFill className="h-6 w-6 mr-6" />
                    <span>
                      {course.car_place}{" "}
                      {course.car_place === 1 ? "seat" : "seats"}
                    </span>
                  </div>
                  <span className="">{`${course.cost_one} € each`}</span>
                </div>
                <div className="flex mt-2 relative items-center">
                  <p>{course.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`p-3 flex px-[200px] text-gl justify-between`}>
        <button
          onClick={activeStep === 0 ? "" : prevStep}
          className={`text-white p-2 border rounded-lg px-[30px] bg-sky-500 ${
            activeStep === 0
              ? "opacity-50 cursor-default"
              : " hover:bg-sky-600 cursor-pointer"
          }`}
        >
          <span>Previous</span>
        </button>
        {activeStep === steps.length - 1 ? (
          <button
            className="text-white p-2 bg-emerald-500 hover:bg-emerald-600 border rounded-lg px-[30px]"
            onClick={() => {
              onSubmit;
            }}
          >
            <span>Validate</span>
          </button>
        ) : (
          <button
            onClick={isEmpty === true ? null : nextStep}
            className={`text-white bg-sky-500  p-2 border rounded-lg px-[30px] ${
              isEmpty === true
                ? "opacity-50 cursor-default"
                : "hover:bg-sky-600 cursor-pointer"
            }`}
          >
            <span>Next</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Stepper;
