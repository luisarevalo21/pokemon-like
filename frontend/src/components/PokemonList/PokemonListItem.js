import React from "react";
import styles from "./PokemonListItem.module.css";
import { captalzieFirstLetter } from "../../util";
const PokemonListItem = props => {
  const { dexnumber } = props;

  const name = captalzieFirstLetter(props.name);
  const handleDeletePokemon = dexnumber => {
    props.handleDeletePokemon(dexnumber);
  };
  return (
    <div className={styles.container}>
      <p>
        {name} | #{props.dexnumber}
      </p>

      <button
        className={styles["clear-button"]}
        onClick={() => handleDeletePokemon(dexnumber)}
      >
        X
      </button>
    </div>
  );
};

export default PokemonListItem;
