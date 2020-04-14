import firebase from 'firebase/app';
import 'firebase/storage';

//Firebase DB Credentials
var firebaseConfig = {
    apiKey: "AIzaSyCDNrNjm3fS-05VSm9RCttL3qZsU1fhTnE",
    authDomain: "info3604db.firebaseapp.com",
    databaseURL: "https://info3604db.firebaseio.com",
    projectId: "info3604db",
    storageBucket: "info3604db.appspot.com",
    messagingSenderId: "1005038657661",
    appId: "1:1005038657661:web:a162126ee7d6c6eec09114",
    measurementId: "G-FF92QR5HPJ"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Access the storage bucket within Firebase
  const storage = firebase.storage();

  export{
    storage, firebase as default
  }
