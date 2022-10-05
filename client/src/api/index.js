import { randomNumber } from "../util";

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
  // const response = authHeader();
  return fetch("/pokemon", {
    // credentials: "include",
    headers: authHeader(),
  })
    .then(res => res.json())
    .then(data => data);
};

export const postLikedPokemon = pokemon => {
  console.log("pokemon", pokemon);

  return fetch("/pokemon", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(pokemon),
  })
    .then(res => {
      console.log(res);
      if (res.status === 201) {
        return fetchLikedPokemon();
      }
    })

    .catch(err => err);
};

// headers: headers{
export const deleteSinglePokemon = dexnumber => {
  return fetch(`/pokemon/${dexnumber}`, {
    method: "DELETE",
    headers: authHeader(),
    // credentials: "include",
  })
    .then(res => {
      if (res.status === 201) {
        return fetchLikedPokemon();
      }
    })
    .catch(error => error);
};

export const clearLikedPokemon = async () => {
  return fetch("/pokemon", {
    method: "DELETE",
    credentials: "include",
    headers: authHeader(),
  })
    .then(res => {
      if (res.ok) {
        return res;
      }
    })
    .catch(err => console.log(err));
};

// };

export const login = user => {
  // console.log("user", user);
  // console.log("response ", response);
  // const token = localStorage.getItem("token");
  // console.log("token ", token);
  return fetch("/login", {
    method: "POST",

    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    });
};
export const signup = user => {
  return fetch("/register", {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
  })
    .then(res => res.json())
    .then(data => data);
};

export const logout = () => {
  // return fetch("/pokemon/logout", { method: "POST" }).then(res =>
  localStorage.removeItem("user");

  // );
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("uesr", user);
  if (user && user.accessToken) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:3000/",
      "x-access-token": user.accessToken,
    };
  } else return {};
};
