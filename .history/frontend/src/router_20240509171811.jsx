import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import Home from "./components/Home/Home";
import Dashboard from "./components/DefaultLayout/content/dashboard/Dashboard";
import Course from "./components/DefaultLayout/content/course/Course";
import User from "./components/DefaultLayout/content/user/User";
import ItineraryInfo from "./components/DefaultLayout/content/dashboard/itinerary/ItineraryInfo";
import GuestLayout from "./components/GuestLayout/GuestLayout";
import Login from "./components/GuestLayout/content/Login";
import Signup from "./components/GuestLayout/content/Signup";
import NotFound from "./views/NotFound";
import UserCourse from "./components/DefaultLayout/content/user/course/userCourse";

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
        path: "/dashboard/user/course",
        element: <UserCourse />,
      },
      {
        path: "/dashboard/itinerary/",
        element: <ItineraryInfo />,
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
