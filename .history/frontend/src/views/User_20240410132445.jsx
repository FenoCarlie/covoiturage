import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { svg } from "../assets/image";
import { CiMail, CiPhone } from "react-icons/ci";

function User() {
  const { user } = useStateContext();

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
      <div className="w-[50%] m-3 flex item-center">item</div>
    </div>
  );
}

export default User;
