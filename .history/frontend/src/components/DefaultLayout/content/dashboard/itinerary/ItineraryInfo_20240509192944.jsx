import { useStateContext } from "../../../../../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../../../API/axios-client";
import MapPage from "./featurs/Map";
import LoadItineraryInfo from "./featurs/LoadItineraryInfo";

function ItineraryInfo() {
  const navigate = useNavigate();
  const { itineraryId, token, user, setNotification, setError } =
    useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const [date, setDate] = useState("");
  const [palaceMenu, setPlaceMenu] = useState(false);
  const [place, setPlace] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [reservation, setReservation] = useState({
    idCourse: itineraryId,
    idResevation: user?._id,
    car_place: place,
  });

  const getPassengers = () => {
    setLoading(true);

    axiosClient
      .post("/search/reservations", { idCourses: itineraryId })
      .then((res) => {
        setPassengers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong");
      });
  };

  const getItinerary = () => {
    setLoading(true);
    axiosClient
      .post("/search/courses", { id: itineraryId })
      .then(({ data }) => {
        setItinerary(data[0]);
        const formattedDate = new Date(data[0].dateDep.date).toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        );
        setDate(formattedDate);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSubmit = async () => {
    if (!token) {
      navigate("/login");
      return;
    } else {
      const payload = {
        idCourses: reservation.idCourse,
        idUsers: reservation.idResevation,
        seats: reservation.car_place,
      };

      try {
        const response = await axiosClient.post("/add/reservations", payload);
        getItinerary();
        getPassengers();
        setNotification(response.data);
      } catch (error) {
        const response = error.response;
        if (response && response.status === 422) {
          alert(response.data.message);
        }
      }
    }
  };

  const handlePalaceMenu = () => {
    setPlaceMenu(!palaceMenu);
  };

  const minValue = 1;
  const maxValue = itinerary?.seats;

  useEffect(() => {
    if (itineraryId) {
      getItinerary();
      getPassengers();
    }
  }, [itineraryId]);

  useEffect(() => {
    setReservation({ ...reservation, car_place: place });
  }, [place]);

  var incrementCondition = () => {
    console.log("onIncrement");
    setPlace((prevCount) => {
      const nextValue = prevCount + 1;
      return nextValue > maxValue ? minValue : nextValue;
    });
  };

  console.log(place);

  var decrementCondition = () => {
    setPlace((prevCount) => {
      const nextValue = prevCount - 1;
      return nextValue < minValue ? minValue : nextValue;
    });
  };

  return (
    <>
      <div className="w-full h-full flex text-myColor">
        {loading ? (
          <LoadItineraryInfo />
        ) : (
          <>
            <section className="w-[30%] h-full p-4">
              <div className="p-3 mb-8 flex w-full border rounded-lg shadow-2xl">
                <div className="flex w-full">
                  <div
                    className={`mr-6 relative w-[45%] h-60 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
                    style={{
                      backgroundImage: `url(${itinerary.users?.avatar})`,
                    }}
                  ></div>
                  <div className="flex flex-col w-[55%]">
                    <p className="text-2xl font-bold">
                      {itinerary.users?.firstName} {itinerary.users?.lastName}
                    </p>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    <p className="pt-4 text-base relative flex items-center justify-center lg:justify-start">
                      <CiMail className="h-6 w-6 text-green-700" />
                      <span className="pl-4 text-gray-600">
                        {itinerary.users?.email}
                      </span>
                    </p>
                    <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                      <CiPhone className="h-6 w-6 text-green-700" />
                      <span className="pl-4 text-gray-600">
                        {itinerary.users?.phone}
                      </span>
                    </p>
                    <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                      <IoCarSportOutline className="h-6 w-6 text-green-700" />
                      <span className="pl-4 text-gray-600">
                        {itinerary?.carNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-400 h-[60%]">
                {/* <MapPage
                  start={{
                    lon: itinerary.locStart?.coord.lng,
                    lat: itinerary.locStart?.coord.lat,
                  }}
                  end={{
                    lon: itinerary.locEnd?.coord.lng,
                    lat: itinerary.locEnd?.coord.lat,
                  }}
                />*/}
              </div>
            </section>
            <section className="w-[70%] flex flex-col items-center h-full p-4">
              <h1 className="font-bold text-myColor text-2xl mb-[60px]">
                {date}
              </h1>
              <div className="mb-16 w-[45%]">
                <div className="flex w-full justify-between">
                  <ol className="relative w-full border-s-4 h-[90px] border-teal-400">
                    <li className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <span className="flex w-full justify-between">
                        <h2 className="font-medium text-xl leading-tight">
                          {itinerary.locStart?.name}
                        </h2>
                        <FaMapMarkedAlt className="w-6 h-6" />
                      </span>
                      <p className="text-lg pl-4">{itinerary.dateDep?.time}</p>
                    </li>
                    <li className="ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <span className="flex w-full justify-between">
                        <h2 className="text-xl font-medium leading-tight">
                          {itinerary.locEnd?.name}
                        </h2>
                        <FaMapMarkedAlt className="w-6 h-6" />
                      </span>
                      <p className="text-lg pl-4">06 : 00 a.m.</p>
                    </li>
                  </ol>
                </div>
              </div>
              <p className="h-1 mb-8 w-[50%] rounded-lg bg-[#c9c9c96e] text-sm"></p>
              <div className="flex mb-8 justify-between w-[30%]">
                <span>Number of free seats</span>
                <h2 className="text-lg font-bold">{itinerary?.seats}</h2>
              </div>
              <div className="flex mb-8 justify-between w-[30%]">
                <span>Price for one persone</span>
                <h2 className="text-lg font-bold">{itinerary?.cost} €</h2>
              </div>
              <p className="h-1 mb-8 w-[50%] rounded-lg bg-[#c9c9c96e] text-sm"></p>
              <biv className="flex mb-8  w-[50%] justify-between">
                <h1
                  onClick={handlePalaceMenu}
                  className="bg-gray-50 border text-myColor border-gray-300 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40%] ps-10 p-2.5 "
                >
                  {`Number of seats : ${place}`}
                </h1>
                <div
                  className={
                    palaceMenu
                      ? `fadeInDown animated -right-[14em] p-2  flex items-center justify-center z-10 w-56 top-0 text-xl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-500`
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
                <button
                  onClick={onSubmit}
                  className="rounded-lg text-white bg-cyan-600 px-5 py-2.5 hover:bg-cyan-700 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 "
                  type="button"
                >
                  booking
                </button>
              </biv>
              <p className="h-1 mb-8 w-[50%] rounded-lg bg-[#c9c9c96e] text-sm"></p>
              <section className="w-[50%] flex flex-col">
                {Array.isArray(passengers) &&
                  passengers.map((item) => (
                    <div className="flex mb-4" key={item.id}>
                      <div
                        className={`mr-6 relative w-16 h-16 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
                        style={{
                          backgroundImage: `url(${item.users?.avatar})`,
                        }}
                      ></div>
                      <span>
                        <p>
                          {item.users?.firstName} {item.users?.lastName}
                        </p>
                        <p className="flex mt-2">
                          {[...Array(item?.seats)].map((_, index) => (
                            <RxPerson className="w-6 h-6" key={index} />
                          ))}
                        </p>
                      </span>
                    </div>
                  ))}
              </section>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default ItineraryInfo;
