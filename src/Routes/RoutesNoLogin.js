import React from 'react';
import SignInAdmin from '../components/admin/SignInAdmin';
import Home from '../components/pages/Home';
import ListThesis from '../components/user/ListThesis';
import ViewThesis from '../components/user/ViewThesis';
import NotFound from "../error_404"

export const RouterNoLogin = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ListThesis",
    element: <ListThesis />,
  },
  {
    path: "/view-thesis/:id",
    element: <ViewThesis />,
  },
  {
    path: "/admin/sign-in",
    element: <SignInAdmin />,
  },
 
];
