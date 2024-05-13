import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../../context/ContextProvider";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaRegFileAlt, FaSearch } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import axiosClient from "../../../../../API/axios-client";

function Itinerary({ searchData }) {
  const navigate = useNavigate();
  const { setItineraryId, user } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({});
  const [itinerary, setItinerary] = useState([]);
  const [filter, setFilter] = useState("all");

  const getItinerary = () => {
    setLoading(true);
    axiosClient
      .get("/show/courses")
      .then(({ data }) => {
        setLoading(false);
        const currentDate = new Date();
        const filteredData = data.filter(
          (item) => new Date(item.dateDep.date) >= currentDate
        );
        setItinerary(
          filteredData.map((item) => ({
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
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const searchItinerary = (options) => {
    setLoading(true);

    const payload = {
      "locStart.name": options.from,
      "locEnd.name": options.to,
      seats: parseInt(options.passengers),
    };

    axiosClient
      .post("/searchiti/courses", payload)
      .then(({ data }) => {
        setLoading(false);
        const currentDate = new Date();
        const filteredData = data.filter(
          (item) => new Date(item.dateDep.date) >= currentDate
        );
        setItinerary(
          filteredData.map((item) => ({
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
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const setfilter = () => {
    setSearch(null);
    getItinerary();
    console.log("on all");
  };

  useEffect(() => {
    if (searchData === null) {
      getItinerary();
    } else {
      searchItinerary(searchData);
    }
  }, [searchData]);

  const handleFilterChange = (e) => {
    setFilter(e.target.id);
  };

  const filteredItineraries = itinerary?.sort((a, b) => {
    if (filter === "all") {
      return 0; // Return 0 to keep the original order when filter is "all"
    } else if (filter === "departure") {
      return new Date(a.dateDep.date) - new Date(b.dateDep.date);
    } else if (filter === "price") {
      return parseFloat(a.cost) - parseFloat(b.cost);
    }
    return 0;
  });

  return (
    <>
      <div className="flex overflow-hidden h-full w-ful text-myColor">
        <div className="p-6 w-[40%] flex">
          <div className="flex flex-col items-center relative transition-all duration-[450ms] ease-in-out w-[50%]">
            <h1 className="mb-6 font-bold text-xl">Sort by</h1>
            <article className=" rounded-lg bg-white border-w-full ease-in-out duration p-6 left-0 inline-block">
              <label
                onClick={navigate("/dashboard")}
                className="hover:shadow-lg mb-3 has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center justify-start rounded-xl"
              >
                <FaSearch className="h-7 w-7 " />
                <span className="mr-6">Delete search</span>
              </label>
              <label
                htmlFor="all"
                className="hover:shadow-lg mb-3 has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center justify-start rounded-xl"
              >
                <FaRegFileAlt className="h-7 w-7 " />
                <span className="mr-6">All itinerary</span>
                <input
                  className="hidden peer/expand"
                  type="radio"
                  name="path"
                  id="all"
                  checked={filter === "all"}
                  onChange={handleFilterChange}
                />
              </label>
              <label
                htmlFor="departure"
                className="hover:shadow-lg mb-3 has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center justify-start rounded-xl"
              >
                <IoMdTime className="h-7 w-7 " />
                <span className="mr-6">Earliest possible departure</span>
                <input
                  className="hidden peer/expand "
                  type="radio"
                  name="path"
                  id="departure"
                  checked={filter === "departure"}
                  onChange={handleFilterChange}
                />
              </label>
              <label
                htmlFor="price"
                className="hover:shadow-lg justify-start has-[:checked]:shadow-lg relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-teal-400 has-[:checked]:border group flex flex-row gap-3 items-center rounded-xl"
              >
                <GrMoney className="h-7 w-7" />
                <span className="mr-6">Lowest price</span>
                <input
                  className="hidden peer/expand"
                  type="radio"
                  name="path"
                  id="price"
                  checked={filter === "price"}
                  onChange={handleFilterChange}
                />
              </label>
            </article>
          </div>
        </div>
        <div className="p-3 w-[70%] flex justify-star items-center flex-col overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : filteredItineraries.length > 0 ? (
            filteredItineraries.map((item) => (
              <Link
                onClick={() => setItineraryId(item._id)}
                to={`${
                  user._id == item.idUsers
                    ? "/dashboard/user/course"
                    : "/dashboard/itinerary/"
                }`}
                className="bg-[#ffffff] shadow-xl rounded-lg mb-4 p-6 w-[60%] flex flex-col"
                key={item._id}
              >
                <div className="flex w-full justify-between">
                  <ol className="relative border-s-4 h-[75px] border-teal-400">
                    <li className="mb-4 ms-6">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                      <h3 className="font-medium leading-tight">
                        {item.locStart.name}
                      </h3>
                      <p className="text-sm pl-4">{item.dateDep.date}</p>
                      <p className="text-sm pl-4">{item.dateDep.time}</p>
                    </li>
                    <li className="ms-6 justify-between">
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-white"></span>
                      <h3 className="font-medium leading-tight text-bold">
                        {item.locEnd.name}
                      </h3>
                    </li>
                  </ol>
                  <span>{item.cost} $</span>
                </div>
                <div className="flex mt-10 justify-between">
                  <div className="flex justify-center">
                    <div
                      className={`mr-6 relative w-16 h-16 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
                      style={{ backgroundImage: `url(${item.users?.avatar})` }}
                    ></div>
                    <div className="flex flex-col">
                      <span>
                        {item.users?.firstName} {item.users?.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="flex mb-2 relative items-center">
                    <BsPersonPlusFill className="h-6 w-6 mr-6" />
                    <span>
                      {item.seats} {item.seats === 1 ? "seat" : "seats"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-[#ffffff] shadow-xl rounded-lg mb-4 p-6 w-[60%] flex flex-col text-xl font-bold">
              no data
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Itinerary;
