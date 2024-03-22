import React, { useState, useEffect } from "react";
import { useStateContext } from "./context/ContextProvider";

export const AvatarComponent = () => {
  const { user } = useStateContext();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(user.avatar))
    );
    setAvatar(`data:image/jpeg;base64,${base64String}`);
  }, [user]);

  return avatar;
};
