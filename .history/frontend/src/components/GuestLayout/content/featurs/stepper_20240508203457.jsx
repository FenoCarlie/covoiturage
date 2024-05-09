import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../../context/ContextProvider";
import { CiMail } from "react-icons/ci";
import ContactDropDown from "./ContactDropDown";
import axiosClient from "../../../../API/axios-client";
import { toast } from "react-toastify";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

function Stepper() {
  const NUMBER_OF_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const { setUser, setToken, setAlert } = useStateContext();
  const [country, setCountry] = useState({});
  const [image, setImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [verifIn, setVerifIn] = useState(false);
  const [capital, setCapital] = useState(false);
  const [number, setNumber] = useState(false);
  const [length, setLength] = useState(false);
  const [charSp, setCharSp] = useState(false);

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

  function verifierContent(input) {
    if (input.length <= 7) {
      setLength(false);
    } else {
      setLength(true);
    }

    const majuscule = /[A-Z]/.test(input);
    if (!majuscule) {
      setCapital(false);
    } else {
      setCapital(true);
    }

    const specialChar = /[\W_]/.test(input);
    if (!specialChar) {
      setCharSp(false);
    } else {
      setCharSp(true);
    }

    const chiffre = /\d/.test(input);
    if (!chiffre) {
      setNumber(false);
    } else {
      setNumber(true);
    }

    console.log("capital", capital, " / ", number, length, charSp);
  }

  useEffect(() => {
    const password = document.getElementById("password");
    const passwordValue = password.value;
    const passwordValidation = document.getElementById("passwordValidation");
    setCapital(false);
    setNumber(false);
    setLength(false);
    setCharSp(false);
    verifierContent(passwordValue);

    if (newUser.password.length > 0) {
      passwordValidation.classList.remove("hidden");
      if ((capital && number && length && charSp) == true) {
        passwordValidation.classList.add("hidden");
      } else {
        passwordValidation.classList.remove("hidden");
      }
    } else if (newUser.password.length == 0) {
      passwordValidation.classList.add("hidden");
    }
  }, [
    setCapital,
    capital,
    number,
    setNumber,
    charSp,
    setLength,
    length,
    setCharSp,
    newUser,
  ]);

  useEffect(() => {
    setVerifIn(false);
    if (currentStep === 1) {
      if (newUser.email.length > 0 && newUser.phoneNumber.length > 8) {
        setVerifIn(true);
      }
    } else if (currentStep === 2) {
      if (
        (newUser.firstName.length > 0 || newUser.lastName.length > 0) &&
        newUser.password.length > 7 &&
        newUser.passwordConfirmation === newUser.password
      ) {
        setVerifIn(true);
      }
    } else if (currentStep === 3) {
      if (newUser.email.length > 0 && newUser.phoneNumber.length > 8) {
        setVerifIn(true);
      }
    }
  }, [newUser, currentStep]);

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
      phone: `${country.dial_code}${newUser.phoneNumber}`,
    };

    try {
      const MailResponse = await axiosClient.post("/search/users", mail);
      const PhoneResponse = await axiosClient.post("/search/users", phone);
      const userMail = Array.isArray(MailResponse.data);
      const userPhone = Array.isArray(PhoneResponse.data);

      if (!userMail && !userPhone) {
        setCurrentStep(currentStep + 1);
        setVerifIn(false);
      }
      if (userMail) {
        toast.warn("This Email is already been assigned", {
          position: "bottom-right",
        });
      }
      if (userPhone) {
        toast.warn("This Phone is already been assigned", {
          position: "bottom-right",
        });
      }
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
      <div className={`${currentStep === 0 ? `` : `hidden`}`}>
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
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
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
                type="number"
                placeholder="000000000"
                value={newUser.phoneNumber}
                onChange={(e) =>
                  setNewUser({ ...newUser, phoneNumber: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          currentStep === 1 ? `fadeInDown animated w-[85%] ` : `hidden`
        }`}
      >
        <div className="flex w-full flex-col py-6">
          <div className="mb-3 w-full">
            <label className="flex w-full">
              <span className="block mb-2 font-medium">Your first name</span>
            </label>
            <div className="relative">
              <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <IoPersonCircleOutline />
              </div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </div>
          </div>
          <label className="flex">
            <span className="block mb-2 font-medium">Your last name</span>
          </label>
          <div className="relative mb-3">
            <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <IoPersonCircleOutline />
            </div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
          </div>
          <label className="flex">
            <span className="block mb-2 font-medium">Create password</span>
            <span className="text-red-600 ml-[]">*</span>
          </label>
          <div className="relative mb-3">
            <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiLockPasswordLine />
            </div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              type="password"
              id="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          <div
            id="passwordValidation"
            className="mb-4 pl-2 hidden fadeInDown animated"
          >
            <div className="text-xs">
              <h3>Password must contain the following:</h3>
              <div className="pl-2">
                <p id="letter" className="invalid">
                  A <b>lowercase</b> letter
                </p>
                <p id="capital" className="invalid">
                  A <b>capital (uppercase)</b> letter
                </p>
                <p id="number" className="invalid">
                  A <b>number</b>
                </p>
                <p id="length" className="invalid">
                  Minimum <b>8 characters</b>
                </p>
              </div>
            </div>
          </div>
          <label className="flex">
            <span className="block mb-2 font-medium">
              Confirm your password
            </span>
            <span className="text-red-600 ml-[]">*</span>
          </label>
          <div className="relative mb-3">
            <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiLockPasswordLine />
            </div>
            <input
              className={`bg-gray-50 text-gray-900 text-sm  rounded-lg block w-full ps-10 p-2.5 focus:ring-none focus:border-none ${
                newUser.passwordConfirmation == 0
                  ? "border-gray-300"
                  : newUser.passwordConfirmation === newUser.password
                  ? "ring-emerald-500 shadow-none focus:ring-emerald-500 border-emerald-300"
                  : "ring-red-500 shadow-none focus:ring-red-500 border-red-300"
              }`}
              type="password"
              placeholder="Password"
              value={newUser.passwordConfirmation}
              onChange={(e) =>
                setNewUser({ ...newUser, passwordConfirmation: e.target.value })
              }
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
        onClick={(ev) => {
          if (!verifIn) {
            ("");
          } else {
            if (currentStep === 1) {
              verifId(ev);
            } else if (currentStep === 2) {
              setCurrentStep(currentStep + 1);
            } else if (currentStep === 3) {
              onSubmit(ev);
            }
          }
        }}
        className={`text-white p-3 w-full ${
          !verifIn
            ? "opacity-50 bg-[#3f4753] cursor-default"
            : "bg-[#124da5] hover:bg-[#013d97] cursor-pointer"
        }`}
      >
        Next
      </button>
    </>
  );
}

export default Stepper;
