import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { svg } from "../assets/image";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { BsPersonPlusFill } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { GrMoney } from "react-icons/gr";

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
      <div className="flex overflow-hidden h-full w-ful text-myColor">
        {/*  <span>{search?.from}</span>
        <span>{search?.passengers}</span>
        <span>{search?.to}</span> */}
        {/* search && <div>Search: {search.destination}</div> */}
        {/* itinerary && <div>Itinerary: {itinerary.title}</div> */}
        <div className="p-6 w-[40%] flex">
          <div className="flex flex-col items-center relative transition-all duration-[450ms] ease-in-out w-[50%]">
            <h1 className="mb-6 font-bold text-xl">Sort by</h1>
            <article className=" rounded-lg  bg-white border-w-full ease-in-out duration p-6 left-0 inline-block">
              <label
                htmlFor="departure"
                className="hover:shadow-lg  mb-3 has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center justify-start text-black rounded-xl"
              >
                <IoMdTime className="h-7 w-7 " />
                <span className="mr-6">Earliest possible departure</span>
                <input
                  className="hidden peer/expand "
                  type="radio"
                  name="path"
                  id="departure"
                />
              </label>
              <label
                htmlFor="price"
                className="hover:shadow-lg justify-start has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center text-black rounded-xl"
              >
                <GrMoney className="h-7 w-7" />
                <span className="mr-6">Lowest price</span>
                <input
                  className="hidden peer/expand"
                  type="radio"
                  name="path"
                  id="price"
                />
              </label>
            </article>
          </div>
          <div className="w-[50%] flex flex-col items-center">
            <h1 className="mb-6 font-bold text-xl">Departure time</h1>
            <section className="flex flex-col">
              <ul className=" rounded-lg w-[350px] flex flex-col bg-white border-w-full ease-in-out duration p-6 left-0">
                <li className="w-full border-gray-200 rounded-t-lg">
                  <label htmlFor="06:00" className="text-gray-900">
                    Before 06:00
                  </label>
                  <input
                    id="06:00"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </li>
                <li className="w-full border-gray-200 rounded-t-lg ">
                  <label htmlFor="06:00 - 12:00" className="text-gray-900">
                    06:00 - 12:00
                  </label>
                  <input
                    id="06:00 - 12:00"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </li>
              </ul>
            </section>
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
                className="bg-[#ffffff] shadow-xl rounded-lg mb-4 p-6 w-[60%] flex flex-col"
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
