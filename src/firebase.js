// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCaX17zCbKCMf8E6WVSyNcO1GLWnacB0Rs",

  authDomain: "news-app-93434.firebaseapp.com",

  projectId: "news-app-93434",

  storageBucket: "news-app-93434.appspot.com",

  messagingSenderId: "260736867004",

  appId: "1:260736867004:web:d0cc3fefff782c355b0eb9"

};


// Initialize Firebase

const firebase = initializeApp(firebaseConfig)
export default firebase;