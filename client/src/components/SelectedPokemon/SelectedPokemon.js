import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonEvolutionChain,
} from "../../api";

import SelectedPokemonDetails from "./SelectedPokemonDetails";
import SelectedPokemonHeader from "./SelectedPokemonHeader";
const SelectedPokemon = () => {
  const { id } = useParams();
  const pokemonId = parseInt(id);

  const [selectedPokemon, setSelectedPokemon] = useState(" ");
  const [selectedSpeciesDetails, setselectedSpeciesDetails] = useState("");
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [nextPokemon, setNextPokemon] = useState("");
  const [prevPokemon, setPrevPokemon] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemonId) {
        const result = await fetchPokemon(pokemonId);
        setSelectedPokemon(result);
      }
    };
    const fetchPokemonSpeciesDetails = async () => {
      if (pokemonId) {
        // console.log("id", id);
        const result = await fetchPokemonSpecies(pokemonId);
        const evoChain = await fetchPokemonEvolutionChain(result, pokemonId);
        if (pokemonId >= 1) {
          const result = await fetchPokemon(pokemonId + 1);
          // console.log(result);
          setNextPokemon(result);
        }
        if (pokemonId !== 1) {
          // console.log("inside  !== 1");
          const result = await fetchPokemon(pokemonId - 1);
          setPrevPokemon(result);
        }

        // console.log(evoChain);
        // console.log("result", evoChain);
        setselectedSpeciesDetails(result);
        setEvolutionChain(evoChain);
      }
    };

    fetchPokemonDetails();
    fetchPokemonSpeciesDetails();
    // fetchPokemonChain();
  }, [pokemonId]);

  const handlePokemonEvoClicked = async dexnumber => {
    console.log("dex number", dexnumber);

    navigate(`/pokemon/${dexnumber}`);
    // const result = await fetchPokemon(dexnumber);
    // setSelectedPokemon(result);
  };

  const handleNext = () => {
    navigate(`/pokemon/${pokemonId + 1}`);
  };
  const handlePrev = () => {
    navigate(`/pokemon/${pokemonId - 1}`);
  };

  let details = null;
  if (selectedPokemon) {
    details = (
      <SelectedPokemonDetails
        selectedPokemon={selectedPokemon}
        selectedSpeciesDetails={selectedSpeciesDetails}
        evolutionChain={evolutionChain}
        handlePokemonEvoClicked={handlePokemonEvoClicked}
      />
    );
  }
  return (
    <div className="container">
      <SelectedPokemonHeader
        dexnumber={id}
        nextPokemon={nextPokemon}
        prevPokemon={prevPokemon}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      {details}
    </div>
  );
};

export default SelectedPokemon;
