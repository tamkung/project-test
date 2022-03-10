import React from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import AddThesis from '../CRUD/AddThesis'
import ViewThesis from '../CRUD/ViewThesis'
import EditThesis from '../CRUD/EditThesis'

import Footer from '../Footer';


function EditCollection (id) {
  return ( 
    <>
      <EditThesis />
      <Footer />
    </>
  );
}
export default EditCollection; 
