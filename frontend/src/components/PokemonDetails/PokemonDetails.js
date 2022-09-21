import React from "react";
import styles from "./PokemonDetails.module.css";
import { captalzieFirstLetter } from "../../util";
const PokemonDetails = props => {
  const name = captalzieFirstLetter(props.pokemon.name);
  const { image, dexnumber } = props.pokemon;

  const handleDislike = () => {
    props.handleDislike();
  };
  const handleLike = pokemon => {
    const pokemonSelected = {
      name: pokemon.name,
      image: pokemon.image,
      dexnumber: pokemon.dexnumber,
    };
    props.handleLike(pokemonSelected);
  };

  const handleClear = () => {
    props.handleClear();
  };
  return (
    <div className={styles.PokemonContainer}>
      <h1>
        {name} | #{dexnumber}
      </h1>
      <img src={image} alt="pokemon" className={styles["pokemon-image"]}></img>

      <div className={styles["buttons-container"]}>
        <button className={[styles.dislike]} onClick={handleDislike}>
          Dislike
        </button>
        <button
          className={styles.like}
          disabled={props.disableButton}
          onClick={() => handleLike(props.pokemon)}
        >
          Like
        </button>
      </div>
      <div className={styles.clear}>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default PokemonDetails;
