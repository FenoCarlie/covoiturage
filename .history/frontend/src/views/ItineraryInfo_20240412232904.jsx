import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const idData = {
    id: itineraryId,
  };

  console.log(idData);

  const getItinerary = (idData) => {
    setLoading(true);
    axiosClient
      .post("/search/courses", idData)
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setItinerary(data[0]);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (itineraryId) {
      getItinerary(idData);
    }
  }, [itineraryId]); // Added itineraryId as a dependency

  console.log(itinerary);

  return (
    <>
      <div className="w-full h-full flex">
        <section className="w-[30%] bg-slate-500 h-full p-3">user card</section>
        <section className="w-[70%] bg-blue-500 h-full p-3">
          itinerary information
        </section>
      </div>
    </>
  );
}

export default ItineraryInfo;
