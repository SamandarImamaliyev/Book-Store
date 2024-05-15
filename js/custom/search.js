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
const searchRef = ref(database, "book");

const slider = document.querySelector(".book-slider");
const search = document.querySelector("#searchInput");
const btnSearch = document.querySelector("#btnSearch");
const searchedBookDesc = document.querySelector("#searchedBookDesc");
const descriptionTitle = document.querySelector(".searchedBookDesc");
const bookImage = document.querySelector("#bookImage");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const notFound = document.querySelector(".notFound");

const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");


let relevantBooks = [];

function searchBook() {
    relevantBooks = [];
    const book = search.value;

    onValue(searchRef, (snap) => {
        const data = snap.val();
        const searchArr = Object.values(data);
        searchArr.forEach((item) => {
            if ((item.bookName.trim().toLowerCase() == book.trim().toLowerCase()) || (item.authorName.trim().toLowerCase() == book.trim().toLowerCase())) {
                const bookData = {
                    url: item.ImageUrl,
                    desc: item.description,
                    bookName: item.bookName,
                    authorName: item.authorName
                }
                relevantBooks.push(bookData);
            }
        });

        if (relevantBooks.length == 0) {
            bookIsNotAvailbale();
        } else {
            getBookInformation();
        }

    });
}

function bookIsNotAvailbale() {
    descriptionTitle.classList.add("changeSearchVisibility");
    slider.classList.add("changeSearchVisibility");
    slider.classList.remove("d-flex");
    notFound.classList.remove("invisibleNotFound");
    notFound.classList.add("d-flex");
}

function getBookInformation() {
    bookImage.src = relevantBooks[0].url;
    searchedBookDesc.textContent = relevantBooks[0].desc;
    bookTitle.textContent = relevantBooks[0].bookName;
    bookAuthor.textContent = relevantBooks[0].authorName;
    let action = 0;

    for (let i = 1; i < relevantBooks.length; i++) {
        leftArrow.addEventListener("click", () => {
            if (action < relevantBooks.length - 1) {
                bookImage.src = relevantBooks[i].url;
                searchedBookDesc.textContent = relevantBooks[i].desc;
                bookTitle.textContent = relevantBooks[i].bookName;
                bookAuthor.textContent = relevantBooks[i].authorName;
                action++;
            }

        });
        rightArrow.addEventListener("click", () => {
            if (action > 0) {
                bookImage.src = relevantBooks[action - 1].url;
                searchedBookDesc.textContent = relevantBooks[action - 1].desc;
                bookTitle.textContent = relevantBooks[action - 1].bookName;
                bookAuthor.textContent = relevantBooks[action - 1].authorName;
                action--;
            }
        })
    }
    notFound.classList.add("invisibleNotFound");
    notFound.classList.remove("d-flex");
    descriptionTitle.classList.remove("changeSearchVisibility");
    slider.classList.remove("changeSearchVisibility");
    slider.classList.add("d-flex");
}

btnSearch.addEventListener("click", () => {
    searchBook();
})


window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        searchBook();
    }
})
// ${item.description.length > 100 ? item.description.slice(0, 99) + "..." : item.description}