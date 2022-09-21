import { randomNumber } from "../util";

const baseURL = `http://localhost:8000/pokemon`;

export const clearLikedPokemon = async () => {
  fetch(baseURL, { method: "DELETE" })
    .then(res => {
      if (res.ok) {
        return res;
      }
    })
    .catch(err => console.log(err));
};

export const deleteLikedPokemon = async id => {
  console.log("Id", id);
  const response = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
  console.log(response);
};

export const fetchPokemon = async () => {
  const pokemonNumber = randomNumber();
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
    .then(res => res.json())
    .then(data => {
      return {
        name: data.name,
        image: data.sprites.other["official-artwork"]["front_default"],
        dexnumber: data.id,
      };
    })
    .catch(error => console.log(error));
};

export const fetchLikedPokemon = async (pokemon = null) => {
  return fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      if (pokemon) return [...data, pokemon];
      else return [...data];
    });
};

export const postLikedPokemon = pokemon => {
  const { id } = pokemon;
  return fetch(`http://localhost:8000/pokemon/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  })
    .then(res => {
      if (res.ok) {
        return fetchLikedPokemon();
      }
    })
    .catch(err => console.log(err));
};

export const deleteSinglePokemon = dexnumber => {
  return fetch(`http://localhost:8000/pokemon/${dexnumber}`, {
    method: "DELETE",
  })
    .then(res => {
      if (res.ok) {
        return fetchLikedPokemon();
      }
    })
    .catch(error => console.log(error));
};
