import React, { useEffect, useState } from "react";

import PokemonDetails from "../PokemonDetails/PokemonDetails";
import PokemonList from "../PokemonList/PokemonList";
import styles from "./PokemonContainer.module.css";
import {
  clearLikedPokemon,
  fetchPokemon,
  fetchLikedPokemon as liked,
  postLikedPokemon as postPokemon,
  deleteSinglePokemon,
} from "../../api/index";

const PokemonContainer = props => {
  const [pokemon, setPokemon] = useState(null);
  const [likedPokemon, setLikedPokemon] = useState([]);
  const [disableButton, setDisabledButton] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const result = await fetchPokemon();
      setPokemon(result);
      fetchLikedPokemon();
    };
    setup();
  }, []);

  //fetch liked pokemon and add the new one to the list.

  const fetchLikedPokemon = async (pokemon = null) => {
    const result = await liked(pokemon);
    setLikedPokemon(result);
  };

  const postLikedPokemon = async pokemon => {
    const result = await postPokemon(pokemon);
    setLikedPokemon(result);
  };

  const handleLike = async pokemon => {
    postLikedPokemon(pokemon);
    const result = await fetchPokemon();
    setPokemon(result);
    setDisabledButton(false);
  };

  const handleDislike = async () => {
    setDisabledButton(true);
    const result = await fetchPokemon();
    setPokemon(result);
    setDisabledButton(false);
  };

  const handleClear = () => {
    setLikedPokemon([]);
    clearLikedPokemon();
  };

  const handleDeleteSinglePokemon = async dexnumber => {
    const result = await deleteSinglePokemon(dexnumber);
    setLikedPokemon(result);
  };

  let pokemonDetails = null;
  if (pokemon)
    pokemonDetails = (
      <PokemonDetails
        pokemon={pokemon}
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleClear={handleClear}
        disableButton={disableButton}
      />
    );

  return (
    <div className={styles.pokeContainer}>
      {pokemonDetails}
      <PokemonList
        likedPokemon={likedPokemon}
        handleDeletePokemon={handleDeleteSinglePokemon}
      />
    </div>
  );
};

export default PokemonContainer;
