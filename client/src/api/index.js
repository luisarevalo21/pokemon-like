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
      // console.log("data for cascoon", data);
      // console.log("data", data);
      // if (data.chain["evolves_to"].length === 0) {
      //   chain.push({
      //     species: data.chain.species,
      //   });
      // } else if (data.chain["evolves_to"].length === 1) {
      //   chain.push(
      //     { species: data.chain.species },
      //     { species: data.chain["evolves_to"][0].species },
      //     { species: data.chain["evolves_to"][0]["evolves_to"][0].species }
      //   );
      // }
      // chain.push(
      //   { species: data.chain.species },
      //   { species: data.chain["evolves_to"] },
      //   { species: data.chain["evolves_to"][0]["evolves_to"][0] }
      // );
      chain.push({
        species: data.chain.species,
      });

      //first evolution
      if (data.chain["evolves_to"].length !== 0) {
        if (data.chain["evolves_to"].length === 2) {
          chain[0].evolvesTo = [];
          data.chain.evolves_to.forEach(pokemonEvo => {
            // console.log("pokemonevo", pokemonEvo.species.name);

            chain[0].evolvesTo.push({
              trigger: pokemonEvo.evolution_details[0].trigger.name,
              item: pokemonEvo.evolution_details[0].held_item,
              species: pokemonEvo.species,
            });

            // if (pokemonEvo.evolution_details[0].trigger.name === "trade") {
            //   chain[0].evolutionTrigger.push({
            //     trigger: pokemonEvo.evolution_details[0].trigger.name,
            //     pokemonEvo: pokemonEvo.species.name,
            //     item: pokemonEvo.evolution_details[0].held_item.name,
            //   });
            // } else
            // chain[0].evolutionTrigger.push({
            //   trigger: pokemonEvo.evolution_details[0].trigger.name,
            //   pokemonEvo: pokemonEvo.species.name,
            // });
          });
        } else {
          data.chain.evolves_to.forEach(pokemonEvo => {
            console.log("pokemonevo", pokemonEvo.species.name);
            chain.push({
              species: pokemonEvo.species,
            });
            chain[0].evolvesTo = [
              {
                trigger: pokemonEvo.evolution_details[0].trigger.name,
                species: pokemonEvo.species.name,
              },
            ];
          });
        }
      }

      //second evolution
      console.log(
        "data.chain[][0]",
        data.chain["evolves_to"][0].evolves_to.length
      );

      if (data.chain["evolves_to"][0].evolves_to.length !== 0) {
        chain[1].evolvesTo = [];
        data.chain.evolves_to[0].evolves_to.forEach(pokemonEvo => {
          console.log("pokemonevo", pokemonEvo.species.name);

          chain[1].evolvesTo.push({
            trigger: pokemonEvo.evolution_details[0].trigger.name,
            item: pokemonEvo.evolution_details[0].held_item,
            species: pokemonEvo.species,
          });
        });
      }

      // console.log(
      //   " pokemonEvo.evolution_details[0].trigger.name;",
      //   pokemonEvo.evolution_details[0].trigger.name
      // );

      // chain[length - 1].evolutionTrigger =
      //   pokemonEvo.evolution_details[0].trigger.name;
      // });

      // console.log("chain 1", chain[1].evolvesTo[0].species);
      console.log("chain 1", chain);
      if (chain.length !== 1) {
        if (chain[1].evolvesTo.length === 1) {
          chain.push({
            species: chain[1].evolvesTo[0].species,
            evolvesTo: [],
          });
        }
      } else {
        chain[0].evolvesTo.forEach(pokeEvo => {
          chain.push({
            species: pokeEvo.species,
            evolvesTo: [],
          });
        });
      }
      console.log("chain", chain);
      // if (data.chain["evolves_to"][0]["evolves_to"].length !== 0) {
      //   // data.chain["evolves_to"][0]["evolves_to"];
      //   const length = chain.length;
      //   data.chain.evolves_to[0].evolves_to.forEach((pokemonEvo, index) => {
      //     chain.push({
      //       species: pokemonEvo.species,
      //     });

      //     chain[length - 1].evolutionTrigger =
      //       pokemonEvo.evolution_details[0].trigger.name;
      //   });
      // }
    });

  // console.log("isnide second evolution");
  // data.chain.evolves_to["evolves_to"][0].forEach((pokemonEvo, index) => {
  //   chain.push({
  //     species: pokemonEvo.species,
  //   });
  //   chain[index].evolutionTrigger =
  //     pokemonEvo.evolution_details[0].trigger.name;
  // });

  // data.chain.evolves_to.map(pokemonEvo => {
  //   return {
  //     species: pokemonEvo.species.name,
  //   };
  // });

  // chain.push({ species: data.chain["evolves_to"][0].species });

  // if (data.chain["evolves_to"][0]["evolves_to"].length !== 0) {
  //   chain.push({
  //     species: data.chain["evolves_to"][0]["evolves_to"][0].species,
  //   });
  // }

  const result = await Promise.all(
    chain.map(async evo => {
      const res = await fetchPokemon(evo.species.name);
      return {
        ...res,
        evolvesTo: evo.evolvesTo,
      };
      // fetchPokemon(evo.species.name), evolutionTrigger: evo,})
    })
  );
  console.log("result", result);
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
