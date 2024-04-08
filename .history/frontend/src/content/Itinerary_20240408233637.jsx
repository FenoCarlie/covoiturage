import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { svg } from "../assets/image";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

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
        <div className="p-3 w-[40%] flex justify-center">filter side</div>
        <div className="p-3 w-[60%] flex items-center flex-col overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : (
            Object.values(itinerary).map((item) => (
              <Link
                to={`/dashboard/itinerary/`}
                onClick={() => setItineraryId(item.itineraryId)}
                className="bg-[#ffffff] rounded-lg mb-5 p-3 w-[75%] flex flex-col"
                key={item.locStart + item.locEnd + item.dateDep}
              >
                <div className="flex w-full">
                  <ol className="relative text-gray-500 border-s-4 h-[95px] border-teal-400">
                    <li className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-4 ring-white"></span>
                      <h3 className="font-medium leading-tight">
                        {item.locStart}
                      </h3>
                      <p className="text-sm">Step details here</p>
                    </li>
                    <li className="mb-10 ms-6 justify-between">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-4 ring-white"></span>
                      <h3 className="font-medium leading-tight">
                        {item.locEnd}
                      </h3>
                      <p className="text-sm">Step details here</p>
                    </li>
                  </ol>
                  <span>{item.cost} $</span>
                </div>
                <p>Departure Date: {item.dateDep}</p>
                <p>Car Place: {item.carPlace}</p>
                <p>Car Number: {item.carNumber}</p>
                <div className="flex mt-2 items-center">
                  <div
                    className={`mr-6 relative w-20 h-20 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
                    style={{ backgroundImage: `url(${svg.avatar})` }}
                  ></div>
                  <div>
                    <span>
                      {item.driver.firstName} {item.driver.lastName}
                    </span>
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
