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
const bookFormRef = ref(database, "book");
const contactFormRef = ref(database, "contact");
const joinUsRef = ref(database, "joinUs");
const aboutStoreRef = ref(database, "aboutStore");



const search = document.querySelector("#search");
const infos = document.querySelector("#infos");
const bookName = document.querySelector("#bookName");
const author = document.querySelector("#author");
const imageUrl = document.querySelector("#imageUrl");
const description = document.querySelector("#description");
const bookType = document.querySelector("#bookType");
const title = document.querySelector("#title");
const descriptionForStore = document.querySelector("#descriptionForStore");
const imageUrl2 = document.querySelector("#imageUrl2");
const btnAdd = document.querySelector("#addButton");
const btnAddInfo = document.querySelector("#addInfoButton");
const booksBody = document.querySelector("#booksBody");
const contactUsBody = document.querySelector("#contactUsBody");
const joinUsBody = document.querySelector("#joinUsBody");


let serachTimer = null;
search.addEventListener("input", (e) => {
    clearTimeout(serachTimer);
    infos.innerHTML = "";
    window.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            fillInfo(search.value);
            infos.classList.add("changeVisibility");
        }
    })
    serachTimer = setTimeout(() => {
        loadInformation(e.target.value);
    }, 50);
});

async function loadInformation(text) {
    let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
    let response = await request.json();
    let arr = response.items;
    if (Array.isArray(arr)) {
        infos.classList.remove("changeVisibility");
        arr.forEach((item) => {
            infos.innerHTML += `<button class="btn text-start">${item.volumeInfo.title}</button>`;
        });
        chooseBook();
    } else {
        infos.classList.add("changeVisibility");
    }
}

function chooseBook() {
    const buttons = document.querySelectorAll("#infos button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            search.value = button.textContent;
            fillInfo(button.textContent.trim());
            infos.classList.add("changeVisibility");
        })
    })
}


function getBookDatasFromDB() {
    onValue(bookFormRef, (snap) => {
        const data = snap.val();
        const booksArr = Object.values(data);
        console.log(booksArr);
        booksArr.forEach((item, index) => {
            booksBody.innerHTML += `<tr>
            <td>${(index + 1)}</td>
            <td>${item.bookName}</td>
            <td>${item.description}</td>
            <td>${item.bookType}</td>
            <td>${item.authorName}</td>
        </tr> `;
        });

    });
}

function getContactDatasFromDB() {
    onValue(contactFormRef, (snap) => {
        const data = snap.val();
        const contactsArr = Object.values(data);
        console.log(contactsArr);
        contactsArr.forEach((item, index) => {
            contactUsBody.innerHTML += `<tr>
            <td>${(index + 1)}</td>
            <td>${item.fullName}</td>
            <td>${item.address}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
        </tr> `;
        });

    });
}

function getJoinUsDatasFromDB() {
    onValue(joinUsRef, (snap) => {
        const data = snap.val();
        const joinUsArr = Object.values(data);
        console.log(joinUsArr);
        joinUsArr.forEach((item, index) => {
            joinUsBody.innerHTML += `<tr>
            <td>${(index + 1)}</td>
            <td>${item.fullName}</td>
            <td>${item.email}</td>
        </tr> `;
        });

    });
}
// fill book form starts
async function fillInfo(text) {
    let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
    let response = await request.json();
    let arr = response.items;
    console.log(arr)
    if (Array.isArray(arr)) {
        bookName.value = arr[0].volumeInfo.title;
        for (let i = 0; i < arr[0].volumeInfo.authors.length; i++) {
            author.value = arr[0].volumeInfo.authors[i] + " ";
        }
        imageUrl.value = arr[0].volumeInfo.imageLinks.thumbnail;
        description.value = arr[0].volumeInfo.description;

        if (arr[0].volumeInfo.categories) {
            for (let i = 0; i < arr[0].volumeInfo.categories.length; i++) {
                bookType.value = arr[0].volumeInfo.categories[i] + " ";
            }
        }

        if (bookName.value.trim().length > 0 && author.value.trim().length > 0 && imageUrl.value.trim().length > 0) {
            btnAdd.disabled = false;

            btnAdd.addEventListener("click", () => {
                const bookFormObj = {
                    bookName: bookName.value,
                    authorName: author.value,
                    ImageUrl: imageUrl.value,
                    description: description.value,
                    bookType: bookType.value
                };
                push(bookFormRef, bookFormObj);
                bookName.value = "";
                author.value = "";
                imageUrl.value = "";
                description.value = "";
                bookType.value = "";
                search.value = "";
                btnAdd.disabled = true;
                booksBody.innerHTML = "";
                getBookDatasFromDB();
            })
            // // about store
            // title.value = arr[0].volumeInfo.title;
            // descriptionForStore.value = arr[0].volumeInfo.description;
            // imageUrl2.value = arr[0].volumeInfo.imageLinks.thumbnail;
            // btnAddInfo.disabled = false;
            // // about store
            // btnAddInfo.addEventListener("click", () => {
            //     const aboutStoreObj = {
            //         title: title.value,
            //         description: descriptionForStore.value,
            //         ImageUrl: imageUrl2.value
            //     };
            //     push(aboutStoreRef, aboutStoreObj);
            //     title.value = "";
            //     descriptionForStore.value = "";
            //     imageUrl2.value = "";
            //     btnAddInfo.disabled = true;
            // })
        }
    }
}

window.onload = () => {
    getBookDatasFromDB();
    getContactDatasFromDB();
    getJoinUsDatasFromDB()
};

// fill book form ends


