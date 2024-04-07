import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="mb-5 flex items-center justify-center w-full flex-col fadeInDown">
        <div className="rounded-[10px] bg-white w-[55%] flex flex-col items-center">
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
              <input ref={nameRef} type="text" placeholder="Full Name" />
            </div>
            <div className="relative mb-3">
              <input ref={emailRef} type="email" placeholder="Email Address" />
            </div>
            <div className="relative mb-3">
              <input ref={passwordRef} type="password" placeholder="Password" />
            </div>
            <div className="relative ">
              <input
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Repeat Password"
              />
            </div>
          </div>
          <button onClick={onSubmit} className="btn btn-block">
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
