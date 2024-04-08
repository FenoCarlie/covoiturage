import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Itinerary({ searchData }) {
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
      <div className="flex h-full w-full">
        {/*  <span>{search?.from}</span>
        <span>{search?.passengers}</span>
        <span>{search?.to}</span> */}
        {/* search && <div>Search: {search.destination}</div> */}
        {/* itinerary && <div>Itinerary: {itinerary.title}</div> */}
        <div className="p-3 w-[40%] flex justify-center">filter side</div>
        <div className="p-3 w-[60%] flex items-center flex-col">
          {loading ? (
            <div>Loading...</div>
          ) : (
            itinerary.map((item) => (
              <div key={item.id}>
                <p>
                  Driver: {item.driver.firstName} {item.driver.lastName}
                </p>
                <p>From: {item.locStart}</p>
                <p>To: {item.locEnd}</p>
                <p>Cost: {item.cost}</p>
                <p>Departure Date: {item.dateDep}</p>
                <p>Car Place: {item.carPlace}</p>
                <p>Car Number: {item.carNumber}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Itinerary;
