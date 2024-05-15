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
const aboutImageUrl = document.querySelector("#imageUrl2");
const btnAdd = document.querySelector("#addButton");
const btnAddInfo = document.querySelector("#addInfoButton");
const booksBody = document.querySelector("#booksBody");
const contactUsBody = document.querySelector("#contactUsBody");
const joinUsBody = document.querySelector("#joinUsBody");

window.addEventListener("load", () => {
    if (!(localStorage.login == "admin")) {
        window.location.href = './adminLogin.html';
    } else {
        localStorage.removeItem("login");
    }
});


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

let booksCount;
function getBookDatasFromDB() {

    onValue(bookFormRef, (snap) => {
        const data = snap.val();
        const booksIdsFromDB = Object.keys(data);
        booksIdsFromDB.map((id, index) => {
            const bookInformation = data[id];
            booksBody.innerHTML += `<tr>
            <td>${(index + 1)}</td>
            <td>${bookInformation.bookName}</td>
            <td id="desc">${bookInformation.description.length > 100 ? bookInformation.description.slice(0, 99) + "..." : bookInformation.description}</td>
            <td>${bookInformation.bookType}</td>
            <td>${bookInformation.authorName}</td>
            <td> <button type="button" id="${id}" class="btn btn-outline-danger d-flex justify-content-around delete" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash3"></i>Delete</button></td>
        </tr> `;
        })

        booksCount = booksIdsFromDB.length;
    });
}

function getContactDatasFromDB() {
    onValue(contactFormRef, (snap) => {
        const data = snap.val();
        const contactsArr = Object.values(data);
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
        joinUsArr.forEach((item, index) => {
            joinUsBody.innerHTML += `<tr>
            <td>${(index + 1)}</td>
            <td>${item.fullName}</td>
            <td>${item.email}</td>
        </tr> `;
        });

    });
}

async function fillInfo(text) {

    let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
    let response = await request.json();
    let arr = response.items;

    if (Array.isArray(arr)) {
        bookName.value = arr[0].volumeInfo.title;
        for (let i = 0; i < arr[0].volumeInfo.authors.length; i++) {
            author.value = arr[0].volumeInfo?.authors[i] + " ";
        }
        imageUrl.value = arr[0].volumeInfo.imageLinks.thumbnail;
        description.value = arr[0].volumeInfo.description;

        if (arr[0].volumeInfo.categories) {
            for (let i = 0; i < arr[0].volumeInfo.categories.length; i++) {
                bookType.value = arr[0].volumeInfo.categories[i] + " ";
            }
        }

        sendDataToDB();
    }
}

function sendDataToDB() {
    if (bookName.value.trim().length > 0 && author.value.trim().length > 0 && imageUrl.value.trim().length > 0) {
        btnAdd.disabled = false;

        btnAdd.addEventListener("click", () => {

            const bookFormObj = {
                id: (booksCount + 1),
                bookName: bookName.value,
                authorName: author.value,
                ImageUrl: imageUrl.value,
                description: description.value,
                bookType: bookType.value
            };

            if (bookName.value.trim().length == 0 || author.value.trim().length == 0 || imageUrl.value.trim().length == 0) {
                return;
            } else {
                push(bookFormRef, bookFormObj);

            }

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
    }
}

document.addEventListener("click", (event) => {
    deleteData(event);
})

function deleteData(event) {
    if (event.target.classList.contains("delete")) {
        document.querySelector("#confirmDelete").addEventListener("click", () => {
            const deleteBookRef = ref(database, `book/${event.target.id}`);
            set(deleteBookRef, null);
            booksBody.innerHTML = "";
            getBookDatasFromDB();
        })
    }
}

document.addEventListener("keyup", () => {
    if (title.value.length > 10 && descriptionForStore.value.length > 10 && aboutImageUrl.value.length > 10) {
        btnAddInfo.disabled = false;
    }
})


btnAddInfo.addEventListener("click", () => {
    const aboutStoreObj = {
        title: title.value,
        description: descriptionForStore.value,
        ImageUrl: aboutImageUrl.value
    };
    push(aboutStoreRef, aboutStoreObj);
    title.value = "";
    descriptionForStore.value = "";
    aboutImageUrl.value = "";
    btnAddInfo.disabled = true;
})

window.onload = () => {
    getBookDatasFromDB();
    getContactDatasFromDB();
    getJoinUsDatasFromDB()
};



