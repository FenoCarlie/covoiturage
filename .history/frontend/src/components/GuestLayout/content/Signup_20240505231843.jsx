import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider.jsx";
import axiosClient from "../../../API/axios-client.js";
import { CiMail, CiPhone } from "react-icons/ci";

import countryFlagEmoji from "country-flag-emoji";

export default function Signup() {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const avatarRef = useRef();
  const phoneRef = useRef();
  const { setUser, setToken, setNotification } = useStateContext();
  const phone = countryFlagEmoji.list;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const convertToBase64 = (avatar) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(avatar);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const base64 = await convertToBase64(avatarRef.current.files[0]);

    const payload = {
      lastName: lastNameRef.current.value,
      firstName: firstNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      avatar: base64,
    };

    try {
      const response = await axiosClient.post("/register", payload);
      setToken(response.data.token);
      setUser(response.data.user);
      setNotification("welcome !");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.message);
      }
    }
  };

  return (
    <>
      <div className="fadeInDown animated mb-5 flex items-center justify-center w-full flex-col fadeInDown">
        <div className="shadow-l rounded-[10px] bg-white w-[55%] flex flex-col items-center">
          <h1 className="p-3">Signup for Free</h1>
          <div className="flex w-full flex-col p-6">
            <div className="mb-3">
              <label className="flex">
                <span className="block mb-2 font-medium">
                  Your Email address
                </span>
                <span className="text-red-600 ml-[]">*</span>
              </label>
              <div className="relative">
                <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <CiMail />
                </div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  ref={emailRef}
                  type="email"
                  placeholder="jhonnedoe@gmail.com"
                />
              </div>
            </div>
            <label className="flex">
              <span className="block mb-2 font-medium">Your phone number</span>
              <span className="text-red-600 ml-[]">*</span>
            </label>
            <div className="relative mb-3">
              <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiPhone />
              </div>
              <div></div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                ref={phoneRef}
                type="text"
                placeholder="phone Address"
              />
            </div>
            <div className="overflow-auto absolute max-h-56 w-[400px] fadeInDown animated_suggest mt-2 p-2  flex z-10 text-gl  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out duration-75">
              <ul className="w-full">
                {phone.map((phone, index) => (
                  <li className="w-full p-2 hover:bg-slate-100" key={index}>
                    {phone.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="text-white hover:bg-[#013d97] bg-[#124da5] p-3 w-full"
          >
            Next
          </button>
          <button
            onClick={onSubmit}
            className="hidden text-white hover:bg-[#013d97] bg-[#124da5] p-3 w-full"
          >
            Signup
          </button>
        </div>
      </div>
      <p className="message">
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
}
