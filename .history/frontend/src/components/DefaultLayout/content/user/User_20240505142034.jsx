import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../../context/ContextProvider";
import { BsPersonPlusFill } from "react-icons/bs";
import { CiMail, CiPhone } from "react-icons/ci";
import axiosClient from "../../../../API/axios-client";

function User() {
  const { user } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const userId = user?._id;

  const test = 1;

  const getCourses = () => {
    setLoading(true);
    axiosClient
      .post("/search/courses", { idUsers: userId })
      .then(({ data }) => {
        setLoading(false);
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
      });
  };

  useEffect(() => {
    if (userId) {
      getCourses();
    }
    console.log("onChange");
  }, [userId]);

  const avatar = user.avatar.replace(/^data:image\/\w+;base64,/, "");

  return (
    <div className="flex overflow-hidden h-full w-ful">
      <div className="max-w-4xl flex items-center h-auto lg:h-full flex-wrap mx-auto lg:my-0">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(${`data:image/jpeg;base64,${avatar}`})`,
              }}
            ></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-myColor">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base relative flex items-center justify-center lg:justify-start">
              <CiMail className="h-6 w-6 text-green-700" />
              <span className="pl-4 text-gray-600">{user.email}</span>
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <CiPhone className="h-6 w-6 text-green-700" />
              <span className="pl-4 text-gray-600">{user.phone}</span>
            </p>
            <p className="pt-8 text-sm">
              Totally optional short description about yourself, what you do and
              so on.
            </p>

            <div className="pt-12 pb-8">
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                Edit some Information
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5 ">
          <img
            src={`data:image/jpeg;base64,${avatar}`}
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>
      </div>
      <div className="p-3 w-[60%] flex justify-star items-center flex-col overflow-y-auto text-myColor">
        <h1 className="mb-6 mt-6 font-bold text-xl">The way ahead</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          Array.isArray(itinerary) &&
          itinerary.map((item) => (
            <div
              className="bg-[#ffffff] shadow-xl rounded-lg mb-4 p-6 w-[60%] flex flex-col"
              key={item}
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
              <div className="flex mt-14 justify-between">
                <div className="flex mb-2 relative items-center">
                  <BsPersonPlusFill className="h-6 w-6 mr-6" />
                  <span>
                    {item.seats} {item.seats === 1 ? "seat" : "seats"}
                  </span>
                </div>
                <div>
                  <button
                    onClick={test + 1}
                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Edit some Information
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default User;
