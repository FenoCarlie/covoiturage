import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { svg } from "../assets/image";

function User() {
  const { user } = useStateContext();

  const avatar = user.avatar.replace(/^data:image\/\w+;base64,/, "");

  return (
    <div className="h-full flex">
      <div className="w-[50%] m2 bg-slate-900 ">user side</div>
      <div className="w-[50%] m2 bg-slate-600">course side</div>
    </div>
  );
}

export default User;
