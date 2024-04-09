import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { svg } from "../assets/image";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { BsPersonPlusFill } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";

function Itinerary({ searchData }) {
  const { setItineraryId } = useStateContext();
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState(null);
  //const [itinerary, setItinerary] = useState({});

  /*const getItinerary = () => {
    setLoading(true);
    axiosClient
      .get("/itinerary")
      .then(({ data }) => {
        setLoading(false);
        setItinerary(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };*/

  const itinerary = {
    1: {
      itineraryId: "465132",
      driver: {
        firstName: "Jhone",
        lastName: "DOE",
        phone: "+261 33 00 000 00",
        email: "doe@gmail.com",
      },
      locStart: "Paris",
      locEnd: "Lyon",
      cost: "35",
      dateDep: "09-04-2024",
      carPlace: "3",
      carNumber: "3695 PO",
    },
    0: {
      itineraryId: "35432",
      driver: {
        firstName: "Jhone",
        lastName: "DOE",
        phone: "+261 33 00 000 00",
        email: "doe@gmail.com",
      },
      locStart: "Reims",
      locEnd: "Bruxelles",
      cost: "15",
      dateDep: "10-04-2024",
      carPlace: "4",
      carNumber: "1231 DER",
    },
    2: {
      itineraryId: "643",
      driver: {
        firstName: "Jhone",
        lastName: "DOE",
        phone: "+261 33 00 000 00",
        email: "doe@gmail.com",
      },
      locStart: "Lille",
      locEnd: "Paris",
      cost: "45",
      dateDep: "15-04.2024",
      carPlace: "1",
      carNumber: "5466 RT",
    },
    3: {
      itineraryId: "621",
      driver: {
        firstName: "Jhone",
        lastName: "DOE",
        phone: "+261 33 00 000 00",
        email: "doe@gmail.com",
      },
      locStart: "Nantes",
      locEnd: "Nice",
      cost: "56",
      dateDep: "20-04-2024",
      carPlace: "3",
      carNumber: "8434 SER",
    },
    4: {
      itineraryId: "32132",
      driver: {
        firstName: "Jhone",
        lastName: "DOE",
        phone: "+261 33 00 000 00",
        email: "doe@gmail.com",
      },
      locStart: "Lyon",
      locEnd: "Paris",
      cost: "10",
      dateDep: "22-04-2024",
      carPlace: "3",
      carNumber: "6555 AR",
    },
  };

  useEffect(() => {
    if (searchData) {
      setSearch(searchData);
      console.log("search data loaded");
    } else {
      console.log("no search data");
    }
    //getItinerary();
  }, [searchData]);

  return (
    <>
      <div className="flex overflow-hidden h-full w-ful">
        {/*  <span>{search?.from}</span>
        <span>{search?.passengers}</span>
        <span>{search?.to}</span> */}
        {/* search && <div>Search: {search.destination}</div> */}
        {/* itinerary && <div>Itinerary: {itinerary.title}</div> */}
        <div className="p-3 w-[40%] flex flex-col items-center">
          <h1>Sort by</h1>
          <div className="flex w-full">
            <div className="flex flex-col justify-center items-center relative transition-all duration-[450ms] ease-in-out w-[50%] p-6">
              <article className="border border-solid border-gray-700 w-full ease-in-out duration-500 left-0 rounded-2xl inline-block shadow-lg shadow-black/15 bg-white">
                <label
                  htmlFor="dashboard"
                  className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                >
                  <IoMdTime className="h-7 w-7" />
                  <span className="ml-6">Earliest possible departure</span>
                  <input
                    className="peer/expand"
                    type="radio"
                    name="path"
                    id="dashboard"
                  />
                </label>
                <label
                  htmlFor="profile"
                  className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                >
                  <input
                    className="hidden peer/expand"
                    type="radio"
                    name="path"
                    id="profile"
                  />
                </label>
                <label
                  htmlFor="messages"
                  className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                >
                  <input
                    className="hidden peer/expand"
                    type="radio"
                    name="path"
                    id="messages"
                  />
                </label>
                <label
                  htmlFor="help"
                  className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                >
                  <input
                    className="hidden peer/expand"
                    type="radio"
                    name="path"
                    id="help"
                  />
                </label>
                <label
                  htmlFor="settings"
                  className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                >
                  <input
                    className="hidden peer/expand"
                    type="radio"
                    name="path"
                    id="settings"
                  />
                </label>
              </article>
            </div>
            <section className="bg-[#db7676] w-[50%] flex justify-end"></section>
          </div>
        </div>
        <div className="p-3 w-[60%] flex justify-star items-center flex-col overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : (
            Object.values(itinerary).map((item) => (
              <Link
                to={`/dashboard/itinerary/`}
                onClick={() => setItineraryId(item.itineraryId)}
                className="bg-[#ffffff] rounded-lg mb-4 p-6 w-[60%] flex flex-col"
                key={item.locStart + item.locEnd + item.dateDep}
              >
                <div className="flex w-full justify-between">
                  <ol className="relative border-s-4 h-[54px] border-teal-400">
                    <li className="mb-4 ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <h3 className="font-medium leading-tight">
                        {item.locStart}
                      </h3>
                      <p className="text-sm">{item.dateDep}</p>
                    </li>
                    <li className="ms-6 justify-between">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-white"></span>
                      <h3 className="font-medium leading-tight text-bold">
                        {item.locEnd}
                      </h3>
                    </li>
                  </ol>
                  <span>{item.cost} $</span>
                </div>
                <div className="flex mt-10 justify-between">
                  <div className="flex justify-center">
                    <div
                      className={`mr-6 relative w-16 h-16 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
                      style={{ backgroundImage: `url(${svg.avatar})` }}
                    ></div>
                    <div className="flex flex-col">
                      <span>
                        {item.driver.firstName} {item.driver.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="flex mb-2 relative items-center">
                    <BsPersonPlusFill className="h-6 w-6 mr-6" />
                    <span>{item.carPlace} Place</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Itinerary;
