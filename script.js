// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEqy8v9eQ_YVW0JfP-dxZqjX29Ec1KZYA",
  authDomain: "front-final-28e46.firebaseapp.com",
  projectId: "front-final-28e46",
  storageBucket: "front-final-28e46.appspot.com",
  messagingSenderId: "172983141541",
  appId: "1:172983141541:web:f1a5b659c42334fd61394c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Login Google
const auth = getAuth();
var provider = new GoogleAuthProvider();

// Sign In
async function signIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// Sign Out
async function sign_Out() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

// Start Cards
const characterEl = document.getElementById("character");
const nameFilter = document.getElementById("character_form");
const filmFilter = document.getElementById("film_filter");
const characterDefault =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMaKMfaIThnyQveWZiPs4S2oze-C_LwONQbZ-PLGtOpYxzI6dGW9JbnhUGWV1LjsfuKc&usqp=CAU";

// Pintado imágenes
const characterImages = {
  "Luke Skywalker":
    "https://i.pinimg.com/550x/af/36/59/af3659305d11a1201aeab2a267b7942e.jpg",
  "C-3PO":
    "https://i.pinimg.com/474x/25/a0/9e/25a09ec46ad6788f4cf806e86a2302d3.jpg",
  "R2-D2":
    "https://i.pinimg.com/originals/91/a3/a7/91a3a7659f90477992d87fcb2c8c520c.png",
  "Darth Vader":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEz8paXROSrSJn4L2uAGyjxIXpNgjZ_vNs4Q&usqp=CAU",
  "Leia Organa":
    "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/noticias-cine/star-wars-el-despertar-de-la-fuerza-primera-imagen-de-la-princesa-leia/57854425-1-esl-ES/Star-Wars-El-despertar-de-la-fuerza-Primera-imagen-de-la-Princesa-Leia.jpg",
  "Owen Lars": "https://www.rebelscum.com/2022/Joel_Edgerton_3.jpg",
  "Beru Whitesun lars":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXAJwZyZSGXN-eMIsO7FWaKBqX4u71L1KSC58iVUopr9eFe0UI_LAARckuTzsANrgCkb4&usqp=CAU",
  "R5-D4":
    "https://static.wikia.nocookie.net/star-wars-canon-extended/images/2/23/R5.jpg/revision/latest?cb=20160123232521",
  "Biggs Darklighter":
    "https://static.wikia.nocookie.net/worldsgreatestheroes/images/9/97/Biggs_Darklighter.jpg/revision/latest?cb=20140501151546",
  "Obi-Wan Kenobi":
    "https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2021/03/30/ewan-mcgregor-obi-wan-kenobi.jpeg",
};

// Función para obtener personajes filtrados

async function getCharacter(name) {
  let url = "https://swapi.dev/api/people/?search=";

  if (name) {
    url += `${name}`;
  }
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}

// Función para mostrar los personajes

async function displayCharacters(name) {
  let spinner = document.getElementById("spinner");
  const characters = await getCharacter(name);
  spinner.style = "display:none";
  characterEl.innerHTML = "";

  for (let character of characters) {
    const card = document.createElement("div");
    card.classList.add("character_card");

    const characterName = character.name;
    const characterImageURL =
      characterImages[characterName] || characterDefault;

    card.innerHTML = `
        <h2>${characterName}</h2>
        <img src="${characterImageURL}" alt="${characterName}">
        <p>Height: ${character.height}</p>
        <p>Gender: ${character.gender}</p>
        <p>Appearance: ${character.skin_color}</p>
        <p>Created: ${character.created}</p>
        <p>Films: ${character.films.length}</p>
      `;

    characterEl.appendChild(card);
  }
}

//Search Function

if (window.location.pathname === "/buscador.html") {
  displayCharacters();
  nameFilter.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(event.target.elements.name_filter.value);
    displayCharacters(event.target.elements.name_filter.value);
  });
}
// Auth observer
document.getElementById("sign_up").addEventListener("click", signIn);
document.getElementById("log_out").addEventListener("click", sign_Out);
let index = document.getElementById("index_web");
let loginDid = document.getElementById("login_did");

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("user_photo").src = user.photoURL;
    document.getElementById("user_name").innerHTML = user.displayName;
    
    start_button.style="display:"
    index.style = "display:none";
    loginDid.style = "display:";
  } else {
    start_button.style="display:"
    index.style = "display:";
    loginDid.style = "display:none";
  }
});
