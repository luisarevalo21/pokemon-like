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
  return fetch(heroku + "pokemon", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
      "Access-Control-Allow-Origin": heroku,
    },
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const postLikedPokemon = pokemon => {
  return fetch(heroku + "pokemon", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
      "Access-Control-Allow-Origin": heroku,
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
  return fetch(`${heroku}/pokemon/${dexnumber}`, {
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
  return fetch(heroku + "/pokemon", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",

      "Access-Control-Allow-Origin": heroku,
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
  const response = await fetch(`${heroku}/${id}`, { method: "DELETE" })
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
  return fetch(heroku + "login", {
    method: "POST",

    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
      "Access-Control-Allow-Origin": heroku,
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
  return fetch(heroku + "register", {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
      "Access-Control-Allow-Origin": heroku,
    },
  })
    .then(res => res.json())
    .then(data => data);
};

export const logout = () => {
  return fetch(heroku + "pokemon/logout", { method: "POST" }).then(res => res);
};
