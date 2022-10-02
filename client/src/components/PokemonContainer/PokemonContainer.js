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
import { checkUserAuthenticated } from "../../util";
import Container from "../Container";

const PokemonContainer = props => {
  const [pokemon, setPokemon] = useState(null);
  const [likedPokemon, setLikedPokemon] = useState([]);
  const [disableButton, setDisabledButton] = useState(false);
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

    if (checkUserAuthenticated(result)) {
      props.handleLogout();
      setLikedPokemon([]);

      return;
    }
    setLikedPokemon(result);
  };

  const postLikedPokemon = async pokemon => {
    const result = await postPokemon(pokemon);
    if (checkUserAuthenticated(result)) {
      props.handleLogout();
      setLikedPokemon([]);

      return;
    }

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
    if (checkUserAuthenticated(result)) {
      props.handleLogout();
      setLikedPokemon([]);

      return;
    }
    setLikedPokemon(result);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.ok) {
      props.handleLogout();
      navigate("/");
    }
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
        <Header handleLogout={handleLogout} />
        {pokemonDetails}
        {likedPokemonList}
      </div>
    </Container>
  );
};

export default PokemonContainer;
