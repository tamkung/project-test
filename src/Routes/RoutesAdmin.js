import React from 'react';
import AdminAddThesis from '../components/admin/AdminAddThesis';
import AdminAllow from '../components/admin/AdminAllow';
import AdminEditThesis from '../components/admin/AdminEditThesis';
import AdminReport from '../components/admin/AdminReport';
import AdminViewThesis from '../components/admin/AdminViewThesis';
import HomeAdmin from '../components/admin/HomeAdmin';
import SignInAdmin from '../components/admin/SignInAdmin';
import SignUpAdmin from '../components/admin/SignUpAdmin';
import NotFound from "../error_404"



export const RouterAdmin = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <HomeAdmin />,
  },
  {
    path: "/admin/view-thesis/:id",
    element: <AdminViewThesis />,
  },
  {
    path: "/admin/sign-in",
    element: <SignInAdmin />,
  },
  {
    path: "/admin/sign-up",
    element: <SignUpAdmin />,
  },
  {
    path: "/admin/report",
    element: <AdminReport />,
  },
  {
    path: "/admin/allow",
    element: <AdminAllow />,
  },
  {
    path: "/admin/add-thesis",
    element: <AdminAddThesis />,
  },
  {
    path: "/admin/edit-thesis/:id",
    element: <AdminEditThesis />,
  },

 
 
];
