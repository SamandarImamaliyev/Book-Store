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
const joinUsRef = ref(database, "joinUs");


const jName = document.querySelector("#joinName");
const jEmail = document.querySelector("#joinEmail");
const joinBtn = document.querySelector("#joinBtn");



// check inputs

const spacePattern = /^\S*$/; // bosluq olub-olmadigini yoxlayir
const NumericPattern = /^([^0-9]*)$/; // reqem olmagini istemirik
const EmailPattern = /^([a-zA-Z0-9_\-?\.?]){3,}@([a-zA-Z]){3,}\.([a-zA-Z]){2,5}$/;

(function () {
    'use strict'

    jName.addEventListener("blur", controlName);
    jEmail.addEventListener("blur", controlEmail);

})();

function controlName() {
    var myJErr = document.querySelector("#ErrJName");
    if (jName.value.length == 0) {
        jName.classList.remove("is-valid");
        jName.classList.add("is-invalid");
        myJErr.textContent = "You must add a name";
        return false;
    } else if (jName.value.length < 3) {
        jName.classList.remove("is-valid");
        jName.classList.add("is-invalid");
        myJErr.textContent = "Your name must contain at least 3 character";
        return false;
    } else if (jName.value.length > 30) {
        jName.classList.remove("is-valid");
        jName.classList.add("is-invalid");
        myJErr.textContent = "Your name must contain maximum 30 character";
        return false;
    } else if (!NumericPattern.test(jName.value)) {
        jName.classList.remove("is-valid");
        jName.classList.add("is-invalid");
        myJErr.textContent = "Your name can't be included a number";
        return false;
    } else {
        jName.classList.remove("is-invalid");
        jName.classList.add("is-valid");
        return true;
    }
}
function controlEmail() {
    var myJErr = document.querySelector("#ErrJEmail");
    if (jEmail.value.length == 0) {
        jEmail.classList.remove("is-valid");
        jEmail.classList.add("is-invalid");
        myJErr.textContent = "You must add an email";
        return false;
    } else if (!spacePattern.test(jEmail.value)) {
        jEmail.classList.remove("is-valid");
        jEmail.classList.add("is-invalid");
        myJErr.textContent = "You cant add a gap in your email";
        return false;
    } else if (!EmailPattern.test(jEmail.value)) {
        jEmail.classList.remove("is-valid");
        jEmail.classList.add("is-invalid");
        myJErr.textContent = "Invalid email format";
        return false;
    } else if (jEmail.value.length > 40) {
        jEmail.classList.remove("is-valid");
        jEmail.classList.add("is-invalid");
        myJErr.textContent = "Your email must contain maximum 30 character";
        return false;
    } else {
        jEmail.classList.remove("is-invalid");
        jEmail.classList.add("is-valid");
        return true;
    }
}

function activeteButton() {
    if (controlName() && controlEmail()) {
        joinBtn.disabled = false;
    } else {
        joinBtn.disabled = true;
    }
}

document.addEventListener("keyup", (event) => {
    if (event.target.classList.contains("joinUs")) {
        activeteButton();
    }
})

// check inputs

joinBtn.addEventListener("click", () => {
    const dataObj = {
        fullName: jName.value,
        email: jEmail.value
    };
    push(joinUsRef, dataObj);

    jName.value = "";
    jEmail.value = "";
    jName.classList.remove("is-valid");
    jEmail.classList.remove("is-valid");
    joinBtn.disabled = true;
})