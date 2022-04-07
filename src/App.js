import React from 'react';
import Navbar from './components/Navbar';
// import '../src/css/App.css';
import "../src/css/App.css";
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Report from './components/pages/Report';
// import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
// import EditCollection from './components/pages/EditCollection';
import { firebase } from "../src/services/firebase";
import EditThesis from '../src/components/admin_CRUD/EditThesis';
import { useState, useEffect } from 'react';
import ViewThesis from './components/User_Crud/ViewThesis';
import ListThesis from './components/User_Crud/ListThesis';
import AddThesis from './components/admin_CRUD/AddThesis';
import AdminThesis from './components/admin_CRUD/AdminThesis';
import AdminList from './components/admin_CRUD/AdminList';;


function App() {
  const [user,setUser] = useState(null);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  },[]);
  return (
    <div>
      <Router>
        <Navbar />
        <Switch> 
          <Route path='/' exact component={Home} />
          <Route path='/ListThesis' component={ListThesis} />
          <Route path='/login' component={Login} />
          <Route path='/AddCollection' component={AddThesis} />
          <Route path='/admin-add' component={AdminThesis} />
          <Route path={'/EditThesis/:id'} component={EditThesis} />
          <Route path='/viewcollection/:id' component={ViewThesis} />
          <Route path='/report' component={Report} />
          <Route path='/adminlist' component={AdminList} />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
