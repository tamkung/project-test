import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAZ9v7gpcC9Y3Bm1m6sWb1FWnUT3LicCjY",
  authDomain: "collector-project-c1445.firebaseapp.com",
  databaseURL: "https://collector-project-c1445-default-rtdb.firebaseio.com",
  projectId: "collector-project-c1445",
  storageBucket: "collector-project-c1445.appspot.com",
  messagingSenderId: "834177565770",
  appId: "1:834177565770:web:22d775bcb910756b2e92b3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;