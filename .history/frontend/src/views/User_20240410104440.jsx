import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { svg } from "../assets/image";

function User() {
  const { user } = useStateContext();

  const avatarData = user.avatar.replace(/^data:image\/\w+;base64,/, "");

  console.log(user);

  return (
    <div className="h-full">
      <ul>
        <li>{user.id}</li>
        <li>{user.email}</li>
        <li>{user.lastName}</li>
        <li>{user.firstName}</li>
      </ul>
      <div
        className={`mr-6 relative w-16 h-16 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${`data:image/jpeg;base64,${avatarData}`})`,
        }}
      ></div>
    </div>
  );
}

export default User;