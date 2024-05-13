import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    push,
    set,
    get,
    update,
    remove
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
const contactRef = ref(database, "contact");

var myName = document.querySelector("#name");
var myEmail = document.querySelector("#email");
var myPhone = document.querySelector("#phone");
var myAddress = document.querySelector("#address");
var myMessage = document.querySelector("#message");
var myBtn = document.querySelector("#btnSend");

// check inputs
(function () {
    'use strict'

    if (myMessage.value.length == 0) {
        myBtn.disabled = true;
    }

    const spacePattern = /^\S*$/; // bosluq olub-olmadigini yoxlayir
    const NumericPattern = /^([^0-9]*)$/; // reqem olmagini istemirik
    const EmailPattern = /^([a-zA-Z0-9_\-?\.?]){3,}@([a-zA-Z]){3,}\.([a-zA-Z]){2,5}$/;
    const OnlyNumberPattern = /^[0-9]*$/; // reqem olmasini isteyirik

    myName.addEventListener("blur", controlName);
    myEmail.addEventListener("blur", controlEmail);
    myPhone.addEventListener("blur", controlPhone);
    myMessage.addEventListener("blur", controlMessage);

    function controlName() {
        var myErr = document.querySelector("#ErrName");
        if (myName.value.length == 0) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "You must add a name";
            return false;
        } else if (myName.value.length < 3) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "Your name must contain at least 3 character";
            return false;
        } else if (myName.value.length > 30) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "Your name must contain maximum 30 character";
            return false;
        } else if (!NumericPattern.test(myName.value)) {
            myName.classList.remove("is-valid");
            myName.classList.add("is-invalid");
            myErr.textContent = "Your name can't be included a number";
            return false;
        } else {
            myName.classList.remove("is-invalid");
            myName.classList.add("is-valid");
            return true;
        }
    }

    function controlEmail() {
        var myErr = document.querySelector("#ErrEmail");
        if (myEmail.value.length == 0) {
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myErr.textContent = "You must add an email";
            return false;
        } else if (!spacePattern.test(myEmail.value)) {
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myErr.textContent = "You cant add a gap in your email";
            return false;
        } else if (!EmailPattern.test(myEmail.value)) {
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myErr.textContent = "Invalid email format";
            return false;
        } else if (myEmail.value.length > 40) {
            myEmail.classList.remove("is-valid");
            myEmail.classList.add("is-invalid");
            myErr.textContent = "Your email must contain maximum 30 character";
            return false;
        } else {
            myEmail.classList.remove("is-invalid");
            myEmail.classList.add("is-valid");
            return true;
        }
    }

    function controlPhone() {
        var myErr = document.querySelector("#ErrPhone");
        if (myPhone.value.length == 0) {
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myErr.textContent = "You must add a phone number";
            return false;
        } else if (!spacePattern.test(myPhone.value)) {
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myErr.textContent = "You cant add a gap in your phone number";
            return false;
        } else if (!OnlyNumberPattern.test(myPhone.value)) {
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myErr.textContent = "Phone number must contain only digits ( example: 050xxxxxxx )";
            return false;
        } else if (myPhone.value.length != 10) {
            myPhone.classList.remove("is-valid");
            myPhone.classList.add("is-invalid");
            myErr.textContent = "Phone number must contain 10 digits ( example: 050xxxxxxx )";
            return false;
        } else {
            myPhone.classList.remove("is-invalid");
            myPhone.classList.add("is-valid");
            return true;
        }
    }

    function controlMessage() {
        var myErr = document.querySelector("#ErrMessage");
        if (myMessage.value.length == 0) {
            myMessage.classList.remove("is-valid");
            myMessage.classList.add("is-invalid");
            myErr.textContent = "You must add a message";
            return false;
        } else if (myMessage.value.length < 10) {
            myMessage.classList.remove("is-valid");
            myMessage.classList.add("is-invalid");
            myErr.textContent = "Message must contain at least 10 character";
            return false;
        } else {
            myMessage.classList.remove("is-invalid");
            myMessage.classList.add("is-valid");
            return true;
        }
    }

    myMessage.addEventListener("keyup", function () {
        document.getElementById("current-character").textContent = myMessage.value.length;

        if (myMessage.value.length >= 10) {
            myBtn.disabled = false;
        } else {
            myBtn.disabled = true;
        }
    });

})();

// check inputs

myBtn.addEventListener("click", () => {
    const dataObj = {
        fullName: myName.value,
        email: myEmail.value,
        phone: myPhone.value,
        address: myAddress.value,
        message: myMessage.value
    };
    push(contactRef, dataObj);

    myName.value = "";
    myEmail.value = "";
    myPhone.value = "";
    myAddress.value = "";
    myMessage.value = "";
    document.getElementById("current-character").textContent = 0;
    myName.classList.remove("is-valid");
    myEmail.classList.remove("is-valid");
    myPhone.classList.remove("is-valid");
    myMessage.classList.remove("is-valid");
    myBtn.disabled = true;
})