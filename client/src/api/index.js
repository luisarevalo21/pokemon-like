import { randomNumber } from "../util";

export const fetchPokemon = async (value = null) => {
  let pokemonNumber = null;

  if (value) {
    pokemonNumber = value;
  } else pokemonNumber = randomNumber();
  // console.log("value", value);
  // console.log("poekmon number", pokemonNumber);
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
    .then(res => res.json())
    .then(data => {
      let type2 = data.types.length === 1 ? null : data.types[1].type.name;
      // console.log("data", data);

      return {
        name: data.name,
        image: data.sprites.other["official-artwork"]["front_default"],
        dexnumber: data.id,
        type1: data.types[0].type.name,
        type2: type2,
      };
    })
    .catch(error => error);
};
export const fetchPokemonSpecies = async (value = null) => {
  let pokemonNumber = null;
  if (value) {
    pokemonNumber = value;
  } else pokemonNumber = randomNumber();
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);

      // const result = fetchPokemonEvolutionChain(data["evolution_chain"]);

      return {
        pokedexEntry: data["flavor_text_entries"][0]["flavor_text"],
        evolutionLink: data["evolution_chain"],
      };
    })
    .catch(error => error);
};
export const fetchPokemonEvolutionChain = async pokemon => {
  // console.log("fetch pokemon chain called", pokemon);
  const { url } = pokemon.evolutionLink;

  const chain = [];
  // console.log("url", url);
  await fetch(`${url}`)
    .then(res => res.json())
    .then(data => {
      // console.log("data", data);
      if (data.chain["evolves_to"].length === 0) {
        chain.push({
          species: data.chain.species,
        });
      } else if (data.chain["evolves_to"].length === 1) {
        chain.push(
          { species: data.chain.species },
          { species: data.chain["evolves_to"][0].species },
          { species: data.chain["evolves_to"][0]["evolves_to"][0].species }
        );
      }
      // chain.push(
      //   { species: data.chain.species },
      //   { species: data.chain["evolves_to"] },
      //   { species: data.chain["evolves_to"][0]["evolves_to"][0] }
      // );
    });

  const result = await Promise.all(
    chain.map(evo => fetchPokemon(evo.species.name))
  );
  return result;
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
