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
        <div className="flex items-center">
          <div className="text-lg font-semibold">{data.departure}</div>
          <div className="text-gray-500 mx-2">-</div>
          <div className="text-lg font-semibold text-gray-500">
            {data.arrival}
          </div>
        </div>
        <div className="text-gray-500 mt-2">{data.time}</div>
        <div className="text-gray-500 mt-2">
          {data.duration} - {data.company}
        </div>
        <div className="text-2xl font-semibold mt-4 text-blue-500">
          {data.price}
        </div>
        <div className="text-gray-500 mt-2">
          <span className="font-semibold">Alternative: </span>
          {data.departureTime2} - {data.arrivalTime2}
        </div>
        <div className="text-gray-500">
          {data.duration2} - {data.company2}
        </div>
        <div className="text-2xl font-semibold text-green-500 mt-4">
          {data.price2}
        </div>
      </div>
    </>
  );
}

export default ItineraryInfo;
