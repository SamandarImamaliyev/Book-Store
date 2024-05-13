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
const searchRef = ref(database, "book");

const search = document.querySelector("#searchInput");
const btnSearch = document.querySelector("#btnSearch");
const carusel = document.querySelector("#carusel");
const searchedBookDesc = document.querySelector("#searchedBookDesc");

function searchBook() {
    const book = search.value;

    carusel.innerHTML = "";
    onValue(searchRef, (snap) => {
        const data = snap.val();
        const searchArr = Object.values(data);
        searchArr.forEach((item) => {
            if ((item.bookName.trim().toLowerCase() == book.trim().toLowerCase()) || (item.authorName.trim().toLowerCase() == book.trim().toLowerCase())) {
                carusel.innerHTML += `<div class="carousel-item active" style="display: flex; justify-content: center; align-items: center;">
                                    <img src="${item.ImageUrl}" class="w-50" alt="...">
                                    </div>`;
                searchedBookDesc.textContent = `${item.description}`;
            }
        });

    });
}
btnSearch.addEventListener("click", () => {
    searchBook();
})


window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        searchBook();
    }
})
