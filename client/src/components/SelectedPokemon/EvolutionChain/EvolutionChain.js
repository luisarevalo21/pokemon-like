import React from "react";
import EvolutionChainItem from "./EvolutionChainItem";
import "./EvolutionChain.css";

// import { fetchPokemonEvolutionChain } from "../../../api/index";
const EvolutionChain = props => {
  // console.log("props in evolution chain", props);
  const length = props.evolutionChain.length;
  console.log("props.evo", props.evolutionChain);

  const chain = props.evolutionChain.map((pokemon, index) => {
    // console.log("pokemon", pokemon);
    return (
      <EvolutionChainItem
        key={pokemon.dexnumber}
        image={pokemon.image}
        type1={pokemon.type1}
        type2={pokemon.type2}
        name={pokemon.name}
        evolvesTo={pokemon.evolvesTo}
        index={index}
        length={length}
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
      <div className="evolution-item-container">{chain}</div>
    </div>
  );
};

export default EvolutionChain;
