import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Collection from './components/pages/Collection';
import Products from './components/pages/Help';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/collection' component={Collection} />
          <Route path='/products' component={Products} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
