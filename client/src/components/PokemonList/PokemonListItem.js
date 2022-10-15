import React from "react";
import styles from "./PokemonListItem.module.css";
import { captalzieFirstLetter } from "../../util";
const PokemonListItem = props => {
  const { dexnumber, img } = props;

  const name = captalzieFirstLetter(props.name);
  const handleDeletePokemon = dexnumber => {
    props.handleDeletePokemon(dexnumber);
  };
  const handleClickedPokemon = dexnumber => {
    props.handleClickedPokmeon(dexnumber);
  };
  return (
    <div className={styles.container}>
      <div
        className={styles["pokemon-details"]}
        onClick={() => handleClickedPokemon(dexnumber)}
      >
        <div className={styles["img-container"]}>
          <img alt="pokemon" src={img} className={styles.image} />
        </div>
        <p>
          {name} | #{props.dexnumber}
        </p>
      </div>

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
