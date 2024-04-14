import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { svg } from "../assets/image";

function User() {
  const { user } = useStateContext();

  const avatar = user.avatar.replace(/^data:image\/\w+;base64,/, "");

  return <div className="h-full p-4"></div>;
}

export default User;
