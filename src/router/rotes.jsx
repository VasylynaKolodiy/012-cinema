import Films from "../pages/Films/Films";
import React from "react";
import FilmIdPage from "../pages/FilmIdPage/FilmIdPage";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Favorites from "../pages/Favorites/Favorites";

export const privateRoutes = [
  {
    path: "/films",
    component: <Films/>,
    exact: true,
  },

  {
    path: "/films/:id",
    component: <FilmIdPage/>,
    exact: true,
  },

  {
    path: "*",
    component: <Films/>,
    exact: true,
  },

  {
    path: "/sign-up",
    component: <SignUp/>,
    exact: true,
  },

  {
    path: "/sign-in",
    component: <SignIn/>,
    exact: true,
  },

  {
    path: "/favorites",
    component: <Favorites/>,
    exact: true,
  },



]