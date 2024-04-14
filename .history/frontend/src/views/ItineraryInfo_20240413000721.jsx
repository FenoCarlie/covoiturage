import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

function ItineraryInfo() {
  const { itineraryId, users } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const idData = {
    id: itineraryId,
  };

  console.log(users);

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
        <section className="w-[30%] h-full p-4">
          <div className="p-3 flex">
            <div className="flex mt-10 justify-between">
              <div className="flex justify-center">
                <div
                  className={`mr-6 relative w-16 h-16 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
                  style={{ backgroundImage: `url(${users?.avatar})` }}
                ></div>
                <div className="flex flex-col">
                  <span>
                    {users?.firstName} {users?.lastName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-[70%] bg-blue-500 h-full p-4">
          itinerary information
        </section>
      </div>
    </>
  );
}

export default ItineraryInfo;
