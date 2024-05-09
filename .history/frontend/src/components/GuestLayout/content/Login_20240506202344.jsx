import { Link } from "react-router-dom";
import { createRef } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { useState } from "react";
import { LuMail } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import axiosClient from "../../../API/axios-client";
import { toast } from "react-toastify";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axiosClient.post("/login/users", payload);
      setToken(response.data.token);
      setUser(response.data.user);
      toast.info("welcome back", {
        position: "bottom-right",
      });
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setMessage(response.data.message);
      }
    }
  };

  return (
    <>
      <div className="mb-5 animated flex items-center justify-center w-full flex-col fadeInDown">
        <div className="shadow-l fadeInDown rounded-[10px] bg-white w-[55%] flex flex-col items-center">
          <h1 className="p-3">Login into your account</h1>
          <div className="flex w-full flex-col p-6">
            {message && (
              <div className="alert">
                <p>{message}</p>
              </div>
            )}
            <div className="relative mb-3">
              <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <LuMail />
              </div>
              <input
                ref={emailRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <div className=" border-indigo-500 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <RiLockPasswordLine />
              </div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="text-white hover:bg-[#013d97] bg-[#124da5] p-3 w-full"
          >
            Login
          </button>
        </div>
      </div>
      <p className="text-lg">
        Not registered? <Link to="/signup">Create an account</Link>
      </p>
    </>
  );
}
