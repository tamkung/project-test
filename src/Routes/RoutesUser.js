import React from 'react';  
import SignInAdmin from '../components/admin/SignInAdmin';
import Home from '../components/pages/Home';
import Report from '../components/pages/Report';
import AddThesis from '../components/user/AddThesis';
import ListThesis from '../components/user/ListThesis';
import MyThesis from '../components/user/MyThesis';
import ViewThesis from '../components/user/ViewThesis';
import PaginatedItems from '../components/user/PaginatedItems';
import NotFound from "../error_404"



export const RouterUser = [
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
    path: "/MyThesis",
    element: <MyThesis />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/view-thesis/:id",
    element: <ViewThesis />,
  },
  {
    path: "/admin/sign-in",
    element: <SignInAdmin />,
  },
  {
    path: "/AddCollection",
    element: <AddThesis />,
  },
  {
    path: "/numpage",
    element: <PaginatedItems />,
  },
 
];
