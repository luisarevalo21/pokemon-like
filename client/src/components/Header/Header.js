import React, { useState } from "react";
import styles from "./Header.module.css";

import useWindowDimensions from "./getWindowSize";
import Select from "react-select/";
import { checkSearchValue } from "../../util/index.js";
import { POKEMON } from "../../util/PokemonList";
const Header = props => {
  // console.log("props", props);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const { width, height } = useWindowDimensions();
  const handleLogout = () => {
    props.handleLogout();
  };

  const handleHeaderClicked = () => {
    props.handleHeaderClicked();
  };
  const mobileHeader =
    width < 500 ? (
      <div className={styles["header-name"]}>
        <h3 onClick={handleHeaderClicked}>Favorite Pokemon</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    ) : null;

  const regularHeader =
    width > 500 ? (
      <h3 onClick={handleHeaderClicked}>Favorite Pokemon</h3>
    ) : null;
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
    console.log("result in header", result);
    console.log("searhced ", searchedPokemon);
    if (result) {
      // console.log(checkSearchValue(searchedPokemon));
      props.handleSearchedPokemon(result);
      setSearchedPokemon("");
      return;
    }
    //hadnle error on submit
  };

  return (
    <div className={styles.Header}>
      {regularHeader}
      {mobileHeader}
      {props.selected ? (
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
      ) : null}
      {width > 500 ? <button onClick={handleLogout}>Logout</button> : null}{" "}
    </div>
  );
};

export default Header;
