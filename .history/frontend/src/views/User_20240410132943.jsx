import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { svg } from "../assets/image";
import { BsPersonPlusFill } from "react-icons/bs";
import { CiMail, CiPhone } from "react-icons/ci";

function User() {
  const { user } = useStateContext();

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

  const avatar = user.avatar.replace(/^data:image\/\w+;base64,/, "");

  return (
    <div className="h-full flex">
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

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
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
      <div className="w-[50%] m-3 flex justify-center">
        <div className="p-3 w-[60%] flex justify-star items-center flex-col overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : (
            Object.values(itinerary).map((item) => (
              <div
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
