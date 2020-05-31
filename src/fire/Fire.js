import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDY-tyiqqrHKe-2xE1GRP8-qmelr1SwmFU",
    authDomain: "body-soft.firebaseapp.com",
    databaseURL: "https://body-soft.firebaseio.com",
    projectId: "body-soft",
    storageBucket: "body-soft.appspot.com",
    messagingSenderId: "762940100621",
    appId: "1:762940100621:web:f67269b911c300de2b8544",
    measurementId: "G-E47R44VDQF"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;