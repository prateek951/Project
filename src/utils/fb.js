import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDjF1kIzieer_p8oR-VJWOGh_zq8Kt_sog",
    authDomain: "recipes-c68ad.firebaseapp.com",
    databaseURL: "https://recipes-c68ad.firebaseio.com",
    projectId: "recipes-c68ad",
    storageBucket: "recipes-c68ad.appspot.com",
    messagingSenderId: "87010987986"
  };
const fbApp = firebase.initializeApp(config);
fbApp.firestore().settings({ timestampsInSnapshots: true});

//export firestore database
export default fbApp.firestore();