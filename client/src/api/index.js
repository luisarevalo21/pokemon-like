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

const fetchPokemonDetails = async pokemon => {
  console.log("pokemon", pokemon);
  const pokemonName = pokemon.name;
  console.log(pokemonName);

  const details = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  )
    .then(res => res.json())
    .then(data => {
      console.log("data", data);

      let type2 = data.types.length === 1 ? null : data.types[1].type.name;

      return {
        name: data.name,
        image: data.sprites.other["official-artwork"]["front_default"],
        dexnumber: data.id,
        type1: data.types[0].type.name,
        type2: type2,
      };
    });
  if (pokemon.evolvesTo.length !== 0) {
    details.evolvesTo = await Promise.all(
      pokemon.evolvesTo.map(async evo => await fetchPokemonDetails(evo))
    );
    // pokemon.evolvesTo.map(
    //   evo => {
    //     console.log("pokemon in map", evo);
    //     fetchPokemonDetails(evo);
    //   }
    //   // fetchPokemonDetails(pokemon, pokemon.evolvesTo)
    // )
  }
  return details;
};

export const fetchPokemonEvolutionChain = async pokemon => {
  // console.log("fetch pokemon chain called", pokemon);
  const { url } = pokemon.evolutionLink;

  // const chain = [];
  // console.log("url", url);
  return await fetch(`${url}`)
    .then(res => res.json())
    .then(async data => {
      const { chain } = data;
      const baseForm = [];
      const firstEvolutions = [];
      const secondEvolutions = [];

      baseForm.push(chain.species);
      // baseForm[0].evolvesTo = [];

      // console.log("basefor", baseForm);
      if (chain.evolves_to.length !== 0) {
        chain.evolves_to.forEach(pokemonEvo => {
          firstEvolutions.push(pokemonEvo.species);
          // baseForm[0].evolvesTo.push(pokemonEvo.species);
        });
        // baseForm[0].evolvesTo = firstEvolutions;

        // baseForm[0].evolvesTo = firstEvolutions;

        if (chain.evolves_to[0].evolves_to.length !== 0) {
          chain.evolves_to[0].evolves_to.forEach(pokemonEvo => {
            secondEvolutions.push(pokemonEvo.species);
            // firstEvolutions[0].evolvesTo.push(pokemonEvo.species);
          });
        }
        // firstEvolutions[0].evolvesTo = secondEvolutions;
        // secondEvolutions[0].evolvesTo = [];
      }

      // if (firstEvolutions.length > 1) {
      //   baseForm[0].evolvesTo = [...firstEvolutions];
      //   firstEvolutions.length = 0;
      // }
      // if (secondEvolutions > 0) {
      // }

      // console.log("base form", baseForm);

      // console.log("first evolution", firstEvolutions);
      // console.log("second evolution", secondEvolutions);

      // console.log("chain", chain);
      // const baseForm = {
      //   name: "",
      //   evolvesTo: [],
      // };
      // baseForm.name = chain.species.name;

      // // no evolution
      // if (chain.evolves_to.length === 0) {
      //   return [baseForm];
      // }

      //setting first evolution to baseform
      // if (chain.evolves_to.length !== 0) {
      //   //add all evoltions to baseform
      //   chain.evolves_to.forEach(pokemonEvolution => {
      //     baseForm.evolvesTo.push({
      //       name: pokemonEvolution.species.name,
      //       evolvesTo: [],
      //     });
      //   });

      //   if (chain.evolves_to[0].evolves_to.length !== 0) {
      //     chain.evolves_to[0].evolves_to.forEach(pokemonEvolution => {
      //       console.log("Pokemon evoltuon", pokemonEvolution);
      //       baseForm.evolvesTo[0].evolvesTo.push({
      //         name: pokemonEvolution.species.name,
      //         evolvesTo: [],
      //       });
      //     });
      //   }
      // }
      // if(baseForm.evolvesTo.length !==0){

      // }

      // if (chain.evolves_to[0].evolves_to.length !== 0) {
      // }
      // chain.evolves_to[0].evolves_to.forEach(pokemonEvolution => {
      //   console.log("Pkoemon evolution", pokemonEvolution);
      // });
      // const combinedEvolutionsArray = [
      //   ...baseForm,
      //   ...firstEvolutions,
      //   ...secondEvolutions,
      // ];

      // console.log("combiend arrays ", combinedEvolutionsArray);
      // const result = await Promise.all(
      //   baseForm.map(async evo => {
      //     console.log("evo", evo);
      //     const res = await fetchPokemonDetails((evo, evo.evolvesTo));
      //     return { ...res };
      //   })
      // );
      // console.log("resi;t", result);
      // console.log("BASE FORM", baseForm);
      // return result;
      // console.log("baseform", baseForm);
      // console.log("Data", data);

      // const result = await Promise.all(
      //   baseForm.map(async evo => {
      //     const res = await fetchPokemon(evo.species.name);
      //     return {
      //       ...res,
      //       evolvesTo: evo.evolvesTo,
      //     };
      //     // fetchPokemon(evo.species.name), evolutionTrigger: evo,})
      //   })
      // );
      // console.log("result", result);
      // return result;

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
      // chain.push({
      //   species: data.chain.species,
      // });

      //first evolution
      // if (data.chain["evolves_to"].length !== 0) {
      //   if (data.chain["evolves_to"].length === 2) {
      //     chain[0].evolvesTo = [];
      //     data.chain.evolves_to.forEach(pokemonEvo => {
      //       // console.log("pokemonevo", pokemonEvo.species.name);

      //       chain[0].evolvesTo.push({
      //         trigger: pokemonEvo.evolution_details[0].trigger.name,
      //   item: pokemonEvo.evolution_details[0].held_item,
      //   species: pokemonEvo.species,
      // });

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
      //   });
      // } else {
      //   data.chain.evolves_to.forEach(pokemonEvo => {
      //     console.log("pokemonevo", pokemonEvo.species.name);
      //       chain.push({
      //         species: pokemonEvo.species,
      //       });
      //       chain[0].evolvesTo = [
      //         {
      //           trigger: pokemonEvo.evolution_details[0].trigger.name,
      //           species: pokemonEvo.species.name,
      //         },
      //       ];
      //     });
      //   }
      // }

      //second evolution
      // console.log(
      //   "data.chain[][0]",
      //   data.chain["evolves_to"][0].evolves_to.length
      // );

      // if (data.chain["evolves_to"][0].evolves_to.length !== 0) {
      //   chain[1].evolvesTo = [];
      //   data.chain.evolves_to[0].evolves_to.forEach(pokemonEvo => {
      //     console.log("pokemonevo", pokemonEvo.species.name);

      //     chain[1].evolvesTo.push({
      //       trigger: pokemonEvo.evolution_details[0].trigger.name,
      //       item: pokemonEvo.evolution_details[0].held_item,
      //       species: pokemonEvo.species,
      //     });
      //   });
      // }

      // console.log(
      //   " pokemonEvo.evolution_details[0].trigger.name;",
      //   pokemonEvo.evolution_details[0].trigger.name
      // );

      // chain[length - 1].evolutionTrigger =
      //   pokemonEvo.evolution_details[0].trigger.name;
      // });

      // console.log("chain 1", chain[1].evolvesTo[0].species);
      // console.log("chain 1", chain);
      // if (chain.length !== 1) {
      //   if (chain[1].evolvesTo.length === 1) {
      //     chain.push({
      //       species: chain[1].evolvesTo[0].species,
      //       evolvesTo: [],
      //     });
      //   }
      // } else {
      //   chain[0].evolvesTo.forEach(pokeEvo => {
      //     chain.push({
      //       species: pokeEvo.species,
      //       evolvesTo: [],
      //     });
      //   });
      // }
      // console.log("chain", chain);
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

      const combinedEvolutionsArray = [
        ...baseForm,
        ...firstEvolutions,
        ...secondEvolutions,
      ];

      const result = await Promise.all(
        combinedEvolutionsArray.map(pokemon => {
          return fetchPokemon(pokemon.name);
        })
      );
      // console.log("base form", result);
      return result;
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
