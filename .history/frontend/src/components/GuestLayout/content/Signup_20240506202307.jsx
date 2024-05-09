import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider.jsx";
import axiosClient from "../../../API/axios-client.js";
import { CiMail, CiPhone } from "react-icons/ci";
import ContactDropDown from "./featurs/ContactDropDown.jsx";
import Stepper from "./featurs/stepper.jsx";

export default function Signup() {
  return (
    <>
      <div className="fadeInDown animated mb-5 flex items-center justify-center w-full flex-col fadeInDown">
        <div className="shadow-l rounded-[10px] bg-white w-[55%] flex flex-col items-center">
          <h1 className="p-3">Signup for Free</h1>
          <Stepper />
        </div>
      </div>
      <p className="text-xl">
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
}
