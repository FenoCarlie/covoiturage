import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider.jsx";
import axiosClient from "../../../API/axios-client.js";
import { CiMail, CiPhone } from "react-icons/ci";
import phoneCode from "../../../data/contryCode.json";

export default function Signup() {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const avatarRef = useRef();
  const phoneRef = useRef();
  const { setUser, setToken, setNotification } = useStateContext();

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
            <div className="flex items-center">
              <button
                id="dropdown-phone-button"
                data-dropdown-toggle="dropdown-phone"
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                <svg
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4 me-2"
                  viewBox="0 0 20 15"
                >
                  <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                  <mask
                    id="a"
                    style="mask-type:luminance"
                    width="20"
                    height="15"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                  </mask>
                  <g mask="url(#a)">
                    <path
                      fill="#D02F44"
                      fill-rule="evenodd"
                      d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                      clip-rule="evenodd"
                    />
                    <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                    <g filter="url(#filter0_d_343_121520)">
                      <path
                        fill="url(#paint0_linear_343_121520)"
                        fill-rule="evenodd"
                        d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                        clip-rule="evenodd"
                      />
                    </g>
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_343_121520"
                      x1=".933"
                      x2=".933"
                      y1="1.433"
                      y2="6.1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#fff" />
                      <stop offset="1" stop-color="#F0F0F0" />
                    </linearGradient>
                    <filter
                      id="filter0_d_343_121520"
                      width="6.533"
                      height="5.667"
                      x=".933"
                      y="1.433"
                      color-interpolation-filters="sRGB"
                      filterUnits="userSpaceOnUse"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feOffset dy="1" />
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_343_121520"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_343_121520"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                +1{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown-phone"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
              ></div>
              <label
                htmlFor="phone-input"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Phone number:
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="phone-input"
                  aria-describedby="helper-text-explanation"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="123-456-7890"
                  required
                />
              </div>
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
