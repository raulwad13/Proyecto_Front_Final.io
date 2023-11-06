const characterEl = document.getElementById("character");
const nameFilter = document.getElementById("name_filter");
const filmFilter = document.getElementById("film_filter");

// Call API.

async function getCharacter(name, films) {
  let url = "https://swapi.dev/api/people";

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  return data.results;
}
getCharacter();

// Print cards

async function displayCharacters(name, films) {
  // obtener los personajes filtrados
  const characters = await getCharacter(name, films);

  // renderizar los personajes
  for (let character of characters) {
    const card = document.createElement("div");
    card.classList.add("character_card");

    //   console.log("Nombre del personaje: " + character.name);
    card.innerHTML = `

        <h2>${character.name}</h2>
        <p>Heigth: ${character.height}</p>
        <p>Gender: ${character.films}</p>
        <p>Appearance: ${character.skin_color}</p>
        <p>Created: ${character.created}</p>
        <p>Films: ${character.films}</p>

        `;


        characterEl.appendChild(card);
  }
}
displayCharacters();
