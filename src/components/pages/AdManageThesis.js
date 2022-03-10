import React from 'react';
import { Route } from 'react-router-dom';
import '../../App.css';
import AddThesis from '../CRUD/AddThesis'
import ViewThesis from '../CRUD/ViewThesis'
import EditThesis from '../CRUD/EditThesis'

import Footer from '../Footer';
function Collection () {
  return ( 
    <>
      
      <ViewThesis />
      <Footer />
    </>
  );
}
export default Collection; 
