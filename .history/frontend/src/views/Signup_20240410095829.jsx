import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const avatarRef = useRef();
  const phoneRef = useRef();
  const { setUser, setToken, setNotification } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);

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

    console.log(payload);

    try {
      const response = await axiosClient.post("/register", payload);
      console.log(response);
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
            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <div className="relative mb-3">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                ref={lastNameRef}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="relative mb-3">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                ref={firstNameRef}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="relative mb-3">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                ref={emailRef}
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div className="relative mb-3">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                ref={phoneRef}
                type="text"
                placeholder="phone Address"
              />
            </div>
            <div className="relative mb-3">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </div>
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
