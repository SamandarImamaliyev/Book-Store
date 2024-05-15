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
const messageRef = ref(database, "admins");

var btn = document.querySelector("#adminJoin");
var myName = document.querySelector("#username");
var myPassword = document.querySelector("#password");
var myError = document.querySelector("#Error");

(function () {
    'use strict'
    let pass = false;
    let status = false;

    const spacePattern = /^\S*$/; // bosluq olub-olmadigini yoxlayir
    const NumericPattern = /^([^0-9]*)$/; // reqem olmagini istemirik

    myName.addEventListener("keyup", controlName);
    myPassword.addEventListener("keyup", controlPassword);

    function controlName() {
        btn.disabled = true;
        var myErr = document.querySelector("#ErrUsername");

        if (myName.value.length == 0) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "You must add a name";
            return false;
        } else if (myName.value.length > 30) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "Your name must contain maximum 30 character";
            return false;
        } else if (!spacePattern.test(myName.value)) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "You cant add a gap in your name";
            return false;
        } else if (!NumericPattern.test(myName.value)) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "Your name can't be included a number";
            return false;
        } else {
            myName.classList.remove("is-invalid");
            status = true;
            checkButton();
            return true;
        }
    }

    function controlPassword() {
        btn.disabled = true;
        var myErr = document.querySelector("#ErrPassword");
        if (myPassword.value.length == 0) {
            myPassword.classList.remove("is-valid");
            myPassword.classList.add("is-invalid");
            myErr.textContent = "You must add an password";
            return false;
        } else if (!spacePattern.test(myPassword.value)) {
            myPassword.classList.remove("is-valid");
            myPassword.classList.add("is-invalid");
            myErr.textContent = "You cant add a gap in your password";
            return false;
        } else if (myPassword.value.length > 30) {
            myPassword.classList.remove("is-valid");
            myPassword.classList.add("is-invalid");
            myErr.textContent = "Your password must contain maximum 30 character";
            return false;
        } else {
            myPassword.classList.remove("is-invalid");
            pass = true;
            checkButton();
            return true;
        }
    }

    function checkButton() {
        if (status && pass && myName.value.trim().length > 3 && myPassword.value.trim().length > 3) {
            btn.disabled = false;
        }

    }
})();

btn.addEventListener("click", () => {
    checkAdmin();
})

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        checkAdmin();
    }
})

function checkAdmin() {
    onValue(messageRef, (snap) => {
        const data = snap.val();

        if ((myName.value == data.login) && (myPassword.value == data.password)) {
            localStorage.login = myName.value;
            window.location.href = './adminPanel.html';
        } else {
            myError.textContent = "Only admins have access !";
        }
    });
}