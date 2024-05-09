import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../../context/ContextProvider";
import { CiMail } from "react-icons/ci";
import ContactDropDown from "./ContactDropDown";
import axiosClient from "../../../../API/axios-client";

function Stepper() {
  const NUMBER_OF_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const { setUser, setToken, setNotification } = useStateContext();
  const [country, setCountry] = useState({});
  const [image, setImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    image: image,
  });

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

  const verifId = async (ev) => {
    ev.preventDefault();
    const mail = {
      email: newUser.email,
    };

    const phone = {
      phone: newUser.phoneNumber,
    };

    try {
      const MailResponse = await axiosClient.post("/search/users", mail);
      const userMail = MailResponse.data;
      /*if (userMail.length == 0) {
        //setCurrentStep(currentStep + 1);
      }*/
      console.log(userMail);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.message);
      }
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const base64 = await convertToBase64(avatarRef.current.files[0]);

    const payload = {
      lastName: newUser.lastName,
      firstName: newUser.firstName,
      email: newUser.email,
      password: newUser.password,
      phone: newUser.phoneNumber,
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
                type="email"
                placeholder="jhonnedoe@gmail.com"
              />
            </div>
          </div>
          <div className="">
            <label className="flex">
              <span className="block mb-2 font-medium">Your phone number</span>
              <span className="text-red-600 ml-[]">*</span>
            </label>
            <div className="flex items-center mb-3">
              <ContactDropDown data={handleSelectedData} />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                type="text"
                placeholder="000000000"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${currentStep === 2 ? `fadeInDown animated ` : `hidden`}`}
      >
        <div className="flex w-full flex-col py-6">
          <div className="mb-3 w-full">
            <label className="flex">
              <span className="block mb-2 font-medium">Your phone number</span>
              <span className="text-red-600 ml-[]">*</span>
            </label>
            <div className="relative">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
          <label className="flex">
            <span className="block mb-2 font-medium">Your phone number</span>
            <span className="text-red-600 ml-[]">*</span>
          </label>
          <div className="relative mb-3">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
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
          <form className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                {image ? (
                  <img src={image} className="" alt="Selected" />
                ) : (
                  <>
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                  </>
                )}
              </div>
              <input onChange={onImageChange} id="file" type="file" />
            </label>
          </form>
        </div>
      </div>
      <button
        onClick={() => {
          currentStep == 1
            ? verifId()
            : currentStep == 2
            ? setCurrentStep(currentStep + 1)
            : currentStep == 3
            ? onSubmit
            : null;
        }}
        className="text-white hover:bg-[#013d97] bg-[#124da5] p-3 w-full"
      >
        Next
      </button>
    </>
  );
}

export default Stepper;
