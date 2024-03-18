"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { img } from "../public/image";

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`)
      .then(function (response) {
        setUser(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="flex items-center justify-between flex-wrap sticky bg-[#1b2263] py-4 px-9">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Cocovoit</span>
        </div>
        <div>
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            {/*user?.profile_img && (
              <img
                src={user.profile_img}
                alt={`${user.f_name} ${user.f_name}'s avatar`}
                className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
              />
            )*/}
            <img
              src={img.avatar}
              alt="image"
              className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            />
          </div>
        </div>
      </div>
    </>
  );
}
