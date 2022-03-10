import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdManageThesis from './components/pages/AdManageThesis';
import Report from './components/pages/Report';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import AddCollection from './components/pages/AddCollection';
import EditCollection from './components/pages/EditCollection';
import EditThesis from '../src/components/CRUD/EditThesis';
import { useState, useEffect } from 'react';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/AdManageThesis' component={AdManageThesis} />
          <Route path='/login' component={Login} />
          <Route path='/addcollection' component={AddCollection} />
          <Route path='/editcollection/:id' component={EditThesis} />
          <Route path='/report' component={Report} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
