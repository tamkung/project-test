import { signInWithGoogle } from "../../services/firebase";
import "../../css/App.css";
import { Link } from "react-router-dom";
import * as FcIcons from 'react-icons/fc'


import React, { useState, useEffect } from "react";
import { auth } from "../../services/firebase";
import { firebase, firebaseDB } from "../../services/firebase";
import Swal from 'sweetalert2'

const Login = () => {

  // const [user, setUser] = useState({});
  // const reg = new RegExp('[a-zA-Z0-9]+@email+.+kmutnb+.ac+.th');

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //     console.log(user.email)

  //   });
  // }, []);
{/* <CheckLogin /> */}
  // function checkLogin() {
  //   if (reg.test(user.email)) {
  //     let timerInterval
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Gmail ถูกต้อง',
  //       timer: 3000,
  //       timerProgressBar: true,
  //       didOpen: () => {
  //         Swal.showLoading()
  //         const b = Swal.getHtmlContainer().querySelector('b')
  //         timerInterval = setInterval(() => {

  //         }, 1000)
  //       },
  //       willClose: () => {
  //         clearInterval(timerInterval)
  //       }
  //     }).then((result) => {
  //     })


  //   } else {
  //     // window.location.href = "/ListThesis";
  //     let timerInterval
  //     Swal.fire({
  //       imageUrl: 'https://upload.wikimedia.org/wikipedia/th/thumb/b/be/Seal_of_KMUTNB.svg/640px-Seal_of_KMUTNB.svg.png',
  //       imageHeight: 150,
  //       title: 'Gmail ไม่ถูกต้อง',
  //       html: 'เว็บไซต์นี้เป็นเว็บไซต์ของ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือเท่านั้น',
  //       timer: 5000,
  //       timerProgressBar: true,
  //       didOpen: () => {
  //         Swal.showLoading()
  //         const b = Swal.getHtmlContainer().querySelector('b')
  //         timerInterval = setInterval(() => {
  //         }, 100)
  //       },
  //       willClose: () => {
  //         clearInterval(timerInterval)
  //       }
  //     }).then((result) => {
  //       auth.signOut()
  //         .then(() => {
  //           window.location.href = "/";
  //         })
  //     })
  //     // auth.signOut()
  //     //   .then(() => {
  //     //     window.location.href = "/NoMatch";
  //     //   })
  //   }

  // }


  return (
    <div className="btn" >
      <button className="btn auth-btn" onClick={(signInWithGoogle)
      } style={{ fontSize: "16px" }}>
        <FcIcons.FcGoogle style={{ fontSize: "150%" }} /> &nbsp; &nbsp;
        | &nbsp;&nbsp; Sign In With Google

      </button>

    </div>


  );
};
export default Login;
