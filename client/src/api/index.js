import { randomNumber } from "../util";

const baseURL = "pokemon";

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
    .catch(error => error);
};

export const fetchLikedPokemon = async (pokemon = null) => {
  return fetch(baseURL, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
  })
    .then(res => res.json())
    .then(data => data);
};

export const postLikedPokemon = pokemon => {
  return fetch(baseURL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
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
  return fetch(baseURL / dexnumber, {
    method: "DELETE",
    credentials: "include",
  })
    .then(res => {
      if (res.ok) {
        return fetchLikedPokemon();
      }
    })
    .catch(error => console.log(error));
};

export const clearLikedPokemon = async () => {
  fetch(baseURL, { method: "DELETE" }, { credentials: "include" })
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

export const login = user => {
  return fetch("login", {
    method: "POST",

    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      // console.log("response", data);
      return data;
    });
};
export const signup = user => {
  return fetch("register", {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
  })
    .then(res => res.json())
    .then(data => data);
};

export const logout = () => {
  return fetch("logout", { method: "POST" }).then(res => res);
};
