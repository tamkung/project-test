import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ------@Data Base-------
import { firebase } from "../src/services/firebase";

// ----------@Layout------
import Navbar from './components/Navbar';

// ----------@Css---------
import "../src/css/App.css";

// ----------@Pages--------
import Home from './components/pages/Home';
import NotFound from './error_404';

// ------------------------------------------user
import Report from './components/pages/Report';
import ViewThesis from './components/user/ViewThesis';
import ListThesis from './components/user/ListThesis';
import MyThesis from './components/user/MyThesis';
// ------------------------------------------admin
import AdminReport from './components/admin/AdminReport';
import AdminThesis from './components/admin/AdminThesis';
import AdminList from './components/admin/AdminList';
import AdminAddThesis from './components/admin/AddThesis';
import AdminEditThesis from './components/admin/EditThesis'
import SingInAdmin from './components/admin/SingInAdmin';
import SingUpAdmin from './components/admin/SingUpAdmin';






import Login from './components/pages/Login';



function App() {
  return (
    <div>
     <Navbar />
     <Routes> 

       <Route path={'/'} index element={<Home />} />
       <Route path={'/ListThesis'} element={<ListThesis/>} />
       <Route path={'/login'} element={<Login/>} />
       <Route path={'/MyThesis'} element={<MyThesis/>} />
       <Route path={'/viewcollection/:id'} element={<ViewThesis/>} />
       <Route path={'/report'} element={<Report/>} />


       <Route path={'/admin/sing-in'} element={<SingInAdmin/>} />
       <Route path={'/admin/sing-up'} element={<SingUpAdmin/>} />
       <Route path={'/adminreport'} element={<AdminReport/>} />
       <Route path={'/adminlist'} element={<AdminList/>} />
       <Route path={'/EditThesis/:id'} element={<AdminEditThesis/>} />
       <Route path={'/AddCollection'} element={<AdminAddThesis/> } />
       <Route path={'/admin-add'} element={<AdminThesis/>} />

        {/* <------------------------Pages GATHER------------------------> */}
        <Route path={"*"} element={<NotFound/>} />

     </Routes>
     </div> 
  
  );
}

export default App;
