import React from "react";
const SelectedPokemonHeader = props => {
  const dexnumber = parseInt(props.dexnumber);

  let previous = null;
  let next = null;
  const centerText = props.prevPokemon !== null ? "center" : null;
  if (dexnumber === 1) {
    next = (
      <div className={`header-next ${centerText}`} onClick={props.handleNext}>
        <p>
          {" "}
          {dexnumber + 1} {props.nextPokemon.name}
        </p>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div>
    );
  } else {
    previous = (
      <div className="header-prev" onClick={props.handlePrev}>
        <p>
          #{dexnumber - 1} {props.prevPokemon.name}
        </p>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </div>
    );
    next = (
      <div className="header-next" onClick={props.handleNext}>
        <p>
          #{dexnumber + 1} {props.nextPokemon.name}
        </p>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div>
    );
  }
  return (
    <div className="pokemon-header">
      {previous}
      {next}
    </div>
  );
};

export default SelectedPokemonHeader;
