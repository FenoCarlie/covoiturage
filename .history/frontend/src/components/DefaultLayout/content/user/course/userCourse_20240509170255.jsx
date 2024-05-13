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

function userCourse() {
  const navigate = useNavigate();
  const { itineraryId, token, user, setNotification, setError } =
    useStateContext();
  const [loading, setLoading] = useState(false);
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
    setReservation({ ...reservation, car_place: place });
  }, [incrementCondition, decrementCondition]);
  return (
    <>
      <div className="flex overflow-hidden h-full w-ful text-myColor">
        <div className="p-6 w-[40%] flex">
          <div className="flex flex-col items-center relative transition-all duration-[450ms] ease-in-out w-[50%]">
            <h1 className="mb-6 font-bold text-xl">Sort by</h1>
            <article className=" rounded-lg bg-white border-w-full ease-in-out duration p-6 left-0 inline-block">
              <label
                htmlFor="all"
                className="hover:shadow-lg mb-3 has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center justify-start rounded-xl"
              >
                <FaRegFileAlt className="h-7 w-7 " />
                <span className="mr-6">All itinerary</span>
                <input
                  className="hidden peer/expand"
                  type="radio"
                  name="path"
                  id="all"
                  checked={filter === "all"}
                  onChange={handleFilterChange}
                />
              </label>
              <label
                htmlFor="departure"
                className="hover:shadow-lg mb-3 has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center justify-start rounded-xl"
              >
                <IoMdTime className="h-7 w-7 " />
                <span className="mr-6">Earliest possible departure</span>
                <input
                  className="hidden peer/expand "
                  type="radio"
                  name="path"
                  id="departure"
                  checked={filter === "departure"}
                  onChange={handleFilterChange}
                />
              </label>
              <label
                htmlFor="price"
                className="hover:shadow-lg justify-start has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center rounded-xl"
              >
                <GrMoney className="h-7 w-7" />
                <span className="mr-6">Lowest price</span>
                <input
                  className="hidden peer/expand"
                  type="radio"
                  name="path"
                  id="price"
                  checked={filter === "price"}
                  onChange={handleFilterChange}
                />
              </label>
            </article>
          </div>
        </div>
        <div className="p-3 w-[70%] flex justify-star items-center flex-col overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : filteredItineraries.length > 0 ? (
            filteredItineraries.map((item) => (
              <Link
                onClick={() => setItineraryId(item._id)}
                to={`/dashboard/itinerary/`}
                className="bg-[#ffffff] shadow-xl rounded-lg mb-4 p-6 w-[60%] flex flex-col"
                key={item._id}
              >
                <div className="flex w-full justify-between">
                  <ol className="relative border-s-4 h-[75px] border-teal-400">
                    <li className="mb-4 ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <h3 className="font-medium leading-tight">
                        {item.locStart.name}
                      </h3>
                      <p className="text-sm pl-4">{item.dateDep.date}</p>
                      <p className="text-sm pl-4">{item.dateDep.time}</p>
                    </li>
                    <li className="ms-6 justify-between">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-white"></span>
                      <h3 className="font-medium leading-tight text-bold">
                        {item.locEnd.name}
                      </h3>
                    </li>
                  </ol>
                  <span>{item.cost} $</span>
                </div>
                <div className="flex mt-10 justify-between">
                  <div className="flex justify-center">
                    <div
                      className={`mr-6 relative w-16 h-16 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
                      style={{ backgroundImage: `url(${item.users?.avatar})` }}
                    ></div>
                    <div className="flex flex-col">
                      <span>
                        {item.users?.firstName} {item.users?.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="flex mb-2 relative items-center">
                    <BsPersonPlusFill className="h-6 w-6 mr-6" />
                    <span>
                      {item.seats} {item.seats === 1 ? "seat" : "seats"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-[#ffffff] shadow-xl rounded-lg mb-4 p-6 w-[60%] flex flex-col text-xl font-bold">
              no data
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default userCourse;
