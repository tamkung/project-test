import React from 'react';  
import SignInAdmin from '../components/admin/SignInAdmin';
import Home from '../components/pages/Home';
import Report from '../components/pages/Report';
import AddThesis from '../components/user/AddThesis';
import ListThesis from '../components/user/ListThesis';
import MyThesis from '../components/user/MyThesis';
import WebType from '../components/user/WebType';
import AppType from '../components/user/AppType';
import IotType from '../components/user/IotType';
import MediaType from '../components/user/MediaType';
import GameType from '../components/user/GameType';
import XrType from '../components/user/XrType';
import OtherType from '../components/user/OtherType';
import ViewThesis from '../components/user/ViewThesis';
import PaginatedItems from '../components/user/PaginatedItems';
import NotFound from "../error_404"
import Category from '../components/user/Category';



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
    path: "/Category",
    element: <Category />,
  },
  {
    path: "/MyThesis",
    element: <MyThesis />,
  },
  {
    path: "/webtype",
    element: <WebType />,
  },
  {
    path: "/apptype",
    element: <AppType />,
  },
  {
    path: "/iottype",
    element: <IotType />,
  },
  {
    path: "/mediatype",
    element: <MediaType />,
  },
  {
    path: "/gametype",
    element: <GameType />,
  },
  {
    path: "/xrtype",
    element: <XrType />,
  },
  {
    path: "/othertype",
    element: <OtherType />,
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
