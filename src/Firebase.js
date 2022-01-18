import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1eXOwCwl9Jlr0P-ZpueOZ1NCVoTQnz2A",
    authDomain: "clone-c5504.firebaseapp.com",
    databaseURL: "https://clone-c5504-default-rtdb.firebaseio.com",
    projectId: "clone-c5504",
    storageBucket: "clone-c5504.appspot.com",
    messagingSenderId: "637998335403",
    appId: "1:637998335403:web:578624562352a4bf387eee",
    measurementId: "G-V7VZYVDCX5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db,auth}