import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../../context/ContextProvider";
import { CiMail } from "react-icons/ci";
import ContactDropDown from "./ContactDropDown";
import axiosClient from "../../../../API/axios-client";

function Stepper() {
  const NUMBER_OF_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);

  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const avatarRef = useRef();
  const phoneRef = useRef();
  const { setUser, setToken, setNotification } = useStateContext();
  const [country, setCountry] = useState({});
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  var handleSelectedData = (data) => {
    setCountry(data);
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
      <div className={`${currentStep === 1 ? `` : `hidden`}`}>
        <div className="flex w-full flex-col p-6">
          <div className="mb-3">
            <label className="flex">
              <span className="block mb-2 font-medium">Your Email address</span>
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
          <div className="flex items-center mb-3">
            <ContactDropDown data={handleSelectedData} />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
              ref={phoneRef}
              type="text"
              placeholder="000000000"
            />
          </div>
        </div>
      </div>
      <div
        className={`${currentStep === 2 ? `fadeInDown animated` : `hidden`}`}
      >
        <div className="flex w-full flex-col p-6">
          <label className="flex">
            <span className="block mb-2 font-medium">Your phone number</span>
            <span className="text-red-600 ml-[]">*</span>
          </label>
          <div className="relative mb-3">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              ref={lastNameRef}
              type="text"
              placeholder="First Name"
            />
          </div>
          <label className="flex">
            <span className="block mb-2 font-medium">Your phone number</span>
            <span className="text-red-600 ml-[]">*</span>
          </label>
          <div className="relative mb-3">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              ref={firstNameRef}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <label className="flex">
            <span className="block mb-2 font-medium">Your phone number</span>
            <span className="text-red-600 ml-[]">*</span>
          </label>
          <div className="relative mb-3">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
          </div>
          <label className="flex">
            <span className="block mb-2 font-medium">Your phone number</span>
            <span className="text-red-600 ml-[]">*</span>
          </label>
          <div className="relative mb-3">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
      </div>
      <div
        className={`${currentStep === 3 ? `fadeInDown animated` : `hidden`}`}
      >
        <div className="relative mb-3">
          <input
            type="file"
            ref={avatarRef}
            onChange={onImageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          />
          {image && <img src={image} alt="Selected" />}
        </div>
      </div>
      <button
        onClick={() => setCurrentStep(currentStep + 1)}
        className="text-white hover:bg-[#013d97] bg-[#124da5] p-3 w-full"
      >
        Next
      </button>
    </>
  );
}

export default Stepper;
