import React, { useState } from "react";
import styles from "./Header.module.css";

import Select from "react-select/";
import { checkSearchValue } from "../../util/index.js";
import { POKEMON } from "../../util/PokemonList";
const Header = props => {
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const handleLogout = () => {
    props.handleLogout();
  };

  const handleSearchPokemon = selectOption => {
    console.log("slect option", selectOption);
    // console.log("event", e);
    // const { dexNumber } = selectOption;
    // console.log("selectedpokemon ", dexNumber);
    // console.log("e vale", e.target.value);

    setSearchedPokemon(selectOption);
  };
  const searchByDex = (option, searchText) => {
    if (
      option.data.value.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.dexNumber === searchText
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    // console.log("submit triggered");
    // console.log("searchedPokemon", searchedPokemon);
    // console.log(checkSearchValue(searchedPokemon));

    const result = checkSearchValue(searchedPokemon);
    console.log("searhced ", searchedPokemon);
    if (result) {
      // console.log(checkSearchValue(searchedPokemon));
      props.fetchSearchedPokemon(result);
      setSearchedPokemon("");
      return;
    }
    //hadnle error on submit
  };

  return (
    <div className={styles.Header}>
      <h3>Favorite Pokemon</h3>

      <div className={styles.searchContainer}>
        <Select
          className={styles.select}
          value={searchedPokemon}
          options={POKEMON}
          onChange={handleSearchPokemon}
          placeholder="Search Pokemon name or number"
          filterOption={searchByDex}
          isSearchable
        />

        <button
          type="submit"
          className={styles.search}
          onClick={handleSubmit}
          disabled={searchedPokemon === ""}
        >
          Search
        </button>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
