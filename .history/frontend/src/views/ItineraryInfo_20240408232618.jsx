import React from "react";
import { useStateContext } from "../context/ContextProvider";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();

  const data = {
    time: "22:30",
    duration: "6h00",
    departure: "Paris",
    arrival: "04:30 Lyon",
    price: "81,00 €",
    company: "+1 alsa Alsa",
    departureTime2: "22:35",
    duration2: "6h05",
    arrivalTime2: "04:40 Lyon",
    company2: "+ BlaBlaCar Bus",
    price2: "19,99 €",
  };

  return (
    <>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <ol className="relative text-gray-500 border-s border-gray-200">
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-4 ring-4 ring-white"></span>
            <h3 className="font-medium leading-tight">Personal Info</h3>
            <p className="text-sm">Step details here</p>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-4 ring-4 ring-white"></span>
            <h3 className="font-medium leading-tight">Account Info</h3>
            <p className="text-sm">Step details here</p>
          </li>
        </ol>
      </div>
    </>
  );
}

export default ItineraryInfo;
