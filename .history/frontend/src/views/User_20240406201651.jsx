import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";

function User() {
  const { user } = useStateContext();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(user.avatar))
    );
    setAvatar(`data:image/jpeg;base64,${base64String}`);
  }, [user.avatar]);

  return (
    <div className="h-full">
      <ul>
        <li>{user.id}</li>
        <li>{user.email}</li>
        <li>{user.lastName}</li>
        <li>{user.firstName}</li>
      </ul>
      <img
        src={String.fromCharCode(...new Uint8Array(user.avatar))}
        alt="User Avatar"
      />
    </div>
  );
}

export default User;
