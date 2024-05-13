import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../../context/ContextProvider";
import axiosClient from "../../../../../API/axios-client";
import MapPage from "../../dashboard/itinerary/featurs/Map";
import LoadItineraryInfo from "./../../dashboard/itinerary/featurs/LoadItineraryInfo";
import { toast } from "react-toastify";

function UserCourse() {
  const navigate = useNavigate();
  const { itineraryId, token, user, setNotification, setError } =
    useStateContext();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(true);
  const [itinerary, setItinerary] = useState({});
  const [date, setDate] = useState("");
  const [palaceMenu, setPlaceMenu] = useState(false);
  const [place, setPlace] = useState(1);
  const [incrementCondition, setIncrementCondition] = useState(false);
  const [decrementCondition, setDecrementCondition] = useState(false);
  const [passengers, setPassengers] = useState({});
  const [reservation, setReservation] = useState({
    idCourse: itineraryId,
    idResevation: user?._id,
    car_place: place,
  });

  console.log(modal);

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

  const onSubmit = async (ev) => {
    if (!token) {
      navigate("/login");
      return;
    } else {
      const payload = {
        id: ev,
      };

      try {
        const response = await axiosClient.post("/add/delete", payload);
        if (response.data == "succes") {
          navigate("/dashboard");
          toast.info("your course is added successfully", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        const response = error.response;
        if (response && response.status === 422) {
          alert(response.data.message);
        }
      }
      console.log(payload);
    }
  };

  useEffect(() => {
    if (itineraryId) {
      getItinerary();
      getPassengers();
    }
  }, [itineraryId]);
  return (
    <>
      <div className="w-full h-full flex text-myColor">
        {loading ? (
          <LoadItineraryInfo />
        ) : (
          <>
            <section className="w-[30%] h-full p-4">
              <div className="p-1 w-full bg-slate-200 h-[60%] border rounded-lg shadow-2xl">
                {
                  <MapPage
                    start={{
                      lon: itinerary.locStart?.coord.lng,
                      lat: itinerary.locStart?.coord.lat,
                    }}
                    end={{
                      lon: itinerary.locEnd?.coord.lng,
                      lat: itinerary.locEnd?.coord.lat,
                    }}
                  />
                }
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
                        <h2 className="font-medium text-lg leading-tight">
                          {itinerary.locStart?.name}
                        </h2>
                        <FaMapMarkedAlt className="w-6 h-6" />
                      </span>
                      <p className="text-lg pl-4">{itinerary.dateDep?.time}</p>
                    </li>
                    <li className="ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <span className="flex w-full justify-between">
                        <h2 className="text-lg font-medium leading-tight">
                          {itinerary.locEnd?.name}
                        </h2>
                        <FaMapMarkedAlt className="w-6 h-6" />
                      </span>
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
              <biv className="flex mb-8 px-20 w-[50%] flex-row-reverse justify-between items-center">
                <div
                  className={`${
                    modal == true ? "hidden" : "flex"
                  } animated fadeInDown item center justify-between w-full items-center`}
                >
                  <h1 className="text-lg">
                    Are you sure you want to cancel this trip ?
                  </h1>
                  <button
                    onClick={() => {
                      onSubmit(itinerary?._id);
                    }}
                    className="rounded-lg text-white bg-red-600 px-5 py-2.5 hover:bg-red-700 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 "
                    type="button"
                  >
                    yes
                  </button>
                  <button
                    onClick={() => {
                      setModal(true);
                    }}
                    className="rounded-lg text-white bg-blue-600 px-5 py-2.5 hover:bg-blue-700 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 "
                    type="button"
                  >
                    no
                  </button>
                </div>
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                  className={`${
                    modal == false ? "hidden" : ""
                  } animated fadeInDown rounded-lg text-white bg-red-600 px-5 py-2.5 hover:bg-red-700 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150`}
                  type="button"
                >
                  Cancel
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

export default UserCourse;
