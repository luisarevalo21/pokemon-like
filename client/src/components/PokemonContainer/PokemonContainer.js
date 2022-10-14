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
import { searchCurrentLikedPokemon } from "../../util/index";
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

  const handleSearchedPokemon = async searchedPokemon => {
    const result = await fetchPokemon(searchedPokemon);
    console.log("reslt", result);
    if (result) {
      setPokemon(result);
    }
  };
  const fetchLikedPokemon = async (pokemon = null) => {
    const result = await liked(pokemon);

    if (result) {
      setLikedPokemon(result);
      return;
    }
    setLikedPokemon([]);
  };

  //handle error  cases
  const postLikedPokemon = async pokemon => {
    const foundPokmeon = searchCurrentLikedPokemon(likedPokemon, pokemon);
    console.log("found", foundPokmeon);

    if (foundPokmeon === undefined) {
      const result = await postPokemon(pokemon);
      console.log("result", result);
      if (result) {
        setLikedPokemon(result);
        return;
      }
    }
    setError(`${foundPokmeon.name} already liked! Try searching for another `);

    // setError(result);
    // setLikedPokemon([]);
  };

  const handleClickedPokmeon = dexnumber => {
    navigate(`/pokemon/${dexnumber}`);
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

  const handleLogout = async () => {
    logout();

    // if (response.ok) {
    // props.handleLogout();
    navigate("/");
    // }
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
        handleClickedPokmeon={handleClickedPokmeon}
        handleDeletePokemon={handleDeleteSinglePokemon}
      />
    );
  }

  return (
    <Container>
      <div className={styles.pokeContainer}>
        <Header
          handleSearchedPokemon={handleSearchedPokemon}
          handleLogout={handleLogout}
          selected={true}
        />
        <div className={styles.error}>
          <p>{error}</p>
        </div>
        {pokemonDetails}
        {likedPokemonList}
      </div>
    </Container>
  );
};

export default PokemonContainer;
