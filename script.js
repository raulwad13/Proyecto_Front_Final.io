const characterEl = document.getElementById("character");
const nameFilter = document.getElementById("name_filter");
const filmFilter = document.getElementById("film_filter");

// Pintado imágenes
const characterImages = {
    "Luke Skywalker": "https://i.pinimg.com/550x/af/36/59/af3659305d11a1201aeab2a267b7942e.jpg",
    "C-3PO":"https://i.pinimg.com/474x/25/a0/9e/25a09ec46ad6788f4cf806e86a2302d3.jpg",
    "R2-D2":"https://i.pinimg.com/originals/91/a3/a7/91a3a7659f90477992d87fcb2c8c520c.png",
    "Darth Vader":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEz8paXROSrSJn4L2uAGyjxIXpNgjZ_vNs4Q&usqp=CAU",
    "Leia Organa":"https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/noticias-cine/star-wars-el-despertar-de-la-fuerza-primera-imagen-de-la-princesa-leia/57854425-1-esl-ES/Star-Wars-El-despertar-de-la-fuerza-Primera-imagen-de-la-Princesa-Leia.jpg",
    "Owen Lars":"https://www.rebelscum.com/2022/Joel_Edgerton_3.jpg",
    "Beru Whitesun lars":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXAJwZyZSGXN-eMIsO7FWaKBqX4u71L1KSC58iVUopr9eFe0UI_LAARckuTzsANrgCkb4&usqp=CAU",
    "R5-D4":"https://static.wikia.nocookie.net/star-wars-canon-extended/images/2/23/R5.jpg/revision/latest?cb=20160123232521",
    "Biggs Darklighter":"https://static.wikia.nocookie.net/worldsgreatestheroes/images/9/97/Biggs_Darklighter.jpg/revision/latest?cb=20140501151546",
    "Obi-Wan Kenobi":"https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2021/03/30/ewan-mcgregor-obi-wan-kenobi.jpeg",
  };
  
// Función para obtener personajes filtrados

async function getCharacter(name) {
  let url = "https://swapi.dev/api/people/?";

  if (name) {
    url += `name=${name}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data.results;
};

// Función para mostrar los personajes

async function displayCharacters(name) {
    const characters = await getCharacter(name);
  
    characterEl.innerHTML = "";
  
    for (let character of characters) {
      const card = document.createElement("div");
      card.classList.add("character_card");
  
      const characterName = character.name;
      const characterImageURL = characterImages[characterName] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMaKMfaIThnyQveWZiPs4S2oze-C_LwONQbZ-PLGtOpYxzI6dGW9JbnhUGWV1LjsfuKc&usqp=CAU";
  
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

displayCharacters();

nameFilter.addEventListener("input", (event) => {
  displayCharacters(event.target.name_filter.value);
});