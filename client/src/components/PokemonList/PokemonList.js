import React from "react";
import PokemonListItem from "./PokemonListItem";
import styles from "./PokemonListItem.module.css";
const PokemonList = props => {
  if (props.likedPokemon.length !== 0) {
    return props.likedPokemon.map(pokemon => (
      <PokemonListItem
        name={pokemon.name}
        key={pokemon.dexnumber}
        dexnumber={pokemon.dexnumber}
        handleDeletePokemon={props.handleDeletePokemon}
      />
    ));
  }

  return <div className={styles.container}>No liked pokemon</div>;
};

export default PokemonList;
