import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyApe8Zcm3l4F7qAHFfFnMtr14aXkP-cTRo",
    authDomain: "book-store-70ea5.firebaseapp.com",
    databaseURL: "https://book-store-70ea5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "book-store-70ea5",
    storageBucket: "book-store-70ea5.appspot.com",
    messagingSenderId: "684576981487",
    appId: "1:684576981487:web:02b72a855c88ad68abb61a",
    measurementId: "G-6ZSB9TNM2N"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const aboutStoreRef = ref(database, "aboutStore");

const aboutStoreHeading = document.querySelector("#section-about h1");
const aboutStoreDesc = document.querySelector("#section-about p");
const aboutStoreImage = document.querySelector("#section-about img");

onValue(aboutStoreRef, (snap) => {
    const data = snap.val();
    const aboutStoreArr = Object.values(data);
    aboutStoreArr.forEach((item) => {
        aboutStoreHeading.textContent = item.title;
        aboutStoreDesc.textContent = item.description;
        aboutStoreImage.src = item.ImageUrl;
    });

});