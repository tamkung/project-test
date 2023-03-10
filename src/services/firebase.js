import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyAZ9v7gpcC9Y3Bm1m6sWb1FWnUT3LicCjY",
//   authDomain: "collector-project-c1445.firebaseapp.com",
//   databaseURL: "https://collector-project-c1445-default-rtdb.firebaseio.com",
//   projectId: "collector-project-c1445",
//   storageBucket: "collector-project-c1445.appspot.com",
//   messagingSenderId: "834177565770",
//   appId: "1:834177565770:web:22d775bcb910756b2e92b3",
//   measurementId: "G-EMW2L1G3HE"
// };
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARz0QyURNUadTY9_kQ7Te1msDCRbMEmt4",
  authDomain: "project-ae784.firebaseapp.com",
  databaseURL: "https://project-ae784-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-ae784",
  storageBucket: "project-ae784.appspot.com",
  messagingSenderId: "927870609096",
  appId: "1:927870609096:web:f34fb62642ce7511cf27fd"
};

firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.database().ref();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

const firebaseStorage = firebase.storage();

export { firebaseDB, firebase, firebaseStorage };
// export default firebase;

