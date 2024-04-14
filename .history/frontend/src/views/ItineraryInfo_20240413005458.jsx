import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { CiMail, CiPhone } from "react-icons/ci";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const idData = {
    id: itineraryId,
  };

  console.log(idData);

  const getItinerary = () => {
    setLoading(true);
    axiosClient
      .post("/search/courses", idData)
      .then(({ data }) => {
        setItinerary(
          data.map((item) => ({
            ...item,
            dateDep: {
              ...item.dateDep,
              date: new Date(item.dateDep.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            },
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (itineraryId) {
      getItinerary();
    }
  }, [itineraryId]);

  console.log(itinerary);

  return (
    <>
      <div className="w-full h-full flex text-myColor">
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <>
            <section className="w-[30%] h-full p-4">
              <div className="p-3 flex w-full border rounded-lg shadow-2xl">
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
                  </div>
                </div>
              </div>
            </section>
            <section className="w-[70%] flex justify-center h-full p-4">
              <h1>{itinerary}</h1>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default ItineraryInfo;
