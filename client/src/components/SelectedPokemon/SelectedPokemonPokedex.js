import React from "react";
const SelectedPokemonPokedex = props => {
  // console.log(props.selectedSpeciesDetails);
  const { pokedexEntry } = props.selectedSpeciesDetails;
  return (
    <div className="pokedex-container">
      <h3>Pokedex Entry</h3>
      <p> {pokedexEntry}</p>
    </div>
  );
};

export default SelectedPokemonPokedex;
