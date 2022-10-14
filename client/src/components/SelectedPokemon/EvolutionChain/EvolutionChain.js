import React, { useEffect } from "react";
import EvolutionChainItem from "./EvolutionChainItem";
import "./EvolutionChain.css";

// import { fetchPokemonEvolutionChain } from "../../../api/index";
const EvolutionChain = props => {
  // console.log("props in evolution chain", props);

  const chain = props.evolutionChain.map(pokemon => {
    return (
      <EvolutionChainItem
        key={pokemon.dexnumber}
        image={pokemon.image}
        type1={pokemon.type1}
        type2={pokemon.type2}
        name={pokemon.name}
        dexnumber={pokemon.dexnumber}
        handlePokemonEvoClicked={props.handlePokemonEvoClicked}
      />
    );
  });
  //   useEffect(() => {
  //     const fetchEvolutionChain = () => {
  //       fetchPokemonEvolutionChain(evolutionLink);
  //     };

  //     fetchEvolutionChain();
  //   }, [evolutionLink]);
  return (
    <div className="evolution-container">
      <h3>Evolution Chain</h3>
      <div className="evolution-item-container">
        {chain}
        {/* <EvolutionChainItem />
        <EvolutionChainItem />
        <EvolutionChainItem /> */}
      </div>
    </div>
  );
};

export default EvolutionChain;
