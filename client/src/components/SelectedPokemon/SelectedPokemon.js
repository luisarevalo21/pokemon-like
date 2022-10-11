import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemon } from "../../api";
const SelectedPokemon = () => {
  const { id } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState("");

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (id) {
        const result = await fetchPokemon(id);
        setSelectedPokemon(result);
      }
    };
    fetchPokemonDetails();
  }, [id]);
  return (
    <div>
      <img src={selectedPokemon.image} alt="selected pokemon" />
      <p>{selectedPokemon.name}</p>
    </div>
  );
};

export default SelectedPokemon;
