import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup.jsx";
import User from "./views/User.jsx";
import Course from "./views/Course.jsx";
import ItineraryInfo from "./views/ItineraryInfo.jsx";
import Map from "./views/Map.jsx";
import Home from "./views/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/course",
        element: <Course />,
      },
      {
        path: "/dashboard/user",
        element: <User />,
      },
      {
        path: "/dashboard/itinerary/",
        element: <ItineraryInfo />,
      },
      {
        path: "/dashboard/map/",
        element: <Map />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
