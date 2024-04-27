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
import Stepper from "../components/DefaultLayout/content/course/content/stepper/Stepper.jsx";

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
        <div className="w-[40%]">
          <Stepper
            steps={[
              {
                content: <div className="w-full p-3"> step 1</div>,
                icone: <FaLocationDot />,
                info: { name: "name", description: "description" },
              },
              {
                content: <div className="w-full p-3"> step 2</div>,
                icone: <FaLocationDot />,
                info: { name: "name", description: "description" },
              },
              {
                content: <div className="w-full p-3"> step 3</div>,
                icone: <FaLocationDot />,
                info: { name: "name", description: "description" },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Course;
