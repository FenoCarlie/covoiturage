import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { CiMail, CiPhone } from "react-icons/ci";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const [date, setDate] = useState("");

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

  console.log(itinerary);

  useEffect(() => {
    if (itineraryId) {
      getItinerary();
    }
  }, [itineraryId]);

  return (
    <>
      <div className="w-full h-full flex text-myColor">
        {loading ? (
          <>
            <section className="w-[30%] h-full p-4">
              <div className="p-3 flex w-full border rounded-lg shadow-2xl">
                <div className="flex w-full animate-pulse">
                  <div
                    className={`mr-6 relative w-[45%] h-60 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat bg-slate-400`}
                  ></div>
                  <div className="flex flex-col w-[55%]">
                    <div className="mt-1 h-8 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    <div className="mt-4 h-6 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                    <div className="mt-4 h-6 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                    <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                      <span className="pl-4 text-gray-600"></span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-[70%] flex flex-col items-center h-full p-4 animate-pulse">
              <div className="mt-4 h-8 w-[15%] rounded-lg bg-slate-400 text-sm mb-[60px]"></div>
              <div className="">
                <div className="flex w-full justify-between">
                  <ol className="relative border-s-4 h-[90px] border-teal-400">
                    <li className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <div className="mt-4 h-6 w-[75%] rounded-lg bg-slate-400 text-sm"></div>
                      <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    </li>
                    <li className="ms-6 justify-between">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <div className="mt-4 h-6 w-[75%] rounded-lg bg-slate-400 text-sm"></div>
                      <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>
          </>
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
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-400 h-[60%]">map</div>
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
                        <h2 className="font-medium leading-tight">
                          {itinerary.locStart?.name}
                        </h2>
                        <FaMapMarkedAlt className="w-6 h-6" />
                      </span>
                      <p className="text-sm pl-4">{itinerary.dateDep?.time}</p>
                    </li>
                    <li className="ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <span className="flex w-full justify-between">
                        <h2 className="font-medium leading-tight">
                          {itinerary.locEnd?.name}
                        </h2>
                        <FaMapMarkedAlt className="w-6 h-6" />
                      </span>
                      <p className="text-sm pl-4">06 : 00 a.m.</p>
                    </li>
                  </ol>
                </div>
              </div>
              <p className="h-1 mb-8 w-[50%] rounded-lg bg-[#c9c9c96e] text-sm"></p>
              <div className="flex mb-8 justify-between w-[30%]">
                <span>Number of free seats</span>
                <h2 className="text-gl">{itinerary?.seats}</h2>
              </div>
              <div className="flex mb-8 justify-between w-[30%]">
                <span>Price for one persone</span>
                <h2 className="text-gl">{itinerary?.cost} €</h2>
              </div>
              <p className="h-1 mb-8 w-[50%] rounded-lg bg-[#c9c9c96e] text-sm"></p>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default ItineraryInfo;
