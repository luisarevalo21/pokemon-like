import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import PokemonList from "../PokemonList/PokemonList";
import styles from "./PokemonContainer.module.css";
import Header from "../Header/Header";
import {
  clearLikedPokemon,
  fetchPokemon,
  fetchLikedPokemon as liked,
  postLikedPokemon as postPokemon,
  deleteSinglePokemon,
  logout,
} from "../../api/index";
import Container from "../Container";

const PokemonContainer = props => {
  const [pokemon, setPokemon] = useState(null);
  const [likedPokemon, setLikedPokemon] = useState([]);
  const [disableButton, setDisabledButton] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const setup = async () => {
      const result = await fetchPokemon();
      // console.log(result);
      setPokemon(result);

      fetchLikedPokemon();
    };
    setup();
  }, []);

  //fetch liked pokemon and add the new one to the list.

  const fetchLikedPokemon = async (pokemon = null) => {
    const result = await liked(pokemon);
    console.log("result in fetched liked pokemon ", result);

    if (result) {
      setLikedPokemon(result);
      return;
    }
    setLikedPokemon([]);
  };

  //handle error  cases
  const postLikedPokemon = async pokemon => {
    const result = await postPokemon(pokemon);
    console.log("result", result);
    if (result) {
      setLikedPokemon(result);
      return;
    }
    // setError(result);
    // setLikedPokemon([]);
  };

  const handleLike = async pokemon => {
    postLikedPokemon(pokemon);
    const result = await fetchPokemon();
    console.log("result", result);
    if (result) {
      setPokemon(result);
      //   setDisabledButton(false);
    }
    // setError(result);
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

    if (result) {
      setLikedPokemon(result);
      return;
    }

    setError(result);
    // setLikedPokemon([]);
  };

  const handleLogout = async () => {
    logout();

    // if (response.ok) {
    // props.handleLogout();
    navigate("/");
    // }
  };

  let pokemonDetails = null;
  let likedPokemonList = null;
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
  if (likedPokemon) {
    likedPokemonList = (
      <PokemonList
        likedPokemon={likedPokemon}
        handleDeletePokemon={handleDeleteSinglePokemon}
      />
    );
  }

  return (
    <Container>
      <div className={styles.pokeContainer}>
        {error}
        <Header handleLogout={handleLogout} />
        {pokemonDetails}
        {likedPokemonList}
      </div>
    </Container>
  );
};

export default PokemonContainer;
