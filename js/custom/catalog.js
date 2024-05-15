import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    push,
    set
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

const bookFormRef = ref(database, "book");


let booksDatas = [];

function getBookDataFromDB() {
    onValue(bookFormRef, (snap) => {
        const data = snap.val();
        const searchArr = Object.values(data);
        searchArr.forEach((item) => {
            const bookData = {
                url: item.ImageUrl,
                bookName: item.bookName,
                authorName: item.authorName
            }
            booksDatas.push(bookData);
        });
        initializeSlider();
    });

}


const slider = document.querySelector(".slider");


window.addEventListener("load", getBookDataFromDB());

function initializeSlider() {
    let books = "";
    for (let book in booksDatas) {
        books += `<div class="slide" style="width: 18rem; height: 389px; padding: 3px 3px 0;">
              <img src="${booksDatas[book].url}" class="img-fluid"
                alt="image" style="height: 264px;">
              <br><br>
              <div>
                <h3>${booksDatas[book].bookName}</h3>
                <p>${booksDatas[book].authorName}</p>
              </div>
            </div>`;

        // books += ` <div class="card mx-3 slide" style="width: 18rem; height: 389px; padding: 3px 3px 0;">
        //     <img src="${booksDatas[book].url}" class="card-img-top" alt="..."
        //         style="height: 264px; object-fit: cover;">
        //     <div class="card-body text-center">
        //         <h5 class="card-title">${booksDatas[book].bookName}</h5>
        //         <h6 class="card-title">${booksDatas[book].authorName}</h6>
        //         <a href="#" class="btn btn-primary">Read more ...</a>
        //     </div>
        // </div>`
    }
    slider.innerHTML = books;
}