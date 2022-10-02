import { randomNumber, checkUserAuthenticated } from "../util";

const baseURL = `http://localhost:8000/pokemon`;

const heroku = "https://favorite-pokemon.herokuapp.com/";

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
  return fetch("http://localhost:8000/pokemon", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const postLikedPokemon = pokemon => {
  return fetch("http://localhost:8000/pokemon", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
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
  return fetch("http://localhost:8000/pokemon", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
  })
    .then(res => {
      if (res.ok) {
        return res;
      }
    })
    .catch(err => console.log(err));
};

export const deleteLikedPokemon = async id => {
  console.log("Id", id);
  const response = await fetch(`${baseURL}/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => {
      if (checkUserAuthenticated(data)) {
        return;
      }
      return;
    });
  console.log(response);
};

export const login = user => {
  return fetch("http://localhost:8000/login", {
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
  return fetch("http://localhost:8000/register", {
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
  return fetch("http://localhost:8000/pokemon/logout", { method: "POST" }).then(
    res => res
  );
};
