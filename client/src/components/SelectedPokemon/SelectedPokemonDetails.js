import React from "react";
// import Container from "../Container";
import "./SelectedPokemon.css";
import SelectedPokemonPokedex from "./SelectedPokemonPokedex";
import EvolutionChain from "./EvolutionChain/EvolutionChain";
const SelectedPokemonDetails = props => {
  const { image, dexnumber, name, type1, type2 } = props.selectedPokemon;

  return (
    <div className="container">
      <h2 className="header-details">
        {name} | #{dexnumber}
      </h2>
      <div className="pokemon-details-container">
        <div className="image-container">
          <img src={image} alt="selected pokemon" className="image" />
        </div>

        <div className="type-container">
          <div>
            <h3>Types</h3>
          </div>
          <div className="types">
            <span className={`type-1 + ${type1}`}>{type1}</span>
            {type2 !== null ? (
              <span className={`type-2 + ${type2}`}>{type2}</span>
            ) : null}{" "}
          </div>
          <SelectedPokemonPokedex
            selectedSpeciesDetails={props.selectedSpeciesDetails}
          />
        </div>
      </div>
      <EvolutionChain
        evolutionChain={props.evolutionChain}
        handlePokemonEvoClicked={props.handlePokemonEvoClicked}
      />
    </div>
  );
};

export default SelectedPokemonDetails;
