import React, { useEffect, useState } from "react";
import EvolutionChainItem from "./EvolutionChainItem";
import "./EvolutionChain.css";
import { fetchPokemon } from "../../../api";

// import { fetchPokemonEvolutionChain } from "../../../api/index";

const EvolutionChain = props => {
  console.log("evolution chain", props.evolutionChain);
  const length = props.evolutionChain.length;
  // let evolutionChain = null;
  // if (props.evolutionChain) {
  const evolutionChain = props.evolutionChain.map((pokemonEvo, index) => {
    return (
      <EvolutionChainItem
        index={index}
        length={length}
        key={pokemonEvo.dexnumber}
        image={pokemonEvo.image}
        name={pokemonEvo.name}
        type1={pokemonEvo.type1}
        type2={pokemonEvo.type2}
        dexnumber={pokemonEvo.dexnumber}
      />
    );
  });
  // }
  // console.log("pokemon children", pokemonChildren);
  // const result = (
  //   <EvolutionChainItem
  //     // index={index}
  //     // length={length}
  //     // key={pokemonEvo.dexnumber}
  //     // image={pokemonEvo.image}
  //     name={pokemon.name}
  //     // type1={pokemonEvo.type1}
  //     // type2={pokemonEvo.type2}
  //     // dexnumber={pokemonEvo.dexnumber}
  //   />
  // );

  // <EvolutionChainItem
  //   // index={index}
  //   // length={length}
  //   // key={pokemonEvo.dexnumber}
  //   // image={pokemonEvo.image}
  //   name={pokemonChildren.name}
  //   // type1={pokemonEvo.type1}
  //   // type2={pokemonEvo.type2}
  //   // dexnumber={pokemonEvo.dexnumber}

  // />

  // const { evolvesTo } = pokemonChildren;
  // if (evolvesTo.length !== 0) {
  //   return dfs(evolvesTo);
  // }
  // console.log(pokemonChildren[0]);
  // console.log("ooemon childrne", pokemonChildren);

  // if (pokemonChildren[0].evolvesTo.length !== 0) {
  //   return dfs(pokemonChildren.evolvesTo);
  // }
  // if (pokemonChildren) {
  //   return dfs(pokemonChildren.evolvesTo);
  // }
  // return result;
  // const length = props.evolutionChain.length;

  // const evolutionChain = props.evolutionChain.map((pokemonEvo, index) => ())
  // <EvolutionChainItem
  //   index={index}
  //   length={length}
  //   key={pokemonEvo.dexnumber}
  //   image={pokemonEvo.image}
  //   name={pokemonEvo.name}
  //   type1={pokemonEvo.type1}
  //   type2={pokemonEvo.type2}
  //   dexnumber={pokemonEvo.dexnumber}
  // />
  // ));
  // const length = props.evolutionChain.length;
  // console.log("props.evo", props.evolutionChain);

  // console.log("props in evoluton chain", props.evolutionChain);
  // const result =
  //   props.evolutionChain.length !== 0 ? (
  //     <>
  //       <EvolutionChainItem pokemonEvo={props.evolutionChain} />
  //       {props.evolutionChain.evolvesTo.map(pokemonEvo => {
  //         console.log("poemon evo ", pokemonEvo);
  //         return <EvolutionChainItem pokemonEvo={pokemonEvo} />;
  //       })}
  //     </>
  //   ) : null;
  // const result = (
  //   <>
  //     <EvolutionChain pokemonEvo={props.evolutionChain} />
  //     {/* {props.evolutionChain.evolvesTo?.map(pokemonEvo => (
  //       <EvolutionChain pokemonEvo={pokemonEvo} />
  //     ))} */}
  //   </>
  // );

  // const evolution = props.evolutionChain.evolvesTo?.map(pokemonEvo => {
  //   <h2>{pokemonEvo.name}</h2>;
  //   return <EvolutionChainItem evolutionChain={pokemonEvo.evolvesTo} />;
  // });

  // const chain = props.evolutionChain.map((pokemon, index) => {
  //   // console.log("pokemon", pokemon);
  //   return (
  //     <EvolutionChainItem
  //       key={pokemon.dexnumber}
  //       image={pokemon.image}
  //       type1={pokemon.type1}
  //       type2={pokemon.type2}
  //       name={pokemon.name}
  //       evolvesTo={pokemon.evolvesTo}
  //       index={index}
  //       // length={length}
  //       dexnumber={pokemon.dexnumber}
  //       handlePokemonEvoClicked={props.handlePokemonEvoClicked}
  //     />
  //   );
  // });
  //   useEffect(() => {
  //     const fetchEvolutionChain = () => {
  //       fetchPokemonEvolutionChain(evolutionLink);
  //     };

  //     fetchEvolutionChain();
  //   }, [evolutionLink]);

  return (
    <div className="evolution-container">
      <h3>Evolution Chain</h3>
      <div className="evolution-item-container">{evolutionChain}</div>
    </div>
  );
};

export default EvolutionChain;
