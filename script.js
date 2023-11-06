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
  
      console.log("Nombre del personaje: " + character.name);
    card.innerHTML =
  }
}
displayCharacters();
