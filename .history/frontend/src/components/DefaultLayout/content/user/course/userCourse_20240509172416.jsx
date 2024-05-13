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

function UserCourse() {
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
  }, [incrementCondition, decrementCondition, maxValue, place, reservation]);
  return <div>userCourse</div>;
}

export default UserCourse;
