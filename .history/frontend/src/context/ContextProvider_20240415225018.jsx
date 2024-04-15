import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setItineraryId: () => {},
  setToken: () => {},
  setNotification: () => {},
  setAlert: () => {},
  setErreur: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem("ACCESS_USER"))
  );
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  var [itineraryId, _setItineraryId] = useState(
    localStorage.getItem("ITINERARY_ID")
  );
  const [notification, _setNotification] = useState("");
  const [alert, _setAlert] = useState("");
  const [notification, _setNotification] = useState("");

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("ACCESS_USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("ACCESS_USER");
    }
  };

  const setItineraryId = (itineraryId) => {
    _setItineraryId(itineraryId);
    if (itineraryId) {
      localStorage.setItem("ITINERARY_ID", itineraryId);
    } else {
      localStorage.removeItem("ITINERARY_ID");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  const setAlert = (message) => {
    _setAlert(message);
    setTimeout(() => {
      _setAlert("");
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        itineraryId,
        setItineraryId,
        token,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
